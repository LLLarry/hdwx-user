<template>
  <van-popup
    :value="slideMenuIsShow"
    position="top"
    @click-overlay="$emit('handleSlideMenuIsShow', false)"
    :style="{ width: '100%', maxHeight: '70%' }"
  >
    <div class="filter-box">
      <hd-select-box
        title="支付类型"
        class="padding-x-3"
        :list="payType"
        :selected="selectPayType"
        @comfirm="val => handleChange('payType', val)"
      />
      <hd-select-box
        title="订单类型"
        class="padding-x-3"
        :list="orderType"
        :selected="selectOrderType"
        @comfirm="val => handleChange('orderType', val)"
      />
    </div>
    <div class="filter-bottom position-absolute d-flex padding-3">
      <van-button type="default" class="flex-1" @click="filterReset"
        >重置</van-button
      >
      <van-button
        type="primary"
        class="flex-2 margin-left-2"
        @click="filterSearch"
        >确定</van-button
      >
    </div>
  </van-popup>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import HdSelectBox from '@/components/hd-select-box'
import HdSelectBoxItem from '@/components/hd-select-box-item'
export default defineComponent({
  components: {
    HdSelectBox,
    HdSelectBoxItem
  },
  model: {
    prop: 'slideMenuIsShow',
    event: 'handleSlideMenuIsShow'
  },
  props: {
    slideMenuIsShow: {
      type: Boolean,
      required: true
    },
    selectPayType: {
      type: [String, Number],
      required: true
    },
    selectOrderType: {
      type: [String, Number],
      required: true
    }
  },
  setup(props, { emit }) {
    // 支付方式
    const payType = [
      { text: '微信支付', value: 1 },
      { text: '支付宝支付', value: 2 },
      { text: '银联支付', value: 3 },
      { text: '投币支付', value: 4 },
      { text: '在线卡支付', value: 5 },
      { text: '离线卡支付', value: 6 },
      { text: '全部', value: '' }
    ]

    // 订单类型
    const orderType = [
      { text: '正常', value: 1 },
      { text: '全额退费', value: 2 },
      { text: '部分退费', value: 3 },
      { text: '全部', value: '' }
    ]
    const handleChange = (type, { text, value }) => {
      if (type === 'payType') {
        emit('update:selectPayType', value)
      } else if (type === 'orderType') {
        emit('update:selectOrderType', value)
      }
    }
    const filterReset = () => {
      emit('update:selectPayType', '')
      emit('update:selectOrderType', '')
    }
    const filterSearch = () => {
      emit('handleSlideMenuIsShow', false)
      emit('confirm')
    }
    return {
      payType,
      // selectPayType,

      orderType,
      // selectOrderType,
      handleChange,

      filterReset,
      filterSearch
    }
  }
})
</script>

<style lang="scss" scoped>
.filter-box {
  padding-top: 94px;
  padding-bottom: 74px;
}
.filter-bottom {
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
