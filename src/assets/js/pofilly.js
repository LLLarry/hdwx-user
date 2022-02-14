/**
 * 格式化数组，判断数组中的每一项都为数字，否则将默认值填充不为数字的那一项
 * @param {*} args []
 * @param {*} defaultNum 默认值
 */
const formatNums = (args = [], defaultNum) => {
  const reg = /^-?\d{1,}(\.\d{1,})?$/
  return args.map(arg => {
    const isNum = typeof arg === 'number'
    if (!reg.test(String(arg))) {
      return defaultNum
    }
    return isNum ? arg : Number.parseFloat(arg)
  })
}
/**
 * 获取倍数
 * @param {*} args
 * @returns
 */
const getMultiple = args => {
  // 小数点后面的位数
  let dotLength = 0
  args.forEach(arg => {
    const endStr = arg.toString().split('.')[1] || ''
    dotLength = endStr.length > dotLength ? dotLength : dotLength
  })
  const multiple = Math.pow(10, dotLength)
  return multiple
}

// eslint-disable-next-line no-extend-native
Number.prototype.add = function(...args) {
  const first = this.valueOf()
  const formatList = formatNums([first, ...args], 0)
  const multiple = getMultiple(formatList)
  const result = formatList.reduce((acc, arg) => {
    acc += arg * multiple
    return acc
  }, 0)
  return result / multiple
}

// eslint-disable-next-line no-extend-native
Number.prototype.sub = function(...args) {
  const first = this.valueOf()
  const formatList = formatNums([first, ...args], 0)
  const multiple = getMultiple(formatList)
  const result = args.reduce((acc, arg) => {
    acc -= arg * multiple
    return acc
  }, 0)
  return result / multiple
}
