<template>
  <div class="admin bg-gray padding-2 border-box">
    <div class="user-info d-flex align-items-center">
      <van-image
        width="1.6rem"
        height="1.6rem"
        :src="user.headimgurl | fmtAvatar"
        class="margin-right-2 rounded overflow-hidden"
      />
      <div class="user-container flex-1 overflow-hidden">
        <div
          class="name font-weight-bold text-size-default text-ellipsis line-height-6"
        >
          {{ user.username }}
        </div>
        <div class="phone text-999 text-ellipsis line-height-6">
          <span>电话：</span>
          <span>{{ user.phoneNum }}</span>
        </div>
        <div class="id text-999 text-ellipsis line-height-6">
          <span>ID：</span>
          <span>{{ user.id | fmtFill(8) }}</span>
        </div>
      </div>
      <div class="user-contral">
        <van-icon name="setting-o" size=".6rem" @click="handleSetting" />
      </div>
    </div>
    <!-- 账户内容 -->
    <div class="account bg-white padding-2 margin-top-3 rounded-md">
      <div
        class="title font-weight-bold text-size-default margin-bottom-2 margin-top-1"
      >
        账户
      </div>
      <ul class="d-flex">
        <router-link
          class="flex-1 padding-right-1 h-100"
          to="/admin/walletlist"
          tag="li"
        >
          <div class="bg-gray padding-2 rounded-md position-relative">
            <div class="margin-bottom-2 text-size-sm">
              我的钱包
              <van-icon
                name="arrow"
                size=".3rem"
                class="bg-white rounded-circle arrow-icon float-right"
              />
            </div>
            <div class="text-size-sm text-p exit-text" v-if="exisWallets">
              存在多个钱包
            </div>
            <div class="font-weight-bold text-size-sm" v-else>
              余额：&yen;<span class="text-size-default">{{
                totalWalletMoney
              }}</span>
            </div>
            <div class="icon-box left position-absolute">
              <van-icon name="after-sale" size=".45rem" class="text-white" />
            </div>
          </div>
        </router-link>
        <li class="flex-1 padding-left-1 h-100" @click="showToWalletFn">
          <div class="bg-gray padding-2 rounded-md position-relative">
            <div class="margin-bottom-2 text-size-sm">
              余额转让
              <van-icon
                name="arrow"
                size=".3rem"
                class="bg-white rounded-circle arrow-icon float-right"
              />
            </div>
            <div class="text-size-sm text-p exit-text" v-if="exisWallets">
              存在多个钱包
            </div>
            <div class="font-weight-bold text-size-sm" v-else>
              可转：&yen;<span class="text-size-default">{{
                totalWalletMoney
              }}</span>
            </div>
            <div class="icon-box right position-absolute">
              <van-icon
                name="cash-back-record"
                size=".45rem"
                class="text-white"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 菜单内容 -->
    <div class="menu bg-white padding-2 margin-top-3 rounded-md">
      <van-grid :border="false">
        <van-grid-item
          v-for="menu in menus"
          :text="menu.title"
          :key="menu.title"
          :to="menu.path"
        >
          <template #icon>
            <hd-icon :icon="menu.icon" />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 用户信息 -->
    <edit-user v-model="editUserIsshoow" :user="user" />
    <!-- 展示余额转让钱包 -->
    <hd-popup v-model="showToWallet">
      <h2 class="text-center padding-y-2">钱包列表</h2>
      <ul class="wallets-list">
        <li class="wallets-item bg-gray rounded margin-bottom-4" v-for="item in 5" :key="item">
          <div class="top d-flex justify-content-between text-size-sm bg-success padding-2 text-white">
            <div class="d-flex flex-column align-items-center flex-1">
              <span class="margin-bottom-2">充值余额</span>
              <span>&yen; 3.00</span>
            </div>
            <div class="d-flex flex-column align-items-center flex-1">
              <span class="margin-bottom-2">赠送余额</span>
              <span>&yen; 0.00</span>
            </div>
          </div>
          <hd-card class="text-size-sm padding-1 text-333">
            <hd-card-item>
              <span>所属小区：</span>
              <span>2</span>
            </hd-card-item>
            <hd-card-item>
              <span>所属商户：</span>
              <span>2</span>
            </hd-card-item>
            <hd-card-item>
              <span>商户电话：</span>
              <span>15538141212</span>
            </hd-card-item>
            <hd-card-item>
              <span>钱包ID：</span>
              <span>0001234</span>
            </hd-card-item>
          </hd-card>
          <div class="d-flex justify-content-center padding-bottom-2">
            <van-button block type="primary" size="small" class="w-75" plain to="/admin/walletdetail/2">余额转让</van-button>
          </div>
        </li>
      </ul>
    </hd-popup>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@vue/composition-api'
import EditUser from '@/components/admin/edit-user'
import HdPopup from '@/components/hd-popup'
import HdCard from '@/components/hd-card'
import HdCardItem from '@/components/hd-card-item'
import { accountCentre } from '@/require/admin'
export default defineComponent({
  components: {
    EditUser,
    HdPopup,
    HdCard,
    HdCardItem
  },
  setup(props, context) {
    const editUserIsshoow = ref(false)
    const user = ref({})
    const wallets = ref([])
    // 是否存在多钱包
    const exisWallets = computed(() => wallets.value.length > 0)
    const totalWalletMoney = computed(() => {
      const first = wallets.value[0] || { topupmoney: 0, sendmoney: 0 }
      return first.topupmoney + first.sendmoney
    })
    const getData = async () => {
      try {
        const { code, message, walletList, account } = await accountCentre()
        if (code === 200) {
          user.value = account
          wallets.value = walletList
        } else {
          this.toast(message)
        }
      } catch (e) {
        this.toast('异常错误')
      }
    }
    getData()
    // 设置用户信息
    const handleSetting = () => {
      editUserIsshoow.value = true
    }
    const menus = [
      {
        title: 'IC卡管理',
        icon: 'iccard',
        path: '/admin/icmanage'
      },
      {
        title: '包月管理',
        icon: 'baoyue',
        path: '/admin/monthly-package'
      },
      {
        title: '充电记录',
        icon: 'chongdian',
        path: '/admin/charge-record'
      },
      {
        title: '交易记录',
        icon: 'jiaoyi',
        path: ''
      },
      {
        title: '常见问题',
        icon: 'xinxi',
        path: ''
      }
    ]

    // 是否展示余额转让列表
    const showToWallet = ref(false)
    const showToWalletFn = () => {
      showToWallet.value = true
    }
    return {
      menus,
      editUserIsshoow,
      handleSetting,
      user,
      wallets,
      exisWallets,
      totalWalletMoney,
      getData,
      showToWallet,
      showToWalletFn
    }
  }
})
</script>

<style lang="scss" scoped>
.admin {
  @include m-h-100;
  padding-bottom: 70px;
  .icon-box {
    right: 0;
    bottom: 0;
    width: 40px;
    height: 30px;
    background: rgb(255, 137, 23);
    border-radius: 4px 4px 4px 0;
    @include flex-center;
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 20px;
      left: -10px;
      bottom: 0;
      background: rgba(255, 137, 23, 0.4);
      border-radius: 4px 0 0 4px;
    }
    &.right {
      background: rgb(23, 162, 184);
      &::after {
        background: rgba(23, 162, 184, 0.4);
      }
    }
  }
  .exit-text {
    &::after {
      content: '';
      font-size: 16px;
    }
  }
  .wallets-list {
    max-height: 60vh;
    overflow: auto;
    .wallets-item {
      .top {
        border-radius: 6px 6px 0 0;
        &>div {
          &:last-child {
            border-left: 1px solid #fff;
          }
        }
      }
      &::v-deep .hd-card-item {
        padding: 2px !important;
      }
    }
  }
}
</style>
