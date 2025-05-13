// src/components/FarmVideoCard/index.js
import React from 'react';
import { View, Text, Video } from '@tarojs/components'; // 导入 Video 和 Text
import { Cell } from '@nutui/nutui-react-taro'; // 导入 Cell (如果您的样式依赖它)
import { pxTransform } from '@tarojs/taro'; // 导入 Taro 和 pxTransform
import './index.less'; // 导入样式文件

const FarmVideoCard = ({
  source, // 视频源 URL (现在是假地址)
  locationText,
  codeText,
  onPlay,
  onPause,
  onEnded, // 使用 onEnded 对应播放结束事件
  ...rest // 捕获并传递其他标准的 Video props
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
