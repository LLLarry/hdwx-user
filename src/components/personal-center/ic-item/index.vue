<template>
  <div class="ic-item position-relative text-size-md text-666 shadow margin-x-2 rounded-md overflow-hidden margin-bottom-3 bg-white">
        <div class="top padding-x-2 padding-top-2 d-flex align-items-center">
            <van-image
                width="45"
                height="45"
                :src="cardUrl"
            />
            <div class="flex-1 margin-left-2 d-flex justify-content-between align-items-center">
                <div class="">
                    <div class="">{{value.cardID}}</div>
                    <van-tag type="success" v-if="value.relevawalt === 1">关联钱包</van-tag>
                    <van-tag type="primary" v-else>未关联钱包</van-tag>
                </div>
                <van-tag type="warning" v-if="value.status === 0">未绑定</van-tag>
                <van-tag type="success" v-if="value.status === 1">正常</van-tag>
                <van-tag type="danger" v-if="value.status === 2">挂失</van-tag>
            </div>
        </div>
        <hd-card class="padding-2 text-size-sm">
            <hd-card-item>
                <span class="card-item-title text-333">充值金额：</span>
                <span class="card-item-content text-999">{{ value.money | fmtMoney }}元</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">赠送金额：</span>
                <span class="card-item-content text-999">{{ value.sendmoney | fmtMoney }}元</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">绑定人：</span>
                <span class="card-item-content text-999">{{value.touristnick}}</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">电话：</span>
                <span class="card-item-content text-999">{{value.touristphone}}</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">归属小区：</span>
                <span class="card-item-content text-999">{{value.areaname}}</span>
            </hd-card-item>
            <hd-card-item>
                <span class="card-item-title text-333">备注：</span>
                <span class="card-item-content text-999">{{value.remark}}</span>
            </hd-card-item>
        </hd-card>
        <div class="bottom padding-x-2 padding-bottom-2 d-flex justify-content-end">
            <van-button
                type="info"
                size="mini"
                class="margin-right-1"
                :to="`/ic/record/${value.cardID}`"
                plain
            >消费记录</van-button>
            <van-button
                type="primary"
                size="mini"
                class="margin-right-1"
                plain
                :to="`/ic/manage/${value.id}`"
            >&nbsp;&nbsp;&nbsp;&nbsp;充值&nbsp;&nbsp;&nbsp;&nbsp;</van-button>
            <van-button
                type="danger"
                size="mini"
                plain
                @click="handler('guashi', value)"
            >&nbsp;&nbsp;&nbsp;&nbsp;挂失&nbsp;&nbsp;&nbsp;&nbsp;</van-button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import hdCard from '@/components/hd-card'
import hdCardItem from '@/components/hd-card-item'
export default defineComponent({
  components: {
    hdCard,
    hdCardItem
  },
  setup (props, { emit, root }) {
    const cardUrl = require('@/assets/images/home_02.png')
    const value = {
    aid: 3335,
    areaname: '和动测试',
    cardID: '33C2D03E',
    create_time: '2021-04-08T08:37:32.000+0000',
    dealername: '朱可可',
    dealernick: '艾文先森',
    figure: '33C2D03E',
    id: 10250,
    merid: 835026,
    money: 0,
    relevawalt: 2,
    remark: '',
    sendmoney: 0,
    status: 1,
    touristnick: '永夜',
    touristphone: '15093219054',
    toursendbalance: 4,
    tourtopupbalance: 0,
    uid: 3
}
    const handler = (type, value) => {
        let name = ''
        switch (type) {
            case 'guashi' :
                name = '挂失'; break
            case 'jiebang' :
                name = '解绑'; break
            case 'shanchu' :
                name = '删除'; break
        }
        root.confirm(`确认${name}【${value.cardID}】吗？`)
        .then(() => {
            emit('handleChange', {
                value,
                type
            })
        })
    }
    return {
      cardUrl,
      value,
      handler
    }
  }
})
</script>

<style lang="scss" scoped>
.ic-item {
    background-image: url(../../../assets/images/ic_card_bg3.png);
    background-size: 30%;
    background-repeat: no-repeat;
    background-position: 10px 95%;
  .card-num {
    margin-bottom: 3px;
  }
}
</style>
