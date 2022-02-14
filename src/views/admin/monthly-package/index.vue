<template>
  <div class="monthly-package" v-no-data:[noDataMap]="noData">
    <div class="content d-flex flex-column" v-if="!noData">
      <header class="padding-x-2 padding-top-3 padding-bottom-3">
        <div class="user-info text-center margin-bottom-2">
          <div class="text-size-md">测试昵称</div>
          <div class="text-size-sm text-white margin-top-1">(00012354)</div>
        </div>
        <hd-card class="text-size-sm">
          <hd-card-item class="text-center">
            <div>总剩余次数</div>
            <div class="text-white margin-top-1 text-size-sm">
              56 <span>次</span>
            </div>
          </hd-card-item>
          <hd-card-item class="text-center">
            <div>今日剩余次数</div>
            <div class="text-white margin-top-1">8 <span>次</span></div>
          </hd-card-item>
          <hd-card-item class="text-center">
            <div>到期日期</div>
            <div class="text-white margin-top-1">2021-10-18</div>
          </hd-card-item>
        </hd-card>
      </header>
      <main class="shadow-md margin-x-2 bg-white padding-2 rounded-md flex-1">
        <hd-recharge tip="请选择以下包月套餐充值">
          <template v-slot="{ row }">
            <span class="font-weight-bold text-size-default">{{ row }}</span
            >月
          </template>
        </hd-recharge>

        <router-link
          tag="p"
          to="/admin/monthly-package/record"
          class="text-a text-center text-size-sm margin-top-2"
          >查看充值消费记录</router-link
        >
      </main>
    </div>
  </div>
</template>

<script>
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
import HdRecharge from '@/components/hd-recharge'
export default {
  components: {
    HdCard,
    HdCardItem,
    HdRecharge
  },
  data() {
    return {
      noData: false,
      noDataMap: {
        tip: '商户暂未开启包月支付'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.monthly-package {
  min-height: 100vh;
  .content {
    min-height: 100vh;
    overflow: hidden;
    header {
      position: relative;
      color: rgba(255, 255, 255, 0.6);
      &::after {
        content: '';
        position: absolute;
        left: -100vw;
        right: -100vw;
        bottom: -40px;
        height: 300vw;
        z-index: -1;
        background-color: #07c160;
        border-radius: 50%;
      }
    }
    main {
      min-height: 30vh;
    }
  }
}
</style>
