import request from '@/utils/request'
import { method } from 'lodash'
/**
 *
 * @param {*} channelId 频道ID
 * @param {*} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 * @returns 当前频道列表的数据
 */
export const getArticleListAPI = (channelId, timestamp) =>
  request({
    url: '/v1_0/articles',
    // query参数的传参
    params: {
      channel_id: channelId,
      timestamp
    }
  })

// 获得新闻详情
export const getNewsDetailAPI = (id) =>
  request({
    url: `/v1_0/articles/${id}`
  })

// 收藏文章
export const collectPassageAPI = (id) =>
  request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: id
    }
  })

// 取消收藏文章
export const cancelCollectAPI = (id) =>
  request({
    url: `/v1_0/article/collections/${id}`,
    method: 'DELETE'
  })
// 对文章点赞
export const likePassageAPI = (id) =>
  request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: id
    }
  })
// 取消点赞
export const cancalLikeAPI = (id) => {
  return request({
    url: `/v1_0/article/likings/${id}`,
    method: 'DELETE'
  })
}
