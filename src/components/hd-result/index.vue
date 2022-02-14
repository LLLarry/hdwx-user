<template>
  <div class="hd-result d-flex flex-column align-items-center padding-y-4 padding-x-3">
    <van-icon name="info" size="2rem" class="text-warning" v-if="type === 'warning'"/>
    <van-icon name="clear" size="2rem" class="text-danger" v-else-if="type === 'danger'"/>
    <van-icon name="checked" size="2rem" class="text-success" v-else/>
    <slot name="title" v-if="title">
      <div class="title text-000 margin-top-3 text-size-default">{{title}}</div>
    </slot>
    <slot name="desc" v-if="desc">
      <div class="desc text-p text-size-sm text-center margin-top-2">{{desc}}</div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'success'
    },
    title: {
      type: String
    },
    desc: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.hd-result {
}
</style>
