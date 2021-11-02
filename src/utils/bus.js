import Vue from 'vue'

const bus = new Vue()

export default {
    install () {
        Object.defineProperty(Vue.prototype, '$bus', {
            value: bus
        })
    }
}
