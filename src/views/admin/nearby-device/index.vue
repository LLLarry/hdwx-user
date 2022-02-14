<template>
  <div class="nearby-device position-relative">
    <div id="map-box"></div>
    <!-- 选择设备 -->
    <div class="select-device position-absolute bg-white rounded-md padding-3 shadow-md d-flex">
      <div class="info flex-8">
        <div class="top">
          <div class="title text-000">
            测试昵称 - 000123
            <van-tag type="success" class="text-size-sm padding-x-1 margin-left-1" round>在线</van-tag>
          </div>
          <div class="area text-666 text-size-md margin-y-1">
            小区名称：测试小区
          </div>
          <div class="contral d-flex text-size-sm">
            <div class="use margin-right-2 text-danger padding-x-2">占用插座：17个</div>
            <div class="free text-success padding-x-2">空闲插座：3个</div>
          </div>
        </div>
      </div>
      <div class="rance flex-1 d-flex flex-column align-items-center justify-content-center">
        <i>i</i>
        <div>10.04km</div>
      </div>
    </div>
    <!-- menu -->
    <div class="slide-menu">
      <van-icon name="location" size=".8rem" class="text-success" @click="handleGoCenter" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import initMap from '@/utils/map/initMap'
// import markerCluster from '@/utils/map/marker-cluster'
import markerLayer from '@/utils/map/marker-layer'

export default defineComponent({
  setup () {
    const map = ref(null)
    onMounted(async () => {
      map.value = await initMap(document.querySelector('#map-box'), [32.0263404, 118.6926193])
      markerLayer(map.value)
      console.log(map.value)
    })
    const handleGoCenter = () => {
      map.value.panTo([32.0263404, 118.6926193])
    }
    return {
      handleGoCenter
    }
  }
})
</script>

<style lang="scss" scoped>
.nearby-device {
  height: 100vh;
  #map-box {
    height: 100%;
  }
  .select-device {
    left: 10px;
    bottom: 15px;
    right: 10px;
    z-index: 2000;
    .use {
      background: rgba(220, 53, 69, .2);
      border-radius: 16px;
      padding-top: 3px;
      padding-bottom: 3px;
    }
    .free {
      background: rgba(40, 167, 69, .2);
      border-radius: 16px;
      padding-top: 3px;
      padding-bottom: 3px;
    }
  }
  .slide-menu {
    position: absolute;
    right: 0;
    top: 50%;
    z-index: 2000;
  }
}
</style>
