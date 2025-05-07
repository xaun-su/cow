import React, { useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { TextArea } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro';
import { Add, ArrowRight } from '@nutui/icons-react-taro';
import './index.less'; // 引入页面样式文件

const AddQuarantineRecord = () => {
  // 使用 useState 创建状态变量
  const [quarantineUnit, setQuarantineUnit] = useState('雷山县动物卫生监督所'); // 假设不可编辑
  const [quarantinePersonnel, setQuarantinePersonnel] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [quarantineAddress, setQuarantineAddress] = useState('');
  const [quarantineType, setQuarantineType] = useState('');
  const [quarantineResult, setQuarantineResult] = useState('');
  const [quarantineProof, setQuarantineProof] = useState(null);
  const [quarantineTime, setQuarantineTime] = useState('');
  const [selectedLivestock, setSelectedLivestock] = useState(null); // 初始为 null
  const [notes, setNotes] = useState('');

  // 处理检疫证明上传点击事件
  const handleProofUpload = () => {
    console.log('点击了检疫证明上传'); // 修正了 console.lo*
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片路径:', tempFilePaths);
        // TODO: 将图片路径或文件上传到服务器
        // 上传成功后，更新 quarantineProof 状态
        // setQuarantineProof(uploadedImageUrl); // 示例
      },
    });
  };

  // 处理选择牲畜点击事件
  const handleSelectLivestock = () => {
    console.log('点击了选择牲畜'); // 修正了 console.lo*
    // TODO: 跳转到选择牲畜页面
    // Taro.navigateTo({ url: '/pages/selectLivestock/index' });
    // 假设选择页面返回了牲畜信息，例如通过事件总线或页面栈
    // setSelectedLivestock({ imei: '新的IMEI' }); // 示例：更新状态
  };

  // 处理确定提交按钮点击事件
  const handleSubmit = () => {
    console.log('点击了确定提交'); // 修正了 console.lo*
    // 收集当前表单数据（来自状态变量）
    const formData = {
      quarantineUnit: quarantineUnit,
      quarantinePersonnel: quarantinePersonnel,
      contactPhone: contactPhone,
      quarantineAddress: quarantineAddress,
      quarantineType: quarantineType,
      quarantineResult: quarantineResult,
      quarantineProof: quarantineProof,
      quarantineTime: quarantineTime,
      selectedLivestock: selectedLivestock,
      notes: notes,
    };
    console.log('提交的数据:', formData);
    // TODO: 调用 API 提交数据，使用 formData
    // TODO: 提交成功后跳转回列表页或显示成功提示
  };

  return (
    <View className='add-quarantine-record-page'>
      {/* 页面内容区域 */}
      <View className='page-content'>
        {/* 检疫信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>检疫信息</Text>
          </View>

          {/* 检疫单位 (假设不可编辑) */}
          <View className='list-item'>
            <Text className='item-label'>检疫单位</Text>
            <Text className='item-value'>{quarantineUnit}</Text> {/* 直接显示文本 */}
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 检疫人员 */}
          <View className='list-item'>
            <Text className='item-label'>检疫人员</Text>
            <Input
              className='item-value'
              value={quarantinePersonnel}
              onInput={(e) => setQuarantinePersonnel(e.detail.value)}
              placeholder='请输入检疫人员姓名'
            />
          </View>
          <View className='divider'></View>

          {/* 联系电话 */}
          <View className='list-item'>
            <Text className='item-label'>联系电话</Text>
            <Input
              className='item-value'
              value={contactPhone}
              onInput={(e) => setContactPhone(e.detail.value)}
              placeholder='请输入联系电话'
              type='number' // 建议使用 number 类型键盘
            />
          </View>
          <View className='divider'></View>

          {/* 检疫地址 */}
          <View className='list-item'>
            <Text className='item-label'>检疫地址</Text>
            <Input
              className='item-value'
              value={quarantineAddress}
              onInput={(e) => setQuarantineAddress(e.detail.value)}
              placeholder='请输入检疫地址'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫类型 */}
          <View className='list-item'>
            <Text className='item-label'>检疫类型</Text>
            <Input
              className='item-value'
              value={quarantineType}
              onInput={(e) => setQuarantineType(e.detail.value)}
              placeholder='请输入检疫类型'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫结果 */}
          <View className='list-item'>
            <Text className='item-label'>检疫结果</Text>
            <Input
              className='item-value'
              value={quarantineResult}
              onInput={(e) => setQuarantineResult(e.detail.value)}
              placeholder='请输入检疫结果'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫证明上传 */}
          <View className='list-item' onClick={handleProofUpload}>
            <Text className='item-label'>检疫证明上传</Text>
            <View className='upload-icon-container'>
              {quarantineProof ? (
                <Text>已上传</Text> // 简单示例
              ) : (
                <Add size={20} color='#999' /> // 相机图标
              )}
            </View>
          </View>
          <View className='divider'></View>

          {/* 检疫时间 */}
          <View className='list-item'>
            <Text className='item-label'>检疫时间</Text>
            {/* 注意：检疫时间通常是日期时间选择器，这里为了演示 Input 监听，暂时用 Input */}
            <Input
              className='item-value'
              value={quarantineTime}
              onInput={(e) => setQuarantineTime(e.detail.value)}
              placeholder='请选择检疫时间'
              type='datetime'
            />
          </View>
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
              <Text className='item-value'>{selectedLivestock ? selectedLivestock.imei : '请选择牲畜'}</Text>
              <ArrowRight size={14} color='#999' /> {/* 右箭头 */}
            </View>
          </View>
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

export default AddQuarantineRecord;
