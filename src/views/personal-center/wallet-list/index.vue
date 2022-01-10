<template>
  <div class="wallet-list bg-gray border-box d-flex flex-column">
    <van-nav-bar
      left-text="返回"
      left-arrow
      class="shadow-md"
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div>
          <h1>测试昵称</h1>
          <span class="text-size-sm text-p">（会员号：00013256）</span>
        </div>
      </template>
    </van-nav-bar>
    <main class="padding-2 flex-1 overflow-auto">
      <wallet-item v-for="item in 5" :key="item" />
    </main>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import WalletItem from '@/components/personal-center/wallet-item'
export default defineComponent({
  components: {
    WalletItem
  }
})
</script>

<style lang="scss" scoped>
.wallet-list {
  height: calc(100vh);
}
</style>
