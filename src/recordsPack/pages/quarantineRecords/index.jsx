import React, { useState, useEffect } from 'react'; // 导入 useEffect
import { View, Text, Input } from '@tarojs/components';
import { TextArea } from '@nutui/nutui-react-taro'; // 移除 DatePicker 和 Popup
import Taro, { useRouter } from '@tarojs/taro'; // 导入 Taro 和 useRouter
import { Add, ArrowRight } from '@nutui/icons-react-taro';
import './index.less'; // 引入页面样式文件
import TitleH5 from '@/components/TitleH5/index';
// TODO: 导入你的检疫记录提交 API 函数
// import { addQuarantineRecordApi } from '@/api/manage'; // 假设你的 API 在这里

// 定义一个常量作为事件名称，避免写错，与 selectLivestock 中定义的一致
const QUARANTINE_LIVESTOCK_SELECTED_EVENT = 'quarantineLivestockSelected';

const AddQuarantineRecord = () => {
  // 使用 useState 管理表单数据，将所有字段集中管理
  const [formData, setFormData] = useState({
    quarantineUnit: '雷山县动物卫生监督所', // 检疫单位 (假设不可编辑)
    quarantinePersonnel: '', // 检疫人员
    contactPhone: '', // 联系电话
    quarantineAddress: '', // 检疫地址
    quarantineType: '', // 检疫类型
    quarantineResult: '', // 检疫结果
    quarantineProof: null, // 检疫证明 (存储上传后的文件信息或URL)
    quarantineTime: '', // 检疫时间 (改回存储字符串)
    selectedLivestock: null, // 已选择的牲畜对象 (包括 id, imei 等信息)
    notes: '', // 备注
  });

  // 移除 showDatePicker 状态，不再需要控制日期选择器弹窗

  // 使用 useRouter 钩子获取路由信息 (当前页面未使用路由参数，但保留)
  const router = useRouter();

  // 使用 useEffect 设置和清理事件监听器，用于接收选择的牲畜数据
  useEffect(() => {
    // 监听选择牲畜页面返回时触发的事件
    const handleLivestockSelected = (data) => {
      console.log('接收到选择牲畜数据:', data);
      // 检查事件数据是否符合预期（purpose 是 quarantine 且包含 livestock 对象）
      if (data && data.purpose === 'quarantine' && data.livestock) {
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
    Taro.eventCenter.on(QUARANTINE_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);

    // 清理函数：在组件卸载时移除事件监听器，防止内存泄漏
    return () => {
      Taro.eventCenter.off(QUARANTINE_LIVESTOCK_SELECTED_EVENT, handleLivestockSelected);
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时运行

  // 通用的输入框和 TextArea 变化处理函数
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 处理检疫证明上传点击事件
  const handleProofUpload = () => {
    console.log('点击了检疫证明上传'); // 修正了 console.log
    Taro.chooseImage({
      count: 1, // 只允许选择一张图片
      sizeType: ['compressed'], // 压缩图
      sourceType: ['album', 'camera'], // 可以从相册选择或拍照
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片路径:', tempFilePaths);
        // TODO: 将图片路径或文件上传到服务器，获取服务器返回的 URL 或文件 ID
        // 假设上传成功后返回图片 URL 或其他标识符
        const uploadedImageUrl = tempFilePaths[0]; // 示例：暂时使用本地路径作为占位符
        setFormData(prevData => ({
           ...prevData,
           quarantineProof: uploadedImageUrl, // 更新 quarantineProof 状态为上传后的标识符
        }));
        Taro.showToast({ title: '图片选择成功', icon: 'none' });
      },
      fail: function (err) {
        console.error('选择图片失败:', err);
        Taro.showToast({ title: '选择图片失败', icon: 'none' });
      }
    });
  };

  // 处理选择牲畜点击事件
  const handleSelectLivestock = () => {
    console.log('点击了选择牲畜'); // 修正了 console.log
    // 跳转到选择牲畜页面，并通过 URL 参数告知是用于检疫记录的单选
    Taro.navigateTo({
      url: `/recordsPack/pages/selectLivestock/index?purpose=quarantine`
      // 如果 selectLivestock 需要其他参数，也在这里添加
    });
  };

  // 移除 onDatePickerConfirm 和 formatQuarantineTime 函数

  // 处理确定提交按钮点击事件
  const handleSubmit = async () => { // 将函数修改为 async 以便使用 await 调用 API
    console.log('点击了确定提交'); // 修正了 console.log
    console.log('当前表单数据:', formData);

    // 检查必填项和是否选择了牲畜
    // 您可以根据实际需求调整哪些字段是必填的
    if (!formData.quarantineUnit || !formData.quarantinePersonnel || !formData.contactPhone ||
        !formData.quarantineAddress || !formData.quarantineType || !formData.quarantineResult ||
        !formData.quarantineTime || !formData.selectedLivestock) {
      Taro.showToast({
        title: '请填写所有必填项并选择牲畜',
        icon: 'none' // 不显示图标
      });
      return; // 阻止提交
    }

    // 构造要提交给 API 的数据对象
    // TODO: 根据你的实际后端 API 接口文档调整这里的字段名和数据格式
    const submitData = {
      F_QuarantineUnit: formData.quarantineUnit,
      F_QuarantinePersonnel: formData.quarantinePersonnel,
      F_ContactPhone: formData.contactPhone,
      F_QuarantineAddress: formData.quarantineAddress,
      F_QuarantineType: formData.quarantineType,
      F_QuarantineResult: formData.quarantineResult,
      F_QuarantineProof: formData.quarantineProof, // 假设 API 接收图片 URL 或文件信息
      // 检疫时间直接使用 Input 框中的字符串值
      F_QuarantineTime: formData.quarantineTime,
      F_LiveId: formData.selectedLivestock.id, // 假设 API 需要选中牲畜的 ID
      F_Remark: formData.notes,
      // 如果 API 还需要其他字段，也在这里添加
    };

    console.log('准备提交到 API 的数据:', submitData);

    // TODO: 在这里调用实际的提交 API 函数
    try {
      // 显示加载提示
      Taro.showLoading({
        title: '提交中...',
      });

      // const response = await addQuarantineRecordApi(submitData); // 调用你的 API 函数

      // !!! 模拟 API 调用成功，请替换为实际的 API 调用和结果处理 !!!
      const response = { code: 200, message: '提交成功' }; // 模拟成功响应
      // !!! 模拟 API 调用失败，可以取消上面成功模拟，使用下面失败模拟进行测试 !!!
      // const response = { code: 500, message: '服务器内部错误' }; // 模拟失败响应


      console.log('API 提交结果:', response);

      // 隐藏加载提示
      Taro.hideLoading();

      // 根据 API 返回结果判断提交是否成功
      // 请根据你实际的 API 返回结构调整这里的判断条件 (例如 response.status === 200 或 response.data.success)
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
    <View className='add-quarantine-record-page'>
      <View>
        {/* 在 H5 环境下显示页面标题 */}
        {process.env.TARO_ENV === 'h5' && <TitleH5 title='检疫记录' />}
      </View>
      {/* 页面内容区域，使用 padding-bottom 避免被底部按钮遮挡 */}
      <View className='page-content' style={{ paddingBottom: '60px' }}> {/* 预留底部按钮空间 */}
        {/* 检疫信息部分 */}
        <View className='section'>
          <View className='section-header'>
            <Text className='section-title'>检疫信息</Text>
          </View>

          {/* 检疫单位 (假设不可编辑) */}
          <View className='list-item'>
            <Text className='item-label'>检疫单位</Text>
            <Input
              className='item-value'
              value={formData.quarantineUnit}
              // onInput={(e) => handleInputChange('quarantineUnit', e.detail.value)} // 如果不可编辑，此行可省略
              placeholder='请输入检疫单位'
              disabled // 假设不可编辑
            />
          </View>
          <View className='divider'></View> {/* 分隔线 */}

          {/* 检疫人员 */}
          <View className='list-item'>
            <Text className='item-label'>检疫人员</Text>
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
            <Text className='item-label'>联系电话</Text>
            <Input
              className='item-value'
              value={formData.contactPhone}
              onInput={(e) => handleInputChange('contactPhone', e.detail.value)}
              placeholder='请输入联系电话' // 修正了 placeholder
              type='number' // 设置输入类型为数字键盘
            />
          </View>
          <View className='divider'></View>

          {/* 检疫地址 */}
          <View className='list-item'>
            <Text className='item-label'>检疫地址</Text>
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
            <Text className='item-label'>检疫类型</Text>
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
            <Text className='item-label'>检疫结果</Text>
            <Input
              className='item-value'
              value={formData.quarantineResult}
              onInput={(e) => handleInputChange('quarantineResult', e.detail.value)}
              placeholder='请输入检疫结果'
            />
          </View>
          <View className='divider'></View>

          {/* 检疫证明上传 */}
          <View className='list-item' onClick={handleProofUpload}>
            <Text className='item-label'>检疫证明上传</Text>
            <View className='upload-icon-container'>
              {/* 根据 quarantineProof 状态显示上传图标或已上传提示 */}
              {formData.quarantineProof ? (
                // 如果已上传，可以显示图片缩略图或“已上传”文本
                <Text style={{ color: '#0bcb77' }}>已上传</Text> // 简单示例
              ) : (
                <Add size={20} color='#999' /> // 相机图标
              )}
            </View>
          </View>
          <View className='divider'></View>

          {/* 检疫时间 (改回普通 Input) */}
          <View className='list-item'>
            <Text className='item-label'>检疫时间</Text>
            <Input
              className='item-value'
              value={formData.quarantineTime}
              onInput={(e) => handleInputChange('quarantineTime', e.detail.value)} // 使用通用处理函数更新状态
              placeholder='请手动输入检疫时间' // 提示用户手动输入
              type='text' // 改回文本类型
            />
          </View>
          <View className='divider'></View> {/* 添加分隔线 */}
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
            {/* 移除 Navigator，使用 View 和 onClick */}
            <View className='item-value-with-arrow'>
              {/* 显示已选择牲畜的 IMEI，如果没有选择则显示占位符 */}
              <Text className={`item-value ${!formData.selectedLivestock && 'placeholder'}`}>
                {formData.selectedLivestock ? formData.selectedLivestock.imei : '请选择牲畜'}
              </Text>
              <ArrowRight size={19} color='#999' /> {/* 右箭头 */}
            </View>
          </View>
          <View className='divider'></View> {/* 添加分隔线 */}
        </View>

        {/* 备注部分 */}
        <View className='section notes-section'>
          <View className='list-item'>
            <Text className='item-label'>备注</Text>
          </View>
          {/* Textarea 用于多行输入 */}
          <TextArea
            placeholder='请输入备注信息'
            value={formData.notes} // <--- 绑定到 formData.notes
            onChange={(value) => handleInputChange('notes', value)} // <--- 使用通用处理函数更新 notes 状态
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

      {/* 移除日期时间选择器 Popup */}
      {/* <Popup ...> */}
      {/*   <DatePicker .../> */}
      {/* </Popup> */}
    </View>
  );
};

export default AddQuarantineRecord;
