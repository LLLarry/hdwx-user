const CLASSNAME = 'map-script'

/**
 * 加载地图依赖
 * @returns Promise
 */
const createScript = () => {
  return new Promise((resolve, reject) => {
    let script = document.querySelector(CLASSNAME)
    if (!script) {
      script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=init'
      script.className = CLASSNAME
      script.onload = () => {
        resolve()
      }
      document.body.appendChild(script)
    } else {
      resolve()
    }
  })
}

/**
 * 初始化地图实例
 * @param {*} el 地图展示的元素
 * @param {*} latLng 初始坐标[lat, lng]
 * @returns Promise
 */
export default async function initMap (el, latLng) {
  await createScript()
  // 定义地图中心点坐标
  const center = new TMap.LatLng(...latLng)
  // 定义map变量，调用 TMap.Map() 构造函数创建地图
  const map = new TMap.Map(el, {
      center, // 设置地图中心点坐标
      zoom: 16, // 设置地图缩放级别
      viewMode: '2D' // 显示模式控制
  })
  // 获取缩放控件实例
  const zoomContral = map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM)
  const scaleContral = map.getControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE)
  const rotationContral = map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)
  .SCALE
  // 设置类名
  setClassName(zoomContral, 'd-none')
  setClassName(scaleContral, 'd-none')
  setClassName(rotationContral, 'd-none')
  // 中心点
  new TMap.MultiMarker({
    map, // 指定地图容器
    // 样式定义
    styles: {
        // 创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
        myStyle: new TMap.MarkerStyle({
            width: 16, // 点标记样式宽度（像素）
            height: 16, // 点标记样式高度（像素）
            // src: require('@/assets/images/marker.png'), // 图片路径
            // 焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
            anchor: { x: 16, y: 32 }
        })
    },
    // 点标记数据数组
    geometries: [{ // 点标注数据数组
        id: 'demo',
        styleId: 'marker',
        position: new TMap.LatLng(...latLng),
        properties: {
          title: 'marker'
        }
    }]
  })
  return map
}

function setClassName (control, name) {
  if (!control) {
    return
  }
  control.setClassName(name)
}
