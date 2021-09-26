<template>
  <van-overlay :show="show" @click="handleClose(1)" :style="{zIndex: 20000}">
    <div class="wrapper">
        <div class="block rounded-md position-relative text-333" @click.stop>
            <h3 class="text-center margin-bottom-3 text-size-default" v-if="!!title">{{title}}</h3>
            <slot></slot>
            <div class="hd-overlay-close position-absolute" @click="handleClose(2)" v-if="bottomClose">
                <van-icon name="close" size="30px" class="text-white" />
            </div>
        </div>
    </div>
    </van-overlay>
</template>

<script>
export default {
    props: {
        show: { // 是否展示组件
            type: Boolean,
            default: false
        },
        bottomClose: { // 底部的关闭图标是否展示
            type: Boolean,
            default: true
        },
        title: {
            type: String
        }
    },
   methods: {
       handleClose (from) {
           if (this.bottomClose && from === 1) return false
           this.$emit('close')
       }
   }
}
</script>

<style lang="scss">
 .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .hd-overlay-close {
        left: 50%;
        bottom: -10px;
        transform: translate(-50%, 100%)
    }
  }

  .block {
    padding: 20px;
    width: 60vw;
    background-color: #fff;
  }
</style>
