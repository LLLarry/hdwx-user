<template>
    <van-popup
        v-model="showList"
        round
        position="bottom"
        class="bg-gray"
        @closed="closed"
    >
        <van-tabs v-model="active">
            <van-tab :title="`可用（${successList.length}）`">
                <div class="padding-3" :style="{ height: 'calc(75vh - 2.133333rem)', 'overflow-y': 'auto', 'padding-bottom': '2.133333rem'}">
                    <wallet-card v-for="item in successList" :key="`${item.uid}-${item.merid}-${item.walletid}`" :data="item" />
                </div>
            </van-tab>
            <van-tab :title="`不可用（${reasonList.length}）`">
                <div class="padding-3" :style="{ height: 'calc(75vh - 2.133333rem)', 'overflow-y': 'auto', 'padding-bottom': '2.133333rem'}">
                    <wallet-card v-for="item in reasonList" :key="`${item.uid}-${item.merid}-${item.walletid}`" :data="item" reason />
                </div>
            </van-tab>
        </van-tabs>
    </van-popup>
</template>

<script>
import walletCard from '@/components/wallet-card'
import { accountwalletverify } from '@/require/charge'
import { getType } from '@/utils/util'
export default {
    components: {
        walletCard
    },
    data () {
        return {
            showList: false,
            active: 0,
            successList: [],
            reasonList: []
        }
    },
    methods: {
        async getData (data) {
            try {
                const { code, message, result } = await accountwalletverify(data)
                if (code === 200) {
                    if (getType(result) === 'array') {
                        this.successList = result.filter(item => item.employ === 1)
                        this.reasonList = result.filter(item => item.employ !== 1)
                    }
                    this.showList = true
                } else {
                    this.toast(message)
                }
           } catch (error) {
               this.toast('异常错误', { error, vm: this, line: 54 })
           }
        },
        closed () {
            this.active = 0
        }
    }
}
</script>
