<template>
  <div id="app" class="text-size-md text-333">
    <navigation>
      <router-view v-slot="Component">
        <component :is="Component" />
      </router-view>
    </navigation>
    <!-- 底部菜单 -->
    <van-tabbar
      v-if="tabbarIsShow"
      v-model="active"
      :active-color="cssVar.success"
      inactive-color="#666"
      route
    >
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" replace to="/admin"
        >个人中心</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: '',
      tabbarIsShow: false
    }
  },
  beforeMount() {
    /* 在页面挂载之前删除加载loading */
    // eslint-disable-next-line no-unreachable
    const loadingBox = document.querySelector('.loading-box')
    if (loadingBox) {
      loadingBox.parentNode.removeChild(loadingBox)
    }
  },
  computed: {
    ...mapGetters(['cssVar'])
  },
  watch: {
    $route: {
      handler(route) {
        this.tabbarIsShow = !!route.meta.tabbar
        this.active = route.path
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
@import './assets/style/base.css';
@import './assets/style/hdwx-bootstrap.scss';
// @import './assets/style/iconfont.css';
@import './assets/style/animate.css';
@font-face {
  font-family: 'mathNum';
  src: url('./assets/fonts/number/DINMITTELSCHRIFT.woff2') format('woff2'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.woff') format('woff'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.ttf') format('truetype'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.eot')
      format('embedded-opentype'),
    url('./assets/fonts/number/DINMITTELSCHRIFT.svg') format('svg');
}
.math-num {
  font-family: 'mathNum';
}
#app {
  min-height: 100vh;
}
// 提示框层级
.dialog-class {
  z-index: 20200 !important;
}
</style>
