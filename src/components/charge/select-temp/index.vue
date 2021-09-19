<template>
    <div class="contral-tem">
        <ul class="contral-wrapper d-flex flex-wrap">
            <li
                class="item d-flex justify-content-center align-items-center text-size-md"
                :class="{ active:  selectId === item.id}"
                v-for="item in list"
                :key="item.id"
                @click="$emit('selectChargeTemp', { ...item, type })"
            >{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        list: { // 模板列表
            type: Array,
            default: () => []
        },
        selectId: { // 选中模板的id
            type: Number,
            default: -1
        },
        type: { // 模板类型 time 按时间充电模板， money 按金额充电模板， 不传默认类型模板
            type: String
        }
    }
}
</script>

<style lang="scss">
.contral-wrapper .item{
  width: 30%;
  height: 40px;
  border: 1px solid #ccc;
  margin-right: 5%;
  box-sizing: border-box;
  margin-bottom: 3%;
  border-radius: 3px;
  transition: .3s;
}
.contral-wrapper .item.active {
  border-color: #07c160;
  background-color: #07c160;
  color: #FFFFFF;
}
.contral-wrapper .item:nth-child(3n){
  margin-right: 0;
}
</style>
