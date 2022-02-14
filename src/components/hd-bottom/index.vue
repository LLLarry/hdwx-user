<template>
    <div
        class="text-center padding-bottom-3 padding-top-3 text-666"
    >
        {{ status === 2 ? '暂无更多数据' : '正在加载更多' }}
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type: Number,
            default: 1 // 0 正在加载中 1 空闲状态 2 更多数据
        }
    }
}
</script>
