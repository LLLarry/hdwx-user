<template>
  <div class="transfer-result bg-gray">
    <hd-result :title="title" :desc="desc" />
    <main>
      123
    </main>
  </div>
</template>

<script>
import HdResult from '@/components/hd-result'
export default {
  components: {
    HdResult
  },
  data() {
    return {
      title: '成功',
      desc: '余额接收成功'
    }
  }
}
</script>

<style lang="scss" scoped>
.transfer-result {
  min-height: 100vh;
}
</style>
