<template>
  <div class="wisdom d-flex flex-column">
    <!-- 顶部区域 -->
    <Header
      :code="code"
      :areaname="areaname"
      :serverPhone="serverPhone"
      :chargeTip="chargeTip"
      :uid="uid"
    ></Header>
    <main class="padding-top-2 flex-1">
      <!-- <select-port :list="portList" :selectPort="selectPort" @selectPortBack="handleSelectPort" /> -->
      <charge-port
        :list="portList"
        :selectPort="selectPort"
        @selectPortBack="handleSelectPort"
      />
    </main>
    <van-popup
      v-model="show"
      position="bottom"
      duration=".4s"
      :style="{ bottom: '2.133rem', maxHeight: 'calc(80vh - 2.133rem)' }"
      :overlay-style="{ height: 'calc(100% - 2.133rem)' }"
      @open="level = true"
      @closed="level = false"
    >
      <div class="padding-bottom-3">
        <!-- 选择插座提示 -->
        <div class="padding-y-3 padding-x-3">
          <select-port-tip :selectPort="selectPort" />
        </div>
        <!-- 选择模板列表 -->
        <div class="padding-x-3">
          <select-temp
            :list="templatelist"
            :selectId="selectTempId"
            @selectChargeTemp="selectChargeTemp"
          />
        </div>
        <hd-line />
        <!-- 选择支付方式列表 -->
        <select-paytype
          :list="selectPaytype"
          :select="selectPayTypeNum"
          @selectPayTypeBack="selectPayTypeBack"
        >
          <template v-slot:default="{ data }">
            <span class="text-size-sm text-p" v-if="typeof data !== 'string'"
              >（{{ data.slot }}）</span
            >
          </template>
        </select-paytype>

        <!-- 温馨提示 -->
        <warm-tip :openid="openid" :aid="aid" :merid="merid" />
      </div>
    </van-popup>
    <!-- 底部区域 -->
    <Footer :level="level" @goCharge="goCharge">
      {{ chargePayTip }}
    </Footer>
    <!-- 收费说明提示挂载元素 -->
    <div id="charge-tip" />
    <!-- 钱包余额不足提示 -->
    <charge-overlay
      ref="chargeOverlay"
      :money="tourtopupbalance"
      :sendmoney="touristsendbalance"
      :url="walletRechargeUrl"
    ></charge-overlay>
    <!-- 用户钱包列表 -->
    <wallet-list ref="walletList" />
  </div>
</template>

<script>
import Header from '@/components/charge/header'
import Footer from '@/components/charge/footer'
// import selectPort from '@/components/charge/select-port'
import ChargePort from '@/components/charge/charge-port'
import selectPortTip from '@/components/charge/select-port-tip'
import selectTemp from '@/components/charge/select-temp'
import warmTip from '@/components/charge/warm-tip'
import chargeOverlay from '@/components/charge/charge-overlay'
import selectPaytype, { paytypeMap } from '@/components/charge/select-paytype'
import walletList from '@/components/charge/wallet-list'
import { verification, fmtMoney } from '@/utils/util'
import { deviceCharge, walletChargePay } from '@/require/charge'
import {
  verifiUserIfCharge,
  wxPayFun,
  moneylyPayFun,
  createPortStatusByHV
} from '../helper.js'
export default {
  components: {
    Header,
    ChargePort,
    Footer,
    selectPaytype,
    selectTemp,
    selectPortTip,
    chargeOverlay,
    warmTip,
    walletList
  },
  data() {
    return {
      code: '',
      openid: '',
      serverPhone: '',
      areaname: '',
      titleText: '智慧款充电', // titleText
      chargeTip: {
        chargeInfo: null, // 收费标准
        payhint: '', // 收费说明，下次不再提醒是否展示
        agree: 2
      },
      orderid: '', // 续充订单的订单id
      aid: '', // 设备所属小区id
      merid: '', // 设备所属商户id
      uid: '', // 用户id
      walletid: '', // 钱包id
      touraid: '', // 用户所属小区id
      tourtopupbalance: 0, // 充值金额
      touristsendbalance: 0, // 赠送金额
      portList: [
        { port: 1, portStatus: 1 },
        { port: 2, portStatus: 1 },
        { port: 3, portStatus: 1 },
        { port: 4, portStatus: 1 },
        { port: 5, portStatus: 1 },
        { port: 6, portStatus: 1 },
        { port: 7, portStatus: 1 },
        { port: 8, portStatus: 1 },
        { port: 9, portStatus: 1 },
        { port: 10, portStatus: 1 }
      ],
      selectPort: -1, // 选中的端口号
      show: false,
      templatelist: [],
      selectTempId: -1, // 选中充电模板id
      ifwallet: 2, // 1 强制钱包支付 （不支持微信）
      selectPaytype: [
        '微信支付',
        '钱包支付' /* , { title: '包月支付', slot: '123456' } */
      ],
      selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
      level: false, // footer的层级
      walletRechargeUrl: '' // 钱包充值跳转路径
    }
  },
  computed: {
    // 充电支付提示
    chargePayTip() {
      let money = 0
      if (this.selectPort < 0) {
        return '请先选择充电端口'
      } else if (this.templatelist.length <= 0 || this.selectTempId < 0) {
        money = 0
      } else {
        money = this.templatelist.find(({ id }) => id === this.selectTempId)
          .money
      }
      return `支付金额：${fmtMoney(money)}元`
    }
  },
  mounted() {
    const { code, openid } = this.$route.query
    this.code = code
    this.openid = openid
    this.getInitData({
      code,
      openid
    })
  },
  methods: {
    handleSelectPort({ port, portStatus }) {
      if (portStatus === 3 || portStatus === 4) {
        // 故障端口
        this.toast('此端口为故障端口')
      } else if (portStatus === 1) {
        // 空闲端口
        this.selectPort = port
        this.show = true
      } else {
        // 使用端口
        // 检验当前使用端口能否作为本人续充端口使用
        verifiUserIfCharge({
          openid: this.openid,
          code: this.code,
          port
        }).then(orderid => {
          if (orderid) {
            // 判断orderid是否存在
            this.selectPort = port
            this.orderid = orderid
            this.show = true
          }
        })
      }
    },
    // 设置支付方式
    selectPayTypeBack(num) {
      this.selectPayTypeNum = num
    },
    // 设置选中的充电模板
    selectChargeTemp({ id }) {
      this.selectTempId = id
    },
    async getInitData(data) {
      try {
        const {
          code,
          message,
          portStatus,
          templatelist,
          servephone,
          areaname,
          brandname,
          tourtopupbalance,
          touristsendbalance,
          chargeInfo,
          payhint,
          ifmonth,
          defaultindex = 0,
          packageMonth = {},
          deviceaid,
          merid,
          touruid,
          walletid,
          touraid,
          ifwallet,
          hardversion,
          agree
        } = await deviceCharge(data)
        if (code === 200) {
          this.portList = createPortStatusByHV(portStatus, hardversion)
          this.templatelist = templatelist
          this.serverPhone = servephone
          this.areaname = areaname
          this.titleText = brandname
          this.tourtopupbalance = tourtopupbalance
          this.touristsendbalance = touristsendbalance
          this.aid = deviceaid
          this.merid = merid
          this.uid = touruid
          this.walletid = walletid
          this.touraid = touraid
          this.ifwallet = ifwallet
          this.chargeTip = {
            chargeInfo, // 收费标准
            payhint, // 收费说明，下次不再提醒是否展示
            defaultShow: payhint === 1,
            agree
          }
          this.selectTempId = templatelist[defaultindex || 0]?.id
          // 设置支持的支付方式
          const initPayType = ifwallet === 1 ? [] : ['微信支付']
          // 设置默认选择的支付方式
          this.selectPayTypeNum =
            ifwallet === 1
              ? paytypeMap['钱包支付']
              : tourtopupbalance + touristsendbalance >= 2
              ? paytypeMap['钱包支付']
              : paytypeMap['微信支付']
          if (Number(ifmonth) === 1) {
            const { surpnum = 0, todaysurpnum = 0 } = packageMonth
            this.selectPaytype = [
              ...initPayType,
              {
                title: '钱包支付',
                slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(
                  touristsendbalance
                )}`,
                icon: {
                  className: 'iconfont icon-ti-shi',
                  onClick: () => {
                    // 发送请求
                    this.$refs.walletList.getData({
                      uid: this.uid,
                      devaid: this.aid,
                      merid: this.merid,
                      aid: this.touraid,
                      walletid: this.walletid
                    })
                  }
                }
              },
              {
                title: '包月支付',
                slot: `总剩余：${surpnum || 0}次， 今日剩余: ${todaysurpnum ||
                  0}次`
              }
            ]
          } else {
            this.selectPaytype = [
              ...initPayType,
              {
                title: '钱包支付',
                slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(
                  touristsendbalance
                )}`,
                icon: {
                  className: 'iconfont icon-ti-shi',
                  onClick: () => {
                    // 发送请求
                    this.$refs.walletList.getData({
                      uid: this.uid,
                      devaid: this.aid,
                      merid: this.merid,
                      aid: this.touraid,
                      walletid: this.walletid
                    })
                  }
                }
              }
            ]
          }
        } else {
          this.alert(message).then(() => {
            wx.closeWindow()
          })
        }
      } catch (error) {
        this.alert('异常错误', { error, vm: this, line: 256 }).then(() => {
          wx.closeWindow()
        })
      }
    },
    // 校验选择的信息是否正确
    verifi() {
      const verifiList = [
        {
          verifi: this.selectPort > 0,
          content: '请先选择充电端口'
        },
        {
          verifi: this.selectTempId >= 0,
          content: '请先选择充电模板'
        },
        {
          verifi: this.selectPayTypeNum > 0,
          content: '请先选择支付方式'
        }
      ]
      return verification(verifiList)
    },
    // 开始充电
    goCharge() {
      // 判断校验是否通过
      if (!this.verifi()) return false
      switch (this.selectPayTypeNum) {
        case 1:
          this.wxPay()
          break // 微信支付
        case 2:
          this.walletPay()
          break // 钱包支付
        case 3:
          this.moneylyPay()
          break // 包月支付
      }
    },
    // 微信支付
    async wxPay() {
      wxPayFun({
        tempid: this.selectTempId,
        port: this.selectPort,
        openid: this.openid,
        code: this.code,
        ifcontinue: this.orderid
      })
    },
    // 钱包支付
    async walletPay() {
      try {
        const {
          code,
          message,
          ordernum,
          devicenum,
          paymoney
        } = await walletChargePay({
          tempid: this.selectTempId,
          port: this.selectPort,
          openid: this.openid,
          code: this.code,
          ifcontinue: this.orderid
        })
        if (code === 200) {
          this.alert('支付成功').then(() => {
            window.location.replace(
              `/general/walletPayment?orderNum=${ordernum}&payMoney=${paymoney}&devicenum=${devicenum}`
            )
          })
        } else if (code === 21005) {
          // 用户钱包余额不足
          // 展示余额不足提示
          // 获取充电模板name属性
          const tempname = this.templatelist.find(
            item => item.id === this.selectTempId
          ).name
          // 生成钱包充值跳转路径
          this.walletRechargeUrl = `/general/walletcharge?from=1&openid=${this.openid}&aid=${this.aid}&dealid=${this.merid}&deviceNum=${this.code}&port=${this.selectPort}&ctempid=${this.selectTempId}&tempname=${tempname}`
          this.$refs.chargeOverlay.show = true
        } else {
          this.toast(message)
        }
      } catch (error) {
        this.toast('异常错误', { error, vm: this, line: 328 })
      }
    },
    // 包月充电
    moneylyPay() {
      moneylyPayFun({
        port: this.selectPort,
        openid: this.openid,
        code: this.code
      })
    }
  }
}
</script>
