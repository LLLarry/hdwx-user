<template>
  <header class="charge-header shadow-md padding-x-3 padding-y-3 bg-white position-fixed">
      <ul class="d-flex flex-wrap text-size-default">
          <li class="w-50 margin-bottom-3">
              <div class="d-flex align-items-center text-000 font-weight-bold">
                  <i class="iconfont icon-diannao text-success text-size-lg"></i>
                  <span class="margin-left-1">设备编号：</span>
                  <span>{{code}}</span>
              </div>
          </li>
          <li class="w-50 margin-bottom-3" v-if="areaname">
              <div class="d-flex align-items-center justify-content-end text-000 font-weight-bold">
                  <i class="iconfont icon-anjian text-success margin-right-1 text-size-lg"></i>
                  <!-- <span class="margin-left-1">所属小区：</span> -->
                  <span class="text-truncate area-name">{{areaname}}</span>
              </div>
          </li>
          <li class="w-100">
              <div class="d-flex align-items-center text-666">
                  <i class="iconfont icon-dianhua text-success text-size-lg"></i>
                  <span class="margin-left-1">如有疑问，请联系：</span>
                  <a class="text-truncate text-primary" :href="`tel:${serverPhone}`">{{serverPhone}}</a>
              </div>
          </li>
      </ul>
  </header>
</template>

<script>
export default {
    props: {
        code: {
            type: String
        },
        areaname: {
            type: String
        },
        serverPhone: {
            type: String
        }
    }
}
</script>

<style lang="scss">
.charge-header {
    top: 0;
    left: 0;
    right: 0;
    .area-name {
        // max-width: 70px;
        // max-width: 140px;
        max-width: 37vw;
    }
}
</style>
