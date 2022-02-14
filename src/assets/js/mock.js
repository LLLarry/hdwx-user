import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue'

const server = axios.create({
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})

server.interceptors.request.use(
  config => {
    if (config.method.toLowerCase() === 'post') {
      config.data = Qs.stringify(config.data || {})
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

server.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
Vue.prototype.axios = server
