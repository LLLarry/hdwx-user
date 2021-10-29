<template>
    <div>
        <div class="padding-x-3 d-flex justify-content-between align-items-center p-title">
            <div class="text-size-default">请选择充电插座</div>
            <!-- <ul class="port-status d-flex justify-content-end">
                <li class="port-status-item d-flex justify-content-end align-items-center margin-right-2" v-for="num in 3" :key="num">
                    <div class="port-status-color d-inline-block margin-right-1" :class="[num == 2 ? 'use' : (num == 3 || num == 4) ? 'fi' : '']"></div>
                    <div class="port-status-text text-999">{{num == 2 ? '占用' : num == 3 ? '故障' : '空闲'}}</div>
                </li>
            </ul> -->
        </div>
        <ul class="port-content d-flex flex-wrap padding-x-3 padding-y-3" v-if="list !== null && list.length > 0">
            <li
                class="port-item"
                v-for="item in filterList"
                :key="item.port"
                :class="[ item.port == selectPort ? 'active' : item.portStatus == 2 ? 'use' : (item.portStatus == 3 || item.portStatus == 4) ? 'fi' : '']"
                @click="handleSelectPort(item)"
            >
                <div>
                    <div class="port-num text-center text-success">{{item.port}}号</div>
                    <div class="port-status bg-success text-white text-center text-size-sm">{{
                        item.port == selectPort ? '已选中' : item.portStatus == 2 ? '已占用' : (item.portStatus == 3 || item.portStatus == 4) ? '故障' : '空闲'
                    }}</div>
                </div>
            </li>
        </ul>
        <!-- <ul class="port-list d-flex flex-wrap padding-x-3 padding-y-4" v-if="list !== null && list.length > 0">
            <li
                class="port position-relative"
                v-for="item in filterList"
                :class="[ item.port == selectPort ? 'active' : item.portStatus == 2 ? 'use' : (item.portStatus == 3 || item.portStatus == 4) ? 'fi' : '']"
                :key="item.port"
                @click="handleSelectPort(item)"
            >
                <div class="position-absolute port-content d-flex justify-content-center align-items-center text-success">{{item.port}}号</div>
            </li>
        </ul> -->
    </div>
</template>

<script>
import { getType } from '@/utils/util'
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
    computed: {
        filterList () {
            if (!Array.isArray(this.list)) return []
            return this.list.filter(item => {
                return getType(item) === 'object'
            })
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
.p-title {
    .use {
        background-color: #E8090A;
    }
    .fi {
        background-color: #a6a6a6;
    }
}
.bg-success {
    background-color: #07c160 !important;
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
    .port-content {
        .port-item {
            width: 18%;
            margin-left: 2.5%;
            border: 1px solid #07c160;
            border-radius: 4px;
            box-sizing: border-box;
            margin-bottom: 10px;
            line-height: 1.8;
            &:nth-child(5n-4) {
                margin-left: 0;
            }
            &.use {
                border: 1px solid #E8090A !important;
                .port-num {
                    color: #E8090A !important;
                }
                .port-status {
                    background: #E8090A !important;
                }
            }
            &.fi {
                border: 1px solid #a6a6a6 !important;
                .port-num {
                    color: #a6a6a6 !important;
                }
                .port-status {
                    background: #a6a6a6 !important;
                }
            }
            &.active {
                border: 1px solid #108ee9 !important;
                .port-num {
                    color: #108ee9 !important;
                    background: transparent !important;
                }
                .port-status {
                    color: #ffffff !important;
                    background: #108ee9 !important;
                    /* color: #ffffff !important;
                    background: #07c160; */
                }
            }
        }
    }
</style>
