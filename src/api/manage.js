import Taro from '@tarojs/taro';
import request from '../utils/request';

//获取疫苗管理列表
const vaccineList='/manageRight/getVaccineList'
//获取疫苗管理详情
const vaccineDetails='/manageLeft/vaccineDetail'

export const getVaccineListData=async ()=>{
  return await request.get(vaccineList)
}
export const getVaccineDetailsData=async (id)=>{
  return await request.get(`${vaccineDetails}?F_Id=${id}`) 
}

//获取配种管理列表
const matingList='/manageRight/getBreed'

export const getMatingListData=async ()=>{
  return await request.get(matingList)
}

//获取检疫管理列表
const quarantineList='/manageLeft/quarantine'

export const getQuarantineListData=async ()=>{
  return await request.get(quarantineList)
}