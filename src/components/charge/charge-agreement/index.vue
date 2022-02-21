<template>
  <div class="agreement">
    <div
      class="post d-flex justify-content-center align-items-center text-size-sm padding-y-2"
    >
      <van-checkbox
        v-model="checked"
        shape="square"
        class="margin-right-1"
        icon-size=".45rem"
      ></van-checkbox>
      <span class="text-p">我已阅读并同意</span>
      <span @click="handleTap(true)">《服务协议》</span>
    </div>
    <van-popup
      :value="show"
      class="context"
      :close-on-click-overlay="false"
      get-container="#charge-tip"
    >
      <div class="box">
        <h2 class="text-000">用户服务声明</h2>
        <ul>
          <li v-for="(item, index) in list" :key="index" class="padding-y-2">
            <p class="text-size-sm text-000">{{ item }}</p>
          </li>
        </ul>
      </div>
      <div class="bottom text-success" @click="handleTap(false)">
        我已阅读并同意
      </div>
    </van-popup>
  </div>
</template>

<script>
import { updateAgree } from '@/require/charge'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    chargeTip: {
      type: Object,
      default: () => null
    },
    uid: {
      type: [String, Number]
    }
  },
  model: {
    prop: 'show'
  },
  data() {
    return {
      list: [
        '1、充电前请检查充电桩设备、电线和接头完好，若发现充电桩损坏、破裂、漏电以及相关部件暴露出来时，禁止使用;',
        '2、请勿将易燃、易爆或可燃材料、化学物、可燃蒸汽等危险物品靠近充电桩;',
        '3、充电过程中，请勿启动电车，以免对电车电池造成损伤;',
        '4、如非法改装,不符合标准电动车充电，由此引发安全事故由用户自行负责;',
        '5、如遇下雨打雷天气,请谨慎充电;',
        '6、下雨天时若充电桩及电路没有雨棚遮掩请不要使用充电桩，以防漏电发生危险;'
      ],
      checked: false
    }
  },
  watch: {
    chargeTip: {
      handler(value) {
        if (value && value.agree === 2) {
          this.checked = true
        }
      },
      deep: true,
      immediate: true
    },
    checked: {
      handler(value) {
        updateAgree({
          uid: this.uid,
          agree: value ? 2 : 1
        })
      }
    }
  },
  methods: {
    handleTap(flag) {
      if (!flag) {
        this.checked = true
      }
      this.$emit('input', flag)
    }
  }
}
</script>

<style lang="scss" scoped>
.context {
  position: absolute;
  width: 80vw;
  max-height: 70vh;
  overflow-y: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  .box {
    padding: 15px;
    h2 {
      text-align: center;
      font-weight: normal;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
    }
    ul {
      li {
      }
    }
  }
  .bottom {
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #eee;
  }
}
</style>
