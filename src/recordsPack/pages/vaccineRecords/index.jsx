import React, { useState, useEffect } from 'react'; 
import { View, Text, Input, Navigator } from '@tarojs/components'; 
import { ArrowRight } from '@nutui/icons-react-taro'; 
import './index.less'; 
import { TextArea } from '@nutui/nutui-react-taro' 
import TitleH5 from '@/components/TitleH5/index';
import Taro, { useRouter } from '@tarojs/taro'; 
import { addVaccineData } from '@/api/manage'; 

const AddVaccinationRecord = () => {
  // 使用 useState 管理表单数据
  const [formData, setFormData] = useState({
    herdsmanName: '', // 对应截图中的“牧民” -> F_Name
    herdsmanPhone: '', // 对应截图中的“电话” -> F_PHone
    herdsmanAddress: '', // 对应截图中的“地址” -> F_Address
    vaccineName: '', // 疫苗名称 -> F_Title
    vaccineBatch: '', // 疫苗批次 -> F_Batch
    injectionCount: '', // 接种支数 -> F_Number
    selectedLivestockIds: [], // 已选择的牲畜 ID 数组，初始为空数组 -> 用于生成 F_liveid
    notes: '', // 备注 -> F_Remark
  });

  const router = useRouter();

  // 在组件加载时获取并处理传递过来的参数
  useEffect(() => {
    // router.params 包含了 URL 中的所有查询参数
    const { selectedIds } = router.params;

    if (selectedIds) {
      try {
        // 1. 对接收到的参数进行 URL 解码
        const decodedArrayString = decodeURIComponent(selectedIds);

        // 2. 将 JSON 字符串解析回数组
        const parsedArray = JSON.parse(decodedArrayString);

        console.log('成功接收并解析的牲畜 ID 数组:', parsedArray);

        // 3. 将接收到的 ID 数组设置到 formData 状态中
        setFormData(prevData => ({
          ...prevData,
          selectedLivestockIds: parsedArray,
        }));

      } catch (e) {
        console.error('解析接收到的牲畜 ID 数组失败:', e);
        // 处理解析错误，例如显示错误信息给用户
        Taro.showToast({
          title: '加载牲畜信息失败',
          icon: 'none'
        });
      }
    } else {
      console.log('未接收到 selectedIds 参数');
      Taro.showToast({
        title: '未选择牲畜，请返回重新选择',
        icon: 'none'
      });
    }
  }, [router.params.selectedIds]); 

  // 通用的输入框变化处理函数
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 处理确定提交按钮点击事件
  const handleSubmit = async () => { 
    console.log('点击了确定提交'); 
    console.log('当前表单数据:', formData);

    // 检查必填项和是否选择了牲畜
    if (!formData.herdsmanName || !formData.herdsmanPhone || !formData.vaccineName || formData.selectedLivestockIds.length === 0) {
      Taro.showToast({
        title: '请填写必填项并选择牲畜',
        icon: 'none'
      });
      return;
    }
    const submitData = {
      F_liveid: formData.selectedLivestockIds.join(','),
      F_Title: formData.vaccineName,
      F_Address: formData.herdsmanAddress,
      F_Name: formData.herdsmanName,
      F_Batch: formData.vaccineBatch,
      F_PHone: formData.herdsmanPhone,
      F_Number: formData.injectionCount,
      F_Remark: formData.notes,
    };

    console.log('准备提交到 API 的数据:', submitData);

    // 调用 API 提交数据
    const res = await addVaccineData(submitData); // 调用导入的 API 函数
    console.log('API 提交结果:', res);
  };

  return (
    <View className='add-vaccination-record-page'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='新增疫苗记录' />}
      </View>
      {/* 页面内容区域 */}
      <View className='page-content'>
        {/* 牧民信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>牧民信息(操作员)</Text>
          </View>

          {/* 牧民 */}
          <View className='list-item'>
            <Text className='item-label'>牧民</Text>
            <Input
              className={`item-value ${!formData.herdsmanName && 'placeholder'}`}
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
              placeholder='请输入联系电话' // 修正 placeholder 拼写
              value={formData.herdsmanPhone}
              onInput={(e) => handleInputChange('herdsmanPhone', e.detail.value)}
              type='number'
            />
          </View>
          <View className='divider'></View>

          {/* 地址 */}
          <View className='list-item'>
            <Text className='item-label'>地址</Text>
            <Input
              className={`item-value ${!formData.herdsmanAddress && 'placeholder'}`}
              placeholder='请输入地址'
              value={formData.herdsmanAddress}
              onInput={(e) => handleInputChange('herdsmanAddress', e.detail.value)}
            />
          </View>
          <View className='divider'></View>
        </View>

        {/* 疫苗信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>疫苗信息</Text>
          </View>

          {/* 疫苗名称 */}
          <View className='list-item'>
            <Text className='item-label'>疫苗名称</Text>
            <Input
              className={`item-value ${!formData.vaccineName && 'placeholder'}`}
              placeholder='请输入疫苗名称'
              value={formData.vaccineName}
              onInput={(e) => handleInputChange('vaccineName', e.detail.value)}
            />
          </View>
          <View className='divider'></View>

          {/* 疫苗批次 */}
          <View className='list-item'>
            <Text className='item-label'>疫苗批次</Text>
            <Input
              className={`item-value ${!formData.vaccineBatch && 'placeholder'}`}
              placeholder='请输入疫苗批次'
              value={formData.vaccineBatch}
              onInput={(e) => handleInputChange('vaccineBatch', e.detail.value)}
            />
          </View>
          <View className='divider'></View>

          {/* 接种支数 */}
          <View className='list-item'>
            <Text className='item-label'>接种支数</Text>
            <Input
              className={`item-value ${!formData.injectionCount && 'placeholder'}`}
              placeholder='请输入接种支数'
              value={formData.injectionCount}
              onInput={(e) => handleInputChange('injectionCount', e.detail.value)}
              type='number'
            />
          </View>
          <View className='divider'></View>
        </View>

        {/* 添加牲畜部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>添加牲畜</Text>
          </View>

          {/* 选择牲畜 - 此处 Navigator 仅用于返回选择页面，数据已通过参数传递 */}
          <Navigator className='list-item select-livestock-item' url='/recordsPack/pages/selectLivestock/index' >
            <Text className='item-label'>已选择牲畜</Text>
            <View className='item-value-with-arrow'>
              {/* 显示已选择牲畜的数量 */}
              <Text className={`item-value ${formData.selectedLivestockIds.length === 0 && 'placeholder'}`}>
                {formData.selectedLivestockIds.length > 0 ? `${formData.selectedLivestockIds[0]} ` : '请选择牲畜'}
              </Text>
              <ArrowRight size={19} color='#999' />
            </View>
          </Navigator>
          <View className='divider'></View>
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

export default AddVaccinationRecord;
