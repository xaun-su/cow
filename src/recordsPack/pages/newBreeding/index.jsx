import React, { useState, useEffect } from 'react'; // 导入 useEffect
import { View, Text, Input } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro'; // 导入 Taro 和 useRouter
import { ArrowRight } from '@nutui/icons-react-taro';
import './index.less';
import { TextArea } from '@nutui/nutui-react-taro';
import TitleH5 from '@/components/TitleH5/index';
import { addMatingData } from '@/api/manage';

// 定义一个常量作为事件名称，避免写错
const MATING_LIVESTOCK_SELECTED_EVENT = 'matingLivestockSelected';

const AddMatingRecord = () => {
  // 使用 useState 管理表单数据
  const [formData, setFormData] = useState({
    herdsmanName: '韩梅梅', // 牧民姓名
    herdsmanPhone: '', // 电话
    matingAddress: '', // 配种地址
    selectedBull: null, // 已选择的公牛对象 (包括 id, imei 等信息)
    selectedCow: null, // 已选择的母牛对象 (包括 id, imei 等信息)
    notes: '', // 备注
  });

  const router = useRouter();

  useEffect(() => {
    // 监听选择牲畜页面返回时触发的事件
    const handleLivestockSelected = (data) => {
      console.log('接收到选择牲畜数据:', data);
      if (data && data.type && data.livestock) {
        if (data.type === 'bull') {
          setFormData(prevData => ({
            ...prevData,
            selectedBull: data.livestock, // 将完整的牲畜对象存储起来
          }));
          Taro.showToast({
            title: `已选择公牛: ${data.livestock.imei}`,
            icon: 'none',
          });
        } else if (data.type === 'cow') {
          setFormData(prevData => ({
            ...prevData,
            selectedCow: data.livestock, // 将完整的牲畜对象存储起来
          }));
          Taro.showToast({
            title: `已选择母牛: ${data.livestock.imei}`,
            icon: 'none',
          });
        }
      }
    };

    // 注册事件监听器
    Taro.eventCenter.on(MATING_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);

    // 清理函数：在组件卸载时移除事件监听器
    return () => {
      Taro.eventCenter.off(MATING_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时运行

  // 通用的输入框变化处理函数
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 处理选择公牛点击事件
  const handleSelectBull = () => {
    console.log('点击了选择公牛');
    // 跳转到选择牲畜页面，并通过 URL 参数告知是选择公牛
    Taro.navigateTo({
      url: `/recordsPack/pages/selectLivestock/index?type=bull`
    });
  };

  // 处理选择母牛点击事件
  const handleSelectCow = () => {
    console.log('点击了选择母牛');
    // 跳转到选择牲畜页面，并通过 URL 参数告知是选择母牛
    Taro.navigateTo({
      url: `/recordsPack/pages/selectLivestock/index?type=cow`
    });
  };

  // 处理确定提交按钮点击事件
  const handleSubmit = async () => { // 将函数修改为 async
    console.log('点击了确定提交');
    console.log('待提交的数据:', formData);

    // 检查必填项和是否选择了公牛和母牛
    if (!formData.herdsmanName || !formData.herdsmanPhone || !formData.selectedBull || !formData.selectedCow) {
      Taro.showToast({
        title: '请填写必填项并选择公牛和母牛',
        icon: 'none'
      });
      return;
    }

    const submitData = {
      F_UserName: formData.herdsmanName,
      F_Phone: formData.herdsmanPhone,
      F_Address: formData.matingAddress,
      F_PaternalLine	: formData.selectedBull.id, 
      F_Matriarchal: formData.selectedCow.id, 
      F_Remark: formData.notes,
    };

    console.log('准备提交到 API 的数据:', submitData);
    addMatingData(submitData)
      .then(() => {
        Taro.showToast({
          title: '配种记录提交成功',
          icon: 'success',
        });
      })
      .catch(error => {
        console.error('提交配种记录失败:', error);

      });

  };

  return (
    <View className='add-mating-record-page'>
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
              placeholder='请输入牧民姓名'
              value={formData.herdsmanName}
              onInput={(e) => handleInputChange('herdsmanName', e.detail.value)}
            />
          </View>
          <View className='divider'></View>

          {/* 电话 */}
          <View className='list-item'>
            <Text className='item-label'>电话</Text>
            <Input
              className={`item-value ${!formData.herdsmanPhone && 'placeholder'}`}
              placeholder='请输入联系电话' // 修正 placeholder
              value={formData.herdsmanPhone}
              onInput={(e) => handleInputChange('herdsmanPhone', e.detail.value)}
              type='number'
            />
          </View>
          <View className='divider'></View>

          {/* 配种地址 */}
          <View className='list-item'>
            <Text className='item-label'>配种地址</Text>
            <Input
              className={`item-value ${!formData.matingAddress && 'placeholder'}`}
              placeholder='请输入配种地址'
              value={formData.matingAddress}
              onInput={(e) => handleInputChange('matingAddress', e.detail.value)}
            />
          </View>
          <View className='divider'></View> {/* 添加分隔线 */}
        </View>

        {/* 选择配种对象部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>选择配种对象</Text>
          </View>

          {/* 选择公牛 */}
          <View className='list-item select-livestock-item' onClick={handleSelectBull}>
            <Text className='item-label'>选择公牛</Text>
            <View className='item-value-with-arrow'>
              {/* 显示已选择公牛的 IMEI，如果没有选择则显示占位符 */}
              <Text className={`item-value ${!formData.selectedBull && 'placeholder'}`}>
                {formData.selectedBull ? formData.selectedBull.imei : '请选择公牛'}
              </Text>
              <ArrowRight size={19} color='#999' />
            </View>
          </View>
          <View className='divider'></View>

          {/* 选择母牛 */}
          <View className='list-item select-livestock-item' onClick={handleSelectCow}>
            <Text className='item-label'>选择母牛</Text>
            <View className='item-value-with-arrow'>
              {/* 显示已选择母牛的 IMEI，如果没有选择则显示占位符 */}
              <Text className={`item-value ${!formData.selectedCow && 'placeholder'}`}>
                {formData.selectedCow ? formData.selectedCow.imei : '请选择母牛'}
              </Text>
              <ArrowRight size={19} color='#999' />
            </View>
          </View>
          <View className='divider'></View> {/* 添加分隔线 */}
        </View>

        {/* 备注部分 */}
        <View className='section notes-section'>
          <View className='list-item'>
            <Text className='item-label'>备注</Text>
          </View>
          <TextArea
            placeholder='请输入备注信息'
            value={formData.notes}
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
