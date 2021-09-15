<template>
    <ul class="select-paytype text-size-default">
        <li class="select-paytype-item padding-x-3" v-for="(item, index) in list" :key="index" @click="handleSelect(item)">
             <!-- 无插槽的情况 -->
            <div class="select-paytype-box d-flex align-items-center border-bottom-1 border-eee padding-y-2 position-relative" v-if="typeof item === 'string'">
                <i class="iconfont icon-weixin text-success left-icon" v-if="item === '微信支付'"></i>
                <i class="iconfont icon-qianbao left-icon" v-else-if="item === '钱包支付'"></i>
                <span class="margin-x-2">{{item}}</span>
                <van-icon v-show="paytypeMap[item] === select && select > 0" name="success" color="#28a745" size="25px" class="select-icon position-absolute" />
            </div>
            <!-- 有插槽的情况 -->
            <div class="select-paytype-box d-flex align-items-center border-bottom-1 border-eee padding-y-2 position-relative" v-else>
                <i class="iconfont icon-weixin text-success left-icon" v-if="item.title === '微信支付'"></i>
                <i class="iconfont icon-qianbao text-success left-icon" v-else-if="item.title === '钱包支付'"></i>
                <span class="margin-x-2">{{item.title}}</span>
                <slot v-bind:data="item"></slot>
                <van-icon v-show="paytypeMap[item.title] === select && select > 0" name="success" color="#28a745" size="25px" class="select-icon position-absolute" />
            </div>
        </li>
    </ul>
</template>

<script>
import { getType } from '@/utils/util'
// 支付方式对应关系 Map
export const paytypeMap = {
    1: '微信支付',
    2: '钱包支付',
    3: '包月支付',
    4: '银联支付',
    微信支付: 1,
    钱包支付: 2,
    包月支付: 3,
    银联支付: 4
}
export default {
    props: {
        list: { // 遍历list
            type: Array,
            default: () => []
        },
        select: { // 选中索引
            type: Number
        }
    },
    data () {
        return {
            paytypeMap
        }
    },
    methods: {
        handleSelect (item) {
            let num
            if (getType(item) === 'object') {
                num = paytypeMap[item.title]
            } else {
                num = paytypeMap[item]
            }
            console.log(num)
            this.$emit('selectPayTypeBack', num)
        }
    }
}
</script>

<style scoped lang="scss">
.select-paytype {
    .select-paytype-item {
        &:last-child {
            .select-paytype-box {
                border: none !important;
            }
        }
        &:active {
           background-color: #efefef;
        }
        .select-paytype-box {
            .left-icon {
                font-size: 30px;
                &.icon-qianbao {
                    color: #DFB94C;
                }
            }
            .select-icon {
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}
</style>
