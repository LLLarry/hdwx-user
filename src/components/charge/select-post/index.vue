<template>
    <ul class="select-post d-flex flex-wrap">
        <li
            class="select-post-item border-1 border-success text-center margin-bottom-3 text-size-default text-success"
            :class="{ active: selectIndex === index }"
            v-for="(item, index) in list"
            :key="index"
            @click="handleSelect(item, index)"
        >
            <slot v-bind:data="item"></slot>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        list: { // 遍历list
            type: Array,
            default: () => []
        },
        selectIndex: { // 选中索引
            type: Number
        }
    },
    methods: {
        handleSelect (item, index) {
            this.$emit('selectPostBack', [item, index])
        }
    }
}
</script>

<style scoped lang="scss">
.select-post {
    margin-bottom: -15px;
    .select-post-item {
        width: 44%;
        margin-left: 4%;
        line-height: 52px;
        border-radius: 5px;
        transition: all .3s ease-in-out;
        &.active {
            background: #07c160;
            color: #fff !important;
        }
    }
}
</style>
