import React, { useState, useEffect, useRef } from 'react';
import { View, Map, Image, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.less'; // 确保你的样式文件存在
import TitleH5 from '@/components/TitleH5/index';
import { getMapData } from '@/api/config'; // 假设 getMapData 函数在这里定义并导入
import greenCircleIcon from '@/static/images/原点.png'; // 绿色圆形图标 (用于围栏顶点)
import customGreenIcon from '@/static/images/animal.png'; // 绿色自定义图标 (牛头图标)
import userLocationIcon from '@/static/images/animal.png'; // 用户位置图标 (示例，可以换一个)

// --- 辅助函数：判断点是否在多边形内 (Ray Casting Algorithm) ---
// point: { longitude, latitude }
// polygonPoints: [{ longitude, latitude }, ...]
function isPointInPolygon(point, polygonPoints) {
    if (!polygonPoints || polygonPoints.length < 3) {
        return false; // 不是一个有效的多边形
    }

    const x = point.longitude;
    const y = point.latitude;

    let inside = false;
    for (let i = 0, j = polygonPoints.length - 1; i < polygonPoints.length; j = i++) {
        const xi = polygonPoints[i].longitude;
        const yi = polygonPoints[i].latitude;
        const xj = polygonPoints[j].longitude;
        const yj = polygonPoints[j].latitude;

        // 检查点是否在顶点上
        if ((x === xi && y === yi) || (x === xj && y === yj)) {
            return true; // 点在顶点上，视为在多边形内
        }

        // 检查点是否在水平边上 (处理水平线段，避免除以零和射线穿过顶点的问题)
         if (yi === yj && yi === y && ((x >= Math.min(xi, xj) && x <= Math.max(xi, xj)) || (x <= Math.min(xi, xj) && x >= Math.max(xi, xj)))) {
             return true; // 点在水平边上，视为在多边形内
         }


        // 检查射线是否与非水平边相交
        const intersect = ((yi > y) !== (yj > y)) &&
                          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

        if (intersect) {
            inside = !inside;
        }
    }

    return inside;
}

// --- 辅助函数：计算两点间距离 (Haversine formula) ---
// point1: { longitude, latitude }
// point2: { longitude, latitude }
// 返回距离，单位米
function calculateDistance(point1, point2) {
    const R = 6371e3; // 地球半径，单位米
    const φ1 = point1.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = point2.latitude * Math.PI / 180;
    const Δφ = (point2.latitude - point1.latitude) * Math.PI / 180;
    const Δλ = (point2.longitude - point1.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // In meters
    return distance;
}

// --- 辅助函数：计算两点间方向 (Bearing) ---
// point1: { longitude, latitude } (起点)
// point2: { longitude, latitude } (终点)
// 返回方向角度，0-360度，0为正北
function calculateBearing(point1, point2) {
    const φ1 = point1.latitude * Math.PI / 180;
    const λ1 = point1.longitude * Math.PI / 180;
    const φ2 = point2.latitude * Math.PI / 180;
    const λ2 = point2.longitude * Math.PI / 180;

    const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) -
              Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    const θ = Math.atan2(y, x); // 弧度

    const bearing = (θ * 180 / Math.PI + 360) % 360; // 转换为角度 0-360
    return bearing;
}

// --- 辅助函数：将角度转换为方向文本 ---
function getDirectionText(bearing) {
    if (bearing >= 337.5 || bearing < 22.5) return '正北方向';
    if (bearing >= 22.5 && bearing < 67.5) return '东北方向';
    if (bearing >= 67.5 && bearing < 112.5) return '正东方向';
    if (bearing >= 112.5 && bearing < 157.5) return '东南方向';
    if (bearing >= 157.5 && bearing < 202.5) return '正南方向';
    if (bearing >= 202.5 && bearing < 247.5) return '西南方向';
    if (bearing >= 247.5 && bearing < 292.5) return '正西方向';
    if (bearing >= 292.5 && bearing < 337.5) return '西北方向';
    return ''; // 默认或错误情况
}


function MyMapComponent() {
  const [mapData, setMapData] = useState(null); // 存储原始API数据
  const [polygons, setPolygons] = useState([]); // 地图多边形数据
  const [markers, setMarkers] = useState([]); // 地图标记点数据
  const [includePoints, setIncludePoints] = useState([]); // 用于自动缩放的点
  const [polylines, setPolylines] = useState([]); // 用于绘制直线导航
  const [fencePolygonPoints, setFencePolygonPoints] = useState([]); // 存储解析后的围栏顶点，用于判断点是否在多边形内
  const [areaInfo, setAreaInfo] = useState(null); // 存储面积/周长信息
  const [cowCounts, setCowCounts] = useState({ inside: 0, outside: 0 }); // 存储栏内/栏外牛数量

  // --- 新增状态：控制下方显示哪个内容块 ---
  // 'default': 显示手动点名 UI
  // 'areaInfo': 显示面积/周长信息 UI
  // 'cowDetail': 显示牛的详情 UI
  // 'navigationInfo': 显示导航信息 UI
  const [visibleContent, setVisibleContent] = useState('default'); // 初始显示手动点名 UI

  // --- 新增状态：存储当前选中的牛的标记点数据 ---
  const [selectedCowMarker, setSelectedCowMarker] = useState(null);

  // --- 新增状态：存储导航信息 ---
  const [navigationDistance, setNavigationDistance] = useState(null);
  const [navigationDirection, setNavigationDirection] = useState(null);

  // --- 新增 Ref：用于标记是否正在处理标记点点击事件 (解决 onTap 冲突) ---
  const isHandlingMarkerTapRef = useRef(false);

  // --- 新增 Ref：存储用户的当前位置 ---
  const userLocationRef = useRef(null);

    // --- Ref: 存储静态标记点数据 (如望丰堡) ---
    const staticMarkersRef = useRef([
       
    ]);


  // --- useEffect 钩子：在组件加载时获取数据和用户位置 ---
  useEffect(() => {
    // 获取地图数据
    const getData = async () => {
      try {
        const res = await getMapData();
        console.log('API返回数据:', res);
        if (res.code === 200 && res.data) {
          setMapData(res.data); // 存储原始数据
        } else {
          Taro.showToast({
            title: res.msg || '获取地图数据失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('获取地图数据异常:', error);
        Taro.showToast({
          title: '获取地图数据异常',
          icon: 'none'
        });
      }
    };

    getData();

    // 获取用户当前位置
    Taro.getLocation({
      type: 'gcj02', // 使用国测局坐标
      success: function (res) {
        console.log('获取用户位置成功:', res);
        userLocationRef.current = { longitude: res.longitude, latitude: res.latitude };
        // 添加一个用户位置标记点
        setMarkers(prevMarkers => [
          ...prevMarkers,
          {
            id: 999, // 用户位置标记点ID，确保唯一
            longitude: res.longitude,
            latitude: res.latitude,
            iconPath: userLocationIcon, // 用户位置图标
            width: 25, height: 25,
            zIndex: 3, // 确保在其他标记点上方
            label: { content: '我的位置', color: '#000', fontSize: 12, bgColor: '#fff', padding: 2, borderRadius: 2, anchorX: -10, anchorY: -25 }
          }
        ]);
      },
      fail: function (err) {
        console.error('获取用户位置失败:', err);
        Taro.showToast({
          title: '获取位置失败，部分功能受限',
          icon: 'none'
        });
      }
    });

  }, []); // 空依赖数组表示只在组件挂载时运行一次

  // --- useEffect 钩子：处理 API 返回的 mapData ---
  useEffect(() => {
      if (mapData) {
          const { fenceInfo, NumInfo, livestockInfo, locationInfo } = mapData;

          // 1. 处理围栏信息
          if (fenceInfo && fenceInfo.length > 0 && fenceInfo[0].F_Map) {
              try {
                  const fenceMapJson = JSON.parse(fenceInfo[0].F_Map);
                  if (fenceMapJson && fenceMapJson.paths && fenceMapJson.paths.length > 0) {
                      // 转换坐标格式 {lat, lng} -> {latitude, longitude}
                      const polygonPoints = fenceMapJson.paths.map(p => ({
                          latitude: p.lat,
                          longitude: p.lng
                      }));
                      setFencePolygonPoints(polygonPoints); // 存储解析后的顶点

                      const newPolygons = [{
                          points: polygonPoints,
                          fillColor: '#b1e5ba', // 填充颜色
                          strokeColor: '#65ce75', // 边框颜色
                          strokeWidth: 2,         // 边框宽度
                          zIndex: 1, // 设置层级
                      }];
                      setPolygons(newPolygons);

                      // 添加围栏顶点标记点
                      const fenceVertexMarkers = polygonPoints.map((point, index) => ({
                          id: index + 1, // 确保ID唯一且为数字类型，从1开始
                          longitude: point.longitude,
                          latitude: point.latitude,
                          iconPath: greenCircleIcon,
                          width: 20,
                          height: 20,
                          zIndex: 2, // 设置层级，确保在多边形上方
                      }));

                      // 合并静态标记点和围栏顶点标记点
                      setMarkers(prevMarkers => [
                          ...prevMarkers.filter(m => m.id === 999), // 保留用户位置标记点
                          ...staticMarkersRef.current, // 添加静态标记点
                          ...fenceVertexMarkers, // 添加围栏顶点标记点
                      ]);

                      // 更新 includePoints，包含围栏顶点和静态标记点
                      const pointsForInclude = [
                          ...polygonPoints,
                          ...staticMarkersRef.current.map(marker => ({
                              longitude: marker.longitude,
                              latitude: marker.latitude
                          }))
                      ];
                      setIncludePoints(pointsForInclude);

                  } else {
                      console.warn('F_Map JSON 结构不符合预期或 paths 为空');
                  }
              } catch (e) {
                  console.error('解析 F_Map JSON 失败:', e);
                  Taro.showToast({ title: '解析围栏数据失败', icon: 'none' });
              }
          } else {
              console.warn('未获取到有效的围栏信息');
              setPolygons([]);
              setFencePolygonPoints([]);
              // 如果没有围栏，只显示静态标记点和用户位置
              setMarkers(prevMarkers => [
                  ...prevMarkers.filter(m => m.id === 999),
                  ...staticMarkersRef.current,
              ]);
               setIncludePoints([
                   ...staticMarkersRef.current.map(marker => ({
                       longitude: marker.longitude,
                       latitude: marker.latitude
                   }))
               ]);
          }

          // 2. 处理面积和周长信息
          if (NumInfo && NumInfo.length > 0) {
              setAreaInfo(NumInfo[0]);
          } else {
              setAreaInfo(null);
          }

          // 3. 处理牛的位置信息和栏内/栏外状态
          if (locationInfo && locationInfo.length > 0) {
              let insideCount = 0;
              let outsideCount = 0;

              const cowMarkers = locationInfo.map((cow, index) => {
                  // F_Isster: 1 在栏内, null/0 在栏外
                  const isInside = cow.F_Isster === 1;
                  if (isInside) {
                      insideCount++;
                  } else {
                      outsideCount++;
                  }

                  // 查找对应的 livestockInfo 获取 F_Id 等信息 (如果需要)
                  // const relatedLivestock = livestockInfo ? livestockInfo.find(ls => ls.F_IMEI === cow.F_IMEI) : null;

                  return {
                      id: 1000 + index, // 牛标记点ID，从1000开始，确保与围栏顶点和静态点不冲突
                      longitude: parseFloat(cow.lng), // 确保是数字
                      latitude: parseFloat(cow.lat), // 确保是数字
                      iconPath: customGreenIcon, // 牛头图标
                      width: 30,
                      height: 30,
                      zIndex: 2, // 确保在多边形上方
                      F_IMEI: cow.F_IMEI, // 存储IMEI，用于详情展示和导航
                      F_Isster: cow.F_Isster, // 存储栏内状态
                      // F_Id: relatedLivestock ? relatedLivestock.F_Id : null, // 如果需要F_Id
                  };
              });

              setCowCounts({ inside: insideCount, outside: outsideCount });

              // 合并所有标记点：用户位置 + 静态点 + 围栏顶点 + 牛标记点
              setMarkers(prevMarkers => {
                  // 过滤掉旧的牛标记点 (ID >= 1000) 和旧的围栏顶点标记点 (ID < 1000 且 ID !== 999 且 ID 不是静态点的ID)
                  const nonDynamicMarkers = prevMarkers.filter(m => m.id === 999 || staticMarkersRef.current.some(sm => sm.id === m.id));
                  return [
                      ...nonDynamicMarkers,
                      ...cowMarkers, // 添加新的牛标记点
                      ...prevMarkers.filter(m => m.id < 1000 && m.id !== 999 && !staticMarkersRef.current.some(sm => sm.id === m.id)), // 添加回围栏顶点标记点 (如果之前有的话)
                  ];
              });


              // 更新 includePoints，包含围栏顶点、静态标记点和牛标记点
               setIncludePoints(prevPoints => {
                   // 过滤掉旧的牛位置点
                   const nonDynamicPoints = prevPoints.filter(p =>
                       fencePolygonPoints.some(fp => fp.latitude === p.latitude && fp.longitude === p.longitude) || // 围栏顶点
                       staticMarkersRef.current.some(sm => sm.latitude === p.latitude && sm.longitude === p.longitude) || // 静态点
                       (userLocationRef.current && p.latitude === userLocationRef.current.latitude && p.longitude === userLocationRef.current.longitude) // 用户位置
                   );
                   const cowPoints = cowMarkers.map(marker => ({
                       latitude: marker.latitude,
                       longitude: marker.longitude
                   }));
                   return [...nonDynamicPoints, ...cowPoints];
               });


          } else {
              console.warn('未获取到有效的牛位置信息');
              setCowCounts({ inside: 0, outside: 0 });
               // 如果没有牛，只显示静态标记点、围栏顶点和用户位置
               setMarkers(prevMarkers => {
                   const nonDynamicMarkers = prevMarkers.filter(m => m.id === 999 || staticMarkersRef.current.some(sm => sm.id === m.id));
                    return [
                       ...nonDynamicMarkers,
                       ...prevMarkers.filter(m => m.id < 1000 && m.id !== 999 && !staticMarkersRef.current.some(sm => sm.id === m.id)), // 添加回围栏顶点标记点
                   ];
               });
               setIncludePoints(prevPoints => {
                    // 过滤掉旧的牛位置点
                   const nonDynamicPoints = prevPoints.filter(p =>
                       fencePolygonPoints.some(fp => fp.latitude === p.latitude && fp.longitude === p.longitude) || // 围栏顶点
                       staticMarkersRef.current.some(sm => sm.latitude === p.latitude && sm.longitude === p.longitude) || // 静态点
                       (userLocationRef.current && p.latitude === userLocationRef.current.latitude && p.longitude === userLocationRef.current.longitude) // 用户位置
                   );
                   return nonDynamicPoints;
               });
          }
      }
  }, [mapData]); // 依赖 mapData 状态，当 mapData 更新时执行

  // --- 清除导航直线和导航信息 ---
  const clearNavigation = () => {
      setPolylines([]); // 清空直线
      setNavigationDistance(null);
      setNavigationDirection(null);
  };


  const handleMarkerTap = (e) => {
    console.log('标记点被点击:', e.detail);
    const clickedMarkerId = e.detail.markerId;

    // 设置标志位为 true，表示正在处理标记点点击
    isHandlingMarkerTapRef.current = true;

    // 在短时间后将标志位重置为 false，允许后续的 onTap 事件处理
    setTimeout(() => {
        isHandlingMarkerTapRef.current = false;
    }, 50); // 50毫秒通常足够

    // 清除之前的导航直线和信息
    clearNavigation();

    // 查找被点击的标记点数据，从当前的 markers 状态中查找
    const clickedMarker = markers.find(marker => marker.id === clickedMarkerId);

    if (clickedMarker) {
        // --- 修改逻辑：首先判断是否是牛头标记点 ---
        // 牛标记点ID范围从1000开始
        const isCowMarker = clickedMarkerId >= 1000;

        if (isCowMarker) {
            console.log(`点击了牛头标记点 ID ${clickedMarkerId}, IMEI: ${clickedMarker.F_IMEI}`);
            setVisibleContent('cowDetail'); // 点击牛头图标，显示牛的详情 UI
            setSelectedCowMarker(clickedMarker); // 存储当前选中的牛标记点数据
        } else {
            // 如果不是牛头标记点，再判断是否在多边形区域内
            // 使用解析后的围栏顶点进行判断
            const isInsidePolygon = fencePolygonPoints.length > 0 ? isPointInPolygon(clickedMarker, fencePolygonPoints) : false;

            if (isInsidePolygon) {
                console.log(`点击了多边形内的非牛标记点 ID ${clickedMarkerId}`);
                setVisibleContent('areaInfo'); // 在多边形内且不是牛，显示面积/周长信息 UI
                setSelectedCowMarker(null); // 不是牛，清除选中的牛
            } else {
                console.log(`点击了多边形外的非牛标记点 ID ${clickedMarkerId}`);
                // 处理其他非牛标记点（如望丰堡、用户位置）在多边形外的情况
                // 目前是回到默认，如果需要为特定ID显示其他内容，可以在这里添加判断
                setVisibleContent('default'); // 点击其他标记点回到默认
                setSelectedCowMarker(null); // 不是牛，清除选中的牛
            }
        }
    } else {
        console.log(`未找到 ID 为 ${clickedMarkerId} 的标记点数据`);
        // 如果找不到标记点数据，回到默认状态并清除选中的牛
        setVisibleContent('default');
        setSelectedCowMarker(null);
    }
  };

  // --- 处理地图空白区域点击事件 ---
  const handleMapTap = (e) => {
    console.log('地图空白区域被点击:', e.detail);

    // 检查标志位，如果刚刚处理了标记点点击，则忽略此 onTap 事件
    if (isHandlingMarkerTapRef.current) {
        console.log('忽略紧随标记点点击的地图空白区域点击事件');
        return; // 忽略此事件
    }

    // 清除之前的导航直线和信息
    clearNavigation(); // <-- 在点击空白区域时也清除导航

    // --- 新增逻辑：判断点击坐标是否在多边形内 ---
    const clickedPoint = { longitude: e.detail.longitude, latitude: e.detail.latitude };

    // 使用解析后的围栏顶点进行判断
    const isInsidePolygonArea = fencePolygonPoints.length > 0 ? isPointInPolygon(clickedPoint, fencePolygonPoints) : false;

    if (isInsidePolygonArea) {
        console.log('点击位置在多边形区域内');
        setVisibleContent('areaInfo'); // 在多边形内，显示面积/周长信息 UI
    } else {
        console.log('点击位置在多边形区域外');
        setVisibleContent('default'); // 不在多边形内，显示默认 UI
    }

    // 点击空白区域时清除选中的牛
    setSelectedCowMarker(null);
  };


  // --- 处理直线导航按钮点击事件 ---
  const handleStraightLineNavigation = () => {
      console.log('点击了直线导航');

      if (!userLocationRef.current) {
          Taro.showToast({
              title: '正在获取您的位置，请稍候重试',
              icon: 'none'
          });
          // 可以再次尝试获取位置
          Taro.getLocation({
              type: 'gcj02',
              success: function (res) {
                userLocationRef.current = { longitude: res.longitude, latitude: res.latitude };
                // 获取位置成功后再次尝试导航
                handleStraightLineNavigation();
              },
              fail: function (err) {
                console.error('再次获取用户位置失败:', err);
                Taro.showToast({
                  title: '获取位置失败，无法进行导航',
                  icon: 'none'
                });
              }
            });
          return;
      }

      if (!selectedCowMarker) {
          console.warn('没有选中的牛标记点');
          Taro.showToast({
              title: '请先选择一头牛',
              icon: 'none'
          });
          return;
      }

      const userPoint = userLocationRef.current;
      const cowPoint = { longitude: selectedCowMarker.longitude, latitude: selectedCowMarker.latitude };

      // 计算距离和方向
      const distance = calculateDistance(userPoint, cowPoint);
      const bearing = calculateBearing(userPoint, cowPoint);
      const directionText = getDirectionText(bearing);

      setNavigationDistance(Math.round(distance)); // 取整米
      setNavigationDirection(directionText);

      // 绘制直线
      const newLine = {
          points: [userPoint, cowPoint],
          color: '#65ce75', // 绿色
          width: 4,
          dottedLine: false, // 实线
          arrowLine: true, // 显示方向箭头 (部分平台支持)
          zIndex: 3, // 确保直线在标记点下方或上方，根据需要调整 (可能需要高于标记点 zIndex: 2)
      };
      setPolylines([newLine]); // 设置直线，清除之前的直线

      // 切换下方内容为导航信息
      setVisibleContent('navigationInfo');

      // 可以选择调整地图视野以同时包含用户位置和牛的位置
      // setIncludePoints([userPoint, cowPoint]); // 如果需要自动缩放视野到直线两端，取消注释此行
  };


  return (

    <View className="map-page-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 地图组件占据上方区域 */}
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='围栏' />}
      </View>
      <Map
        scale={14}  // 初始缩放级别
        polygons={polygons}
        markers={markers}
        includePoints={includePoints}
        polylines={polylines} // 添加 polylines 属性
        showCompass
        enableBuilding
        onMarkerTap={handleMarkerTap} // 绑定标记点点击事件
        onTap={handleMapTap} // 绑定地图空白区域点击事件
        style={{ width: '100%', flexGrow: 1 }} // flexGrow: 1 让地图填充剩余空间
      />

      {/* 下方内容区域，根据 visibleContent 状态条件渲染 */}
      {/* 可以给 map-bottom-content 添加一些基础样式，比如背景色、padding 等 */}
      <View className="map-bottom-content" style={{ padding: '10px', backgroundColor: '#fff' }}>
        {/* 默认 - 手动点名 */}
        {visibleContent === 'default' && (
          <View className="content-block default-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <View style={{
                width: '80px', // 调整大小以匹配图片
                height: '80px',
                borderRadius: '50%', // 使其成为圆形
                backgroundColor: '#65ce75', // 绿色背景
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10px'
            }}>
               <Text style={{ color: '#fff', fontSize: '16px' }}>手动点名</Text>
            </View>
          </View>
        )}

        {/* 面积/周长信息 */}
        {visibleContent === 'areaInfo' && areaInfo && cowCounts && (
          <View className="content-block area-info-content" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
            <View style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
              <View style={{ textAlign: 'center' }}>
                <Text style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>{cowCounts.inside}头</Text>
                <Text style={{ fontSize: '12px', color: '#666', marginLeft: '5px' }}>栏内</Text>
              </View>
              <View style={{ textAlign: 'center' }}>
                <Text style={{ color: 'orange', fontSize: '20px', fontWeight: 'bold' }}>{cowCounts.outside}头</Text>
                <Text style={{ fontSize: '12px', color: '#666', marginLeft: '5px' }}>栏外</Text>
              </View>
            </View>
            <View style={{ borderTop: '1px solid #eee', paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
              {/* 假设有面积和周长的小图标，需要引入并使用 Image */}
              {/* <Image src={areaIcon} style={{ width: '16px', height: '16px', marginRight: '5px' }} /> */}
              <View><Text>面积: {areaInfo.F_Area}㎡</Text></View>
              {/* <Image src={perimeterIcon} style={{ width: '16px', height: '16px', marginRight: '5px' }} /> */}
              <View><Text>周长: {areaInfo.F_Zc}m</Text></View>
            </View>
          </View>
        )}

        {/* 牛的详情 */}
        {visibleContent === 'cowDetail' && selectedCowMarker && (
          <View className="content-block cow-detail-content" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
            <View style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              {/* 牛头图标 */}
              <Image src={customGreenIcon} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
              <View style={{ flexGrow: 1 }}> {/* 让文本区域占据剩余空间 */}
                <Text style={{ fontWeight: 'bold', fontSize: '16px' }}>牛的编号</Text>
                {/* 使用标记点中存储的IMEI */}
                <Text style={{ fontSize: '12px', color: '#666', display: 'block' }}>IMEI: {selectedCowMarker.F_IMEI}</Text>
              </View>
              {/* 切换按钮，功能待定，这里只是UI */}
              <Text style={{ color: 'green', marginLeft: 'auto', fontSize: '14px' }}>切换</Text>
            </View>

            {/* 定位时间/地点/距离 - API未直接提供时间/地点字符串，这里显示经纬度作为地点示例 */}
            {/* 如果需要更详细的地点描述，需要进行逆地理编码 */}
            <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '5px' }}>定位地点: {selectedCowMarker.latitude.toFixed(6)}, {selectedCowMarker.longitude.toFixed(6)}</Text>
            {/* 距离会在点击直线导航后计算并显示在导航信息区域 */}
            <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '20px' }}>栏内状态: {selectedCowMarker.F_Isster === 1 ? '在栏内' : '在栏外'}</Text>


            {/* 闪光响铃按钮 - 功能待实现 */}
            <View style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              <View
                style={{ border: '1px solid #65ce75', borderRadius: '20px', padding: '8px 20px', color: '#65ce75', fontSize: '14px' }}
                onClick={() => { Taro.showToast({ title: '闪光响铃功能待实现', icon: 'none' }); }}
              >
                闪光响铃
              </View>
            </View>

            {/* 地图导航和直线导航按钮 */}
            <View style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
              {/* 地图导航按钮 (功能待实现) */}
              <Button size="mini" style={{ backgroundColor: '#65ce75', color: '#fff', borderRadius: '20px', padding: '10px 20px', fontSize: '14px', border: 'none' }} onClick={() => { /* 地图导航逻辑 */ Taro.showToast({ title: '地图导航功能待实现', icon: 'none' }); }}>地图导航</Button>
              {/* 直线导航按钮 */}
              <Button size="mini" style={{ backgroundColor: '#65ce75', color: '#fff', borderRadius: '20px', padding: '10px 20px', fontSize: '14px', border: 'none' }} onClick={handleStraightLineNavigation}>直线导航</Button>
            </View>
          </View>
        )}

        {/* 导航信息 */}
        {visibleContent === 'navigationInfo' && navigationDistance !== null && navigationDirection !== null && selectedCowMarker && (
            <View className="content-block navigation-info-content" style={{ padding: '20px', textAlign: 'center' }}>
                {/* 导航信息 UI */}
                 <Text style={{ fontSize: '14px', color: '#666', display: 'block', marginBottom: '5px' }}>
                    导航至牛 IMEI: {selectedCowMarker.F_IMEI}
                </Text>
                <Text style={{ fontSize: '16px', color: '#333' }}>
                    该牛位于您 <Text style={{ color: '#65ce75', fontWeight: 'bold' }}>{navigationDirection}{navigationDistance}米</Text>
                </Text>
                <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginTop: '5px' }}>
                    请沿着指示方向前行
                </Text>
            </View>
        )}
      </View>
    </View>
  );
}

export default MyMapComponent;
