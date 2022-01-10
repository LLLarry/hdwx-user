<template>
  <div class="wallet-item bg-white rounded-md overflow-hidden margin-bottom-4">
    <section class="header bg-success padding-x-2 padding-y-4 position-relative">
      <div class="total-money text-center">
        <div class="money-title text-size-sm d-flex justify-content-center align-items-center">
          <span class="">账户余额</span>
          <van-icon name="question-o" size=".35rem" class="margin-left-1"/>
        </div>
        <div class="text-white">&yen; <span class="money">0.00</span></div>
      </div>
      <ul class="money-detail d-flex text-size-sm">
        <li class="flex-1 text-center border-box border-right-1">
          <div>
            <div class="money-title">实际支付</div>
            <div class="text-white">&yen; <span class="money">0.00</span></div>
          </div>
        </li>
        <li class="flex-1 text-center">
          <div>
            <div class="money-title">赠送金额</div>
            <div class="text-white">&yen; <span class="money">0.00</span></div>
          </div>
        </li>
      </ul>
      <van-icon
        v-if="settingShow"
        name="setting-o"
        class="setting position-absolute"
        size=".55rem"
        @click="$router.push('/personalCenter/walletdetail/1')"
      />
    </section>
    <section class="main padding-x-2 padding-y-3 text-size-sm text-666">
      <hd-card>
        <hd-card-item>
          <span>所属小区：</span>
          <span>测试小区</span>
        </hd-card-item>
        <hd-card-item>
          <span>所属商户：</span>
          <span>测试商户</span>
        </hd-card-item>
        <hd-card-item>
          <span>商户电话：</span>
          <span>1553125458</span>
        </hd-card-item>
        <hd-card-item>
          <span>钱包ID：</span>
          <span>835026</span>
        </hd-card-item>
      </hd-card>
    </section>
    <section class="padding-bottom-2">
      <hd-recharge />
      <p class="text-a text-center text-size-sm margin-top-2">查看充值消费记录</p>
    </section>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
import HdRecharge from '@/components/hd-recharge'
export default defineComponent({
  components: {
    HdCard,
    HdCardItem,
    HdRecharge
  },
  setup (props, { root }) {
    // settion按钮是否显示
    const settingShow = computed(() => {
      return root.$route.name === 'wallet-list'
    })
    return {
      settingShow
    }
  }
})
</script>

<style lang="scss" scoped>
.wallet-item {
  .header {
    .money-title {
      color: rgba(255,255,255,.6);
      margin-bottom: 5px;
    }
    .total-money {
      .money {
        font-size: 28px;
      }
    }
    .money-detail {
      margin-top: 30px;
      > li {
        border-color: rgba(255,255,255,.1);
      }
    }
    .setting {
      color: rgba(255,255,255,.6);
      right: 10px;
      top: 10px;
    }
  }
}
</style>
