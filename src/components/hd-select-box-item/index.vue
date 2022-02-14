<template>
    <div
        class="select-box-item text-center rounded margin-bottom-2"
        :class="{active: isActive}"
        @click="handleChange"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object
        },
        selected: {
            type: [String, Number]
        }
    },
    computed: {
        isActive () {
            return this.selected === this.value.value
        }
    },
    methods: {
        handleChange () {
            if (!this.isActive) {
                this.$emit('onChange', this.value)
            }
            this.$emit('onSelect', this.value)
        }
    }
}
</script>

<style lang="scss">
.select-box-item {
    width: 31%;
    margin-right: 3.5%;
    background: #F8F8F8;
    height: 35px;
    line-height: 35px;
    &:nth-child(3n) {
        margin-right: 0;
    }
    &.active {
        // background: #EBF1FF;
        background: #dff9eb;
        // color: #1989fa;
        color: #07c160;
    }
}
</style>
