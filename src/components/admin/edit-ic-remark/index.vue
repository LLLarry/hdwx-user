<template>
  <van-popup
    :value="addIcVisible"
    position="top"
    class="bg-gray padding-x-2 padding-y-2 border-box"
    @click-overlay="closed"
  >
    <h3 class="padding-bottom-3 padding-top-1 text-center text-size-default">
      修改卡备注
    </h3>
    <van-form @submit="onSubmit" class="rounded-md bg-white overflow-hidden">
      <van-field
        label="IC卡号"
        name="cardID"
        v-model="modelData.cardID"
        disabled
      >
      </van-field>
      <van-field label="备注" name="remark" v-model="modelData.remark">
      </van-field>
      <div style="padding: 16px;">
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </van-popup>
</template>

<script>
import { defineComponent, ref, watch } from '@vue/composition-api'
import { icCardEditRemark } from '@/require/admin'
export default defineComponent({
  model: {
    prop: 'addIcVisible',
    event: 'changeAddIcVisible'
  },
  props: {
    addIcVisible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit, root, parent }) {
    // 数据仓库
    const modelData = ref({})
    // 提交回调
    const onSubmit = async () => {
      try {
        const { cardID: cardNum, remark } = modelData.value
        const { code, message } = await icCardEditRemark({
          cardNum,
          remark
        })
        if (code === 200) {
          root.alert('备注修改成功').then(() => {
            parent.getCardList()
          })
        } else {
          root.alert(message)
        }
        closed()
      } catch (error) {
        root.toast('异常错误')
      }
    }
    // 关闭回调
    const closed = () => {
      emit('changeAddIcVisible', false)
    }

    watch(
      () => props.data,
      data => {
        modelData.value = { ...data }
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      onSubmit,
      modelData,
      closed
    }
  }
})
</script>
