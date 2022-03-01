<template>
  <header class="charge-header shadow-md padding-x-3 padding-y-3 bg-white">
    <ul class="d-flex flex-wrap text-size-md">
      <li class="w-50 margin-bottom-2">
        <div class="d-flex align-items-center text-000">
          <i class="iconfont icon-diannao text-success text-size-lg"></i>
          <span class="margin-left-1"></span>
          <span v-if="addrnum">{{ code }} - {{ addrnum }}</span>
          <span v-else>{{ code }}</span>
        </div>
      </li>
      <li class="w-50 margin-bottom-2" v-if="areaname">
        <div class="d-flex align-items-center justify-content-end text-000">
          <i
            class="iconfont icon-anjian text-success margin-right-1 text-size-lg"
          ></i>
          <!-- <span class="margin-left-1">所属小区：</span> -->
          <span class="text-truncate area-name">{{ areaname }}</span>
        </div>
      </li>
      <div class="d-flex w-100 justify-content-between">
        <li
          class="w-50 text-size-md margin-bottom-2"
          v-if="chargeTip"
          @click="showTip"
        >
          <div class="d-flex align-items-center text-666">
            <i class="iconfont icon-ti-shi text-success text-size-lg"></i>
            <span class="margin-left-1 text-success">收费说明</span>
            <van-icon name="arrow" class="text-success" size="0.426rem" />
          </div>
        </li>
        <li class="w-50 text-size-md margin-bottom-2" v-if="uid">
          <div class="d-flex align-items-center justify-content-end text-666">
            <i class="iconfont icon-id text-success text-size-lg"></i>
            <!-- <span class="margin-left-1">用户ID：</span> -->
            <a class="margin-left-1 text-primary" href="/general/index">{{
              String(uid).padStart(8, '0')
            }}</a>
          </div>
        </li>
      </div>
      <div
        class="w-100 position-relative margin-bottom-2"
        @click="showTip"
        v-if="$route.path !== '/chargeicon'"
      >
        <ul class="text-999 text-size-sm">
          <li v-for="item in chargeInfoList2" :key="item">
            <div>{{ item }}</div>
          </li>
        </ul>
        <van-icon
          name="arrow"
          class="charge-list-icon position-absolute text-999"
          size="0.46rem"
        />
      </div>
      <li class="w-100 text-size-md">
        <div class="d-flex align-items-center text-666">
          <i class="iconfont icon-dianhua text-success text-size-lg"></i>
          <span class="margin-left-1 font-weight-bold">如有疑问，请联系：</span>
          <a class="text-truncate text-primary" :href="`tel:${serverPhone}`">{{
            serverPhone
          }}</a>
        </div>
      </li>
    </ul>

    <van-popup
      get-container="#charge-tip"
      v-model="show"
      position="bottom"
      :overlay-style="{ transition: 'all .3s linear' }"
      :close-on-click-overlay="false"
      :style="{
        'box-shadow': `${
          isPort ? '0 -0.0533rem 0.32rem rgba(100, 101, 102, 0.24)' : 'none'
        }`
      }"
      duration=".4s"
      :safe-area-inset-bottom="true"
      v-if="chargeTip"
      @closed="closed"
    >
      <div class="padding-y-3">
        <div>
          <div
            class="d-flex justify-content-between  margin-bottom-1 text-p padding-x-3"
          >
            <div class="text-size-lg">{{ areaname ? areaname : code }}</div>
            <div
              class="d-flex align-items-center"
              v-if="chargeTip.payhint == 1"
            >
              下次不再提醒
              <van-switch
                v-model="checked"
                class="margin-left-1"
                active-color="#07c160"
                size="18px"
              />
            </div>
          </div>
          <div class="text-p padding-x-3" v-if="areaname">
            设备编号：{{ code }}
          </div>
          <hd-title class="margin-top-1">收费说明</hd-title>
          <!-- 模板收费说明 -->
          <ul class="text-666 padding-x-3">
            <li
              class="margin-bottom-1"
              v-for="(item, index) in chargeInfoList"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
          <!-- 用戶充电协议 -->
          <!-- <charge-agreement
            v-model="agreementIsShow"
            ref="agreement"
            :chargeTip="chargeTip"
            :uid="uid"
          /> -->

          <div class="padding-x-3 margin-top-4">
            <van-button type="primary" block round @click="knowBack"
              >我知道了</van-button
            >
          </div>
        </div>
      </div>
    </van-popup>
  </header>
</template>

<script>
import { editAccountAloneData } from '@/require/charge'
// import ChargeAgreement from '@/components/charge/charge-agreement'
export default {
  // components: {
  //   ChargeAgreement
  // },
  props: {
    code: {
      type: String
    },
    addrnum: {
      type: String
    },
    areaname: {
      type: String
    },
    serverPhone: {
      type: String
    },
    isPort: {
      // 是否是扫端口页面
      type: Boolean,
      default: false
    },
    uid: {
      type: [String, Number]
    },
    chargeTip: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      show: false, // 弹出层是否显示
      checked: false,
      agreementIsShow: false
    }
  },
  watch: {
    chargeTip: {
      handler(value) {
        // 监听 defaultShow，为true的时候弹出收费说明提示框
        if (value && value.defaultShow) {
          this.show = true
        }
        // 用户充电协议是否显示
        console.log(value)
        if (value && value.agree !== 2) {
          this.agreementIsShow = true
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    chargeInfoList() {
      if (this.chargeTip && typeof this.chargeTip.chargeInfo === 'string') {
        return this.chargeTip.chargeInfo.split(/[\n\r]/)
      }
      return [
        '选择的充电时间为小功率电动车充电时间，仅供参考。',
        '功率电动车充电时间智能动态计算，以实际为准。'
      ]
    },
    chargeInfoList2() {
      const chargeInfoList = [...this.chargeInfoList]
      return chargeInfoList.splice(0, 4)
    }
  },
  methods: {
    showTip() {
      // 扫设备二维码中使用header
      this.show = true
      /** 修改header时修改 */
      // if (!this.isPort) {
      //     this.show = true
      // } else {
      //     // 扫端口二维码中使用header, 当过渡完成时，调用父组件传过来的 openOrClose
      //     this.$emit('openOrClose', true)
      // }
    },
    knowBack() {
      // 先判断用户服务协议是否同意，不同意就提示
      // if (!this.$refs.agreement.checked) {
      //   this.agreementIsShow = true
      //   return false
      // }
      if (this.checked) {
        // 更改数据
        editAccountAloneData(
          {
            payhint: 2,
            sourcepath: 1,
            uid: this.uid
          },
          false
        )
      }
      this.show = false
    },
    // 扫端口二维码中使用header, 当过渡完成时, 调用父组件传过来的 openOrClose
    closed() {
      this.$emit('openOrClose', false)
    }
  }
}
</script>

<style lang="scss">
.charge-header {
  /* top: 0;
    left: 0;
    right: 0; */
  .area-name {
    // max-width: 70px;
    // max-width: 140px;
    max-width: 37vw;
  }
  .charge-list-icon {
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
