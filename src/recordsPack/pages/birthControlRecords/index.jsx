import React, { useState, useEffect } from 'react'; // 导入 useEffect
import { View, Text, Input, Image } from '@tarojs/components'; // 导入 Image 组件用于图片回显
import { TextArea } from '@nutui/nutui-react-taro'; // 导入 TextArea
import Taro, { useRouter } from '@tarojs/taro'; // 导入 Taro 和 useRouter
import { ArrowRight, Add } from '@nutui/icons-react-taro'; // 导入 ArrowRight 和 Camera 图标
import './index.less'; // 引入页面样式文件 (可以沿用或创建新的)
import TitleH5 from '@/components/TitleH5/index';
// TODO: 导入你的节育记录提交 API 函数
// import { addBirthControlRecordApi } from '@/api/manage'; // 假设你的 API 在这里

// 定义一个常量作为事件名称，避免写错，与 selectLivestock 中定义的一致
const BIRTH_CONTROL_LIVESTOCK_SELECTED_EVENT = 'birthControlLivestockSelected'; // 新增节育选择牲畜事件

const AddBirthControlRecord = () => {
  // 使用 useState 管理表单数据
  const [formData, setFormData] = useState({
    herdsmanName: '雷山县动物卫生监督所', // 牧民/操作员 (示例默认值)
    herdsmanPhone: '', // 电话
    herdsmanAddress: '', // 地址
    selectedLivestock: null, // 已选择的牲畜对象 (存储 id, imei 等信息)
    sterilizationTime: '', // 绝育时间 (文本)
    notes: '', // 备注
    proofImage: null, // 证明图片 (存储本地临时路径或上传后的 URL)
  });

  // 使用 useRouter 钩子获取路由信息 (当前页面未使用路由参数，但保留)
  const router = useRouter();

  // 使用 useEffect 设置和清理事件监听器，用于接收选择的牲畜数据
  useEffect(() => {
    // 监听选择牲畜页面返回时触发的事件
    const handleLivestockSelected = (data) => {
      console.log('接收到选择牲畜数据:', data);
      // 检查事件数据是否符合预期（purpose 是 birth-control 且包含 livestock 对象）
      if (data && data.purpose === 'birth-control' && data.livestock) {
        setFormData(prevData => ({
          ...prevData,
          selectedLivestock: data.livestock, // 将完整的牲畜对象存储起来
        }));
        Taro.showToast({
          title: `已选择牲畜: ${data.livestock.imei}`,
          icon: 'none',
        });
      }
    };

    // 注册事件监听器
    Taro.eventCenter.on(BIRTH_CONTROL_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);

    // 清理函数：在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      Taro.eventCenter.off(BIRTH_CONTROL_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时运行

  // 通用的输入框和 TextArea 变化处理函数
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 处理证明上传点击事件
  const handleProofUpload = () => {
    console.log('点击了证明上传');
    Taro.chooseImage({
      count: 1, // 只允许选择一张图片
      sizeType: ['compressed'], // 压缩图
      sourceType: ['album', 'camera'], // 可以从相册选择或拍照
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片路径:', tempFilePaths);
        // 将本地临时路径存储到状态中，用于回显
        setFormData(prevData => ({
           ...prevData,
           proofImage: tempFilePaths[0], // 更新 proofImage 状态为本地临时路径
        }));
        Taro.showToast({ title: '图片选择成功', icon: 'none' });
        // TODO: 在提交时或选择后立即将图片上传到服务器，并更新状态为服务器返回的 URL
      },
      fail: function (err) {
        console.error('选择图片失败:', err);
        Taro.showToast({ title: '选择图片失败', icon: 'none' });
      }
    });
  };

  // 处理选择牲畜点击事件
  const handleSelectLivestock = () => {
    console.log('点击了选择牲畜');
    // 跳转到选择牲畜页面，并通过 URL 参数告知是用于节育记录的单选
    Taro.navigateTo({
      url: `/recordsPack/pages/selectLivestock/index?purpose=birth-control`
    });
  };

   // 处理绝育时间文本输入变化
   const handleSterilizationTimeChange = (value) => {
       setFormData(prevData => ({
           ...prevData,
           sterilizationTime: value,
       }));
   };


  // 处理确定提交按钮点击事件
  const handleSubmit = async () => { // 将函数修改为 async 以便使用 await 调用 API
    console.log('点击了确定提交');
    console.log('当前表单数据:', formData);

    // 检查必填项
    // 您可以根据实际需求调整哪些字段是必填的
    if (!formData.herdsmanName || !formData.herdsmanPhone || !formData.herdsmanAddress ||
        !formData.selectedLivestock || !formData.sterilizationTime) {
      Taro.showToast({
        title: '请填写所有必填项并选择牲畜',
        icon: 'none' // 不显示图标
      });
      return; // 阻止提交
    }

    // TODO: 如果 proofImage 存储的是本地路径，需要在提交前上传并获取服务器 URL
    // 示例：假设 proofImage 已经是上传后的 URL 或文件标识符
    const finalProofImage = formData.proofImage; // 或者上传后的 URL

    // 构造要提交给 API 的数据对象
    // TODO: 根据你的实际后端 API 接口文档调整这里的字段名和数据格式
    const submitData = {
      F_HerdsmanName: formData.herdsmanName,
      F_HerdsmanPhone: formData.herdsmanPhone,
      F_HerdsmanAddress: formData.herdsmanAddress,
      F_LiveId: formData.selectedLivestock.id, // 假设 API 需要选中牲畜的 ID
      F_SterilizationTime: formData.sterilizationTime, // 文本格式日期时间
      F_Remark: formData.notes,
      F_ProofImage: finalProofImage, // 假设 API 接收图片 URL 或文件信息
      // 如果 API 还需要其他字段，也在这里添加
    };

    console.log('准备提交到 API 的数据:', submitData);

    // TODO: 在这里调用实际的提交 API 函数
    try {
      // 显示加载提示
      Taro.showLoading({
        title: '提交中...',
      });

      // const response = await addBirthControlRecordApi(submitData); // 调用你的 API 函数

      // !!! 模拟 API 调用成功，请替换为实际的 API 调用和结果处理 !!!
      const response = { code: 200, message: '提交成功' }; // 模拟成功响应
      // !!! 模拟 API 调用失败，可以取消上面成功模拟，使用下面失败模拟进行测试 !!!
      // const response = { code: 500, message: '服务器内部错误' }; // 模拟失败响应


      console.log('API 提交结果:', response);

      // 隐藏加载提示
      Taro.hideLoading();

      // 根据 API 返回结果判断提交是否成功
      // 请根据你实际的 API 返回结构调整这里的判断条件
      if (response && response.code === 200) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500 // 提示持续时间
        });
        // 提交成功后，延迟一段时间返回上一页
        setTimeout(() => {
          Taro.navigateBack();
        }, 1500);

      } else {
         // 处理 API 返回的错误信息
         const errorMessage = response && response.message ? response.message : '提交失败，请稍后再试';
         Taro.showToast({
           title: errorMessage,
           icon: 'none'
         });
      }

    } catch (error) {
      // 隐藏加载提示
      Taro.hideLoading();
      console.error('API 提交请求失败:', error);
      Taro.showToast({
        title: '网络或服务器错误，提交失败',
        icon: 'none'
      });
    }
  };

  return (
    <View className='add-quarantine-record-page'> {/* 沿用样式类名 */}
      <View>
        {/* 在 H5 环境下显示页面标题 */}
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='节育记录' />}
      </View>
      {/* 页面内容区域，使用 padding-bottom 避免被底部按钮遮挡 */}
      <View className='page-content' style={{ paddingBottom: '60px' }}> {/* 预留底部按钮空间 */}
        {/* 牧民信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>牧民信息(操作员)</Text>
          </View>

          {/* 牧民 */}
          <View className='list-item'>
            <Text className='item-label'>牧民</Text>
             <Input
              className='item-value'
              value={formData.herdsmanName}
              onInput={(e) => handleInputChange('herdsmanName', e.detail.value)}
              placeholder='请输入牧民姓名'
            />
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 电话 */}
          <View className='list-item'>
            <Text className='item-label'>电话</Text>
             <Input
              className='item-value'
              value={formData.herdsmanPhone}
              onInput={(e) => handleInputChange('herdsmanPhone', e.detail.value)}
              placeholder='请输**系电话'
              type='number' // 设置输入类型为数字键盘
            />
          </View>
          <View className='divider'></View>

          {/* 地址 */}
          <View className='list-item'>
            <Text className='item-label'>地址</Text>
             <Input
              className='item-value'
              value={formData.herdsmanAddress}
              onInput={(e) => handleInputChange('herdsmanAddress', e.detail.value)}
              placeholder='请输入地址'
            />
          </View>
          <View className='divider'></View>

           {/* 证明上传 */}
          <View className='list-item' onClick={handleProofUpload}>
            <Text className='item-label'>证明上传</Text>
            <View className='upload-icon-container'>
              {/* 根据 proofImage 状态显示图片或上传图标 */}
              {formData.proofImage ? (
                <Image src={formData.proofImage} className='uploaded-image' mode='aspectFill' /> // 显示图片
              ) : (
                <Add size={20} color='#999' /> // 相机图标
              )}
            </View>
          </View>
          <View className='divider'></View>
        </View>

        {/* 添加牲畜部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>添加牲畜</Text>
          </View>

          {/* 选择牲畜 */}
          {/* 点击此项跳转到选择牲畜页面 */}
          <View className='list-item select-livestock-item' onClick={handleSelectLivestock}>
            <Text className='item-label'>选择牲畜</Text>
            <View className='item-value-with-arrow'>
              {/* 显示已选择牲畜的 IMEI，如果没有选择则显示占位符 */}
              <Text className={`item-value ${!formData.selectedLivestock && 'placeholder'}`}>
                {formData.selectedLivestock ? formData.selectedLivestock.imei : '请选择牲畜'}
              </Text>
              <ArrowRight size={19} color='#999' /> {/* 右箭头 */}
            </View>
          </View>
          <View className='divider'></View>

          {/* 绝育时间 (使用 Input 文本输入) */}
          <View className='list-item'>
            <Text className='item-label'>绝育时间</Text>
             <Input
              className='item-value'
              value={formData.sterilizationTime}
              onInput={(e) => handleSterilizationTimeChange(e.detail.value)}
              placeholder='请输入或选择时间' // 提示用户输入或可能通过其他方式选择
              type='text' // 使用文本类型
            />
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
            onChange={(value) => handleInputChange('notes', value)} // 更新状态
            autoSize // 自动调整高度
            maxLength={-1} // 不限制最大长度
            style={{ border: 'none', padding: '10px 0' }} // 移除默认边框，调整内边距
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

export default AddBirthControlRecord;
