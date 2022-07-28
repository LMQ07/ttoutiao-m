import request from '@/utils/request'
// 需要输入/和两个星星下面才可以出来
/**
 * 登入API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns  promise对象
 */
// 封装的axios post请求会自动在请求头上添加上Content-Type:application/json,所以这边可以不写
// params 查询参数传参 ：‘baseUrl+/v1_0/authorizations?name=张三’
// data 请求体传参：请求体当中携带 payLoad中可以查看

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
