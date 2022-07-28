import axios from 'axios'
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
export default request
