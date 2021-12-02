<template>
  <div class="about bg-gray" style="min-height: 100vh">
    <div class="d-flex justify-content-center padding-y-4 flex-wrap bg-white">
      <van-field v-model="openid" label="openid" placeholder="请输入openid" class="w-100" />
      <van-button type="primary" @click="pay">调起支付</van-button>
    </div>
  </div>
</template>

<script>
import wxpay from '@/utils/wxUtil/wxpay'
import { chargepayTest } from '@/require/charge'
export default {
  data () {
    return {
      openid: ''
    }
  },
  methods: {
    async pay () {
      const { code, message, result } = await chargepayTest({ openid: this.openid })
      if (code === 200) {
        wxpay(result)
        .then(res => {
            alert(res)
        })
        .catch(e => {
            alert(e)
        })
      } else {
        alert(message)
      }
    }
  }
}
</script>
