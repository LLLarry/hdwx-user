<template>
  <header class="charge-header shadow-md padding-x-3 padding-y-3 bg-white position-fixed">
      <ul class="d-flex flex-wrap text-size-md">
          <li class="w-50 margin-bottom-2">
              <div class="d-flex align-items-center text-000">
                  <i class="iconfont icon-diannao text-success text-size-lg"></i>
                  <span class="margin-left-1"></span>
                  <span>{{code}}</span>
              </div>
          </li>
          <li class="w-50 margin-bottom-2" v-if="areaname">
              <div class="d-flex align-items-center justify-content-end text-000">
                  <i class="iconfont icon-anjian text-success margin-right-1 text-size-lg"></i>
                  <!-- <span class="margin-left-1">所属小区：</span> -->
                  <span class="text-truncate area-name">{{areaname}}</span>
              </div>
          </li>
          <li class="w-100 text-size-md margin-bottom-2" v-if="chargeTip" @click="show = true">
              <div class="d-flex align-items-center text-666">
                  <i class="iconfont icon-ti-shi text-success text-size-lg"></i>
                  <span class="margin-left-1 text-success">收费说明</span>
                  <van-icon name="arrow" class="text-success" size="0.426rem" />
              </div>
          </li>
          <li class="w-100 text-size-md">
              <div class="d-flex align-items-center text-666">
                  <i class="iconfont icon-dianhua text-success text-size-lg"></i>
                  <span class="margin-left-1 font-weight-bold">如有疑问，请联系：</span>
                  <a class="text-truncate text-primary" :href="`tel:${serverPhone}`">{{serverPhone}}</a>
              </div>
          </li>
      </ul>

      <van-popup
        get-container="#charge-tip"
        v-model="show" position="bottom"
        :overlay-style="{transition: 'all .3s linear'}"
        duration=".4"
        :safe-area-inset-bottom="true"
        v-if="chargeTip"
      >
          <div class="padding-y-3">
              <div>
                  <div class="d-flex justify-content-between  margin-bottom-1 text-p padding-x-3">
                      <div class="text-size-lg">{{areaname ? areaname : code}}</div>
                      <div class="d-flex align-items-center" v-if="chargeTip.payhint == 1">
                          下次不再提醒
                          <van-switch v-model="checked" class="margin-left-1" active-color="#07c160" size="18px" />
                      </div>
                  </div>
                  <div class="text-p padding-x-3" v-if="areaname">设备编号：{{code}}</div>
                  <hd-title class="margin-top-1">收费说明</hd-title>
                  <!-- 模板收费说明 -->
                  <ul class="text-666 padding-x-3" v-if="chargeTip.chargeInfo">
                      <li class="margin-bottom-1" v-for="(item, index) in this.chargeTip.chargeInfo.split(/[\n\r]/)" :key="index">{{item}}</li>
                  </ul>
                  <!-- 默认收费说明 -->
                   <ul class="text-666 padding-x-3" v-else>
                      <li class="margin-bottom-1">选择的充电时间为小功率电动车充电时间，仅供参考。</li>
                      <li class="margin-bottom-1">大功率电动车充电时间智能动态计算，以实际为准。</li>
                  </ul>

                  <div class="padding-x-3 margin-top-4">
                      <van-button type="primary" block round @click="show = false">我知道了</van-button>
                  </div>
              </div>
          </div>
      </van-popup>
  </header>
</template>

<script>
export default {
    props: {
        code: {
            type: String
        },
        areaname: {
            type: String
        },
        serverPhone: {
            type: String
        },
        chargeTip: {
            type: Object,
            default: () => null
        }
    },
    data () {
        return {
            show: false, // 弹出层是否显示
            checked: false
        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
.charge-header {
    top: 0;
    left: 0;
    right: 0;
    .area-name {
        // max-width: 70px;
        // max-width: 140px;
        max-width: 37vw;
    }
}
</style>
