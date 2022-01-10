<template>
  <div
    class="hd-icon"
    :class="{ [className]: className }"
    :style="style"
  >
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import { getType } from '@/utils/util'
export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number]
    }
  },
  setup ({ icon, size }, context) {
    const className = computed(() => {
      return `icon-${icon}`
    })
    const style = computed(() => {
      const map = {}
      let suffix = false
      if (/\.\w+$/.test(icon)) {
        suffix = true
      }
      const imgUrl = require(`../../assets/images/${icon}${!suffix && '.png'}`)
      map.backgroundImage = `url(${imgUrl})`
      const sizeType = getType(size)
      if (sizeType !== 'undefined') {
        if (sizeType === 'number') {
          size += 'px'
        }
        map.backgroundSize = size
      }
      return map
    })
    return {
      className,
      style
    }
  }
})

</script>

<style lang="scss" scoped>
.hd-icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  background-size: cover;
}
</style>
