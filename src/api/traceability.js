import request from '@/utils/request'

//获取基本信息
const basicInfoApi = '/manageLeft/cattleDetail'

//获取检疫信息
const quarantineInfoApi = '/manageLeft/quarantineInfo'
//获取疫苗信息
const vaccineInfoApi = '/manageRight/getVaccineList'
//获取繁殖信息
const breedingInfoApi = '/manageLeft/breedingInfo'

//获取健康信息
const healthInfoApi = '/api/healthInfo'

export const getBasicInfoData=(id)=>{
  return request.get(`${basicInfoApi}?id=${id}`)
}
export const getQuarantineInfoData=(id)=>{
  return request.get(`${quarantineInfoApi}?id=${id}`) 
}
export const getVaccineInfoData=(id)=>{
   return request.get(`${vaccineInfoApi}?F_liveid=${id}`)
}
export const getBreedingInfoData=(id)=>{
  return request.get(`${breedingInfoApi}?id=${id}`)
}
export const getHealthInfoData=(id)=>{
  return request.get(`${healthInfoApi}?id=${id}`) 
}