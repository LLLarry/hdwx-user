<template>
  <div>
    <van-overlay
      :show="isShow"
      :custom-style="{
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '40vh'
      }"
    >
      <div class="hd-loading-content d-flex flex-column align-items-center padding-4 text-size-sm rounded-md">
        <van-loading size="40px"></van-loading>
        <div class="loading-text margin-top-3 padding-x-1">{{ title || '加载中···' }}</div>
      </div>
    </van-overlay>
  </div>
</template>

<style lang="scss">
.hd-loading-content {
    background: rgba(0, 0, 0, .7);
    color: #fff;
}
</style>
