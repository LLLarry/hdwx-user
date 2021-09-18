<template>
  <div id="app" class="text-size-md text-333">
    <router-view />
  </div>
</template>

<script>
export default {
  beforeMount () {
    /* 在页面挂载之前删除加载loading */
    const loadingBox = document.querySelector('.loading-box')
    if (loadingBox) {
      loadingBox.parentNode.removeChild(loadingBox)
    }
  },
  mounted () {
    document.addEventListener('touchstart', function () {})
  }
}
</script>

<style lang="scss">
@import './assets/style/base.css';
@import './assets/style/hdwx-bootstrap.css';
// @import './assets/style/iconfont.css';
@import './assets/style/animate.css';
@font-face {
    font-family: "mathNum";
    src: url("./assets/fonts/number/DINMITTELSCHRIFT.woff2") format("woff2"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.woff") format("woff"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.ttf") format("truetype"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.eot") format("embedded-opentype"),
        url("./assets/fonts/number/DINMITTELSCHRIFT.svg") format("svg");
}
.math-num {
    font-family: "mathNum";
}
#app {
  min-height: 100vh;
}
// 提示框层级
.dialog-class {
  z-index: 20200 !important;
}
</style>
