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
      <hd-scroll @pullingUpFn="pullingUpFn" @getScroll="getScroll">
        <div>
          <hd-card
            class="text-size-sm margin-x-2 rounded-md shadow-md bg-white padding-2 margin-top-2 text-666"
            v-for="item in list"
            :key="item.id"
          >
            <hd-card-item class="w-100 title-one">
              <span>操作金额：</span>
              <span
                class="text-success font-weight-bold"
                v-if="item.consumetype === 1"
                >&yen;
                <span class="text-size-default">{{
                  item.opermoney | fmtMoney
                }}</span></span
              >
              <span class="text-danger font-weight-bold" v-else
                >&yen;
                <span class="text-size-default">{{
                  item.opermoney | fmtMoney
                }}</span></span
              >
            </hd-card-item>
            <hd-card-item>
              <span>订单编号：</span>
              <span>{{ item.ordernum }}</span>
            </hd-card-item>
            <hd-card-item>
              <span>充值金额：</span>
              <span
                :class="[
                  item.consumetype === 1 ? 'text-success' : 'text-danger'
                ]"
                >{{ item.opertopupmney | fmtMoney }}</span
              >
            </hd-card-item>
            <hd-card-item>
              <span>赠送金额：</span>
              <span
                :class="[
                  item.consumetype === 1 ? 'text-success' : 'text-danger'
                ]"
                >{{ item.opersendmoney | fmtMoney }}</span
              >
            </hd-card-item>
            <hd-card-item>
              <span>充值余额：</span>
              <span>{{ item.topupbalance | fmtMoney }}</span>
            </hd-card-item>
            <hd-card-item>
              <span>赠送余额：</span>
              <span>{{ item.sendbalance | fmtMoney }}</span>
            </hd-card-item>
            <hd-card-item>
              <span>订单来源：</span>
              <span>{{
                item.paysource === 1
                  ? '充值钱包'
                  : item.paysource === 2
                  ? '钱包充电'
                  : item.paysource === 3
                  ? '钱包模拟投币'
                  : item.paysource === 4
                  ? '钱包充值离线卡'
                  : item.paysource === 5
                  ? '退款到钱包'
                  : item.paysource === 6
                  ? '钱包退款'
                  : item.paysource === 7
                  ? '虚拟充值钱包'
                  : item.paysource === 8
                  ? '钱包虚拟退款'
                  : item.paysource === 9
                  ? '在线卡关联钱包记录'
                  : '未知'
              }}</span>
            </hd-card-item>
            <hd-card-item>
              <span>记录时间：</span>
              <span>{{ item.create_time }}</span>
            </hd-card-item>
          </hd-card>
        </div>
      </hd-scroll>
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
import HdScroll from '@/components/hd-scroll'
import { getWalletRecordInfo } from '@/require/admin'
export default defineComponent({
  components: {
    SliderMenu,
    HdCard,
    HdCardItem,
    HdScroll
  },
  setup(props, { root }) {
    const dealid = root._route.query.dealid
    const aid = root._route.query.aid
    const limit = 10
    const currentPage = ref(1)
    const [startTime, endTime] = dateRange(new Date(), 360, 'YYYY-MM-DD')
    // 搜索容器
    const searchModel = ref({})
    // 是否显示日期
    const showCalendar = ref(false)
    // 是否显示menu菜单
    const slideMenuIsShow = ref(false)
    const list = ref([])
    const scroll = ref(null)
    // 0 正在加载中 1 空闲状态 2 暂无更多数据
    const status = ref(1)
    // 保存 scroll 实例
    const getScroll = ({ scroll: sc, index }) => {
      scroll.value = sc
    }
    // 搜索订单
    const searchOrder = () => {
      currentPage.value = 1
      getList({
        ordernum: searchModel.value.ordernum
      })
    }
    // 上啦触底回调
    const pullingUpFn = ({ scroll }) => {
      if (status.value !== 2) {
        currentPage.value++
        getList({
          ...timeModel.value,
          ...slideMenuModel.value
        })
      }
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
      selectOrderType: 1
    })
    const getList = async (data = {}) => {
      const { selectOrderType: ordertype, ...source } = data
      if (status.value !== 1) {
        return false
      }
      status.value = 0
      const { recordInfo } = await getWalletRecordInfo({
        dealid,
        aid,
        limit,
        currentPage: currentPage.value,
        ordertype,
        ...source
      })
      if (recordInfo.length < list) {
        status.value = 2
      } else {
        status.value = 1
      }
      if (currentPage.value === 1) {
        list.value = recordInfo
      } else {
        list.value = [...list.value, ...recordInfo]
      }
    }
    getList(timeModel.value)
    return {
      searchModel,
      showCalendar,
      slideMenuIsShow,
      searchOrder,
      onConfirmCalendar,
      slideMenuModel,
      timeModel,
      sliderMenuConfirm,
      getScroll,
      pullingUpFn,
      list
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
