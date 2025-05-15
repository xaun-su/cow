import  request from "@/utils/request";

//获取地图数据
const mapApi = "/map/fence";

export const getMapData = async() => {
  return await request.get(mapApi);
}