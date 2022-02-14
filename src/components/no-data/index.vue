<template>
  <div class="no-data d-flex flex-column align-items-center justify-content-center" v-if="isShow">
    <img :src="imgUrl" alt="no-data">
    <p class="text-p text-size-md margin-top-2">{{tip}}</p>
  </div>
</template>

<script>
export default {
  props: {
    imgPath: {
      type: String,
      default: require('@/assets/images/no_data.png')
    },
    tip: {
      type: String,
      default: '暂无数据'
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgUrl () {
      return this.imgPath || require('@/assets/images/no_data.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  [alt="no-data"] {
    width: 50%;
  }
}
</style>
