<template>
  <div class="charge-icon bg-white">
      <Header :code="code" :areaname="areaname" :serverPhone="serverPhone"></Header>
      <div class="d-flex justify-content-between padding-y-3 margin-x-3 margin-y-2 rounded bg-gray banner">
          <div class="flex-1 d-flex flex-column align-items-center">
              <div class="margin-bottom-2 text-333 text-size-default font-weight-bold">卡号</div>
              <div class="text-success text-size-default font-weight-bold">{{card_id || '— —'}}</div>
          </div>
          <div class="flex-1 d-flex flex-column align-items-center">
              <div class="margin-bottom-2 text-333 text-size-default font-weight-bold">余额</div>
              <div class="text-success text-size-default font-weight-bold">{{typeof card_surp === 'number' ? (card_surp.toFixed(2)) : '— —'}}</div>
          </div>
      </div>
      <hd-title>请选择充值金额</hd-title>
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
        >确认充值</van-button>
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
import { queryOfflineCard, offlineCardCharge, offlineCharge } from '@/require/charge'
import { verification } from '@/utils/util'
import wxpay from '@/utils/wxUtil/wxpay'

export default {
    components: {
        SelectPost,
        SelectPaytype,
        Header
    },
    data () {
        return {
            selectPostIndex: -1, // 选择投币个数索引
            selectPaytype: ['微信支付'],
            selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
            query: '',
            serverPhone: '', // 服务电话,
            code: '', // 设备号
            openid: '', // 用户唯一标识
            card_id: '', // 卡号
            card_surp: '', // 卡余额
            nowtime: new Date().getTime(), // 下发查询时间
            areaname: '', // 小区名
            tempList: [], // 模板；列表
            titleText: '离线充值机'
        }
    },
    mounted () {
        const { code, openid } = this.$route.query
        this.code = code
        this.openid = openid
        // this.nowtime = nowtime
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
            await this.getInfo(data)
            await this.getCardInfo({ ...data, nowtime: this.nowtime })
        },
        // 获取离线充值机信息
        async getInfo (data) {
            try {
                const { code, message, phonenum, brandname, templateLists } = await offlineCardCharge(data)
                if (code === 200) {
                    this.serverPhone = phonenum
                    this.titleText = brandname
                    this.tempList = templateLists
                } else {
                    this.alert(message).then(() => {
                        wx.closeWindow()
                    })
                }
            } catch (error) {
                this.alert('异常错误', { error, vm: this, line: 120 }).then(() => {
                    wx.closeWindow()
                })
            }
        },
        // 获取离线充值机卡信息
        async getCardInfo (data) {
            try {
                const { code, message, card_id: cardId, card_surp: cardSurp } = await queryOfflineCard(data, '获取卡信息中')
                if (Number(code) === 200) {
                    this.card_id = cardId
                    this.card_surp = isNaN(Number(cardSurp) / 10) ? '— —' : Number(cardSurp) / 10
                } else {
                    this.alert(message).then(() => {
                        wx.closeWindow()
                    })
                }
            } catch (error) {
                this.alert('异常错误', { error, vm: this, line: 138 }).then(() => {
                    wx.closeWindow()
                })
            }
        },
        // 校验参数是否正确
        verifi () {
            const verifiList = [
                {
                    verifi: this.selectPostIndex >= 0,
                    content: '请先选择充值金额'
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
            }
        },
        // 微信支付
        async bywxpay () {
            // 获取离线充值机支付加密信息
            const info = await offlineCharge({
                openId: this.openid,
                code: this.code,
                card_id: this.card_id,
                tempid: this.tempList[this.selectPostIndex].id,
                card_ope: 1
            })
            // 调起微信支付
            wxpay(info)
            .then(() => {
                window.location.replace('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MDY5OTg5MQ==&scene=126&subscene=0#wechat_redirect')
            })
            .catch(err => {
                this.alert(err).then(() => {
                    wx.closeWindow()
                })
            })
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
    .banner {
        // border: 1px solid #eee;
        // background-image: linear-gradient(to bottom, rgba(7, 193, 96, 0.8), rgba(7, 193, 96, 0.4));
    }
}
</style>
