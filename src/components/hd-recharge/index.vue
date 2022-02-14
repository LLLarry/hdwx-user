<template>
  <div class="hd-recharge">
    <h3 class="text-center text-size-sm text-p">
      <div class="d-inline-block position-relative">{{ tip }}</div>
    </h3>
    <ul class="recharge-wrapper d-flex flex-wrap margin-top-3">
      <li
        class="recharge-li margin-bottom-2"
        v-for="item in tempList"
        :key="item.id"
        @click="handleRecharge(item)"
      >
        <div
          class="recharge-box bg-gray rounded-md padding-x-1 padding-y-2 text-center"
        >
          <div class="text-success text-size-sm">
            <slot :row="item">
              <span class="font-weight-bold text-size-default">{{
                item.toAccountMoney | fmtMoney
              }}</span
              >元
            </slot>
          </div>
          <div class="text-size-sm margin-top-1 text-p">
            售价{{ item.paymoney | fmtMoney }}元
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import wxpay from '@/utils/wxUtil/wxpay'
export default defineComponent({
  props: {
    tip: {
      type: String,
      default: '请点击以下金额充值'
    },
    tempList: {
      type: Array,
      default: () => []
    },
    getWXConfig: {
      type: Function
    },
    onSuccess: {
      type: Function
    }
  },
  setup(props, { root }) {
    const handleRecharge = async value => {
      try {
        // 获取微信配置信息
        const config = await props.getWXConfig(value)
        wxpay(config)
          .then(res => {
            root.alert(res).then(() => {
              props.onSuccess && props.onSuccess()
            })
          })
          .catch(err => {
            root.alert(err)
          })
      } catch (e) {
        root.toast(e)
      }
    }
    return {
      handleRecharge
    }
  }
})
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
