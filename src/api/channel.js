import request from '@/utils/request'
import storage from '@/utils/storage'
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
// 添加频道
export const addChannelAPI = (channel) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
// 游客登入的时候将频道存储起来
const MYTOKEN = 'MYTOKEN'
// 存储游客频道数据
export const setMyChannelsToLocal = (value) => storage.set(MYTOKEN, value)
// 获取数据
export const getMyChannelByLocal = () => storage.get(MYTOKEN)
