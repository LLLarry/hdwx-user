<template>
  <div class="home">
    <p class="text-center padding-y-4">请退出重新扫码</p>
    <!-- <van-button type="primary" to="/wisdomv3test01?code=000134&openid=oxdP_5sUbINNHB61bScNpoOv0Ij8&port=10">主要按钮</van-button> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    throw new Error(`into Home Page
    浏览器： ${window.navigator.userAgent}
    `)
  }
}
</script>

<style lang="scss">
p {
  font-size: 22px;
}
</style>
