import React, { useState } from 'react';
import { View, Text, Textarea } from '@tarojs/components'; // 导入 Textarea
import Taro from '@tarojs/taro';
import { ArrowRight } from '@nutui/icons-react-taro'; // 导入右箭头图标
import './index.less'; // 引入页面样式文件
import { TextArea } from '@nutui/nutui-react-taro'

const AddMatingRecord = () => {
  // 使用 useState 管理表单数据
  const [formData, setFormData] = useState({
    herdsmanName: '韩梅梅', // 牧民姓名
    herdsmanPhone: '', // 电话
    matingAddress: '', // 配种地址
    selectedBull: null, // 已选择的公牛对象
    selectedCow: null, // 已选择的母牛对象
    notes: '', // 备注
  });

  // 处理输入框变化（仅备注使用 Textarea，其他字段需替换为 Input 或 Picker）
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 处理选择公牛点击事件
  const handleSelectBull = () => {
    console.log('点击了选择公牛');
    // TODO: 实现跳转到选择牲畜页面或弹出选择器，选择类型为公牛
    // 例如：Taro.navigateTo({ url: '/pages/selectLivestock/index?type=bull' });
    // TODO: 选择后更新 selectedBull 状态
    // setFormData(prevData => ({ ...prevData, selectedBull: selectedBullData }));
  };

  // 处理选择母牛点击事件
  const handleSelectCow = () => {
    console.log('点击了选择母牛');
    // TODO: 实现跳转到选择牲畜页面或弹出选择器，选择类型为母牛
    // 例如：Taro.navigateTo({ url: '/pages/selectLivestock/index?type=cow' });
    // TODO: 选择后更新 selectedCow 状态
    // setFormData(prevData => ({ ...prevData, selectedCow: selectedCowData }));
  };

  // 处理确定提交按钮点击事件 (如果界面有提交按钮的话，截图未显示)
  const handleSubmit = () => {
    console.log('点击了确定提交');
    console.log('待提交的数据:', formData);
    // TODO: 收集 formData 并调用 API 提交数据
  };


  return (
    <View className='add-mating-record-page'> {/* 页面主容器 */}
      {/* 页面内容区域 */}
      <View className='page-content'>

        {/* 牧民信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>牧民信息(操作员)</Text>
          </View>

          {/* 牧民 */}
          {/* TODO: 牧民信息通常是固定的，可能不需要输入或选择 */}
          <View className='list-item'>
            <Text className='item-label'>牧民</Text>
            {/* 显示牧民姓名，这里是示例数据 */}
            <Text className='item-value'>{formData.herdsmanName}</Text>
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 电话 */}
          {/* TODO: 替换为 Input 或其他组件进行输入 */}
          <View className='list-item' /* onClick={() => handleInputClick('herdsmanPhone')} */>
            <Text className='item-label'>电话</Text>
            <Text className={`item-value ${!formData.herdsmanPhone && 'placeholder'}`}>
               {formData.herdsmanPhone || '未填写'}
            </Text>
          </View>
          <View className='divider'></View>

          {/* 配种地址 */}
          {/* TODO: 替换为 Input 或 Picker 等组件进行输入或选择 */}
          <View className='list-item' /* onClick={() => handleInputClick('matingAddress')} */>
            <Text className='item-label'>配种地址</Text>
            <Text className={`item-value ${!formData.matingAddress && 'placeholder'}`}>
               {formData.matingAddress || '未选择'}
            </Text>
          </View>
          {/* 截图上配种地址下方没有分隔线，如果需要请添加 */}
           {/* <View className='divider'></View> */}
        </View>

        {/* 选择配种对象部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>选择配种对象</Text>
          </View>

          {/* 选择公牛 */}
          <View className='list-item select-livestock-item' onClick={handleSelectBull}>
            <Text className='item-label'>选择牲畜</Text>
            <View className='item-value-with-arrow'>
              {/* 显示已选择公牛的信息，例如编号或 IMEI */}
              <Text className={`item-value ${!formData.selectedBull && 'placeholder'}`}>
                 {formData.selectedBull ? formData.selectedBull.imei : '选择公牛'} {/* 示例显示 IMEI */}
              </Text>
              <ArrowRight size={19} color='#999' /> {/* 右箭头 (尺寸已放大) */}
            </View>
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 选择母牛 */}
          <View className='list-item select-livestock-item' onClick={handleSelectCow}>
            <Text className='item-label'>选择牲畜</Text>
            <View className='item-value-with-arrow'>
               {/* 显示已选择母牛的信息，例如编号或 IMEI */}
              <Text className={`item-value ${!formData.selectedCow && 'placeholder'}`}>
                 {formData.selectedCow ? formData.selectedCow.imei : '选择母牛'} {/* 示例显示 IMEI */}
              </Text>
              <ArrowRight size={19} color='#999' /> {/* 右箭头 (尺寸已放大) */}
            </View>
          </View>
          {/* 截图上选择母牛下方没有分隔线，如果需要请添加 */}
          {/* <View className='divider'></View> */}
        </View>

        {/* 备注部分 */}
        <View className='section notes-section'>
          <View className='list-item'>
            <Text className='item-label'>备注</Text>
          </View>
          {/* Textarea 用于多行输入 */}
          <TextArea
            placeholder='请输入备注信息' // 截图上备注下方没有内容，这里添加一个 Textarea 的占位符
            value={formData.notes} // 绑定状态
            onInput={(e) => handleInputChange('notes', e.detail.value)} // 更新状态
            autoSize maxLength={-1} 
          />
        </View>

      </View>

      <View className='submit-button-container'>
        <View className='submit-button' onClick={handleSubmit}>
          <Text className='submit-button-text'>确定提交</Text>
        </View>
      </View>
    </View>
  );
};

export default AddMatingRecord;
