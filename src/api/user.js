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

export const loginAPI = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取个人信息
export const getUserMsgAPI = () =>
  request({
    url: '/v1_0/user/profile'
  })
// 获取个人相关点赞等数量信息
export const getUserInfoAPI = () =>
  request({
    url: '/v1_0/user'
  })
// 修改用户信息
export const changeUserMsgAPI = (data) =>
  request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
// 修改用户图片
// 如果说的传的是对象，axios会默认的将对象转化称为json 并且默认的会加上content-type:application/json
// 如果说后端需要的数据是multipart/form-data，那么也就是说后端需要的是表单数据
// 表单数据的处理
// const fm = new FormDate()
// fm.append(表单的name, 表单项)
/**
 * 修改用户对象的
 * @param {*} file 图片的file对象
 * @returns promise
 */
export const uploadAvantorAPI = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
// 关注用户
export const getFocusAPI = (id) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: id
    }
  })

// 取消关注
export const cancelFocusAPI = (id) =>
  request({
    url: `/v1_0/user/followings/${id}`,
    method: 'DELETE'
  })
