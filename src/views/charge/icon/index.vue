<template>
  <div class="charge-icon">
      <Header :code="code" :areaname="areaname" :serverPhone="serverPhone"></Header>
      <hd-title>请选择投币个数</hd-title>
      <div class="card padding-y-3 bg-white">
          <select-post :list="tempList" :selectIndex="selectPostIndex" @selectPostBack="handleSelectPost">
              <template v-slot:default="{data}">
                  {{data.name}}
              </template>
          </select-post>
      </div>
      <hd-line />
      <div>
          <select-paytype :list="selectPaytype" :select="selectPayTypeNum" @selectPayTypeBack="selectPayTypeBack">
              <template v-slot:default="{data}">
                  <span
                  class="text-size-sm text-p"
                  v-if="
                    typeof data !== 'string'
                  ">（{{data.slot}}）</span>
              </template>
          </select-paytype>
      </div>

      <div class="padding-x-3 padding-top-4">
          <van-button
            type="primary"
            block
            class="margin-top-4"
            @click="goCharge"
        >开始充电</van-button>
      </div>

    <!--
      <div class="padding-x-3 margin-top-4 text-size-default">
          如有疑问，请联系：
          <a class="text-primary" href="tel:13521356652">13521356652</a>
      </div>
    -->
  </div>
</template>

<script>
import SelectPost from '@/components/charge/select-post'
import Header from '@/components/charge/header'
import SelectPaytype, { paytypeMap } from '@/components/charge/select-paytype'
import { getChargeDataByCodeAndOpenid, inCoinsPay, inCoinsWalletPay } from '@/require/charge'
import { verification, fmtMoney } from '@/utils/util'
import wxpay from '@/utils/wxUtil/wxpay'

export default {
    components: {
        SelectPost,
        SelectPaytype,
        Header
    },
    metaInfo () {
        return {
            title: this.title
        }
    },
    data () {
        return {
            selectPostIndex: -1, // 选择投币个数索引
            selectPaytype: ['微信支付', '钱包支付'/* , { title: '包月支付', slot: '123456' } */],
            selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
            query: '',
            serverPhone: '', // 服务电话,
            code: '', // 设备号
            openid: '', // 用户唯一标识
            areaname: '', // 小区名
            tempList: [], // 模板；列表
            title: '脉冲充电'
        }
    },
    mounted () {
        const { code, openid } = this.$route.query
        this.code = code
        this.openid = openid
        this.getInitData({
            code,
            openid
        })
    },
    methods: {
        handleSelectPost ([data, index]) {
            this.selectPostIndex = index
        },
        selectPayTypeBack (num) {
            this.selectPayTypeNum = num
        },
        // 获取初始化数据
        async getInitData (data) {
            try {
                const { code, message, servephone, areaname, templateLists, brandname = '脉冲充电', tourtopupbalance, touristsendbalance } = await getChargeDataByCodeAndOpenid(data)
                if (code === 200) {
                    this.serverPhone = servephone
                    this.areaname = areaname
                    this.tempList = templateLists
                    this.title = brandname
                    this.selectPaytype.splice(1, 1, { title: '钱包支付', slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(touristsendbalance)}` })
                } else {
                    this.$dialog.alert({
                        title: '提示',
                        message: message,
                        beforeClose: (action, done) => {
                            done()
                            wx.closeWindow()
                        }
                    })
                }
            } catch (e) {
                this.$dialog.alert({
                    title: '提示',
                    message: '异常错误',
                    beforeClose: (action, done) => {
                        done()
                        wx.closeWindow()
                    }
                })
            }
        },
        // 校验参数是否正确
        verifi () {
            const verifiList = [
                {
                    verifi: this.selectPostIndex >= 0,
                    content: '请先选择投币个数'
                },
                {
                    verifi: this.selectPayTypeNum > 0,
                    content: '请先选择支付方式'
                }
            ]
            return verification(verifiList)
        },
        goCharge () {
            // 验证登录选择信息
            if (!this.verifi()) return false
            if (this.selectPayTypeNum === 1) { // 微信支付
                this.bywxpay()
            } else if (this.selectPayTypeNum === 2) { // 钱包支付
                this.bywalletpay()
            }
        },
        // 微信支付
        async bywxpay () {
            // 获取脉冲加密信息
            const info = await inCoinsPay({
                openId: this.openid,
                code: this.code,
                port: 1,
                tempid: this.tempList[this.selectPostIndex].id
            })
            // 调起微信支付
            wxpay(info)
            .then(() => {
                window.location.replace('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MDY5OTg5MQ==&scene=126&subscene=0#wechat_redirect')
            })
            .catch(err => {
                this.$dialog.alert({
                    title: '提示',
                    message: err,
                    beforeClose: (action, done) => {
                        done()
                    }
                })
            })
        },
        async bywalletpay () {
            try {
                const { code, message, result } = await inCoinsWalletPay({
                    openId: this.openid,
                    code: this.code,
                    port: 1,
                    tempid: this.tempList[this.selectPostIndex].id
                })
                if (code === 200) {
                    this.$dialog.alert({
                        title: '提示',
                        message: '支付成功',
                        beforeClose: (action, done) => {
                            console.log(result, result.orderNum)
                            window.location.replace('/general/walletPayment?source=2&orderNum=' + result.orderNum + '&payMoney=' + result.payMoney + '&devicenum=' + result.devicenum)
                            done()
                        }
                    })
                } else {
                    this.$dialog.alert({
                        title: '提示',
                        message: message,
                        beforeClose: (action, done) => {
                            done()
                        }
                    })
                }
            } catch {
                this.$dialog.alert({
                    title: '提示',
                    message: '异常错误',
                    beforeClose: (action, done) => {
                        done()
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss">
.charge-icon {
    padding-top: 90px;
    .hd-title {
        div {
            color: #333;
            font-weight: bold;
        }
    }
}
</style>
