<template>
  <div class="wallet-detail bg-gray border-box padding-2">
    <wallet-item />
    <section class="d-flex align-items-center justify-content-center text-primary" v-show="false">
      <van-icon name="cash-back-record" size=".45rem" class="margin-right-1" />
      <span>余额转让</span>
    </section>
    <section class="bg-white rounded-md padding-2">
      <h3 class="margin-bottom-3 text-size-default d-flex align-items-center">
        <van-icon name="cash-back-record" class="margin-right-1" size=".6rem"/>
        <span>余额转让</span>
      </h3>
      <div class="transfer-balance d-flex bg-gray padding-2 rounded-md">
        <div class="item flex-1">
          <div>
            <div>转让金额</div>
            <div class="text-size-sm d-flex margin-top-1 text-p">
              <div class="margin-right-2">
                充值：<span class="text-success font-weight-bold">&yen;<span class="text-size-default">2.00</span></span>
              </div>
              <div>
                赠送：<span class="text-success font-weight-bold">&yen;<span class="text-size-default">0.00</span></span>
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
          <p class="text-size-sm text-center">转让邀请码</p>
          <div id="qr_code">
            <qrcode v-bind="qrcode" />
          </div>
          <p class="text-size-md text-center font-weight-bold">df12s56</p>
        </div>
      </div>
      <div class="text-p text-size-sm margin-top-2 tip-bottom">
        注：余额只能全额转让，不支持部分转让；仅支持同商户、同小区下的账户余额转让
      </div>
    </section>
  </div>
</template>

<script>
import WalletItem from '@/components/personal-center/wallet-item'
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  components: {
    WalletItem
  },
  setup (props, { root }) {
    const qrcode = ref({
      value: 'df12s56', // 二维码路径
      background: '#FFFFFF', // 二维码背景色
      size: 90, // 二维码大小
      key: new Date().getTime() // 二维码唯一标识
    })
    return {
      qrcode
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
