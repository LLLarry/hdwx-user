<template>
  <div class="personal-center bg-gray padding-2 border-box">
    <div class="user-info d-flex align-items-center">
      <van-image
        width="1.6rem"
        height="1.6rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        class="margin-right-2 rounded overflow-hidden"
      />
      <div class="user-container flex-1 overflow-hidden">
        <div class="name font-weight-bold text-size-default text-ellipsis line-height-6">测试昵称</div>
        <div class="phone text-999 text-ellipsis line-height-6">
          <span>电话：</span>
          <span>15532121563</span>
        </div>
        <div class="id text-999 text-ellipsis line-height-6">
          <span>ID：</span>
          <span>00325611</span>
        </div>
      </div>
      <div class="user-contral">
        <van-icon name="setting-o" size=".6rem" />
      </div>
    </div>
    <!-- 账户内容 -->
    <div class="account bg-white padding-2 margin-top-3 rounded-md">
      <div class="title font-weight-bold text-size-default margin-bottom-2 margin-top-1">账户</div>
      <ul class="d-flex">
        <router-link class="flex-1 padding-right-1 h-100" to="/personalCenter/walletlist" tag="li">
          <div class="bg-gray padding-2 rounded-md position-relative">
            <div class="margin-bottom-2 text-size-sm">我的钱包
              <van-icon name="arrow" size=".3rem" class="bg-white rounded-circle arrow-icon float-right" />
            </div>
            <!-- <div class="font-weight-bold text-size-sm">余额：&yen;<span class="text-size-default">0.00</span></div> -->
            <div class="text-size-sm text-p exit-text">存在多个钱包</div>
            <div class="icon-box left position-absolute">
              <van-icon name="after-sale" size=".45rem" class="text-white" />
            </div>
          </div>
        </router-link>
        <li class="flex-1 padding-left-1 h-100">
          <div class="bg-gray padding-2 rounded-md position-relative">
            <div class="margin-bottom-2 text-size-sm">余额转让
              <van-icon name="arrow" size=".3rem" class="bg-white rounded-circle arrow-icon float-right" />
            </div>
            <div class="font-weight-bold text-size-sm">可转：&yen;<span class="text-size-default">0.00</span></div>
            <div class="icon-box right position-absolute">
              <van-icon name="cash-back-record" size=".45rem" class="text-white" />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 菜单内容 -->
    <div class="menu bg-white padding-2 margin-top-3 rounded-md">
      <van-grid
        :border="false"
      >
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
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup (props, context) {
    const menus = [
      {
        title: 'IC卡管理',
        icon: 'iccard',
        path: '/personalCenter/icmanage'
      },
      {
        title: '包月管理',
        icon: 'baoyue',
        path: ''
      },
      {
        title: '充电记录',
        icon: 'chongdian',
        path: ''
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
    console.log(context.root._route.meta.title)
    return {
      menus
    }
  }
})
</script>

<style lang="scss" scoped>
.personal-center {
  @include m-h-100;
  padding-bottom: 70px;
  .icon-box {
    right: 0;
    bottom: 0;
    width: 40px;
    height: 30px;
    background: rgb(255,137,23);
    border-radius: 4px 4px 4px 0;
    @include flex-center;
    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 20px;
      left: -10px;
      bottom: 0;
      background:rgba(255,137,23, 0.4);
      border-radius: 4px 0 0 4px;
    }
    &.right {
      background: rgb(23,162,184);
      &::after {
        background:rgba(23,162,184, 0.4);
      }
    }
  }
  .exit-text {
    &::after {
      content: '';
      font-size: 16px;
    }
  }
}
</style>
