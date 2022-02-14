<template>
  <div class="charge-record d-flex flex-column">
    <!-- 顶部操作 -->
    <div class="header bg-white shadow padding-bottom-1">
      <div
        class="search-form d-flex justify-content-between align-items-center"
      >
        <van-search
          class="flex-1"
          v-model="searchModel.ordernum"
          placeholder="请输入订单编号"
        />
        <van-button
          type="default"
          class="search-btn margin-left-2 text-success"
          @click="searchOrder"
          >搜索</van-button
        >
      </div>
      <div
        class="d-flex justify-content-between align-items-center padding-x-3 padding-y-2"
      >
        <div
          @click="showCalendar = !showCalendar"
          class="d-flex align-items-center"
        >
          <span>查询日期</span> <van-icon name="arrow-down" />
        </div>
        <div @click="showCalendar = !showCalendar">
          {{ timeModel.startTime }} ~ {{ timeModel.endTime }}
        </div>
        <div class="text-success" @click="slideMenuIsShow = !slideMenuIsShow">
          筛选<i class="iconfont icon-shaixuan margin-left-1"></i>
        </div>
      </div>
    </div>
    <!-- 顶部操作 -->

    <!-- 内容区域 -->
    <main class="flex-1 bg-gray">
      <hd-card
        class="text-size-sm margin-x-2 rounded-md shadow-md bg-white padding-2 margin-top-2 text-666"
        v-for="item in 10"
        :key="item"
      >
        <hd-card-item class="w-100 title-one">
          <span>消费金额：</span>
          <span class="text-success font-weight-bold"
            >&yen; <span class="text-size-default">2.00</span></span
          >
          <div class="float-right d-flex tag-status" type="warning">
            <span>部分退费</span>
            <span>（退0.02元）</span>
          </div>
        </hd-card-item>
        <hd-card-item>
          <span>订单编号：</span>
          <span>202001051458408953028641</span>
        </hd-card-item>
        <hd-card-item>
          <span>支付金额：</span>
          <span>&yen; 2.00</span>
        </hd-card-item>
        <hd-card-item>
          <span>支付方式：</span>
          <span>钱包支付</span>
        </hd-card-item>
        <hd-card-item>
          <span>设备信息：</span>
          <span>302864-01</span>
        </hd-card-item>
        <hd-card-item>
          <span>设备名称：</span>
          <span>测试1</span>
        </hd-card-item>
        <hd-card-item>
          <span>小区名称：</span>
          <span>和动测试</span>
        </hd-card-item>
        <hd-card-item>
          <span>充电时长：</span>
          <span>240分钟</span>
        </hd-card-item>
        <hd-card-item>
          <span>开始时间：</span>
          <span>2022-01-05 14:58:41</span>
        </hd-card-item>
        <hd-card-item>
          <span>结束时间：</span>
          <span>2022-01-05 14:58:41</span>
        </hd-card-item>
      </hd-card>
    </main>
    <!-- 内容区域 -->

    <!-- 选择日期区间 -->
    <van-calendar
      v-model="showCalendar"
      type="range"
      :min-date="new Date('2018-01-01')"
      :max-date="new Date()"
      :default-date="[
        new Date(timeModel.startTime),
        new Date(timeModel.endTime)
      ]"
      color="#07c160"
      @confirm="onConfirmCalendar"
    />

    <!-- 侧边操作 -->
    <slider-menu
      v-model="slideMenuIsShow"
      v-bind.sync="slideMenuModel"
      @confirm="sliderMenuConfirm"
    />
    <!-- 侧边操作 -->
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import SliderMenu from './components/slider-menu'
import { dateRange, fmtDate } from '@/utils/util'
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
export default defineComponent({
  components: {
    SliderMenu,
    HdCard,
    HdCardItem
  },
  setup() {
    const [startTime, endTime] = dateRange(new Date(), 30, 'YYYY-MM-DD')
    // 搜索容器
    const searchModel = ref({})
    // 是否显示日期
    const showCalendar = ref(false)
    // 是否显示menu菜单
    const slideMenuIsShow = ref(false)
    // 搜索订单
    const searchOrder = () => {
      getList({
        ordernum: searchModel.value.ordernum
      })
    }
    // 选择日期
    const onConfirmCalendar = val => {
      timeModel.value.startTime = fmtDate(val[0], 'YYYY-MM-DD')
      timeModel.value.endTime = fmtDate(val[1], 'YYYY-MM-DD')
      showCalendar.value = false
      searchModel.value.ordernum = ''
      getList({
        ...timeModel.value,
        ...slideMenuModel.value
      })
    }
    // 侧边菜单提交
    const sliderMenuConfirm = () => {
      searchModel.value.ordernum = ''
      getList({
        ...timeModel.value,
        ...slideMenuModel.value
      })
    }
    const timeModel = ref({
      startTime,
      endTime
    })
    const slideMenuModel = ref({
      selectPayType: '',
      selectOrderType: ''
    })
    const getList = data => {
      console.log(data)
    }
    return {
      searchModel,
      showCalendar,
      slideMenuIsShow,
      searchOrder,
      onConfirmCalendar,
      slideMenuModel,
      timeModel,
      sliderMenuConfirm
    }
  }
})
</script>

<style lang="scss" scoped>
.charge-record {
  height: 100vh;
  .search-btn {
    border: none;
  }
  .header {
    z-index: 9999;
    left: 0;
    top: 0;
    right: 0;
    position: absolute;
  }
  main {
    padding-top: 98px;
    overflow: auto;
    .title-one {
      border-bottom: 1px dotted #ddd;
    }
    .tag-status {
      background: rgba(47, 167, 69, 0.1);
      padding: 3px 12px;
      border-radius: 22px;
      color: rgba(47, 167, 69, 1);
      &[type='warning'] {
        background: rgba(255, 193, 7, 0.1);
        color: rgba(255, 193, 7, 1);
      }
      &[type='danger'] {
        background: rgba(220, 53, 69, 0.1);
        color: rgba(220, 53, 69, 1);
      }
    }
  }
}
</style>
