<template>
  <div class="hd-recharge">
    <h3 class="text-center text-size-sm text-p">
      <div class="d-inline-block position-relative">请点击以下金额充值</div>
    </h3>
    <ul class="recharge-wrapper d-flex flex-wrap margin-top-3">
      <li class="recharge-li margin-bottom-2" v-for="item in 5" :key="item">
        <div class="recharge-box bg-gray rounded-md padding-x-1 padding-y-2 text-center">
          <div class="text-success text-size-sm">
            <span class="font-weight-bold text-size-default">2.00</span>元
          </div>
          <div class="text-size-sm margin-top-1 text-p">售价2.00元</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.hd-recharge {
  h3 {
    font-weight: normal;
    div {
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 1px;
        background-color: #8f8f94;
        left: -5px;
        top: 50%;
        transform: translate(-100%, 1px);
      }
      &::before {
        content: '';
        position: absolute;
        width: 20px;
        height: 1px;
        background-color: #8f8f94;
        right: -5px;
        top: 50%;
        transform: translate(100%, 1px);
      }
    }
  }
  .recharge-wrapper {
    .recharge-li {
      width: 33.3333%;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }
}
</style>
