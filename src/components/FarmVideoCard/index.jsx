// src/components/FarmVideoCard/index.js
import React from 'react';
import { View, Text, Video } from '@tarojs/components'; 
import { Cell } from '@nutui/nutui-react-taro'; 
import { pxTransform } from '@tarojs/taro';
import './index.less'; 
const FarmVideoCard = ({
  source, 
  locationText,
  codeText,
  onPlay,
  onPause,
  onEnded, 
  ...rest 
}) => {

  return (
    // 外层容器，用于设置圆角和定位叠加文本
    <View className='image-container'>
      {/* 使用 Cell 包裹 Video，并设置 padding 为 0 (如果需要 NutUI 的 Cell 样式) */}
      {/* 如果不需要 Cell 的特定样式，可以直接使用 View */}
      <Cell style={{ padding: 0 }}>
        {/* Video 组件 */}
        <Video
          src={source} // 使用传入的 source prop 作为视频源 (假地址)
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded} // 使用 onEnded 对应播放结束事件
          style={{ height: pxTransform(320), width: '100%' }} // 设置高度和宽度
          controls={true} // 通常视频需要控制条，这里默认显示
          poster="" // 可以设置一个封面图地址，这里留空或根据需要传递
          {...rest} // 将其他传入的 props 传递给 Video 组件
        />
      </Cell>

      {/* 叠加文本容器 - 继续使用绝对定位 */}
      <View className='overlay'>
        {/* 左下角文本 */}
        <Text className='location'>{locationText}</Text>
        {/* 右下角文本 */}
        <Text className='code'>{codeText}</Text>
      </View>
    </View>
  );
};

export default FarmVideoCard;
