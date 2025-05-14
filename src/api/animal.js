// animal.js

import request from '../utils/request'; // 导入 request.js 文件，用于发送请求
//获取牲畜列表
const animalList='/manageLeft/cattleList'

//获取牲畜详情
const animalDetails='/manageLeft/cattleDetail'

export const getAnimalListData=async ()=>{
  return await request.get(animalList) 
}
export const getAnimalDetailsData=async (id)=>{
  return await request.get(animalDetails+'?id='+id)
}