const scrollFn = Symbol('scrollFn')
export default class HdScroll {
    constructor (el, options = {}) {
        this.eventMap = {}
        this.el = el
        this.options = options
        this.init(el, options)
    }

    init (el, options) {
        this.observer = observerFn(el, () => {
            this.state.cHeight = this.state.cel.offsetHeight
        })
        this.proxy(el, options)
        this.bindEvent()
    }

    proxy (el, { bottomRange = 50 } = options) {
        try {
            const cel = el.children[0]
            const elHeight = el.offsetHeight
            const cHeight = cel.offsetHeight
            const maxScrollRange = cHeight - elHeight
            const initState = {
                el, // 父元素
                elHeight, // 父元素高度
                cel, // 子元素
                cHeight, // 子元素高度
                maxScrollRange, // 最大滚动距离
                bottomScrollRange: maxScrollRange - bottomRange, // 滚动触底距离
                status: 0, // 0 未达到触底距离 1 已达到处理距离  注意：达到处理距离时，当前滚动实例处于锁死状态
                scrollTop: 0 // 上次滚动的位置
            }
            this.state = new Proxy(initState, {
                get (target, key) {
                    return target[key]
                },
                set: (target, key, value) => {
                    switch (key) {
                        case 'elHeight':
                            this.state.maxScrollRange = target.cHeight - value
                            break
                        case 'cHeight':
                            this.state.maxScrollRange = value - target.elHeight
                            break
                        case 'maxScrollRange':
                            this.state.bottomScrollRange = value - bottomRange
                            break
                    }
                    target[key] = value
                    return true
                }
            })
        } catch (error) {
            throw new Error(error)
        }
    }

    bindEvent () {
        this.state.el.addEventListener('scroll', this[scrollFn].bind(this))
    }

    /**
     * 绑定事假
     * @param {*} eventName 事件名
     * @param {*} callback 回调函数
     */
    on (eventName = 'key', callback = () => {}) {
        this.eventMap[eventName] = callback
    }

    /**
     * 完成上啦加载
     */
    finishPullUp () {
        // 重新计算子元素的高度
        this.el.scrollTop = this.state.scrollTop // 将元素的滚动位置设置为 上次保存的滚动位置
        this.state.cHeight = this.state.cel.offsetHeight
        this.state.status = 0
    }

    /**
     * 刷新实例
     */
    refresh () {
        this.destroy()
        this.init(this.el, this.options)
    }

    destroy () {
        this.observer && this.observer.disconnect()
        this.state.el.removeEventListener('scroll', this[scrollFn].bind(this))
    }

    /**
     * 滚动到指定位置
     * @param {*} y 滚动位置
     * @param {*} time 过渡时间
     */
    scrollTo (y, time) {
        scrollTop(this.el, y, time)
    }

    /**
     * 核心滚动处理函数 (私有方法)
     * @param {*} event 滚动事件
     */
    [scrollFn] (event) {
        const target = event.target || event.srcElement
        this.state.scrollTop = target.scrollTop
        const { bottomScrollRange } = this.state
        if (this.state.scrollTop >= bottomScrollRange && this.state.status === 0) {
            this.state.status = 1
            const { pullingUp } = this.eventMap
            pullingUp && pullingUp()
        }
    }
}

/**
 * 滚动过渡
 * @param {*} el 滚动元素
 * @param {*} number 滚动距离 scrollTop
 * @param {*} time 耗时
 * @returns
 */
const scrollTop = (el, number = 0, time) => {
    if (!time) {
        el.scrollTop = number
        return number
    }
    const spacingTime = 20 // 设置循环的间隔时间  值越小消耗性能越高
    let spacingInex = time / spacingTime // 计算循环的次数
    let nowTop = el.scrollTop // 获取当前滚动条位置
    const everTop = (number - nowTop) / spacingInex // 计算每次滑动的距离
    const scrollTimer = setInterval(() => {
        if (spacingInex > 0) {
            spacingInex--
            scrollTop(el, nowTop += everTop)
        } else {
            clearInterval(scrollTimer) // 清除计时器
        }
    }, spacingTime)
}

/**
 * 监听元素内部变化
 * @param {*} targetNode 监听元素
 * @param {*} cb 回调函数
 * @returns observer 实例
 */
const observerFn = (targetNode, cb) => {
    // 观察器的配置（需要观察什么变动）
    const config = { attributes: true, childList: true, subtree: true }
    // 当观察到变动时执行的回调函数
    const callback = function (mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                cb && cb()
                // console.log('A child node has been added or removed.')
            } else if (mutation.type === 'attributes') {
                // console.log('The ' + mutation.attributeName + ' attribute was modified.')
            }
        }
    }
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback)
    // 以上述配置开始观察目标节点
    observer.observe(targetNode, config)
    return observer
}
