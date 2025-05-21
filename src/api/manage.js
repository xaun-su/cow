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

//获取繁殖管理列表
const breedingList='/manageLeft/breedingList'

export const getBreedingListData=async ()=>{
  return await request.get(breedingList)

}

//新增疫苗
const addVaccine='/manageRight/addVaccine'

export const addVaccineData=async (data)=>{
  return await request.post(addVaccine,data)
}

//新增配种
const addMating='/manageRight/addBreed'

export const addMatingData=async (data)=>{
  return await request.post(addMating,data)
}
//新增检疫
const addQuarantine='/manageLeft/addQuarantine'

export const addQuarantineData=async (data)=>{
  return await request.post(addQuarantine,data)
}