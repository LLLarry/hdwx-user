<template>
  <div class="wallet-detail bg-gray border-box padding-2">
    <wallet-item :wallet="wallet" :onSuccess="onSuccess" />
    <section
      class="d-flex align-items-center justify-content-center text-primary"
      v-show="false"
    >
      <van-icon name="cash-back-record" size=".45rem" class="margin-right-1" />
      <span>余额转让</span>
    </section>
    <section class="bg-white rounded-md padding-2">
      <h3 class="margin-bottom-3 text-size-default d-flex align-items-center">
        <van-icon name="cash-back-record" class="margin-right-1" size=".6rem" />
        <span>余额转让</span>
      </h3>
      <div class="transfer-balance d-flex bg-gray padding-2 rounded-md">
        <div class="item flex-1">
          <div>
            <div>转让金额</div>
            <div class="text-size-sm d-flex margin-top-1 text-p">
              <div class="margin-right-2">
                充值：<span class="text-success font-weight-bold"
                  >&yen;<span class="text-size-default">{{
                    wallet.topupmoney | fmtMoney
                  }}</span></span
                >
              </div>
              <div>
                赠送：<span class="text-success font-weight-bold"
                  >&yen;<span class="text-size-default">{{
                    wallet.sendmoney | fmtMoney
                  }}</span></span
                >
              </div>
            </div>

            <div class="margin-top-2">使用方法</div>
            <div class="text-size-sm d-flex margin-top-1 text-p">
              <div>
                用户打开“微信扫一扫”，扫描此“转让邀请码”，即可完成转让
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <!-- 转让邀请码 -->
          <div v-if="captchaInfo.captcha !== null && captchaInfo.valueTime > 0">
            <p class="text-size-sm text-center">转让邀请码</p>
            <div id="qr_code">
              <qrcode v-bind="qrcode" v-if="captchaInfo.captcha" />
            </div>
            <!-- <p class="text-size-md text-center font-weight-bold">
              {{ captchaInfo.captcha }}
            </p> -->
          </div>
          <!-- 转让邀请码生成按钮 -->
          <div
            class="d-flex h-100 align-items-center justify-content-center"
            v-else
          >
            <van-button
              v-if="!captchaInfo.loading"
              size="small"
              type="primary"
              loading-text="加载中..."
              @click="createCaptcha"
              >生成转让码</van-button
            >
            <van-button
              v-else
              size="small"
              loading
              type="primary"
              loading-text="生成中"
            />
          </div>
        </div>
      </div>
      <div class="text-p text-size-sm margin-top-2 tip-bottom">
        注：余额只能全额转让，不支持部分转让；仅支持同商户、同小区下的账户余额转让
      </div>
    </section>
  </div>
</template>

<script>
import WalletItem from '@/components/admin/wallet-item'
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { getWalletDetail, createWalletCaptcha } from '@/require/admin'
let timer = null
export default defineComponent({
  components: {
    WalletItem
  },
  // props: {
  //   id: {
  //     type: [String, Number]
  //   }
  // },
  setup(props, { root }) {
    const id = root._route.params.id
    const wallet = ref({})
    const captchaInfo = ref({
      captcha: null,
      valueTime: -2,
      loading: false
    })
    const qrcode = computed(() => {
      return {
        value: captchaInfo.value.captcha, // 二维码路径
        background: '#FFFFFF', // 二维码背景色
        size: 90, // 二维码大小
        key: new Date().getTime() // 二维码唯一标识
      }
    })
    // 获取初始化数据
    const getData = async () => {
      try {
        const { code, message, wallets } = await getWalletDetail({
          walletid: id
        })
        if (code === 200) {
          const { captcha, valueTime, ...wal } = wallets
          wallet.value = wal
          captchaInfo.value.captcha = captcha
          captchaInfo.value.valueTime = valueTime
        } else {
          root.toast(message)
        }
      } catch (error) {
        root.toast('异常错误')
      }
    }
    // 创建转让码
    const createCaptcha = async () => {
      try {
        captchaInfo.value = {
          ...captchaInfo.value,
          loading: true
        }
        const {
          code,
          message,
          valueTime,
          captcha
        } = await createWalletCaptcha({ walletid: props.id })
        if (code === 200) {
          captchaInfo.value = {
            ...captchaInfo.value,
            captcha,
            valueTime,
            loading: false
          }
        } else {
          root.toast(message)
        }
      } catch (e) {
        root.toast('异常错误')
      } finally {
        captchaInfo.value = {
          ...captchaInfo.value,
          loading: false
        }
      }
    }
    getData()

    watch(
      captchaInfo,
      value => {
        if (value.valueTime > 0) {
          clearInterval(timer)
          timer = setInterval(() => {
            if (
              typeof captchaInfo.value.valueTime === 'number' &&
              captchaInfo.value.valueTime > 0
            ) {
              captchaInfo.value.valueTime--
            } else {
              clearInterval(timer)
            }
          }, 1000)
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 支付完回调
    const onSuccess = () => {
      getData()
    }
    return {
      qrcode,
      wallet,
      captchaInfo,
      createCaptcha,
      onSuccess
    }
  }
})
</script>

<style lang="scss" scoped>
.wallet-detail {
  @include m-h-100;
  padding-bottom: 90px;
  .transfer-balance {
    .item {
      &:first-child {
        width: calc(100% - 100px);
      }
      &:last-child {
        width: 100px;
        min-height: 100px;
        #qr_code {
          width: 90px;
          height: 90px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
