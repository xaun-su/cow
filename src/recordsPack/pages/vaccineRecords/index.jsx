import React, { useState } from 'react';
import { View, Text, Textarea, Input } from '@tarojs/components'; // 导入 Input 组件备用
import Taro from '@tarojs/taro';
import { ArrowRight, Camera } from '@nutui/icons-react-taro'; // 导入 Camera 图标
import './index.less'; // 引入页面样式文件
import { TextArea } from '@nutui/nutui-react-taro'
const AddVaccinationRecord = () => {
  // 使用 useState 管理表单数据
  const [formData, setFormData] = useState({
    herdsmanName: '', // 对应截图中的“牧民”
    herdsmanPhone: '', // 对应截图中的“电话”
    herdsmanAddress: '', // 对应截图中的“地址”
    vaccineName: '', // 疫苗名称
    vaccineBatch: '', // 疫苗批次
    injectionCount: '', // 接种支数
    selectedLivestock: null, // 已选择的牲畜，初始为 null
    notes: '', // 备注
    proofImage: null, // 证明文件或路径
  });

  // 通用的输入框变化处理函数
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 处理证明上传点击事件
  const handleProofUpload = () => {
    console.log('点击了证明上传'); // 修正 console.log
    // TODO: 实现图片/文件上传逻辑
    Taro.chooseImage({
      count: 1, // 最多选择一张图片
      sizeType: ['compressed'], // 可以指定原图或压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片路径:', tempFilePaths);
        // TODO: 将图片路径或文件上传到服务器，并更新 proofImage 状态
        setFormData(prevData => ({ ...prevData, proofImage: tempFilePaths[0] }));
      },
    });
  };

  // 处理选择牲畜点击事件
  const handleSelectLivestock = () => {
    console.log('点击了选择牲畜'); // 修正 console.log
  };

  // 处理确定提交按钮点击事件
  const handleSubmit = () => {
    console.log('点击了确定提交'); // 修正 console.log
    console.log('待提交的数据:', formData);

  };

  return (
    <View className='add-vaccination-record-page'> {/* 更新类名 */}
      {/* 页面内容区域 */}
      <View className='page-content'>
        {/* 牧民信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>牧民信息(操作员)</Text>
          </View>

          {/* 牧民 */}
          {/* TODO: 替换为 Input 或其他组件 */}
          <View className='list-item' /* onClick={() => handleInputClick('herdsmanName')} */>
            <Text className='item-label'>牧民</Text>
            <Text className={`item-value ${!formData.herdsmanName && 'placeholder'}`}>
              {formData.herdsmanName || '请输入牧民姓名'}
            </Text>
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 电话 */}
          {/* TODO: 替换为 Input 或其他组件 */}
          <View className='list-item' /* onClick={() => handleInputClick('herdsmanPhone')} */>
            <Text className='item-label'>电话</Text>
            <Text className={`item-value ${!formData.herdsmanPhone && 'placeholder'}`}>
              {formData.herdsmanPhone || '请输**系电话'}
            </Text>
          </View>
          <View className='divider'></View>

          {/* 地址 */}
          {/* TODO: 替换为 Input 或其他组件 */}
          <View className='list-item' /* onClick={() => handleInputClick('herdsmanAddress')} */>
            <Text className='item-label'>地址</Text>
            <Text className={`item-value ${!formData.herdsmanAddress && 'placeholder'}`}>
              {formData.herdsmanAddress || '请输入地址'}
            </Text>
          </View>
          <View className='divider'></View>
        </View>

        {/* 疫苗信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>疫苗信息</Text> {/* 更新标题 */}
          </View>

          {/* 疫苗名称 */}
          {/* TODO: 替换为 Input 或其他组件 */}
          <View className='list-item' /* onClick={() => handleInputClick('vaccineName')} */>
            <Text className='item-label'>疫苗名称</Text>
            <Text className={`item-value ${!formData.vaccineName && 'placeholder'}`}>
              {formData.vaccineName || '请输入疫苗名称'}
            </Text>
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 疫苗批次 */}
          {/* TODO: 替换为 Input 或其他组件 */}
          <View className='list-item' /* onClick={() => handleInputClick('vaccineBatch')} */>
            <Text className='item-label'>疫苗批次</Text>
            <Text className={`item-value ${!formData.vaccineBatch && 'placeholder'}`}>
              {formData.vaccineBatch || '请输入疫苗批次'}
            </Text>
          </View>
          <View className='divider'></View>

          {/* 接种支数 */}
          {/* TODO: 替换为 Input 或其他组件 */}
          <View className='list-item' /* onClick={() => handleInputClick('injectionCount')} */>
            <Text className='item-label'>接种支数</Text>
            <Text className={`item-value ${!formData.injectionCount && 'placeholder'}`}>
              {formData.injectionCount || '请输入接种支数'}
            </Text>
          </View>
          <View className='divider'></View>
        </View>

        {/* 添加牲畜部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>添加牲畜</Text>
          </View>

          {/* 选择牲畜 */}
          <View className='list-item select-livestock-item' onClick={handleSelectLivestock}>
            <Text className='item-label'>选择牲畜</Text>
            <View className='item-value-with-arrow'>
              {/* TODO: 显示已选择牲畜的 IMEI 或其他标识 */}
              <Text className='item-value'>{formData.selectedLivestock?.imei || '请选择牲畜'}</Text> {/* 使用 ?. 防止 selectedLivestock 为 null */}
              <ArrowRight size={19} color='#999' /> {/* 右箭头 (尺寸已放大) */}
            </View>
          </View>
          <View className='divider'></View>
        </View>

        {/* 备注部分 */}
        <View className='section notes-section'>
          <View className='list-item'>
            <Text className='item-label'>备注</Text>
          </View>
          {/* Textarea 用于多行输入 */}
          <TextArea
            placeholder='请输入备注信息'
            value={formData.notes} // 绑定状态
            onInput={(e) => handleInputChange('notes', e.detail.value)} // 更新状态
            autoSize maxLength={-1}
          />
        </View>

      </View>

      {/* 底部固定按钮 */}
      <View className='submit-button-container'>
        <View className='submit-button' onClick={handleSubmit}>
          <Text className='submit-button-text'>确定提交</Text>
        </View>
      </View>
    </View>
  );
};

export default AddVaccinationRecord;
