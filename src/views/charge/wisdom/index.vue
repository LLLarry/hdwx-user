<template>
    <div class="wisdom">
        <!-- 顶部区域 -->
        <Header :code="code" :areaname="areaname" :serverPhone="serverPhone" :chargeTip="chargeTip"></Header>
        <main class="padding-top-2">
            <select-port :list="portList" :selectPort="selectPort" @selectPortBack="handleSelectPort" />
        </main>
        <van-popup
            v-model="show"
            position="bottom"
            duration=".4s"
            :style="{ bottom: '2.133rem' }"
            :overlay-style="{ height: 'calc(100% - 2.133rem)'}"
            @open="level = true"
            @closed="level = false"
        >
            <div class="padding-bottom-3">
                <!-- 选择插座提示 -->
                <div class="padding-y-3 padding-x-3">
                    <select-port-tip :selectPort="selectPort" />
                </div>
                <!-- 选择模板列表 -->
                <div class="padding-x-3">
                    <select-temp :list="templatelist" :selectId="selectTempId" @selectChargeTemp="selectChargeTemp" />
                </div>
                <hd-line />
                <!-- 选择支付方式列表 -->
                <select-paytype :list="selectPaytype" :select="selectPayTypeNum" @selectPayTypeBack="selectPayTypeBack">
                    <template v-slot:default="{data}">
                        <span
                        class="text-size-sm text-p"
                        v-if="
                            typeof data !== 'string'
                        ">（{{data.slot}}）</span>
                    </template>
                </select-paytype>
            </div>
        </van-popup>
        <!-- 底部区域 -->
        <Footer :level="level" @goCharge="goCharge">
            {{chargePayTip}}
        </Footer>
        <!-- 收费说明提示挂载元素 -->
        <div id="charge-tip" />
    </div>
</template>

<script>
import Header from '@/components/charge/header'
import Footer from '@/components/charge/footer'
import selectPort from '@/components/charge/select-port'
import selectPortTip from '@/components/charge/select-port-tip'
import selectTemp from '@/components/charge/select-temp'
import selectPaytype, { paytypeMap } from '@/components/charge/select-paytype'
import { verification, fmtMoney } from '@/utils/util'
import { deviceCharge } from '@/require/charge'
// import { toast } from '@/utils/vant'
export default {
    components: {
        Header,
        selectPort,
        Footer,
        selectPaytype,
        selectTemp,
        selectPortTip
    },
    data () {
        return {
            code: '000130',
            serverPhone: '',
            areaname: '',
            title: '智慧款充电', // title
            chargeTip: {
                chargeInfo: null, // 收费标准
                payhint: '' // 收费说明，下次不再提醒是否展示
            },
            portList: [
                { port: 1, portStatus: 1 },
                { port: 2, portStatus: 1 },
                { port: 3, portStatus: 1 },
                { port: 4, portStatus: 1 },
                { port: 5, portStatus: 1 },
                { port: 6, portStatus: 1 },
                { port: 7, portStatus: 1 },
                { port: 8, portStatus: 1 },
                { port: 9, portStatus: 1 },
                { port: 10, portStatus: 1 }
            ],
            selectPort: -1, // 选中的端口号
            show: false,
            templatelist: [],
            selectTempId: -1, // 选中充电模板id
            selectPaytype: ['微信支付', '钱包支付'/* , { title: '包月支付', slot: '123456' } */],
            selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
            level: false // footer的层级
        }
    },
    computed: {
        // 充电支付提示
        chargePayTip () {
            let money = 0
            if (this.templatelist.length <= 0 || this.selectTempId < 0) {
                money = 0
            } else {
                money = this.templatelist.find(({ id }) => id === this.selectTempId).money
            }
            console.log(money)
            return `支付金额：${fmtMoney(money)}元`
        }
    },
    mounted () {
        this.getInitData({
            code: '000131',
            openid: 'oxdP_5vySWLZg8hkDzc4YcrzIiWA'
        })
    },
    methods: {
        handleSelectPort ({ port, portStatus }) {
            this.show = true
            if (portStatus === 3 || portStatus === 4) {
                this.toast('此端口被占用')
            } else if (portStatus === 1) { // 空闲端口
                this.selectPort = Number(port)
            } else { // 使用端口

            }
        },
        // 设置支付方式
        selectPayTypeBack (num) {
            this.selectPayTypeNum = num
        },
        // 设置选中的充电模板
        selectChargeTemp ({ id }) {
            this.selectTempId = id
        },
        async getInitData (data) {
            try {
                const { code, message, portStatus, templatelist, servephone, areaname, brandname, tourtopupbalance, touristsendbalance, chargeInfo, payhint, ifmonth, defaultindex, packageMonth = {} } = await deviceCharge(data)
                if (code === 200) {
                    this.portList = portStatus
                    this.templatelist = templatelist
                    this.serverPhone = servephone
                    this.areaname = areaname
                    this.title = brandname
                    this.chargeTip = {
                        chargeInfo, // 收费标准
                        payhint // 收费说明，下次不再提醒是否展示
                    }
                    this.selectTempId = templatelist[defaultindex].id
                    // 设置支付方式
                    if (Number(ifmonth) === 1) {
                        const { surpnum = 0, todaysurpnum = 0 } = packageMonth
                        this.selectPaytype = ['微信支付', { title: '钱包支付', slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(touristsendbalance)}` }, { title: '包月支付', slot: `总剩余：${surpnum}次， 今日剩余: ${todaysurpnum}次` }]
                    } else {
                        this.selectPaytype = ['微信支付', { title: '钱包支付', slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(touristsendbalance)}` }]
                    }
                } else {
                    this.alert(message).then(() => {
                        wx.closeWindow()
                    })
                }
                // if (a === 2) {}
            } catch (error) {
                this.alert('异常错误').then(() => {
                    wx.closeWindow()
                })
            }
        },
        // 校验
        verifi () {
            const verifiList = [
                {
                    verifi: this.selectPort > 0,
                    content: '请先选择充电端口'
                },
                {
                    verifi: this.selectTempId >= 0,
                    content: '请先选择充电模板'
                },
                {
                    verifi: this.selectPayTypeNum > 0,
                    content: '请先选择支付方式'
                }
            ]
            return verification(verifiList)
        },
        // 开始充电
        goCharge () {
            this.verifi()
        }
    }
}
</script>

<style lang="scss">
.wisdom {
    padding-top: 115px;
}
</style>
