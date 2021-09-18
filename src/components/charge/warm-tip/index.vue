<template>
    <div class="warm-tip padding-x-3">
        <div class="warm-tip-box rounded d-flex padding-x-3 padding-y-2">
            <div class="warm-tip-title text-size-default text-success">温馨提示</div>
            <div class="warm-tip-desc flex-1 d-flex justify-content-between align-items-center">
                <p class="margin-left-3 text-size-md text-p">使用钱包充电更方便</p>
                <van-button plain type="primary" size="small" class="warm-tip-btn" @click="handleGo">充值</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        openid: {
            type: [String, Number],
            default: ''
        },
        aid: {
            type: [String, Number],
            default: ''
        },
        merid: {
            type: [String, Number],
            default: ''
        }
    },
    methods: {
        handleGo () {
            window.location.replace(`/general/walletcharge?openid=${this.openid}&aid=${this.aid}&dealid=${this.merid}`)
        }
    }
}
</script>
<style lang="scss">
.warm-tip {
    .warm-tip-box {
        background: rgba(221 , 221 , 221 , .5);
        .warm-tip-title {
            width: 2.8em;
        }
        .warm-tip-btn {
            padding: 6px 12px;
            background: transparent;
            height: auto;
            line-height: 1.1;
        }
    }
}
</style>
