import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components'; 
import Taro, { useReachBottom } from '@tarojs/taro'; 
import FarmVideoCard from '@/components/FarmVideoCard'; 
import './index.less'; 
import TitleH5 from '@/components/TitleH5/index'; 
import { getMonitorData } from '@/api/index'; 
const MyPage = () => {
  // 状态管理
  const [videoList, setVideoList] = useState([]); // 存储视频列表数据 (数组)
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize] = useState(10); // 每页加载数量 (根据API文档，默认为10)
  const [totalItems, setTotalItems] = useState(0); // 总条数
  const [isLoading, setIsLoading] = useState(false); // 是否正在加载中
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据
  const [error, setError] = useState(null); // 错误信息

  // 临时的假视频地址，用于测试
  const FAKE_VIDEO_URL = 'https://storage.360buyimg.com/nutui/video/video_NutUI.mp4';


  // 获取视频数据函数
  const fetchVideos = async (page) => {
    // 如果正在加载或没有更多数据，则不执行
    if (isLoading || !hasMore) {
      console.log('阻止加载：isLoading:', isLoading, 'hasMore:', hasMore);
      return;
    }

    setIsLoading(true); // 开始加载
    setError(null); // 清除之前的错误
    console.log(`开始加载第 ${page} 页数据...`);

    try {
      // 调用API，传递页码和每页数量
      const res = await getMonitorData({ page: page, pageSize: pageSize });
      console.log('API 返回结果:', res);

      if (res.code === 200) {
        const newVideos = res.data || []; // 获取新的视频数据数组

        // --- 在这里修改数据：用假地址替换 ezopen:// ---
        const processedVideos = newVideos.map(item => {
            return {
                ...item, // 保留原有属性
                F_Address: FAKE_VIDEO_URL // 替换为假视频地址
            };
        });

        setTotalItems(res.total || 0); // 更新总条数

        if (page === 1) {
          setVideoList(processedVideos);
          setHasMore(processedVideos.length < res.total);
        } else {
          // 如果不是第一页，将新数据追加到现有列表后面
          setVideoList(prevList => {
              const newList = [...prevList, ...processedVideos];
               // 判断是否还有更多数据
              setHasMore(newList.length < res.total);
              return newList;
          });
        }


      } else {
        // 处理API返回的错误
        setError(res.message || '获取视频数据失败');
        setHasMore(false); // 获取失败，可能没有更多数据
      }
    } catch (err) {
      // 处理网络或其他异常
      console.error('获取视频数据出错:', err);
      setError('加载数据出错，请稍后重试。');
      setHasMore(false); // 出错，可能没有更多数据
    } finally {
      setIsLoading(false); // 停止加载
      console.log(`第 ${page} 页数据加载完成。`);
    }
  };

  // 页面初次加载时获取第一页数据
  useEffect(() => {
    fetchVideos(1);
  }, []); // 依赖项为空数组，只在组件挂载时执行一次

  // 监听触底事件，加载下一页数据
  useReachBottom(() => {
    console.log('触发触底事件');
    // 只有当还有更多数据且不在加载中时才加载下一页
    if (hasMore && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1); // 页码加1，触发useEffect中的fetchVideos
    } else {
       console.log('触底但未加载：hasMore:', hasMore, 'isLoading:', isLoading);
    }
  });

  // 当currentPage变化时，获取对应页码的数据
  useEffect(() => {
      // 避免初次加载重复获取，只在 currentPage > 1 时触发加载
      if (currentPage > 1) {
         fetchVideos(currentPage);
      }
  }, [currentPage]); // 依赖项为currentPage

  const handlePlay = (e) => {
  };

  const handlePause = (e) => {
  };

  const handleVideoEnded = (e) => {
  };


  return (
    <ScrollView
      className='my-page-container'
      scrollY 
    >
      {/* 页面标题 (H5 环境下显示) */}
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='视频监控列表' />}
      </View>

       {/* 总数量文本 */}
       {/* 只有当 totalItems 大于 0 时才显示 */}
       {totalItems > 0 && (
           <View className='total-quantity'>总数量: {totalItems}</View>
       )}

      {/* 显示加载、错误或空状态 */}
      {isLoading && videoList.length === 0 && <Text className='loading-text'>加载中...</Text>}
      {error && <Text className='error-text'>错误: {error}</Text>}
      {!isLoading && !error && videoList.length === 0 && <Text className='empty-text'>暂无视频数据</Text>}


      {/* 遍历 videoList 数组，渲染多个 FarmVideoCard */}
      {videoList.map((item) => (
        // 为每个列表项提供唯一的 key，通常使用数据的唯一ID
        <View key={item.F_Id} className='video-card-wrapper'>
          <FarmVideoCard
            source={item.F_Address} // 这里现在会是假地址
            locationText={item.F_Title} // 使用 API 返回的 F_Title 作为位置文本
            codeText={item.F_Sequence} // 使用 API 返回的 F_Sequence 作为编号文本
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleVideoEnded}
          />
        </View>
      ))}

      {/* 触底加载更多时的提示 */}
      {isLoading && videoList.length > 0 && <Text className='loading-text'>加载更多中...</Text>}
      {!hasMore && videoList.length > 0 && !isLoading && <Text className='empty-text'>没有更多数据了</Text>}


    </ScrollView>
  );
};

export default MyPage;
