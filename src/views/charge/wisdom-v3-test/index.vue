<template>
  <div class="wisdom-v3-test">
      <main class="bg-white margin-x-1 padding-2">
          <header class="padding-bottom-1">
              <ul>
                  <li class="padding-y-1">
                      <div class="d-flex">
                          <div class="margin-right-2">
                              <i class="iconfont icon-diannao text-success"></i>
                          </div>
                          <div><span class="text-999">设备编号：</span> 000130</div>
                      </div>
                  </li>
                  <li class="padding-y-1">
                      <div class="d-flex">
                          <div class="margin-right-2">
                              <i class="iconfont icon-yemian text-success"></i>
                          </div>
                          <div><span class="text-999">归属小区：</span>测试小区</div>
                      </div>
                  </li>
                  <li class="padding-y-1">
                      <div class="d-flex">
                          <div class="margin-right-2">
                              <i class="iconfont icon-dianhua text-success"></i>
                          </div>
                          <div><span class="text-999">联系电话：</span><a href="tel://15365465487" class="text-primary">15365465487</a></div>
                      </div>
                  </li>
                  <!-- <li class="padding-y-1">
                      <div class="d-flex justify-content-between">
                          <div class="margin-right-2">
                             计费方式
                          </div>
                          <div class="d-flex align-items-center">
                              <span class="padding-right-3">按功率</span>
                              <van-icon name="arrow-down" size="0.4rem" />
                          </div>
                      </div>
                  </li> -->
              </ul>
              <van-collapse v-model="activeNames" >
                <van-collapse-item
                    title="计费方式"
                    name="1"
                    title-class="title-left"
                    label-class="label-right"
                    value-class="value-right"
                >
                    <template #value>按功率</template>
                    <ul>
                        <li>
                            <div>1.0元/420.0分钟 (0W~200W)</div>
                        </li>
                        <li>
                            <div>1.0元/315.0分钟 (200W~400W)</div>
                        </li>
                        <li>
                            <div>1.0元/210.0分钟 (400W~600W)</div>
                        </li>
                        <li>
                            <div>1.0元/105.0分钟 (600W~800W)</div>
                        </li>
                    </ul>
                </van-collapse-item>
              </van-collapse>
              <section>
                    <div class="d-flex align-items-center justify-content-between">
                        <span>计费方式</span>
                        <span class="text-999">按功率</span>
                    </div>
                    <ul class="text-999 margin-top-2 padding-left-3">
                        <li>
                            <div>1.0元/420.0分钟 (0W~200W)</div>
                        </li>
                        <li>
                            <div>1.0元/315.0分钟 (200W~400W)</div>
                        </li>
                        <li>
                            <div>1.0元/210.0分钟 (400W~600W)</div>
                        </li>
                        <li>
                            <div>1.0元/105.0分钟 (600W~800W)</div>
                        </li>
                    </ul>
              </section>
          </header>
          <section class="padding-y-1">
              <h3 class="margin-bottom-3">选择插座号：</h3>
              <ul class="port-content d-flex flex-wrap">
                  <li
                    class="port-item"
                    v-for="item in 10" :key="item"
                    :class="{ use: item === 3, fi: item === 6 }"
                  >
                      <div>
                          <div class="port-num text-center text-success">{{item}}号</div>
                          <div class="port-status bg-success text-white text-center text-size-sm">{{ item === 3 ? '已占用' : item === 6 ? '故障' : '空闲' }}</div>
                      </div>
                  </li>
              </ul>
          </section>

          <section class="padding-y-1">
              <h3 class="margin-bottom-3">充电时长：</h3>
              <ul class="temp-content d-flex flex-wrap">
                  <li
                    class="temp-item text-666"
                    v-for="item in 6" :key="item"
                    :class="{ active: item === 1}"
                  >
                      <div>
                          1元4小时
                      </div>
                      <div class="temp-point position-absolute d-none">
                          <van-icon name="success" size="0.4rem" class="temp-point-icon position-absolute text-white" />
                      </div>
                  </li>
              </ul>
          </section>

          <section>
              <h3 class="margin-bottom-1">支付方式：</h3>
              <ul class="pay-content d-flex flex-wrap">
                  <li class="pay-item w-100">
                      <div class="d-flex align-items-center padding-y-2">
                          <div class="margin-right-2">
                              <i class="iconfont icon-weixin text-success left-icon"></i>
                          </div>
                          <div>微信支付</div>
                      </div>
                  </li>
                  <li class="pay-item w-100">
                      <div class="d-flex align-items-center padding-y-2">
                          <div class="margin-right-2">
                              <i class="iconfont icon-qianbao text-success left-icon"></i>
                          </div>
                          <div>钱包支付</div>
                      </div>
                  </li>
              </ul>
          </section>

          <section>
              <van-button type="primary" block round class="bg-success margin-top-1">开始充电</van-button>
          </section>
      </main>

      <div class="fixed-nav shadow bg-white rounded-pill d-flex justify-content-between padding-x-4 padding-y-2 text-success">
          <div class="fixed-nav-item padding-left-2">
              <div class="text-center margin-bottom-1"><i class="iconfont icon-dianchibattery141"></i></div>
              <div>充电中</div>
          </div>
          <div class="fixed-nav-item padding-right-2">
              <div class="text-center margin-bottom-1"><i class="iconfont icon-user-fill"></i></div>
              <div>我的</div>
          </div>
          <div class="fixed-nav-scanQr position-absolute bg-white d-flex align-items-center justify-content-center shadow">
              <div class="scanQr-box bg-success d-flex align-items-center justify-content-center">
                  <i class="iconfont icon-saoma text-white"></i>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            activeNames: []
        }
    }
}
</script>

<style lang="scss">
.wisdom-v3-test {
    .bg-success {
        background-color: #07c160 !important;
    }
    min-height: 100vh;
    background: #D8E5ED;
    header {
        /* border-bottom: 1px solid #eee; */
        .van-collapse-item {
            .van-cell {
                padding: 10px 0;
            }
        }
    }
    main {
        min-height: 100vh;
        padding-bottom: 60px;
    }
    .port-content {
        .port-item {
            width: 18%;
            margin-left: 2.5%;
            border: 1px solid #07c160;
            border-radius: 4px;
            box-sizing: border-box;
            margin-bottom: 10px;
            line-height: 1.8;
            &:nth-child(5n-4) {
                margin-left: 0;
            }
            &.use {
                border: 1px solid #E8090A !important;
                .port-num {
                    color: #E8090A !important;
                }
                .port-status {
                    background: #E8090A !important;
                }
            }
            &.fi {
                border: 1px solid #a6a6a6 !important;
                .port-num {
                    color: #a6a6a6 !important;
                }
                .port-status {
                    background: #a6a6a6 !important;
                }
            }
        }
    }
    .temp-content {
        .temp-item {
            position: relative;
            width: 30%;
            margin-left: 5%;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            margin-bottom: 10px;
            line-height: 1.8;
            padding: 5px 0;
            text-align: center;
            &:nth-child(3n-2) {
                margin-left: 0;
            }
            &.active {
                border-color: #07c160;
                color: #07c160;
                .temp-point {
                    display: block !important;
                }
            }
            .temp-point {
                right: 0;
                bottom: 0;
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-left: 10px solid transparent;
                border-right: 10px solid #07c160;
                border-bottom: 10px solid #07c160;
                .temp-point-icon {
                    right: -12px;
                    bottom: -12px;
                }
            }
        }
    }
    .pay-content {
        .pay-item {
            border-bottom: 1px solid #eee;
            &:last-child {
                border-bottom-color: transparent;
            }
            .left-icon {
                font-size: 30px;
                &.icon-qianbao {
                    color: #dfb94c !important;
                }
            }
        }
    }
}
.fixed-nav {
    position: fixed;
    bottom: 5vh;
    left: 10vw;
    right: 10vw;
    .fixed-nav-scanQr {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        .scanQr-box {
            width: 80%;
            height: 80%;
            border-radius: 50%;
            i {
                font-size: 34px;
            }
        }
    }
}
</style>
