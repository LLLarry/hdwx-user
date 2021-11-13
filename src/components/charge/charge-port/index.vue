<template>
    <div>
        <div class="padding-x-3 d-flex justify-content-between align-items-center p-title">
            <div class="text-size-default">请选择充电插座</div>
            <div class="d-flex align-items-center text-p">
                <span>更新端口状态</span>
                <!-- <van-icon name="replay" class="text-success padding-x-1" size="0.45rem" /> -->
                <van-popover v-model="showPopover" trigger="click" class="d-flex align-items-center" overlay>
                    <div class="text-size-sm text-666 padding-3">
                        由于网络延迟等原因，可能导致端口状态与实际不符，请点击下方更新按钮，获取最新端口状态
                        <div class="text-center margin-top-2">
                            <van-button type="primary" icon="replay" size="mini" @click="updatePortStatusFn">更新端口状态</van-button>
                        </div>
                    </div>
                    <template #reference>
                        <van-icon name="question-o" class="text-success margin-left-1" size="0.5rem" />
                    </template>
                </van-popover>
            </div>
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
import { updatePortStatusHook } from '@/views/charge/helper'
export default {
    props: {
        list: { // 端口列表
            type: Array,
            default: () => []
        },
        selectPort: { // 选择的端口
            type: Number,
            default: -1
        },
        nowtime: {
            type: [Number, String]
        }
    },
    data () {
        return {
            showPopover: false,
            code: this.$route.query.code,
            addrnum: this.$route.query.addrnum
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
        },
        updatePortStatusFn () {
            if (this.addrnum) {
                this.updatePortStatusForAddr()
            } else {
                this.updatePortStatus()
            }
        },
        // 更新端口状态 v2 v3 设备
        async updatePortStatus () {
            try {
                let portList = JSON.parse(JSON.stringify(this.$parent.$data.portList))
                const map = await updatePortStatusHook({ code: this.code }, false)
                portList = portList.map(portItem => ({ ...portItem, portStatus: map[portItem.port] }))
                this.$parent.$data.portList = portList
            } catch (error) {
                this.toast(error, 'fail')
            } finally {
                this.showPopover = false
            }
            // try {
            //     const portList = JSON.parse(JSON.stringify(this.$parent.$data.portList))
            //     const regexp = /^param(\d+)$/
            //     const code = this.$route.query.code
            //     this.showPopover = false
            //     const map = await portstate1({ code }, '状态更新中')
            //     for (const [key, value] of Object.entries(map)) {
            //         if (regexp.test(key)) {
            //             const port = key.match(regexp)[1]
            //             const row = portList.find(item => Number.parseInt(item.port) === Number.parseInt(port))
            //             if (row) {
            //                 row.portStatus = value === '空闲' ? 1 : value === '使用' ? 2 : value === '故障' ? 3 : 1
            //             }
            //         }
            //     }
            //     this.$parent.$data.portList = portList
            // } catch (error) {
            //     this.toast('异常错误', 'fail')
            // }
        },
        // 更新端口状态 (一拖二设备)
        async updatePortStatusForAddr () {
            try {
                let portList = JSON.parse(JSON.stringify(this.$parent.$data.portList))
                const map = await updatePortStatusHook({
                    code: this.code,
                    addr: this.addrnum,
                    nowtime: this.nowtime
                }, true)
                portList = portList.map(portItem => ({ ...portItem, portStatus: map[portItem.port] }))
                this.$parent.$data.portList = portList
            } catch (error) {
                this.toast(error, 'fail')
            } finally {
                this.showPopover = false
            }
        //    try {
        //         this.showPopover = false
        //         const { code, message, portlist } = await queryAddrAllPortStatus({
        //             code: this.code,
        //             addr: this.addrnum,
        //             nowtime: this.nowtime
        //         })
        //         if (code === 200) {
        //             const portList = JSON.parse(JSON.stringify(this.$parent.$data.portList))
        //             this.$parent.$data.portList = portList.map(item => {
        //                 item.portStatus = portlist[item.port]
        //                 return item
        //             })
        //             this.$toast('更新成功')
        //         } else {
        //             this.$toast(message)
        //         }
        //    } catch (error) {
        //        this.toast('异常错误', { error, vm: this, line: 409 })
        //    }
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
