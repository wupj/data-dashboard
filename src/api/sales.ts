import request from '@/utils/request'

// 今日总览
export const getTodayOverview = () => {
  return request({
    url: '/api/sales/getTodayOverview',
    method: 'post',
  });
}
// 实时拜访
export const getRealTimeVisit = () => {
    return request({
        url: '/api/sales/getRealTimeVisit',
        method: 'post',
    })
}
// 实时订单
export const getRealTimeOrder = () => {
    return request({
        url: '/api/sales/getRealTimeOrder',
        method: 'post',
    })
}
// 批发商交易额排行
export const getVolumeRank = () => {
    return request({
        url: '/api/sales/getVolumeRank',
        method: 'post',
    })
}
// 重点区域
export const getKeyArea = () => {
    return request({
        url: '/api/sales/getKeyArea',
        method: 'post',
    })
}
// 商品销售排行
export const getSalesRank = () => {
    return request({
        url: '/api/sales/getSalesRank',
        method: 'post',
    })
}
// 分时交易
export const getTimeSharingTrade = () => {
    return request({
        url: '/api/sales/getTimeSharingTrade',
        method: 'post',
    })
}
// 品类销售排行
export const getCategorySalesRank = () => {
    return request({
        url: '/api/sales/getCategorySalesRank',
        method: 'post',
    })
}
// 销售人员业绩排行
export const getSalesPerformanceRank = () => {
    return request({
        url: '/api/sales/getSalesPerformanceRank',
        method: 'post',
    })
}
// 交易统计
export const getTradeStatistic = () => {
    return request({
        url: '/api/sales/getTradeStatistic',
        method: 'post',
    })
}
