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
