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
      <ic-item v-for="item in 5" :key="item" @handleChange="handleChange"/>
    </main>
    <footer class="fixed-bottom d-flex align-items-center justify-content-center">
      <van-button type="primary" icon="plus" class="w-75" @click="addIcCardFn">绑定IC卡</van-button>
    </footer>
    <!-- 添加ic卡 -->
    <add-ic-card v-model="addIcVisible" />
  </div>
</template>

<script>
import IcItem from '@/components/personal-center/ic-item'
import AddIcCard from '@/components/personal-center/add-ic-card'
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  components: {
    IcItem,
    AddIcCard
  },
  setup () {
    const addIcVisible = ref(false)
    const addIcCardFn = () => {
      addIcVisible.value = true
    }
    const handleChange = ({ type, value }) => {
      console.log(type, value)
    }
    return {
      addIcVisible,
      addIcCardFn,
      handleChange
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
