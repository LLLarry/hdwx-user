<template>
    <div class="order position-relative bg-gray overflow-hidden">
        <!-- 顶部操作 -->
        <div class="header bg-white shadow position-absolute padding-bottom-1">
            <div class="search-form d-flex justify-content-between align-items-center">
                <van-search
                    class="flex-1"
                    v-model="ordernum"
                    placeholder="请输入订单编号"
                />
                <van-button type="default" class="search-btn margin-left-2 text-success" @click="searchOrder">搜索</van-button>
            </div>
            <div class="d-flex justify-content-between align-items-center padding-x-3 padding-y-2">
                <div @click="showCalendar = !showCalendar" class="d-flex align-items-center"><span>查询日期</span> <van-icon name="arrow-down" /></div>
                <div @click="showCalendar = !showCalendar">{{searchTime.startTime}} ~ {{searchTime.endTime}}</div>
                <div class="text-success" @click="slideMenuIsShow=!slideMenuIsShow">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </div>
        <!-- 顶部操作 -->

        <!-- 选择日期区间 -->
        <van-calendar
            v-model="showCalendar"
            type="range"
            :min-date="new Date('2018-01-01')"
            :max-date="new Date()"
            :default-date="[new Date(searchTime.startTime), new Date(searchTime.endTime)]"
            color="#07c160"
            @confirm="onConfirmCalendar"
        />

        <main>
            <hd-scroll @pullingUpFn = "pullingUpFn" @getScroll="({ scroll }) => this.scroll = scroll">
                <div class="padding-y-3">
                    <div
                        class="record-card position-relativetext-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white"
                        v-for="item in list" :key="item.id"
                    >
                        <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
                            <div class="top-title flex-1 d-flex justify-content-between align-items-center padding-bottom-2">
                                <div class="">
                                    <div class="font-weight-bold text-666 text-size-md card-num ">
                                       交易金额：<span class="text-666">&yen; {{ item.paymoney | fmtMoney }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hd-card class="padding-2 text-size-sm">
                            <hd-card-item class="">
                                <span class="card-item-title text-333">订单号：</span>
                                <span class="card-item-content text-666">{{ item.ordernum }}</span>
                            </hd-card-item>

                            <hd-card-item class="">
                                <span class="card-item-title text-333">用户名：</span>
                                <span class="card-item-content text-666">{{ item.username | fmtName}}</span>
                            </hd-card-item>

                            <hd-card-item class="">
                                <span class="card-item-title text-333">设备号：</span>
                                <span class="card-item-content text-666">{{ item.equipmentnum }}-{{ item.port | fmtFill(2, 0) }}</span>
                            </hd-card-item>

                            <hd-card-item class="">
                                <span class="card-item-title text-333">订单状态：</span>
                                <span class="card-item-content text-success" v-if="item.number === 0">正常</span>
                                <span class="card-item-content text-danger" v-else-if="item.number === 1">全额退款</span>
                                <span class="card-item-content text-warning" v-if="item.number === 2">部分退款</span>
                            </hd-card-item>

                            <hd-card-item class="">
                                <span class="card-item-title text-333">支付方式：</span>
                                <span class="card-item-content text-666">{{ item.paytype | fmtPayType }}</span>
                            </hd-card-item>

                            <hd-card-item class="">
                                <span class="card-item-title text-333">开始时间：</span>
                                <span class="card-item-content text-666">{{ item.begintime | fmtName }}</span>
                            </hd-card-item>
                            <hd-card-item class="">
                                <span class="card-item-title text-333">结束时间：</span>
                                <span class="card-item-content text-666">{{ item.endtime | fmtName }}</span>
                            </hd-card-item>
                        </hd-card>
                    </div>
                    <hd-bottom :status="status" />
                </div>
            </hd-scroll>
        </main>
    </div>
</template>
<script>
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
import hdScroll from '@/components/hd-scroll'
import hdBottom from '@/components/hd-bottom'
import { fmtDate, dateRange } from '@/utils/util'
const LIMIT = 10
export default {
    data () {
        const range = dateRange(new Date(), 30, 'YYYY/MM/DD')
        return {
            code: '',
            scroll: null,
            currentPage: 1,
            ordernum: '',
            slideMenuIsShow: false, // 侧边菜单是否显示
            showCalendar: false,
            searchTime: {
                startTime: range[0],
                endTime: range[1]
            },
            list: [],
            status: 1, // 0 正在加载中 1 空闲状态 2 暂无更多数据
            searchForm: {} // 搜索form
        }
    },
    mounted () {
        // 初始化数据
        this.code = this.$route.params.code
        this.searchForm = {
            ...this.searchTime
        }
        this.gatDeviceOrder(this.searchForm, true)
    },
    components: {
        hdCard,
        hdCardItem,
        hdScroll,
        hdBottom
    },
    methods: {
        // 确认选择日期
        onConfirmCalendar ([startDate, endDate]) {
            const startTime = fmtDate(startDate, 'YYYY/MM/DD')
            const endTime = fmtDate(endDate, 'YYYY/MM/DD')
            this.searchTime = {
                startTime,
                endTime
            }
            this.showCalendar = false
            this.searchForm = {
                // ordertype: this.selectOrderType,
                ...this.searchTime
            }
            this.gatDeviceOrder(this.searchForm, true)
        },
        async gatDeviceOrder (data, init = false) {
            if (init) {
               this.currentPage = 1
            } else {
                ++this.currentPage
            }
            try {
                this.status = 0
                const { code, message, ...result } = await inquireDeviceOrderData({
                    ...data,
                    currentPage: this.currentPage,
                    code: this.code,
                    limit: LIMIT
                })
                if (code === 200) {
                    // 判断是否是初始化，如果是初始化那么重新赋值，非初始化，再尾部追加值
                    // eslint-disable-next-line no-debugger
                    if (init) {
                        this.list = result.chargeList
                    } else {
                        this.list = [...this.list, ...result.chargeList]
                    }
                    // 更改状态，看是否还有数据
                    if (result.chargeList.length >= LIMIT) {
                        this.status = 1
                    } else {
                        this.status = 2
                    }
                } else {
                    this.$toast(message)
                }
            } catch (e) {
                this.$toast('异常错误')
            } finally {
                if (this.scroll) {
                    if (init) {
                        // 初始化加载的时候刷新滚动对象，并滚动到起始位置
                        this.scroll.refresh()
                        this.scroll.scrollTo(0, 0, 0, undefined, {})
                        this.scroll.finishPullUp()
                    } else {
                        // 非初始化加载完成的时候完成上啦加载操作
                        this.scroll.finishPullUp()
                    }
                }
            }
        },
        // 触发上啦加载
        pullingUpFn ({ scroll }) {
            // 当请求空闲的时候发送请求
            if (this.status === 1) {
                this.gatDeviceOrder(this.searchForm)
            }
        },
        // 搜索订单号
        searchOrder () {
            this.searchForm = { ordernum: this.ordernum } // 搜索表单初始化
            this.gatDeviceOrder(this.searchForm, true)
        },
        // 筛选搜索
        // filterSearch () {
        //     // 将搜索订单号条件置为空
        //     this.ordernum = undefined
        //     // 搜索条件中添加筛选类型和时间
        //     this.searchForm = {
        //         ordertype: this.selectOrderType,
        //         ...this.searchTime
        //     }
        //     // 发送请求
        //     this.gatDeviceOrder(this.searchForm, true)
        //     this.slideMenuIsShow = false
        // },
        // 筛选重置
        filterReset () {
            // this.selectOrderType = 1
            this.searchForm = {
                // ordertype: this.selectOrderType,
                ...this.searchTime
            }
            // 发送请求
            this.gatDeviceOrder(this.searchForm, true)
            this.slideMenuIsShow = false
        },
        async handleRefund ({ id, paytype, paysource, ordernum }) {
            this.$dialog.confirm({
                title: '提示',
                message: '确认退费吗？'
            })
            .then(() => {
                this.refundFn(id, paytype)
            })
        },
        // 退费函数
        async refundFn (id, paytype) {
            const refundState = 1 // 1:充电、 2:离线、 3:投币
            let payTypeNum // 支付类型
            const wolfkey = 0
            switch (paytype) {
                case 1: payTypeNum = 3; break
                case 2: payTypeNum = 1; break
                case 3: payTypeNum = 2; break
                case 8: payTypeNum = 6; break
                // case 7: payTypeNum = 6; break
                case 12: payTypeNum = 7; break
            }
            refundUtil(payTypeNum, {
                id,
                refundState,
                pwd: 0,
                utype: 2,
                wolfkey
            })
            .then(res => {
                this.$dialog.alert({
                    title: '提示',
                    message: res
                })
                .then(() => {
                    this.gatDeviceOrder(this.searchForm, true)
                })
            })
            .catch(error => {
                this.$dialog.alert({
                    title: '提示',
                    message: error
                })
            })
        },
        // 撤回
        handleRecall (id) {
            this.$dialog.confirm({
                title: '提示',
                message: '确认撤回部分退费吗？'
            })
            .then(() => {
                recall({
                    id
                })
                .then(() => {
                    this.gatDeviceOrder(this.searchForm, true)
                })
            })
        }
    },
    filters: {
        fmtPayType (value) {
            const name = payTypeToName(value)
            return name ? `${name}支付` : '— —'
        }
    }
}
</script>

<style lang="scss" scoped>
.order {
    height: 100vh;
    .header {
        width: 100%;
        z-index: 9999;
        .search-form {
            width: 100%;
            height: 45px;
            .van-search {
                padding: 0 0.32rem;
                .van-search__action {
                    color: #1989fa;
                }
            }
        }
        .search-btn {
            padding: 10px 0.2rem;
            height: auto;
            border: none;
            color: #1989fa;
            margin-left: -5px;
        }
    }
    .filter-box {
        padding-top: 84px;
        padding-bottom: 74px;
    }
    .filter-bottom {
        bottom: 0;
        left: 0;
        right: 0;
    }
    main {
        padding-top: 84px;
        height: 100vh;
        box-sizing: border-box;
        .record-card {
            .top {
                .top-title {
                    border-bottom: 1px dotted #ccc;
                }
            }
        }
    }
}
</style>
