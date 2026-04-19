import request from '@/utils/request';

// 今日运单数量
export const getTodayWaybillQuantity = () => {
  return request({
    url: '/api/logistics/getTodayWaybillQuantity',
    method: 'post',
  });
};
// 各阶段评价用时
export const getStageEvaluationTime = () => {
  return request({
    url: '/api/logistics/getStageEvaluationTime',
    method: 'post',
  });
};
// 人员信息
export const getPeopleInfo = () => {
  return request({
    url: '/api/logistics/getPeopleInfo',
    method: 'post',
  });
};
// 地区统计
export const getAreaStatistic = () => {
  return request({
    url: '/api/logistics/getAreaStatistic',
    method: 'post',
  });
};
// 运单统计
export const getWaybillStatistic = () => {
  return request({
    url: '/api/logistics/getWaybillStatistic',
    method: 'post',
  });
};
// 运单总数
export const getTotalWaybill = () => {
  return request({
    url: '/api/logistics/getTotalWaybill',
    method: 'post',
  });
};
// 车辆信息
export const getVehicleInfo = () => {
  return request({
    url: '/api/logistics/getVehicleInfo',
    method: 'post',
  });
};
// 运单状态
export const getWaybillState = () => {
  return request({
    url: '/api/logistics/getWaybillState',
    method: 'post',
  });
};