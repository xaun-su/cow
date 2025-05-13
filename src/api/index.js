import Taro from '@tarojs/taro';
import request from '../utils/request';

//首页

//获取首页数据
const homeApi='/home/getHomeData'
//
// 获取养殖棚数据
const getFarmApi='/home/house'
//
// 获取养殖棚内容数据
const getFarmDetailApi='/home/setting'
//
//第电量设备接口
const getDeviceErrorApi='/home/getDevices/eartag'
//
//离线设备接口
const getDeviceOfflineApi='/home/getDevices/necklace'
//
//获取消息接口
const getMessageApi='/home/message'
//
//获取监控列表
const getMonitorApi='/home/getDevices/video'

export const getMonitorData=async ()=>{
  return await request.get(getMonitorApi)
}

export const getMessageData=async ()=>{
  return await request.get(getMessageApi)
}


export const getFarmData=async ()=>{
  return await request.get(getFarmApi)
}
//获取异常设备
export const getDeviceErrorData=async ()=>{
  return await request.get(getDeviceErrorApi)
}
//获取离线设备
export const getDeviceOfflineData=async ()=>{
  return await request.get(getDeviceOfflineApi) 
}

export const getHomeData=async ()=>{
  return await request.get(homeApi)
}

export const getFarmDetailData = async (id) => {
  const res = await request.get(`${getFarmDetailApi}?F_HouseId=${id}`);
  return res; // 请求的封装应该已经处理了 res.data 的返回
};
