<template>
    <div class="wisdom">
        <!-- 顶部区域 -->
        <Header
            :code="code"
            :areaname="areaname"
            :serverPhone="serverPhone"
            :chargeTip="chargeTip"
            :isPort="isPort"
            :uid="uid"
            @openOrClose="openOrClose"
            ref="header"
        ></Header>
        <main class="padding-top-2">
        </main>
        <van-popup
            v-model="show"
            position="bottom"
            duration=".4s"
            :overlay="false"
            :style="{ bottom: '2.133rem', maxHeight: 'calc(80vh - 2.133rem)', 'box-shadow' : `${isPort ? '0 -0.0533rem 0.32rem rgba(100, 101, 102, 0.24)' : 'none'}`}"
            :overlay-style="{ height: 'calc(100% - 2.133rem)'}"
            @open="level = true"
            @closed="closed"
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

                <!-- 温馨提示 -->
                <warm-tip :openid="openid" :aid="aid" :merid="merid" />
            </div>
        </van-popup>
        <!-- 底部区域 -->
        <Footer :level="level" @goCharge="goCharge">
            {{chargePayTip}}
        </Footer>
        <!-- 收费说明提示挂载元素 -->
        <div id="charge-tip" />
        <!-- 钱包余额不足提示 -->
        <charge-overlay ref="chargeOverlay" :money="tourtopupbalance" :sendmoney="touristsendbalance" :url="walletRechargeUrl"></charge-overlay>
        <!-- 用户钱包列表 -->
        <wallet-list ref="walletList" />
    </div>
</template>

<script>
import Header from '@/components/charge/header'
import Footer from '@/components/charge/footer'
import selectPortTip from '@/components/charge/select-port-tip'
import selectTemp from '@/components/charge/select-temp'
import warmTip from '@/components/charge/warm-tip'
import chargeOverlay from '@/components/charge/charge-overlay'
import selectPaytype, { paytypeMap } from '@/components/charge/select-paytype'
import walletList from '@/components/charge/wallet-list'
import { verification, fmtMoney } from '@/utils/util'
import { deviceCharge, walletChargePay } from '@/require/charge'
import { wxPayFun, verifiUserIfCharge, moneylyPayFun } from '../helper.js'
export default {
    components: {
        Header,
        Footer,
        selectPaytype,
        selectTemp,
        selectPortTip,
        chargeOverlay,
        warmTip,
        walletList
    },
    data () {
        return {
            isPort: true, // 是否是扫端口页面
            code: '',
            openid: '',
            serverPhone: '',
            areaname: '',
            titleText: '智慧款充电', // titleText
            orderid: '', // 续充订单的订单id
            aid: '', // 设备所属小区id
            merid: '', // 设备所属商户id
            uid: '', // 用户id
            walletid: '', // 钱包id
            touraid: '', // 用户所属小区id
            tourtopupbalance: 0, // 充值金额
            touristsendbalance: 0, // 赠送金额
            chargeTip: {
                chargeInfo: null, // 收费标准
                payhint: '' // 收费说明，下次不再提醒是否展示
                // defaultShow: true // 默认充电提示是否显示
            },
            selectPort: -1, // 选中的端口号
            show: false,
            templatelist: [],
            selectTempId: -1, // 选中充电模板id
            selectPaytype: ['微信支付', '钱包支付'/* , { title: '包月支付', slot: '123456' } */],
            selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
            level: false, // footer的层级
            walletRechargeUrl: '' // 钱包充值跳转路径
        }
    },
    computed: {
        // 充电支付提示
        chargePayTip () {
            let money = 0
            if (this.selectPort < 0) {
                return '请先选择充电端口'
            } else if (this.templatelist.length <= 0 || this.selectTempId < 0) {
                money = 0
            } else {
                money = this.templatelist.find(({ id }) => id === this.selectTempId).money
            }
            return `支付金额：${fmtMoney(money)}元`
        }
    },
    mounted () {
        const { code, openid, port = -1 } = this.$route.query
        this.code = code
        this.openid = openid
        this.selectPort = Number(port)
        this.getInitData({
            code,
            openid
        })
    },
    methods: {
        // 设置支付方式
        selectPayTypeBack (num) {
            this.selectPayTypeNum = num
        },
        // 设置选中的充电模板
        selectChargeTemp ({ id }) {
            this.selectTempId = id
        },
        // 当扫描端口二维码时header中充电提示显示与否回调
        openOrClose (flag) {
            if (flag) { // 提示信息将要展示
                if (!this.show) { // 判断当前控制菜单为隐藏状态
                    this.closed() // 调用方法，降低footer层级和展示提示信息
                } else { // 判断当前控制菜单为展示状态
                    this.show = false // 改变控制菜单为隐藏状态，当隐藏完之后会调用closed函数
                }
            } else { // 提示信息将要关闭
                this.show = true // 改变控制菜单为展示状态
            }
        },
        closed () {
            this.level = false
            this.$refs.header.show = true
        },
        async getInitData (data) {
            try {
                const {
                code, message, templatelist, servephone, areaname, brandname, portStatus = [],
                tourtopupbalance, touristsendbalance, chargeInfo, payhint, ifmonth, defaultindex, packageMonth = {},
                deviceaid, merid, touruid, walletid, touraid
                } = await deviceCharge(data)
                if (code === 200) {
                    this.templatelist = templatelist
                    this.serverPhone = servephone
                    this.areaname = areaname
                    this.titleText = brandname
                    this.tourtopupbalance = tourtopupbalance
                    this.touristsendbalance = touristsendbalance
                    this.aid = deviceaid
                    this.merid = merid
                    this.uid = touruid
                    this.walletid = walletid
                    this.touraid = touraid
                    this.selectTempId = templatelist[defaultindex].id
                    this.chargeTip = {
                        ...this.chargeTip,
                        chargeInfo, // 收费标准
                        payhint, // 收费说明，下次不再提醒是否展示
                        defaultShow: payhint === 1
                    }
                    // 加载完成就判断有没有下次不再加载信息，没有的话就直接展示控制栏
                    if (payhint !== 1) {
                        this.show = true
                    }
                    // 设置支付方式
                   if (Number(ifmonth) === 1) {
                        const { surpnum = 0, todaysurpnum = 0 } = packageMonth
                        this.selectPaytype = ['微信支付',
                            {
                                title: '钱包支付',
                                slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(touristsendbalance)}`,
                                icon: {
                                    className: 'iconfont icon-ti-shi',
                                    onClick: () => {
                                        // 发送请求
                                        this.$refs.walletList.getData({
                                            uid: this.uid,
                                            devaid: this.aid,
                                            merid: this.merid,
                                            aid: this.touraid,
                                            walletid: this.walletid
                                        })
                                    }
                                }
                            },
                            { title: '包月支付', slot: `总剩余：${surpnum || 0}次， 今日剩余: ${todaysurpnum || 0}次` }
                        ]
                    } else {
                        this.selectPaytype = ['微信支付',
                            {
                                title: '钱包支付',
                                slot: `充值：${fmtMoney(tourtopupbalance)} ， 赠送：${fmtMoney(touristsendbalance)}`,
                                icon: {
                                    className: 'iconfont icon-ti-shi',
                                    onClick: () => {
                                        // 发送请求
                                        this.$refs.walletList.getData({
                                            uid: this.uid,
                                            devaid: this.aid,
                                            merid: this.merid,
                                            aid: this.touraid,
                                            walletid: this.walletid
                                        })
                                    }
                                }
                            }
                        ]
                    }

                    // 查询当前端口是否是可用端口
                    this.checkPortStatus(portStatus)
                } else {
                    this.alert(message).then(() => {
                        wx.closeWindow()
                    })
                }
            } catch (error) {
                console.log(error)
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
            // 判断校验是否通过
            if (!this.verifi()) return false
            switch (this.selectPayTypeNum) {
                case 1: this.wxPay(); break // 微信支付
                case 2: this.walletPay(); break // 钱包支付
                case 3: this.moneylyPay(); break // 包月支付
            }
        },
        // 微信支付
        async wxPay () {
            wxPayFun({
                tempid: this.selectTempId,
                port: this.selectPort,
                openid: this.openid,
                code: this.code,
                ifcontinue: this.orderid
            })
        },
        // 钱包支付
        async walletPay () {
            try {
                const { code, message, ordernum, devicenum, paymoney } = await walletChargePay({
                    tempid: this.selectTempId,
                    port: this.selectPort,
                    openid: this.openid,
                    code: this.code,
                    ifcontinue: this.orderid
                })
                if (code === 200) {
                    this.alert('支付成功').then(() => {
                        window.location.replace(`/general/walletPayment?orderNum=${ordernum}&payMoney=${paymoney}&devicenum=${devicenum}`)
                    })
                } else if (code === 21005) { // 用户钱包余额不足
                    // 展示余额不足提示
                    // 获取充电模板name属性
                    const tempname = this.templatelist.find(item => item.id === this.selectTempId).name
                    // 生成钱包充值跳转路径
                    this.walletRechargeUrl = `/general/walletcharge?from=1&openid=${this.openid}&aid=${this.aid}&dealid=${this.merid}&deviceNum=${this.code}&port=${this.selectPort}&ctempid=${this.selectTempId}&tempname=${tempname}`
                    this.$refs.chargeOverlay.show = true
                } else {
                    this.toast(message)
                }
            } catch (e) {
                this.toast('异常错误')
            }
        },
        // 包月充电
        moneylyPay () {
            moneylyPayFun({
                port: this.selectPort,
                openid: this.openid,
                code: this.code
            })
        },
        checkPortStatus (portList) {
            const portItem = portList.find(item => this.selectPort === Number(item.port))
            if (portItem) {
                const portStatus = Number(portItem.portStatus)
                if (portStatus === 3 || portStatus === 4) { // 故障端口
                    this.alert('此端口为故障端口，请更换端口使用').then(res => {
                        wx.closeWindow()
                    })
                } else if (portStatus === 2) { // 使用端口
                    // 检验当前使用端口能否作为本人续充端口使用
                    verifiUserIfCharge({
                        openid: this.openid,
                        code: this.code,
                        port: this.selectPort
                    })
                    .then(orderid => {
                        if (orderid) { // 判断orderid是否存在
                            this.orderid = orderid
                        }
                    }).catch(e => {
                        // 当前端口不支持续充
                       this.alert(e).then(() => {
                           wx.closeWindow()
                       })
                    })
                }
            } else {
                this.alert('未查询到端口状态').then(res => {
                    wx.closeWindow()
                })
            }
        }
    }
}
</script>

<style lang="scss">
.wisdom {
    padding-top: 115px;
}
</style>
