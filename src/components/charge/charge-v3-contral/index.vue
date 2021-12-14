<template>
  <div class="padding-bottom-3">
        <!-- 选择插座提示 -->
        <div class="padding-y-3 padding-x-3">
            <select-port-tip :selectPort="selectPort" />
        </div>
        <van-tabs v-if="temporaryc === 1" v-model="chagetype" type="card" color="#07c160" title-inactive-color="#666666">
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

        <div class="padding-x-3 margin-top-2 text-success text-size-sm" v-show="chagetype === 0" style="line-height: 1.5">
            提示：“按时间收费”模式为先充电后付费，仅支持预充钱包支付。如需充值钱包，请点击上方充值按钮进行充值！
        </div>
        <div class="padding-x-3 margin-top-2 text-success text-size-sm" v-show="chagetype === 1" style="line-height: 1.5">
            提示：机器屏幕上显示时间为小功率电动车充电时间，实际充电时间会根据电动车功率大小相应缩短并提前结束充电！
        </div>
    </div>
</template>

<script>
import selectPortTip from '@/components/charge/select-port-tip'
import selectTemp from '@/components/charge/select-temp'
import selectPaytype from '@/components/charge/select-paytype'
import warmTip from '@/components/charge/warm-tip'
export default {
    props: {
        selectPort: {
            type: Number,
            default: -1
        },
        temporaryc: {
            type: Number,
            default: 1
        },
        chageType: {
            type: Number,
            default: 0
        },
        templateTimelist: {
            type: Array,
            default: () => []
        },
        selectMoneyTempId: {
            type: Number
        },
        selectTimeTempId: {
            type: Number
        },
        templateMoneylist: {
            type: Array,
            default: () => []
        },
        selectPaytype: {
            type: Array,
            default: () => []
        },
        selectPayTypeNum: {
            type: Number
        },
        openid: {
            type: String
        },
        aid: {
            type: [String, Number]
        },
        merid: {
            type: [String, Number]
        }
    },
    components: {
        selectPortTip,
        selectTemp,
        selectPaytype,
        warmTip
    },
    computed: {
        chagetype: {
            get () {
                return this.chageType
            },
            set (value) {
                this.sendMessage('chageType', value)
            }
        }
    },
    methods: {
        // 设置选中的充电模板
        selectChargeTemp ({ type, id }) {
            let key
            if (type === 'time') {
                key = 'selectTimeTempId'
            } else {
                key = 'selectMoneyTempId'
            }
            this.sendMessage(key, id)
        },
        // 设置支付方式
        selectPayTypeBack (num) {
            this.sendMessage('selectPayTypeNum', num)
        },
        // 向父组件传递信息
        sendMessage (key, value) {
            this.$emit('changeValue', { key, value })
        }
    }
}
</script>

<style>

</style>
