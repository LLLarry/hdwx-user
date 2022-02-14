<template>
  <van-popup
    :value="addIcVisible"
    position="top"
    class="bg-gray padding-x-2 padding-y-2 border-box"
    @click-overlay="closed"
  >
    <h3 class="padding-bottom-3 padding-top-1 text-center text-size-default">
      绑定IC卡
    </h3>
    <van-form @submit="onSubmit" class="rounded-md bg-white overflow-hidden">
      <van-field
        label="IC卡号"
        v-model="modelData.card"
        :rules="[{ validator: validatorCard, message: '请输入IC卡不正确' }]"
      >
        <template #input>
          <div class="input-box d-flex align-items-center w-100">
            <input
              class="van-field__control flex-1"
              v-model="modelData.card"
              placeholder="请输入IC卡号"
            />
            <van-icon
              name="scan"
              size="0.55rem"
              class="text-success font-weight-bold"
              @click="handleScan"
            />
          </div>
        </template>
      </van-field>
      <van-field label="是否关联钱包">
        <template #input>
          <van-radio-group v-model="modelData.radio" direction="horizontal">
            <van-radio :name="1">是</van-radio>
            <van-radio :name="2">否</van-radio>
          </van-radio-group>
        </template>
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
import { scanQRCode } from '@/utils/wechat-util'
import parseURL from '@/utils/parse-url'
import { bindingonline } from '@/require/admin'
export default defineComponent({
  model: {
    prop: 'addIcVisible',
    event: 'changeAddIcVisible'
  },
  props: {
    addIcVisible: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit, root, parent }) {
    // 数据仓库
    const modelData = ref({
      radio: 2
    })
    // 提交回调
    const onSubmit = async () => {
      try {
        const { card: cardNum, radio: relevawalt } = modelData.value
        const { code, message } = await bindingonline({
          cardNum,
          relevawalt,
          uid: root.$store.state.user.id
        })
        if (code === 200) {
          root.alert('绑定成功').then(() => {
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
    // 校验卡号函数
    const validatorCard = val => {
      return /^[0-9a-fA-F]{8}$/.test(val)
    }
    // 调起扫一扫回调
    const handleScan = async () => {
      try {
        const url = await scanQRCode()
        const { status, message, cardNumber } = parseURL(url)
        if (status !== 200) return root.toast(message)
        if (typeof cardNumber === 'undefined') {
          return root.$toast('请扫描IC卡背面的二维码')
        }
        modelData.value = {
          ...modelData.value,
          card: cardNumber
        }
      } catch (e) {
        root.toast('异常错误')
      }
    }

    // 监听组件是否展示，展示时初始化数据
    watch(
      () => props.addIcVisible,
      val => {
        if (val) {
          modelData.value = {
            radio: 2
          }
        }
      }
    )
    return {
      onSubmit,
      modelData,
      closed,
      validatorCard,
      handleScan
    }
  }
})
</script>
