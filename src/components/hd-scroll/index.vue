<template>
  <div class="wrapper-scroll position-relative" ref="wrapper-scroll">
      <slot></slot>
  </div>
</template>

<script>
import HdScroll from './hd-scroll'
export default {
    data () {
        return {
            hdScroll: null
        }
    },
    mounted () {
        this.hdScroll = new HdScroll(this.$refs['wrapper-scroll'])
        this.$emit('getScroll', {
            scroll: this.hdScroll,
            ...this.$attrs
        })
        if (this.hdScroll !== null) {
            this.hdScroll.on('pullingUp', () => {
                this.$emit('pullingUpFn', {
                    scroll: this.hdScroll,
                    ...this.$attrs
                })
            })
        }
    },
    methods: {

    }
}
</script>

<style>
.wrapper-scroll {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>
