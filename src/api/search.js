import request from '@/utils/request'
// 获取相关的
export const getSearchSuggestionAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
// 获得这个搜索的结果
export const getSearchResultAPI = (params) => {
  return request({
    url: '/v1_0/search',
    params
  })
}
