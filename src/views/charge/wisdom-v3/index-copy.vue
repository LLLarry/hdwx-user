<template>
    <div class="wisdom d-flex flex-column">
        <!-- 顶部区域 -->
        <Header
            :code="code"
            :addrnum="addrnum"
            :areaname="areaname"
            :serverPhone="serverPhone"
            :chargeTip="chargeTip"
            :uid="uid"
        ></Header>
        <main class="padding-top-2 flex-1">
            <!-- <select-port :list="portList" :selectPort="selectPort" @selectPortBack="handleSelectPort" /> -->
            <charge-port :list="portList" :selectPort="selectPort" @selectPortBack="handleSelectPort" />

            <div class="position-absolute reload-box d-flex align-items-center justify-content-center text-size-md" v-if="addrnum">
                <span>如端口状态与实际不符，请点击</span>
                <van-icon name="replay" class="reload-port margin-left-1 text-success" size=".5rem" @click="updatePortStatus" />
            </div>
        </main>
        <van-popup
            v-model="show"
            position="bottom"
            duration=".4s"
            :style="{ bottom: '2.133rem', maxHeight: 'calc(80vh - 2.133rem)'}"
            :overlay-style="{ height: 'calc(100% - 2.133rem)'}"
            @open="level = true"
            @closed="level = false"
        >
            <div class="padding-bottom-3">
                <!-- 选择插座提示 -->
                <div class="padding-y-3 padding-x-3">
                    <select-port-tip :selectPort="selectPort" />
                </div>
                <van-tabs v-if="temporaryc === 1" v-model="chageType" type="card" color="#07c160" title-inactive-color="#666666">
                    <van-tab :title-style="{ fontSize: '0.32rem' }">
                        <template #title> 按时间付费<span style="font-size: 0.28rem;">（会员充电）</span> </template>
                         <!-- 选择按时间付费模板列表 -->
                        <div class="padding-x-3 margin-top-3">
                            <select-temp :list="templateTimelist" :selectId="selectTimeTempId" type="time" @selectChargeTemp="selectChargeTemp" />
                        </div>
                    </van-tab>
                    <van-tab :title-style="{ fontSize: '0.32rem' }">
                        <template #title> 按金额付费<span style="font-size: 0.28rem;">（临时充电）</span> </template>
                         <!-- 选择按金额付费模板列表 -->
                        <div class="padding-x-3 margin-top-3">
                            <select-temp :list="templateMoneylist" :selectId="selectMoneyTempId" type="money" @selectChargeTemp="selectChargeTemp" />
                        </div>
                    </van-tab>
                </van-tabs>
                <div class="padding-x-3" v-else>
                    <select-temp :list="templateTimelist" :selectId="selectTimeTempId" type="time" @selectChargeTemp="selectChargeTemp" />
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

                <div class="padding-x-3 margin-top-2 text-success text-size-sm" v-show="chageType === 0" style="line-height: 1.5">
                    提示：“按时间收费”模式为先充电后付费，仅支持预充钱包支付。如需充值钱包，请点击上方充值按钮进行充值！
                </div>
                <div class="padding-x-3 margin-top-2 text-success text-size-sm" v-show="chageType === 1" style="line-height: 1.5">
                    提示：机器屏幕上显示时间为小功率电动车充电时间，实际充电时间会根据电动车功率大小相应缩短并提前结束充电！
                </div>
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
// import selectPort from '@/components/charge/select-port'
import ChargePort from '@/components/charge/charge-port'
import selectPortTip from '@/components/charge/select-port-tip'
import selectTemp from '@/components/charge/select-temp'
import warmTip from '@/components/charge/warm-tip'
import chargeOverlay from '@/components/charge/charge-overlay'
import selectPaytype, { paytypeMap } from '@/components/charge/select-paytype'
import walletList from '@/components/charge/wallet-list'
import { verification, fmtMoney, getType } from '@/utils/util'
import { deviceCharge, walletChargePay, queryAddrAllPortStatus } from '@/require/charge'
import { /* verifiUserIfCharge, */ wxPayFun, moneylyPayFun, createPortStatusByHV } from '../helper.js'
export default {
    components: {
        Header,
        // selectPort,
        ChargePort,
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
            chageType: 0, // 充电类型： 0 按时间充电 1 按金额充电
            // grade: 2, // 默认支付在那个选择上面： 1按 金额付费    2 按时间付费
            temporaryc: 1, // 是否支持临时充电  1 支持临时充电
            code: '',
            addrnum: '',
            openid: '',
            serverPhone: '',
            areaname: '',
            titleText: '智慧款充电', // titleText
            chargeTip: {
                chargeInfo: null, // 收费标准
                payhint: '' // 收费说明，下次不再提醒是否展示
            },
            orderid: '', // 续充订单的订单id
            aid: '', // 设备所属小区id
            merid: '', // 设备所属商户id
            uid: '', // 用户id
            touraid: '', // 用户所属小区id
            walletid: '', // 钱包id
            tourtopupbalance: 0, // 充值金额
            touristsendbalance: 0, // 赠送金额
            portList: [
                // { port: 1, portStatus: 1 }
            ],
            selectPort: -1, // 选中的端口号
            show: false,
            templateTimelist: [], // 按照时间充电模板列表
            templateMoneylist: [], // 按照金额充电模板列表
            selectTimeTempId: -1, // 选中时间充电模板id
            selectMoneyTempId: -1, // 选中按照金额充电模板id
            selectPaytype: ['微信支付', '钱包支付'/* , { title: '包月支付', slot: '123456' } */],
            selectPayTypeNum: paytypeMap['微信支付'], // 默认选中微信支付,
            level: false, // footer的层级
            walletRechargeUrl: '', // 钱包充值跳转路径
            nowtime: '' // 访问当前时间时间戳
        }
    },
    computed: {
        // 充电支付提示
        chargePayTip () {
            if (this.selectPort < 0) {
                return '请先选择充电端口'
            } else {
                if (this.chageType === 0) { // 按时间充电
                    const item = this.templateTimelist.find(item => item.id === this.selectTimeTempId)
                    if (item) {
                        const time = parseFloat((item.chargeTime / 60).toFixed(2))
                        return `充电时长: ${item.name === '充满自停' ? '充满自停' : `${time}小时`}`
                    } else {
                         return '充电时长: '
                    }
                } else { // 按金额充电
                    const item = this.templateMoneylist.find(item => item.id === this.selectMoneyTempId)
                    if (item) {
                        const money = parseFloat(item.money)
                        return `支付金额: ${money}元`
                    } else {
                         return '支付金额: '
                    }
                }
            }
        }
    },
    mounted () {
        const { code, openid, addrnum } = this.$route.query
        this.code = code
        this.openid = openid
        this.addrnum = addrnum
        this.getInitData({
            code,
            openid,
            addrnum
        })
    },
    watch: {
        // 监听充电菜单的变化，更改支付方式的显示和默认选择
        chageType: {
                handler (newVal, oldValue) {
                if (newVal === oldValue) return
                const walletItem = this.selectPaytype.find(item => {
                    return (getType(item) === 'object' && item.title === '钱包支付') || (item === '钱包支付')
                })
                if (newVal === 0) {
                    this.selectPaytype = [walletItem]
                    // this.selectPayTypeNum = paytypeMap['钱包支付']
                } else {
                    this.selectPaytype = ['微信支付', walletItem]
                    // this.selectPayTypeNum = paytypeMap['微信支付']
                }
                this.selectWalletByBalance()
            },
            immediate: true
        }
    },
    methods: {
        handleSelectPort ({ port, portStatus }) {
            if (portStatus === 3 || portStatus === 4) { // 故障端口
                this.toast('此端口为故障端口')
            } else if (portStatus === 1) { // 空闲端口
                this.selectPort = port
                this.show = true
            } else { // 使用端口
                this.alert('当前端口已被占用，请更换端口使用').then(() => {
                    wx.closeWindow()
                })
                // 检验当前使用端口能否作为本人续充端口使用
                // verifiUserIfCharge({
                //     openid: this.openid,
                //     code: this.code,
                //     port
                // }).then(orderid => {
                //     if (orderid) { // 判断orderid是否存在
                //         this.selectPort = port
                //         this.orderid = orderid
                //         this.show = true
                //     }
                // })
            }
        },
        // 设置支付方式
        selectPayTypeBack (num) {
            this.selectPayTypeNum = num
        },
        // 设置选中的充电模板
        selectChargeTemp ({ type, id }) {
            if (type === 'time') {
                this.selectTimeTempId = id
            } else {
                this.selectMoneyTempId = id
            }
        },
        async getInitData (data) {
            try {
                const {
                    code, message, portStatus, templateTimelist, templateMoneylist, servephone, areaname, brandname, tourtopupbalance,
                    touristsendbalance, chargeInfo, payhint, defaultindex = 0,
                    deviceaid, merid, touruid, grade, temporaryc, touraid, walletid, nowtime, hardversion
                    } = await deviceCharge(data)
                if (code === 200) {
                    this.portList = createPortStatusByHV(portStatus, hardversion)
                    this.templateTimelist = templateTimelist
                    this.templateMoneylist = templateMoneylist
                    this.serverPhone = servephone
                    this.areaname = areaname
                    this.titleText = brandname
                    this.tourtopupbalance = tourtopupbalance
                    this.touristsendbalance = touristsendbalance
                    this.aid = deviceaid
                    this.merid = merid
                    this.uid = touruid
                    this.temporaryc = temporaryc
                    this.touraid = touraid
                    this.walletid = walletid
                    this.nowtime = nowtime
                    // this.grade = grade
                    if (grade === 1 && temporaryc === 1) { // grade 1按 金额付费    2 按时间付费; temporaryc 1 支持按金额付费
                        this.chageType = 1 // 按时间充电
                    }
                    this.chargeTip = {
                        chargeInfo, // 收费标准
                        payhint, // 收费说明，下次不再提醒是否展示
                        defaultShow: payhint === 1
                    }
                    this.selectTimeTempId = (templateTimelist[0] || { id: -1 }).id // 按时间充电默认选中第一个
                    this.selectMoneyTempId = templateMoneylist[defaultindex || 0]?.id // 按金额充电默认选中后台传过来的索引
                    // 设置支付方式 找到旧的钱包索引，拿新的替换旧的
                    const walletItem = {
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
                    const walletItemIndex = this.selectPaytype.findIndex(item => (item === '钱包支付' || item.title === '钱包支付'))
                    if (walletItemIndex !== -1) {
                        this.selectPaytype.splice(walletItemIndex, 1, walletItem)
                    }
                    this.selectWalletByBalance()
                } else {
                    this.alert(message).then(() => {
                        wx.closeWindow()
                    })
                }
            } catch (error) {
                this.alert('异常错误', { error, vm: this, line: 290 }).then(() => {
                    wx.closeWindow()
                })
            }
        },
        // 校验选择的信息是否正确
        verifi () {
            const verifiList = [
                {
                    verifi: this.selectPort > 0,
                    content: '请先选择充电端口'
                },
                (() => {
                    if (this.chageType === 0) { // 按时间充电
                        return {
                                verifi: this.selectTimeTempId > 0,
                                content: '请先选择充电模板'
                            }
                    } else {
                        return {
                            verifi: this.selectMoneyTempId > 0,
                            content: '请先选择充电模板'
                        }
                    }
                })(),
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
                tempid: this.chageType === 0 ? this.selectTimeTempId : this.selectMoneyTempId,
                port: this.selectPort,
                openid: this.openid,
                code: this.code,
                addrnum: this.addrnum
            })
        },
        // 钱包支付
        async walletPay () {
            try {
                const { code, message, ordernum, devicenum, paymoney } = await walletChargePay({
                    tempid: this.chageType === 0 ? this.selectTimeTempId : this.selectMoneyTempId,
                    port: this.selectPort,
                    openid: this.openid,
                    code: this.code,
                    ifcontinue: this.orderid,
                    addrnum: this.addrnum
                })
                if (code === 200) {
                    this.alert('支付成功').then(() => {
                        window.location.replace(`/general/walletPayment?orderNum=${ordernum}&payMoney=${paymoney}&devicenum=${devicenum}`)
                    })
                } else if (code === 21005) { // 用户钱包余额不足
                    // 展示余额不足提示
                    // 获取充电模板name属性
                    let tempname = ''
                    if (this.chageType === 0) {
                        tempname = this.templateTimelist.find(item => item.id === this.selectTimeTempId).name
                    } else {
                        tempname = this.templateMoneylist.find(item => item.id === this.selectMoneyTempId).name
                    }
                    // 生成钱包充值跳转路径
                    this.walletRechargeUrl = `/general/walletcharge?from=1&openid=${this.openid}&aid=${this.aid}&dealid=${this.merid}&deviceNum=${this.code}&port=${this.selectPort}&ctempid=${this.selectTempId}&tempname=${tempname}`
                    this.$refs.chargeOverlay.show = true
                } else {
                    this.toast(message)
                }
            } catch (error) {
                this.toast('异常错误', { error, vm: this, line: 371 })
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
        // 更新端口状态
        async updatePortStatus () {
           try {
                const { code, message, portlist } = await queryAddrAllPortStatus({
                    code: this.code,
                    addr: this.addrnum,
                    nowtime: this.nowtime
                })
                if (code === 200) {
                    this.portList = this.portList.map(item => {
                        item.portStatus = portlist[item.port]
                        return item
                    })
                    this.$toast('更新成功')
                } else {
                    this.$toast(message)
                }
           } catch (error) {
               this.toast('异常错误', { error, vm: this, line: 409 })
           }
        },
        // 判断钱包余额，如果大于指定值，则默认选中钱包
        selectWalletByBalance () {
            const balance = this.touristsendbalance + this.tourtopupbalance
            if (this.chageType === 0) {
                this.selectPayTypeNum = paytypeMap['钱包支付']
            } else {
                if (balance >= 2) {
                    this.selectPayTypeNum = paytypeMap['钱包支付']
                } else {
                    this.selectPayTypeNum = paytypeMap['微信支付']
                }
            }
        }
    }
}
</script>

<style lang="scss">
.wisdom {
    /* padding-top: 115px;
    main {
        height: calc(100vh - 205px);
        position: relative;
        .reload-box {
            bottom: 15px;
            left: 0;
            right: 0;
        }
    } */
}
</style>
