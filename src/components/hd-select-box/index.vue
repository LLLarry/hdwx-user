<template>
  <div>
    <slot v-if="title" name="title">
      <hd-title>
        {{ title }}
      </hd-title>
    </slot>
    <div class="select-box d-flex flex-wrap">
      <slot>
        <hd-select-box-item
          v-for="item in list"
          :key="item.text"
          :value="item"
          :selected="selected"
          @onChange="handlePayTypeChange(item)"
        >
          {{ item.text }}
        </hd-select-box-item>
      </slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import HdSelectBoxItem from '@/components/hd-select-box-item'
export default defineComponent({
  components: {
    HdSelectBoxItem
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    selected: {
      type: [String, Number]
    },
    title: {
      type: String
    }
  },
  setup(props, { emit }) {
    const handlePayTypeChange = item => {
      emit('comfirm', item)
    }
    return {
      handlePayTypeChange
    }
  }
})
</script>
