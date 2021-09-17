<template>
    <hd-overlay :show="show" title="提示" @close="show = false">
        <div class="text-center text-size-sm">
            对不起，您当前的余额不足。
        </div>
        <h5 class="text-center text-size-sm margin-top-3 margin-bottom-2">
            钱包余额
        </h5>
        <ul class="text-size-sm">
            <li class="margin-bottom-1"><p class="text-size-sm">充值余额：<span class="text-success font-weight-bold">&yen; {{ money | fmtMoney }}</span></p></li>
            <li class="margin-bottom-1"><p class="text-size-sm">赠送余额：<span class="text-success font-weight-bold">&yen; {{ sendmoney | fmtMoney }}</span></p></li>
        </ul>
        <van-button type="info"  size="small" class="w-100 margin-top-2" :to="url ? url: undefined" replace>
            <van-icon name="balance-o" size="16px"/>
            <span class="position-relative margin-left-1" style="top: -3px;">立即充值</span>
        </van-button>
    </hd-overlay>
</template>

<script>
import hdOverlay from '@/components/hd-overlay'
export default {
    components: {
        hdOverlay
    },
    props: {
        money: {
            type: Number,
            default: 0
        },
        sendmoney: {
            type: Number,
            default: 0
        },
        url: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            show: false
        }
    }
}
</script>
