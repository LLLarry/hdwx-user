<template>
  <van-popup
    :value="slideMenuIsShow"
    position="top"
    @click-overlay="$emit('handleSlideMenuIsShow', false)"
    :style="{ width: '100%', maxHeight: '70%' }"
  >
    <div class="filter-box">
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
    selectOrderType: {
      type: [String, Number],
      required: true
    }
  },
  setup(props, { emit }) {
    // 订单类型
    const orderType = [
      { text: '充值订单', value: 2 },
      { text: '消费订单', value: 3 },
      { text: '全部', value: 1 }
    ]
    const handleChange = (type, { text, value }) => {
      if (type === 'orderType') {
        emit('update:selectOrderType', value)
      }
    }
    const filterReset = () => {
      emit('update:selectOrderType', '')
    }
    const filterSearch = () => {
      emit('handleSlideMenuIsShow', false)
      emit('confirm')
    }
    return {
      orderType,
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
