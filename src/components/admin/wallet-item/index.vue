<template>
  <div class="wallet-item bg-white rounded-md overflow-hidden margin-bottom-4">
    <section
      class="header bg-success padding-x-2 padding-y-4 position-relative"
    >
      <div class="total-money text-center">
        <div
          class="money-title text-size-sm d-flex justify-content-center align-items-center"
        >
          <span class="">账户余额</span>
          <van-icon name="question-o" size=".35rem" class="margin-left-1" />
        </div>
        <div class="text-white">
          &yen; <span class="money">{{ walletInfo.total | fmtMoney }}</span>
        </div>
      </div>
      <ul class="money-detail d-flex text-size-sm">
        <li class="flex-1 text-center border-box border-right-1">
          <div>
            <div class="money-title">实际支付</div>
            <div class="text-white">
              &yen;
              <span class="money">{{ walletInfo.topupmoney | fmtMoney }}</span>
            </div>
          </div>
        </li>
        <li class="flex-1 text-center">
          <div>
            <div class="money-title">赠送金额</div>
            <div class="text-white">
              &yen;
              <span class="money">{{ walletInfo.sendmoney | fmtMoney }}</span>
            </div>
          </div>
        </li>
      </ul>
      <van-icon
        v-if="settingShow"
        name="setting-o"
        class="setting position-absolute"
        size=".55rem"
        @click="$router.push(`/admin/walletdetail/${walletInfo.walletid}`)"
      />
    </section>
    <section class="main padding-x-2 padding-y-3 text-size-sm text-666">
      <hd-card>
        <hd-card-item>
          <span>所属小区：</span>
          <span>{{ walletInfo.areaname }}</span>
        </hd-card-item>
        <hd-card-item>
          <span>所属商户：</span>
          <span>{{ walletInfo.mernick }}</span>
        </hd-card-item>
        <hd-card-item>
          <span>商户电话：</span>
          <span>{{ walletInfo.merphone }}</span>
        </hd-card-item>
        <hd-card-item>
          <span>钱包ID：</span>
          <span>{{ walletInfo.walletid | fmtFill(8) }}</span>
        </hd-card-item>
      </hd-card>
    </section>
    <section class="padding-bottom-2">
      <hd-recharge
        :tempList="walletInfo.tempList"
        :getWXConfig="getWXConfig"
        :onSuccess="onSuccess"
      />
      <router-link
        class="text-a text-center text-size-sm margin-top-2 d-block"
        :to="
          `/admin/wallet-recoed?dealid=${walletInfo.merid}&aid=${walletInfo.aid}`
        "
      >
        查看充值消费记录
      </router-link>
    </section>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
import HdRecharge from '@/components/hd-recharge'
import { walletRecharge } from '@/require/admin'
export default defineComponent({
  props: {
    wallet: {
      type: Object,
      default: () => ({})
    },
    onSuccess: {
      type: Function
    }
  },
  components: {
    HdCard,
    HdCardItem,
    HdRecharge
  },
  setup(props, { root, parent }) {
    // settion按钮是否显示
    const settingShow = computed(() => {
      return root.$route.name === 'wallet-list'
    })
    const walletInfo = computed(() => {
      return {
        ...props.wallet,
        total: Number.prototype.add(
          props.wallet.topupmoney,
          props.wallet.sendmoney
        )
      }
    })
    // 获取微信配置信息
    const getWXConfig = async value => {
      try {
        const { code, message, ...config } = await walletRecharge({
          source: 1,
          tempid: value.id,
          dealid: walletInfo.value.merid,
          aid: walletInfo.value.aid,
          openId: root.$store.state.user.openid,
          val: 'wallet'
        })
        if (code === 200) {
          return Promise.resolve(config)
        } else {
          return Promise.reject(message)
        }
      } catch (e) {
        return Promise.reject(new Error('获取信息失败'))
      }
    }
    return {
      settingShow,
      walletInfo,
      getWXConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.wallet-item {
  .header {
    .money-title {
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 5px;
    }
    .total-money {
      .money {
        font-size: 28px;
      }
    }
    .money-detail {
      margin-top: 30px;
      > li {
        border-color: rgba(255, 255, 255, 0.1);
      }
    }
    .setting {
      color: rgba(255, 255, 255, 0.6);
      right: 10px;
      top: 10px;
    }
  }
}
</style>
