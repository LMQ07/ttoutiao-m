import axios from 'axios'
import store from '@/store'
// 克隆的目的就是为了如果说我们发起请求的基准地址是不一样的话 就直接克隆就可以了
// 克隆一个
// const request = axios.create()
// 第一种配置方法
// request.defaults.baseURL = 'http://toutiao.itheima.net'
// request.defaults.timeout = 3000
// 第二种配置方法 克隆并且在配置项里面配置
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
// 由于很多请求都需要用到请求头上加上token 这个时候就需要在发起请求前将配置项加上token
// 添加请求拦截器
request.interceptors.request.use(
  // config就是本次发起请求的所有配置项 包含了url baseUrl 以及请求头
  function (config) {
    // 在发送请求之前做些什么
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    // 一定要记得需要返回 否则无法发起请求
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default request
