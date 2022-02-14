<template>
  <div>
    <van-popup :value="value" position="top" @click-overlay="closed">
      <div class="padding-x-3 padding-top-3 bg-gray">
        <van-form @submit="onSubmit">
          <div class="d-flex justify-content-center margin-bottom-3">
            <van-image
              fit="fill"
              round
              width="2rem"
              height="2rem"
              :src="copyUser.headimgurl | fmtAvatar"
            />
          </div>
          <van-field
            v-model="copyUser.id"
            name="id"
            label="ID"
            placeholder="ID"
            disabled
          />
          <van-field
            v-model="copyUser.username"
            name="username"
            label="昵称"
            placeholder="昵称"
            disabled
          />
          <van-field
            v-model="copyUser.realname"
            name="realname"
            label="用户名"
            placeholder="用户名"
            disabled
          />
          <van-field
            label="子账号类型"
            disabled
            v-if="[6, 7].includes(copyUser.rank)"
          >
            <template #input>
              <div class="account-type text-success text-size-sm">
                {{ copyUser.rank === 6 ? '维修子账号' : '财务子账号' }}
              </div>
            </template>
          </van-field>
          <van-field
            v-model="copyUser.createTime"
            name="createTime"
            label="注册日期"
            placeholder="注册日期"
            disabled
          />
          <van-field
            v-model="copyUser.phoneNum"
            name="phoneNum"
            label="手机号"
            placeholder="手机号"
          />
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit"
              >提交修改</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from '@vue/composition-api'
import { fmtDate } from '@/utils/util'
import { updateAccountPhoneById } from '@/require/admin'
export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit, root, parent }) {
    const copyUser = ref({})
    watch(
      () => props.user,
      us => {
        copyUser.value = {
          ...us,
          id: String(us.id).padStart(8, '0'),
          createTime: fmtDate(us.createTime)
        }
      }
    )
    const onSubmit = async () => {
      try {
        const phone = (copyUser.value.phoneNum || '').trim()
        if (phone !== '' && !/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
          return root.alert('请输入正确的手机号')
        }
        const { code, message } = await updateAccountPhoneById({ phone })
        if (code === 200) {
          console.log('message', root)
          root.toast('手机号修改成功')
          parent.getData()
          closed()
        } else {
          console.log('message', root)
          root.toast(message)
        }
      } catch (error) {
        console.log('message', root)
        root.toast('异常错误')
      }
    }
    const closed = () => {
      emit('input', false)
    }
    return {
      copyUser,
      onSubmit,
      closed
    }
  }
})
</script>

<style lang="scss" scoped>
.account-type {
  background: rgba(40, 167, 69, 0.1);
  padding: 4px 10px 4px 10px;
  border-radius: 30px;
  line-height: 1.1;
}
</style>
