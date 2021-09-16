<template>
    <div class="charge-footer d-flex bg-white position-fixed" :class="{ level: level}">
        <div class="flex-1 d-flex align-items-center padding-left-3 info">
            <!-- <span>支付金额：</span>
            <span>0.00元</span> -->
            <slot />
        </div>
        <van-button
            type="primary"
            class="submit-btn d-flex align-items-center justify-content-center text-size-default"
            @click="$emit('goCharge')"
        >开始充电</van-button>
    </div>
</template>

<script>
export default {
    props: {
        level: {
            type: Boolean
        }
    }
}
</script>
<style lang="scss">
.charge-footer {
  left: 0;
  height: 80px;
  bottom: 0;
  right:0;
  box-shadow: -2px -2px 8px #ddd;
  z-index: 9;
  &.level {
      z-index: 9999;
  }
}
.charge-footer .submit-btn {
  width: 150px;
  height: 100%;
  border: none;
}
.charge-footer .info {
  font-size: 16px;
}
</style>
