<template>
    <div>
        <div class="padding-x-3 d-flex justify-content-between align-items-center p-title">
            <div class="text-size-default">请选择充电插座</div>
            <ul class="port-status d-flex justify-content-end">
                <li class="port-status-item d-flex justify-content-end align-items-center margin-right-2" v-for="num in 3" :key="num">
                    <div class="port-status-color d-inline-block margin-right-1" :class="[num == 2 ? 'use' : (num == 3 || num == 4) ? 'fi' : '']"></div>
                    <div class="port-status-text text-999">{{num == 2 ? '占用' : num == 3 ? '故障' : '空闲'}}</div>
                </li>
            </ul>
        </div>
        <ul class="port-list d-flex flex-wrap padding-x-3 padding-y-4">
            <li
                class="port position-relative"
                :class="[item.port == selectPort ? 'active' : item.portStatus == 2 ? 'use' : (item.portStatus == 3 || item.portStatus == 4) ? 'fi' : '']"
                v-for="item in list"
                :key="item.port"
                @click="handleSelectPort(item)"
            >
                <div class="position-absolute port-content d-flex justify-content-center align-items-center text-success">{{item.port}}号</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        list: { // 端口列表
            type: Array,
            default: () => []
        },
        selectPort: { // 选择的端口
            type: Number,
            default: -1
        }
    },
    methods: {
        // 选择端口
        handleSelectPort (item) {
            this.$emit('selectPortBack', { ...item, port: Number(item.port), portStatus: Number(item.portStatus) })
        }
    }
}
</script>

<style lang="scss">
.use {
    background-color: #E8090A;
}
.fi {
    background-color: #a6a6a6;
}
.p-title {
        .port-status {
            margin-right: -10px;
            .port-status-color {
                width: 16px;
                height: 16px;
                vertical-align: middle;
                border-radius: 3px;
                -moz-box-shadow: 0 0 3px #666;
                -webkit-box-shadow: 0 0 3px #666;
                box-shadow: 0 0 3px #666;
            }
        }
    }
.port-list .port {
  width: 18%;
  padding-top: 18%;
  margin-right: 2.5%;
  margin-bottom: 2.5%;
  border-radius: 6px;
  box-shadow: 1.5px 1.5px 5px #ccc;
}
.port-list .port:nth-of-type(5n){
  margin-right: 0;
}
.port-list .port .port-content {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 18px;
}
.port-list .port.active {
   background-color: #07c160  !important;
}
.port-list .port.active .port-content {
  color: #FFFFFF !important;
}

.port-list .port.use {
  background-color: #D43024 !important;
}
.port-list .port.use .port-content {
  color: #FFFFFF !important;
}

.port-list .port.fi {
  background-color: #A6A6A6 !important;
}
.port-list .port.fi .port-content {
  color: #FFFFFF !important;
}
</style>
