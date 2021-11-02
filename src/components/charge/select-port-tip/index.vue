<template>
    <div class="d-flex justify-content-between align-items-center p-title">
        <div class="text-size-default text-000">请选择充电模板</div>
        <span class="text-666" v-if="selectPort > 0">已选择充电插座：
            <strong class="text-success text-size-default">{{selectPort}}</strong> 号
        </span>
        <span class="text-666" v-else>
            请选择充电插座
        </span>
    </div>
</template>

<script>
export default {
    props: {
        selectPort: {
            type: [Number, String],
            default: ''
        }
    }
}
</script>
