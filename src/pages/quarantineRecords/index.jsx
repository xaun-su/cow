import React, { useState } from 'react';
import { View, Text, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Add, ArrowRight } from '@nutui/icons-react-taro'; 
import './index.less'; // 引入页面样式文件

const AddQuarantineRecord = () => {
  // 模拟一些默认或示例数据
  const defaultData = {
    quarantineUnit: '雷山县动物卫生监督所',
    quarantinePersonnel: '未填写',
    contactPhone: '未选择',
    quarantineAddress: '未填写',
    quarantineType: '未填写',
    quarantineResult: '未选择',
    quarantineProof: null, // 检疫证明文件或路径
    quarantineTime: '未选择',
    selectedLivestock: { imei: '12456789111' }, // 模拟已选择的牲畜
    notes: '', // 备注
  };

  // 处理检疫证明上传点击事件
  const handleProofUpload = () => {
    console.log('点击了检疫证明上传');
    // TODO: 实现图片/文件上传逻辑
    Taro.chooseImage({
      count: 1, // 最多选择一张图片
      sizeType: ['compressed'], // 可以指定原图或压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片路径:', tempFilePaths);
        // TODO: 将图片路径或文件上传到服务器，并更新状态
      },
    });
  };

  // 处理选择牲畜点击事件
  const handleSelectLivestock = () => {
    console.log('点击了选择牲畜');
    // TODO: 实现跳转到选择牲畜页面或弹出选择器
    // 例如：Taro.navigateTo({ url: '/pages/selectLivestock/index' });
  };

  // 处理确定提交按钮点击事件
  const handleSubmit = () => {
    console.log('点击了确定提交');
    // TODO: 收集表单数据并提交
    // const formData = {
    //   quarantineUnit: quarantineUnit,
    //   quarantinePersonnel: quarantinePersonnel,
    //   // ... 收集其他数据
    //   notes: notes,
    // };
    // console.log('提交的数据:', formData);
    // TODO: 调用 API 提交数据
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

          {/* 检疫单位 */}
          <View className='list-item'>
            <Text className='item-label'>检疫单位</Text>
            <Text className='item-value'>{defaultData.quarantineUnit}</Text>
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 检疫人员 */}
          <View className='list-item'>
            <Text className='item-label'>检疫人员</Text>
            {/* 这里可以使用 Input 或 Text 并处理点击事件进行输入 */}
            <Text className='item-value placeholder'>{defaultData.quarantinePersonnel}</Text>
          </View>
          <View className='divider'></View>

          {/* 联系电话 */}
          <View className='list-item'>
            <Text className='item-label'>联系电话</Text>
            <Text className='item-value placeholder'>{defaultData.contactPhone}</Text>
          </View>
          <View className='divider'></View>

          {/* 检疫地址 */}
          <View className='list-item'>
            <Text className='item-label'>检疫地址</Text>
            <Text className='item-value placeholder'>{defaultData.quarantineAddress}</Text>
          </View>
          <View className='divider'></View>

          {/* 检疫类型 */}
          <View className='list-item'>
            <Text className='item-label'>检疫类型</Text>
            <Text className='item-value placeholder'>{defaultData.quarantineType}</Text>
          </View>
          <View className='divider'></View>

          {/* 检疫结果 */}
          <View className='list-item'>
            <Text className='item-label'>检疫结果</Text>
            <Text className='item-value placeholder'>{defaultData.quarantineResult}</Text>
          </View>
          <View className='divider'></View>

          {/* 检疫证明上传 */}
          <View className='list-item' onClick={handleProofUpload}>
            <Text className='item-label'>检疫证明上传</Text>
            <View className='upload-icon-container'>
               {/* TODO: 如果已上传，这里可以显示缩略图 */}
               <Add size={20} color='#999' /> {/* 相机图标 */}
            </View>
          </View>
          <View className='divider'></View>

          {/* 检疫时间 */}
          <View className='list-item'>
            <Text className='item-label'>检疫时间</Text>
            <Text className='item-value placeholder'>{defaultData.quarantineTime}</Text>
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
                {/* TODO: 显示已选择牲畜的 IMEI 或其他标识 */}
                <Text className='item-value'>{defaultData.selectedLivestock.imei}</Text>
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
            <Textarea
                className='notes-textarea'
                placeholder='请输入备注信息'
                value={defaultData.notes} // TODO: 绑定状态
                // onInput={(e) => setNotes(e.detail.value)} // TODO: 更新状态
                autoHeight // 根据内容自动调整高度
                maxlength={200} // 设置最大输入长度
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
