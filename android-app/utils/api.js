import request from "./http";

const baseURL = 'https://api.bilibili.com/x/web-interface'
const searchURL = 'https://s.search.bilibili.com'

// 根据分区获取推荐视频
export const getDynamic = (params) => {
  return request({
    type: 'get',
    url: `${baseURL}/dynamic/region`,
    params: params
  })
}

// 获取最热门视频
export const getRanking = (params = { rid: 1, day: 5, original: 0 }) => {
  return request({
    type: 'get',
    url: `${baseURL}/ranking/region`,
    params: params
  })
}

// 获取默认搜索内容
export const getDefaultSearch = () => {
  // return request.get('/search/default')
  return request({
    type: 'get',
    url: `${baseURL}/search/default`
  })
}

// 获取热门搜索
export const getHotSearch = () => {
  return request({
    type: 'get',
    url: `${searchURL}/main/hotword`
  })
}

// 获取搜索建议
export const getSearchSuggest = (params) => {
  return request({
    type: 'get',
    url: `${searchURL}/main/suggest`,
    params: {
      highlight: true,
      ...params
    }
  })
}

// 获取综合搜索结果
export const getSearchAll = (params) => {
  return request({
    type: 'get',
    url: `${baseURL}/search/all/v2`,
    params: params
  })
}