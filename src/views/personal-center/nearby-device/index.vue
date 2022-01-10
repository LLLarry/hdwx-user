<template>
  <div class="nearby-device">
    <div id="map-box"></div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import locationData from './locationData'
export default defineComponent({
  setup () {
    const createGeometries = (data) => {
      return data.filter(({ geoCoord }) => {
        const [, lat] = geoCoord
        return lat >= -90 && lat <= 90
      })
      .map(({ name, geoCoord }, index) => {
       const [lng, lat] = geoCoord
        return { // 第二个点标记
            id: index,
            styleId: 'myStyle',
            position: new TMap.LatLng(lat, lng),
            properties: {
                title: name
            }
        }
      })
    }
    const initMap = () => {
      // 定义地图中心点坐标
      const center = new TMap.LatLng(39.984120, 116.307484)
      // 定义map变量，调用 TMap.Map() 构造函数创建地图
      const map = new TMap.Map(document.getElementById('map-box'), {
          center, // 设置地图中心点坐标
          zoom: 16, // 设置地图缩放级别
          viewMode: '2D' // 显示模式控制
      })
      console.log(createGeometries(locationData))
      // 地图标记点
      // 创建并初始化MultiMarker
      // const markerLayer = new TMap.MultiMarker({
      //     map, // 指定地图容器
      //     // 样式定义
      //     styles: {
      //         // 创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
      //         myStyle: new TMap.MarkerStyle({
      //             width: 25, // 点标记样式宽度（像素）
      //             height: 25, // 点标记样式高度（像素）
      //             src: require('../../../assets/images/marker.png'), // 图片路径
      //             // 焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
      //             anchor: { x: 16, y: 32 }
      //         })
      //     },
      //     // 点标记数据数组
      //     geometries: createGeometries(locationData)
      // })
      // console.log(markerLayer)
      new TMap.MarkerCluster({
          id: 'cluster', // 图层id
          map, // 设置点聚合显示在哪个map对象中（创建map的段落省略）
          enableDefaultStyle: true, // 使用默认样式
          minimumClusterSize: 100, // 最小聚合点数：2个
          geometries: createGeometries(locationData),
          zoomOnClick: true, // 点击聚合数字放大展开
          gridSize: 60, // 聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，默认为60，以像素为单位
          averageCenter: false, // 每个聚和簇的中心是否应该是聚类中所有标记的平均值
          maxZoom: 16 // 采用聚合策略的最大缩放级别，若地图缩放级别大于该值，则不进行聚合，标点将全部被展开
      })
    }

    const loadScript = () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=init'
      script.onload = () => {
        initMap()
      }
      document.body.appendChild(script)
    }
    loadScript()
    return {}
  }
})
</script>

<style lang="scss" scoped>
.nearby-device {
  height: 100vh;
  #map-box {
    height: 100%;
  }
}
</style>
