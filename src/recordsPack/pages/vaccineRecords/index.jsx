import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components'; // 导入 Input 组件
import Taro from '@tarojs/taro';
import { Add, ArrowRight } from '@nutui/icons-react-taro'; // 导入 Camera 图标
import './index.less'; // 引入页面样式文件
import { TextArea } from '@nutui/nutui-react-taro' // 导入 NutUI TextArea

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
  });

  // 通用的输入框变化处理函数
  // 这个函数已经写好了，可以直接用于 Input 和 TextArea 的 onInput 事件
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };
  // 处理选择牲畜点击事件
  const handleSelectLivestock = () => {
    console.log('点击了选择牲畜'); // 修正 console.log
    // TODO: 实现跳转到选择牲畜页面或弹窗
    // 例如: Taro.navigateTo({ url: '/pages/selectLivestock/index' })
  };

  // 处理确定提交按钮点击事件
  const handleSubmit = () => {
    console.log('点击了确定提交'); // 修正 console.log
    console.log('待提交的数据:', formData);
    // if (!formData.herdsmanName || !formData.herdsmanPhone || !formData.vaccineName || !formData.selectedLivestock) {
    //   Taro.showToast({
    //     title: '请填写必填项并选择牲畜',
    //     icon: 'none'
    //   });
    //   return;
    // }
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
          {/* 使用 Input 组件，绑定 value 和 onInput */}
          <View className='list-item'>
            <Text className='item-label'>牧民</Text>
            <Input
              className={`item-value ${!formData.herdsmanName && 'placeholder'}`}
              placeholder='请输入牧民姓名' // 使用 placeholder 属性
              value={formData.herdsmanName} // 绑定状态值
              onInput={(e) => handleInputChange('herdsmanName', e.detail.value)} // 监听输入变化并更新状态
            />
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 电话 */}
          {/* 使用 Input 组件，绑定 value 和 onInput */}
          <View className='list-item'>
            <Text className='item-label'>电话</Text>
            <Input
              className={`item-value ${!formData.herdsmanPhone && 'placeholder'}`}
              placeholder='请输入联系电话' // 使用 placeholder 属性
              value={formData.herdsmanPhone} // 绑定状态值
              onInput={(e) => handleInputChange('herdsmanPhone', e.detail.value)} // 监听输入变化并更新状态
              type='number' // 设置输入类型为数字键盘
            />
          </View>
          <View className='divider'></View>

          {/* 地址 */}
          {/* 使用 Input 组件，绑定 value 和 onInput */}
          <View className='list-item'>
            <Text className='item-label'>地址</Text>
            <Input
              className={`item-value ${!formData.herdsmanAddress && 'placeholder'}`}
              placeholder='请输入地址' // 使用 placeholder 属性
              value={formData.herdsmanAddress} // 绑定状态值
              onInput={(e) => handleInputChange('herdsmanAddress', e.detail.value)} // 监听输入变化并更新状态
            />
          </View>
          <View className='divider'></View>
        </View>

        {/* 疫苗信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>疫苗信息</Text> {/* 更新标题 */}
          </View>

          {/* 疫苗名称 */}
          {/* 使用 Input 组件，绑定 value 和 onInput */}
          <View className='list-item'>
            <Text className='item-label'>疫苗名称</Text>
            <Input
              className={`item-value ${!formData.vaccineName && 'placeholder'}`}
              placeholder='请输入疫苗名称' // 使用 placeholder 属性
              value={formData.vaccineName} // 绑定状态值
              onInput={(e) => handleInputChange('vaccineName', e.detail.value)} // 监听输入变化并更新状态
            />
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 疫苗批次 */}
          {/* 使用 Input 组件，绑定 value 和 onInput */}
          <View className='list-item'>
            <Text className='item-label'>疫苗批次</Text>
            <Input
              className={`item-value ${!formData.vaccineBatch && 'placeholder'}`}
              placeholder='请输入疫苗批次' // 使用 placeholder 属性
              value={formData.vaccineBatch} // 绑定状态值
              onInput={(e) => handleInputChange('vaccineBatch', e.detail.value)} // 监听输入变化并更新状态
            />
          </View>
          <View className='divider'></View>

          {/* 接种支数 */}
          {/* 使用 Input 组件，绑定 value 和 onInput */}
          <View className='list-item'>
            <Text className='item-label'>接种支数</Text>
            <Input
              className={`item-value ${!formData.injectionCount && 'placeholder'}`}
              placeholder='请输入接种支数' // 使用 placeholder 属性
              value={formData.injectionCount} // 绑定状态值
              onInput={(e) => handleInputChange('injectionCount', e.detail.value)} // 监听输入变化并更新状态
              type='number' // 设置输入类型为数字键盘
            />
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
              <Text className={`item-value ${!formData.selectedLivestock && 'placeholder'}`}>
                {formData.selectedLivestock ? (formData.selectedLivestock.imei || '已选择牲畜') : '请选择牲畜'}
              </Text>
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
          {/* Textarea 用于多行输入，已正确绑定 */}
          <TextArea
            placeholder='请输入备注信息'
            value={formData.notes} // 绑定状态
            onChange={(value) => handleInputChange('notes', value)}
            autoSize maxLength={-1}
            style={{ border: 'none', padding: '10px 0' }}
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
