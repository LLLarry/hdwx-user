
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

export default map => {
  // 地图标记点
  // 创建并初始化MultiMarker
  const markerLayer = new TMap.MultiMarker({
      map, // 指定地图容器
      // 样式定义
      styles: {
          // 创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
          myStyle: new TMap.MarkerStyle({
              width: 25, // 点标记样式宽度（像素）
              height: 25, // 点标记样式高度（像素）
              src: require('@/assets/images/marker.png'), // 图片路径
              // 焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
              anchor: { x: 16, y: 32 }
          })
      },
      // 点标记数据数组
      geometries: createGeometries([{ name: '007421', geoCoord: [108.9308096, 34.3388958] },
      { name: '007422', geoCoord: [108.9911651, 34.2930107] },
      { name: '007423', geoCoord: [113.5140962, 34.8327762] },
      { name: '007424', geoCoord: [113.5004882, 34.8382644] },
      { name: '007425', geoCoord: [113.5004882, 34.8382644] }])
  })
  markerLayer.on('click', (evt) => {
    console.log(evt)
  })
  return markerLayer
}
