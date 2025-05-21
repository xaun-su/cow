import React, { useState, useEffect } from 'react';
import { View, Text, Input } from '@tarojs/components';
import { TextArea } from '@nutui/nutui-react-taro';
import Taro, { useRouter } from '@tarojs/taro';
import { Add, ArrowRight } from '@nutui/icons-react-taro';
import './index.less';
import TitleH5 from '@/components/TitleH5/index';

// 引入您自己封装的 httpRequest 实例
// 请根据您的实际文件路径调整导入路径
import request from '@/utils/request'; // 假设 httpRequest 文件在 src/utils/request.js

// 定义一个常量作为事件名称
const QUARANTINE_LIVESTOCK_SELECTED_EVENT = 'quarantineLivestockSelected';

// 从您的 httpRequest 类中获取基础 URL，用于图片上传
// 注意：您的 httpRequest 类中的 getBaseUrl 是内部方法，无法直接访问。
// 您需要在 httpRequest 类中暴露基础 URL 或 getBaseUrl 方法，或者在这里重复定义。
// 为了方便，这里重复定义基础 URL，但建议您修改 httpRequest 类来暴露它。
// !!! 请将此处的 BASE_API_URL 替换为您的实际后端 API 基础地址，与 httpRequest 中的一致 !!!
const BASE_API_URL = 'http://8.137.157.16:9999';


// 图片上传函数，直接使用 Taro.uploadFile，因为您提供的 httpRequest 类没有封装 uploadFile
const uploadImage = async (filePath) => {
  if (!filePath) {
    return null;
  }
  try {
    Taro.showLoading({ title: '上传图片中...' });

    const response = await Taro.uploadFile({
      url: `${BASE_API_URL}/liveStock/public/imgUpload`, // 图片上传接口地址
      filePath: filePath,
      name: 'file', // 后端接收文件的字段名，根据API文档确定
    });

    const data = JSON.parse(response.data);

    Taro.hideLoading();

    if (data && data.code === 200 && data.data) {
      console.log('图片上传成功，路径:', data.data);
      return data.data; // 返回图片访问路径
    } else {
      console.error('图片上传失败:', data.msg || '未知错误');
      Taro.showToast({ title: `图片上传失败: ${data.msg || '未知错误'}`, icon: 'none' });
      return null;
    }
  } catch (error) {
    Taro.hideLoading();
    console.error('图片上传请求异常:', error);
    Taro.showToast({ title: '图片上传网络异常，请重试', icon: 'none' });
    return null;
  }
};

// 新增检疫记录函数，使用您封装的 request.post
const addQuarantineData = async (submitData) => {
  try {
    // 注意：request.post 的第一个参数是 URL 路径，getBaseUrl 会自动处理
    const response = await request.post('/manageLeft/addQuarantine', submitData);
    // request.post 应该返回 Promise<Taro.request.SuccessCallbackResult>
    // 根据您的 httpRequest 实现，这里直接返回 response.data
    // 如果您的拦截器已经处理了 response.data，这里可能需要调整
    return response.data;
  } catch (error) {
    console.error('新增检疫记录请求失败:', error);
    // 抛出错误以便调用方处理
    throw error;
  }
};


const AddQuarantineRecord = () => {
  const [formData, setFormData] = useState({
    quarantineUnit: '雷山县动物卫生监督所', // F_Stand
    quarantinePersonnel: '', // F_UserName
    contactPhone: '', // F_Phone
    quarantineAddress: '', // F_Address
    quarantineType: '', // F_Title
    quarantineResult: '', // F_Level (文本输入，需转换)
    quarantineProof: null, // F_ResultImage (本地临时路径，需上传获取服务器路径)
    quarantineTime: '', // F_StTime (需 YYYY-MM-DD HH:mm:ss 格式)
    selectedLivestock: null, // F_liveid (从对象中取 id)
    notes: '', // F_Remark
  });
  const router = useRouter();

  useEffect(() => {
    const handleLivestockSelected = (data) => {
      console.log('接收到选择牲畜数据:', data);
      if (data && data.purpose === 'quarantine' && data.livestock) {
        setFormData(prevData => ({
          ...prevData,
          selectedLivestock: data.livestock,
        }));
        Taro.showToast({
          title: `已选择牲畜: ${data.livestock.imei}`,
          icon: 'none',
        });
      }
    };

    Taro.eventCenter.on(QUARANTINE_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);

    return () => {
      Taro.eventCenter.off(QUARANTINE_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);
    };
  }, []);

  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleProofUpload = () => {
    console.log('点击了检疫证明上传');
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片本地临时路径:', tempFilePaths);
        setFormData(prevData => ({
           ...prevData,
           quarantineProof: tempFilePaths[0],
        }));
        Taro.showToast({ title: '图片选择成功', icon: 'none' });
      },
      fail: function (err) {
        console.error('选择图片失败:', err);
        Taro.showToast({ title: '选择图片失败', icon: 'none' });
      }
    });
  };

  const handleSelectLivestock = () => {
    console.log('点击了选择牲畜');
    Taro.navigateTo({
      url: `/recordsPack/pages/selectLivestock/index?purpose=quarantine`
    });
  };

  const handleSubmit = async () => {
    console.log('点击了确定提交');
    console.log('当前表单数据:', formData);

    if (!formData.quarantineUnit || !formData.quarantinePersonnel || !formData.contactPhone ||
        !formData.quarantineAddress || !formData.quarantineType || !formData.quarantineResult ||
        !formData.quarantineTime || !formData.selectedLivestock) {
      Taro.showToast({
        title: '请填写所有必填项并选择牲畜',
        icon: 'none'
      });
      return;
    }

    let quarantineResultInt;
    switch (formData.quarantineResult) {
      case '合格':
        quarantineResultInt = 1;
        break;
      case '不合格':
        quarantineResultInt = 2;
        break;
      case '未知':
        quarantineResultInt = 0;
        break;
      default:
        Taro.showToast({ title: '检疫结果输入无效，请输入“合格”、“不合格”或“未知”', icon: 'none' });
        return;
    }

    if (!/^\d{4}-\d{1,2}-\d{1,2}( \d{1,2}:\d{1,2}(:\d{1,2})?)?$/.test(formData.quarantineTime)) {
         Taro.showToast({ title: '检疫时间格式不正确，请使用 YYYY-MM-DD 或 YYYY-MM-DD HH:mm:ss 格式', icon: 'none' });
         return;
    }

    Taro.showLoading({ title: '提交中...' });

    let uploadedImageUrl = '';

    if (formData.quarantineProof) {
       uploadedImageUrl = await uploadImage(formData.quarantineProof);
       if (uploadedImageUrl === null) {
          Taro.hideLoading();
          return;
       }
    }

    const submitData = {
      F_liveid: formData.selectedLivestock.id,
      F_Stand: formData.quarantineUnit,
      F_Title: formData.quarantineType,
      F_Phone: formData.contactPhone,
      F_UserName: formData.quarantinePersonnel,
      F_StTime: formData.quarantineTime,
      F_Address: formData.quarantineAddress,
      F_Level: quarantineResultInt,
      F_Remark: formData.notes,
      F_ResultImage: uploadedImageUrl,
    };

    console.log('准备提交到 API 的数据:', submitData);

    try {
       Taro.showLoading({ title: '提交数据中...' });

      const response = await addQuarantineData(submitData);

      console.log('API 提交结果:', response);

      Taro.hideLoading();
      // 根据API文档，成功时 code 为 200
      if (response && response.code === 200) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1500);

      } else {
         const errorMessage = response && response.msg ? response.msg : '提交失败，请稍后再试';
         Taro.showToast({
           title: errorMessage,
           icon: 'none'
         });
      }

    } catch (error) {
      Taro.hideLoading();
      console.error('API 提交请求失败:', error);
      Taro.showToast({
        title: '网络或服务器错误，提交失败',
        icon: 'none'
      });
    }
  };

  return (
    <View className='add-quarantine-record-page'>
      <View>
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='新增检疫记录' />}
      </View>
      <View className='page-content' style={{ paddingBottom: '80px' }}>
        {/* 检疫信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>检疫信息</Text>
          </View>

          {/* 检疫单位 */}
          <View className='list-item'>
            <Text className='item-label required'>检疫单位</Text>
            <Input
              className='item-value'
              value={formData.quarantineUnit}
              placeholder='请输入检疫单位'
              disabled
            />
          </View>
          <View className='divider'></View>

          {/* 检疫人员 */}
          <View className='list-item'>
            <Text className='item-label required'>检疫人员</Text>
            <Input
              className='item-value'
              value={formData.quarantinePersonnel}
              onInput={(e) => handleInputChange('quarantinePersonnel', e.detail.value)}
              placeholder='请输入检疫人员姓名'
            />
          </View>
          <View className='divider'></View>

          {/* 联系电话 */}
          <View className='list-item'>
            <Text className='item-label required'>联系电话</Text>
            <Input
              className='item-value'
              value={formData.contactPhone}
              onInput={(e) => handleInputChange('contactPhone', e.detail.value)}
              placeholder='请输入联系电话'
              type='number'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫地址 */}
          <View className='list-item'>
            <Text className='item-label required'>检疫地址</Text>
            <Input
              className='item-value'
              value={formData.quarantineAddress}
              onInput={(e) => handleInputChange('quarantineAddress', e.detail.value)}
              placeholder='请输入检疫地址'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫类型 */}
          <View className='list-item'>
            <Text className='item-label required'>检疫类型</Text>
            <Input
              className='item-value'
              value={formData.quarantineType}
              onInput={(e) => handleInputChange('quarantineType', e.detail.value)}
              placeholder='请输入检疫类型'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫结果 */}
          <View className='list-item'>
            <Text className='item-label required'>检疫结果</Text>
            <Input
              className='item-value'
              value={formData.quarantineResult}
              onInput={(e) => handleInputChange('quarantineResult', e.detail.value)}
              placeholder='请输入检疫结果 (合格/不合格/未知)'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫证明上传 */}
          <View className='list-item' onClick={handleProofUpload}>
            <Text className='item-label required'>检疫证明上传</Text>
            <View className='upload-icon-container'>
              {formData.quarantineProof ? (
                <Text style={{ color: '#0bcb77' }}>已选择</Text>
              ) : (
                <Add size={20} color='#999' />
              )}
            </View>
          </View>
          <View className='divider'></View>

          {/* 检疫时间 */}
          <View className='list-item'>
            <Text className='item-label required'>检疫时间</Text>
            <Input
              className='item-value'
              value={formData.quarantineTime}
              onInput={(e) => handleInputChange('quarantineTime', e.detail.value)}
              placeholder='请手动输入检疫时间 (YYYY-MM-DD HH:mm:ss)'
              type='text'
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
            <Text className='item-label required'>选择牲畜</Text>
            <View className='item-value-with-arrow'>
              <Text className={`item-value ${!formData.selectedLivestock && 'placeholder'}`}>
                {formData.selectedLivestock ? formData.selectedLivestock.imei : '请选择牲畜'}
              </Text>
              <ArrowRight size={19} color='#999' />
            </View>
          </View>
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
            autoSize
            maxLength={-1}
            style={{ border: 'none', padding: '10px 0' }}
          />
        </View>

      </View>

      {/* 底部固定按钮 - 确定提交 */}
      <View className='submit-button-container'>
        <View className='submit-button' onClick={handleSubmit}>
          <Text className='submit-button-text'>确定提交</Text>
        </View>
      </View>
    </View>
  );
};

export default AddQuarantineRecord;
