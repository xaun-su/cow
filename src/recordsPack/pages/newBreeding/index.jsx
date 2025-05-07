import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components'; // 导入 Input 组件
import Taro from '@tarojs/taro'; // 导入 Taro 用于可能的跳转或提示
import { ArrowRight } from '@nutui/icons-react-taro'; // 导入右箭头图标
import './index.less'; // 引入页面样式文件
import { TextArea } from '@nutui/nutui-react-taro' // 导入 NutUI TextArea
import TitleH5 from '@/components/TitleH5/index';

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

  // 通用的输入框变化处理函数
  // 这个函数适用于 Input 和 TextArea 的 onInput 事件，它们都通过 e.detail.value 提供输入值
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 处理选择公牛点击事件
  const handleSelectBull = () => {
    console.log('点击了选择公牛'); // 修正 console.log
    // TODO: 实现跳转到选择牲畜页面或弹出选择器，选择类型为公牛
    // 例如：Taro.navigateTo({ url: '/pages/selectLivestock/index?type=bull' });
    // TODO: 选择后更新 selectedBull 状态，例如：
    // setFormData(prevData => ({ ...prevData, selectedBull: { imei: '牛A001' } }));
  };

  // 处理选择母牛点击事件
  const handleSelectCow = () => {
    console.log('点击了选择母牛'); // 修正 console.log
    // TODO: 实现跳转到选择牲畜页面或弹出选择器，选择类型为母牛
    // 例如：Taro.navigateTo({ url: '/pages/selectLivestock/index?type=cow' });
    // TODO: 选择后更新 selectedCow 状态，例如：
    // setFormData(prevData => ({ ...prevData, selectedCow: { imei: '牛B002' } }));
  };

  // 处理确定提交按钮点击事件 (如果界面有提交按钮的话，截图未显示)
  const handleSubmit = () => {
    console.log('点击了确定提交'); // 修正 console.log
    console.log('待提交的数据:', formData);
    // TODO: 收集 formData 并调用 API 提交数据
    // 提交前可以进行数据校验
    if (!formData.herdsmanName || !formData.herdsmanPhone || !formData.selectedBull || !formData.selectedCow) {
      Taro.showToast({
        title: '请填写必填项并选择公牛和母牛',
        icon: 'none'
      });
      return;
    }
    // 执行提交，例如：
    // Taro.request({
    //   url: 'YOUR_API_ENDPOINT', // 替换为你的后端API地址
    //   method: 'POST',
    //   data: formData,
    //   success: function (res) {
    //     console.log('提交成功', res.data);
    //     Taro.showToast({ title: '提交成功', icon: 'success' });
    //     // 提交成功后可以返回上一页或重置表单
    //     // Taro.navigateBack();
    //   },
    //   fail: function (error) {
    //     console.error('提交失败', error);
    //     Taro.showToast({ title: '提交失败', icon: 'none' });
    //   }
    // });
  };


  return (
    <View className='add-mating-record-page'> {/* 页面主容器 */}
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='新增配种记录' />}
      </View>
      {/* 页面内容区域 */}
      <View className='page-content'>

        {/* 牧民信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>牧民信息(操作员)</Text>
          </View>

          <View className='list-item'>
            <Text className='item-label'>牧民</Text>
            <Input
              className='item-value'
              placeholder='请输入牧民姓名' // 如果是输入框，可以加占位符
              value={formData.herdsmanName} // **正确：通过 value 属性绑定状态**
              onInput={(e) => handleInputChange('herdsmanName', e.detail.value)} // **正确：监听输入变化并更新状态**
            />
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 电话 - 改为 Input 并正确绑定 value 和 onInput */}
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

          {/* 配种地址 - 改为 Input 并正确绑定 value 和 onInput */}
          <View className='list-item'>
            <Text className='item-label'>配种地址</Text>
            <Input
              className={`item-value ${!formData.matingAddress && 'placeholder'}`}
              placeholder='请输入配种地址' // 使用 placeholder 属性
              value={formData.matingAddress} // 绑定状态值
              onInput={(e) => handleInputChange('matingAddress', e.detail.value)} // 监听输入变化并更新状态
            />
          </View>
        </View>

        {/* 选择配种对象部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>选择配种对象</Text>
          </View>

          {/* 选择公牛 */}
          <View className='list-item select-livestock-item' onClick={handleSelectBull}>
            <Text className='item-label'>选择公牛</Text> {/* 修正标签文本 */}
            <View className='item-value-with-arrow'>
              {/* 使用 Text 显示已选择公牛的信息 */}
              <Text className={`item-value ${!formData.selectedBull && 'placeholder'}`}>
                {formData.selectedBull ? formData.selectedBull.imei : '请选择公牛'} {/* 示例显示 IMEI */}
              </Text>
              <ArrowRight size={19} color='#999' /> {/* 右箭头 (尺寸已放大) */}
            </View>
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 选择母牛 */}
          <View className='list-item select-livestock-item' onClick={handleSelectCow}>
            <Text className='item-label'>选择母牛</Text> {/* 修正标签文本 */}
            <View className='item-value-with-arrow'>
              {/* 使用 Text 显示已选择母牛的信息 */}
              <Text className={`item-value ${!formData.selectedCow && 'placeholder'}`}>
                {formData.selectedCow ? formData.selectedCow.imei : '请选择母牛'} {/* 示例显示 IMEI */}
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
          {/* Textarea 用于多行输入，已正确绑定 value 和 onInput */}
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

export default AddMatingRecord;
