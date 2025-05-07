import React from 'react';
import { View, Text } from '@tarojs/components'; // 导入 View 和 Text
import FarmVideoCard from '@/components/FarmVideoCard'; // **确保导入 FarmVideoCard**
import './index.less'; // 导入页面样式文件 (如果需要)
import TitleH5 from '@/components/TitleH5/index';

const MyPage = () => {
  const farmData = {
    videoSrc: 'https://storage.360buyimg.com/nutui/video/video_NutUI.mp4', // 替换为您的视频 URL
    locationText: '放养场',
    codeText: 'L42185216',
    quantity: 11, // 数量数据
  };

  // 您可以在这里定义事件处理函数，并传递给 FarmVideoCard
  const handlePlay = (e) => {
    console.log('Video is playing', e);
  };

  const handlePause = (e) => {
    console.log('Video is paused', e);
  };

  const handleVideoEnded = (e) => {
    console.log('Video ended', e);
  };


  return (
    // 页面整体容器，可以设置灰色背景和内边距
    <View className='my-page-container'> {/* 给页面容器一个类名 */}
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='视频监控列表' />}
      </View>
       {/* 数量文本 */}
       <View className='quantity'>数量 {farmData.quantity}</View>

      {/* 使用 FarmVideoCard 组件 */}
      <FarmVideoCard
        source={farmData.videoSrc} // 传递视频 URL 给 source prop
        locationText={farmData.locationText}
        codeText={farmData.codeText}
        onPlay={handlePlay} // 传递事件处理函数
        onPause={handlePause}
        onEnded={handleVideoEnded}
      />

    </View>
  );
};

export default MyPage;
