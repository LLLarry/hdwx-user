<template>
  <div class="hd-popup">
    {{ show }}
    <van-popup
      v-model="show"
      class="popup padding-2 border-box w-75 rounded-md overflow-auto"
    >
      <slot />
    </van-popup>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'show'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="scss">
.hd-popup {
  .popup {
    /* max-height: 60vh; */
  }
}
</style>
