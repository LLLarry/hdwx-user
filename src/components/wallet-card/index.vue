<template>
  <div class="padding-top-3 padding-bottom-2 shadow-card rounded-md bg-white wallet-card margin-bottom-3" :class="[reason ? 'reason' : 'success']">
        <div class="d-flex wallet-card-box">
            <div class="left padding-left-3">
                <div class="padding-bottom-2 d-flex align-items-center">
                    <span class="icon d-inline-block">充</span>
                    <span class="icon-money margin-left-1 text-size-default font-weight-bold">&yen;{{data.topupmoney | fmtMoney}}</span>
                </div>
                <div class="padding-bottom-3">
                    <span class="icon d-inline-block">赠</span>
                    <span class="icon-money margin-left-1 text-size-default font-weight-bold">&yen;{{data.sendmoney | fmtMoney}}</span>
                </div>
            </div>
            <div class="right flex-1 padding-x-2 d-flex flex-column align-items-start justify-content-around margin-bottom-3">
                <h4>钱包信息</h4>
                <div class="text-p text-size-sm">
                    <span>{{data.walletid}}</span> |
                    <span>{{data.areaname === null ? '— —' : data.areaname}}</span> |
                    <span>{{data.merphone === null ? '— —' : data.merphone}}</span>
                </div>
            </div>
        </div>
        <div class="bottom-desc padding-top-2 padding-x-3 text-666">
            {{data.employ == 1 ? "当前钱包可以在此设备使用" : data.hint}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        reason: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss">
.wallet-card {
    &.shadow-card {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    }
    &.success {
        .icon,
        .icon-money {
            color: #07c160 !important;
            border-color: #07c160 !important;
        }
        .bottom-desc {
            color: #07c160 !important;
        }
    }
    &.reason {
        .icon,
        .icon-money {
            color: #ee0a24 !important;
            border-color: #ee0a24 !important;
        }
        .bottom-desc {
            color: #ee0a24 !important;
        }
    }
    .left {
        width: 100px;
        .icon {
            border: 1px solid #000;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 50%;
            font-size: 12px;
        }
    }
    .bottom-desc {
        border-top: 1px dotted #ccc;
    }
}
</style>
