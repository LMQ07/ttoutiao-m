import request from '@/utils/request'
// 发布对文章以及评论的评论
export const writeCommentAPI = (data) =>
  request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
// 获取评论
export const getCommentAPI = (obj) =>
  request({
    url: '/v1_0/comments',
    params: {
      ...obj
    }
  })
