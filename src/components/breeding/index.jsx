import React from 'react';
import { View, Text, Image, Navigator } from '@tarojs/components';
import { ArrowRight } from '@nutui/icons-react-taro'; // 导入右箭头图标
import './index.less'; // 引入样式文件
import { Add, Dongdong, UserAdd } from '@nutui/icons-react-taro'
// 使用 JavaScript 函数组件
const QuarantineRecordCard = ({
  livestockId,
  imei,
  operator,
  date,
  onClick
}) => {

  return (
    // 主容器，应用卡片样式，如果可点击，添加 onClick 事件
    <View className='quarantine-record-card' onClick={onClick}>
      {/* 顶部区域：图标、编号/IMEI、箭头 */}
      <View className='card-header'>
        <View className='icon-container'>
          <Add />
        </View>
        <View className='id-info'>
          {/* 牲畜编号 */}
          <Text className='id-label'>{livestockId}</Text>
          {/* IMEI */}
          <Text className='imei'>IMEI: {imei}</Text>
        </View>
        {/* 右箭头图标 */}
        <Navigator url='/pages/animalDetails/index'>
          <ArrowRight size={16} color='#ccc' className='arrow-icon' />
        </Navigator>

      </View>
      <View className='separator'></View>
      <View className='card-header'>
        <View className='icon-container'>
          <Add />
        </View>
        <View className='id-info'>
          {/* 牲畜编号 */}
          <Text className='id-label'>{livestockId}</Text>
          {/* IMEI */}
          <Text className='imei'>IMEI: {imei}</Text>
        </View>
        {/* 右箭头图标 */}
        <Navigator url='/pages/animalDetails/index'>
          <ArrowRight size={16} color='#ccc' className='arrow-icon' />
        </Navigator>

      </View>
      {/* 分隔线 */}
      <View className='separator'></View>

      {/* 底部区域：操作员、日期 */}
      <View className='card-footer'>
        <Text className='operator'>操作员: {operator}</Text>
        <Text className='date'>{date}</Text>
      </View>
    </View>
  );
};

export default QuarantineRecordCard;
