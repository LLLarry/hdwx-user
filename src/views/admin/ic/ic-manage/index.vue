<template>
  <div class="ic-manage bg-gray d-flex flex-column">
    <van-nav-bar
      left-text="返回"
      left-arrow
      class="shadow-md"
      @click-left="$router.go(-1)"
    >
      <template #title>
        <div>
          <span>IC卡管理</span>
        </div>
      </template>
    </van-nav-bar>
    <main class="padding-top-2 flex-1">
      <ic-item
        v-for="item in cardList"
        :value="item"
        :user="user"
        :key="item.id"
        @handleChange="handleChange"
      />
    </main>
    <footer
      class="fixed-bottom d-flex align-items-center justify-content-center"
    >
      <van-button type="primary" icon="plus" class="w-75" @click="addIcCardFn"
        >绑定IC卡</van-button
      >
    </footer>
    <!-- 添加ic卡 -->
    <add-ic-card v-model="addIcVisible" />
  </div>
</template>

<script>
import IcItem from '@/components/admin/ic-item'
import AddIcCard from '@/components/admin/add-ic-card'

import {
  getOnLineCardList,
  icCardChangeStatus,
  icCardDelete
} from '@/require/admin'
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  components: {
    IcItem,
    AddIcCard
  },
  setup(props, { root }) {
    const addIcVisible = ref(false)
    const cardList = ref([])
    const user = ref({})
    const addIcCardFn = () => {
      addIcVisible.value = true
    }
    const getCardList = async () => {
      const {
        code,
        message,
        cardList: list,
        user: us
      } = await getOnLineCardList()
      if (code === 200) {
        cardList.value = list
        user.value = us
      } else {
        root.toast(message)
      }
    }
    getCardList()
    const handleChange = ({ type, value }) => {
      console.log(type, value)
      let state
      switch (type) {
        case 'guashi':
          state = 2
          handleChangeStatus(state, value)
          break
        case 'jiegua':
          state = 1
          handleChangeStatus(state, value)
          break
        case 'shanchu':
          handleDeleteCard(value)
          break
      }
    }
    // 修改卡状态
    const handleChangeStatus = async (state, value) => {
      try {
        const { code, message } = await icCardChangeStatus({
          cardNum: value.cardID,
          state
        })
        if (code === 200) {
          root.alert('修改成功').then(() => {
            getCardList()
          })
        } else {
          root.toast(message)
        }
      } catch (error) {
        root.toast('异常错误')
      }
    }
    // 删除IC卡
    const handleDeleteCard = async value => {
      try {
        const { code, message } = await icCardDelete({
          cardNum: value.cardID
        })
        if (code === 200) {
          root.alert('删除成功').then(() => {
            getCardList()
          })
        } else {
          root.toast(message)
        }
      } catch (error) {
        root.toast('异常错误')
      }
    }
    return {
      addIcVisible,
      addIcCardFn,
      handleChange,
      cardList,
      user,
      getCardList
    }
  }
})
</script>

<style lang="scss" scoped>
.ic-manage {
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px;
  main {
    overflow: auto;
  }
  .fixed-bottom {
    button {
      height: 38px;
    }
  }
}
</style>
