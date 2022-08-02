import request from '@/utils/request'
// import store from '@/store'
export const getMyChannelAPI = () =>
  request({
    url: '/v1_0/user/channels'
    // headers: {
    //   // Bearer 后面记得有空格
    //   Authorization: 'Bearer ' + store.state.tokenObj.token
    // }
  })
// 获取所有频道数据
export const getAllChannelAPI = () =>
  request({
    url: '/v1_0/channels'
  })
// 删除频道
export const removeChannelAPI = (id) =>
  request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
