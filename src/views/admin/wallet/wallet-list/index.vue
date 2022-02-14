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
      <wallet-item
        v-for="wallet in wallets"
        :key="wallet.id"
        :wallet="wallet"
        :onSuccess="onSuccess"
      />
    </main>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import WalletItem from '@/components/admin/wallet-item'
import { getWalletList } from '@/require/admin'
export default defineComponent({
  components: {
    WalletItem
  },
  setup(props, { root }) {
    const wallets = ref([])
    const getData = async () => {
      try {
        const { code, message, wallets: walletList } = await getWalletList()
        if (code === 200) {
          wallets.value = walletList
        } else {
          root.toast(message)
        }
      } catch (error) {
        root.toast('异常错误')
      }
    }
    getData()
    // 支付完回调
    const onSuccess = () => {
      getData()
    }
    return {
      wallets,
      onSuccess
    }
  }
})
</script>

<style lang="scss" scoped>
.wallet-list {
  height: calc(100vh);
}
</style>
