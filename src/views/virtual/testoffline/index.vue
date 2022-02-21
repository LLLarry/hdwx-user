<template>
  <div class="testoffline bg-gray">
    <van-nav-bar
      :title="`测试${code}离线充值机`"
    />
    <div class="padding-3">
      <ul class="box d-flex justify-content-around padding-3 bg-white rounded-md shadow">
        <li class="box-item flex-1 d-flex justify-content-center align-items-center flex-column">
          <div class="margin-bottom-2 text-999">卡号</div>
          <div class="text-success text-size-default">{{ typeof cardId === 'undefined' ? '— —' : cardId }}</div>
        </li>
        <li class="box-item flex-1 d-flex justify-content-center align-items-center flex-column">
          <div class="margin-bottom-2 text-999">卡余额</div>
          <div  class="text-success text-size-default">{{ typeof cardSurp === 'undefined' ? '— —' : cardSurp }}</div>
        </li>
      </ul>
    </div>
    <!-- 选择充值模板 -->
    <div class="bg-white">
      <hd-title exec>选择金额进行充值</hd-title>
      <select-temp :list="list" :selectId="selectId" @selectChargeTemp="selectChargeTemp" class="padding-x-2" />
    </div>

    <div class="padding-x-3 padding-y-4">
      <van-button type="primary" block @click="handleTap">模拟下发充值</van-button>
    </div>
  </div>
</template>

<script>
import SelectTemp from '@/components/charge/select-temp'
import { testType4Equipment, testType4Card, testofflineCharge } from '@/require/virtual'
export default {
  components: {
    SelectTemp
  },
  data () {
    return {
      list: [
        {
          name: '充值1元',
          moeny: 1,
          id: 1
        }
      ],
      selectId: -1,
      code: this.$route.query.code,
      nowtime: 0,
      openid: this.$route.query.openid,
      cardSurp: undefined,
      cardId: undefined
    }
  },
  mounted () {
    this.getInit()
  },
  methods: {
    selectChargeTemp ({ id }) {
      this.selectId = id
    },
    async getInit () {
      try {
        const { code, msg, starttime: nowtime } = await testType4Equipment({
          code: this.code
        })
        if (code === 200) {
          this.nowtime = nowtime
          this.readICcardIndo()
        } else {
          this.nowtime = nowtime
          this.readICcardIndo()
          this.alert(msg).then(() => {
            wx.closeWindow()
          })
        }
      } catch (e) {
        this.alert('异常错误').then(() => {
          wx.closeWindow()
        })
      }
    },
    async readICcardIndo () {
      try {
        const { code, message, cardSurp, card_id: cardId } = await testType4Card({
          code: this.code,
          openid: this.openid,
          nowtime: this.nowtime
        })
        if (code === 200) {
          this.cardSurp = cardSurp
          this.cardId = cardId
        } else {
          this.alert(message).then(() => {
            wx.closeWindow()
          })
        }
      } catch (e) {
        this.alert('异常错误').then(() => {
          wx.closeWindow()
        })
      }
    },
    async handleTap () {
      try {
        if (typeof this.cardId === 'undefined') {
          return this.toast('未获取到卡号，不能充值')
        }
        if (this.selectId === -1) {
          return this.toast('请先选择金额进行充值')
        }
        const { code, massage } = await testofflineCharge({
          openid: this.openid,
          code: this.code,
          card_id: this.cardId,
          card_ope: this.list.find(item => item.id === this.selectId).moeny
        })
        if (code === 200) {
          this.alert('充值下发成功').then(() => {
            wx.closeWindow()
          })
        } else {
          this.alert(massage).then(() => {
            wx.closeWindow()
          })
        }
      } catch (e) {
        this.alert('异常错误').then(() => {
          wx.closeWindow()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.testoffline {
  min-height: 100vh;
  .box {
    .box-item {
      &:first-child {
        border-right: 1px solid #28a745;
      }
    }
  }
}
</style>
