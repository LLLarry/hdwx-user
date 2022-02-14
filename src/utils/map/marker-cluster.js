import locationData from '@/views/admin/nearby-device/locationData'
const createGeometries = data => {
  return data
    .filter(({ geoCoord }) => {
      const [, lat] = geoCoord
      return lat >= -90 && lat <= 90
    })
    .map(({ name, geoCoord }, index) => {
      const [lng, lat] = geoCoord
      return {
        // 第二个点标记
        id: index,
        styleId: 'myStyle',
        position: new TMap.LatLng(lat, lng),
        properties: {
          title: name
        }
      }
    })
}

export default map => {
  return new TMap.MarkerCluster({
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
