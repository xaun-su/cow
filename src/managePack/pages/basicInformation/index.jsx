import React, { useState } from 'react';
import { View, Text, Image, Input } from '@tarojs/components';
// 确保导入 NutUI 的 Picker 组件
import { Cell, CellGroup, ConfigProvider, Picker } from '@nutui/nutui-react-taro';
import './index.less'; // 引入样式文件
import TitleH5 from '@/components/TitleH5/index';

// 导入一个占位的头像图片，请替换为你自己的图片路径
import defaultAvatar from '@/static/images/证明.png';

const UserProfile = () => {
  // 模拟用户数据，实际应用中这些数据会从后端获取或通过状态管理维护
  const [userInfo, setUserInfo] = useState({
    avatarUrl: defaultAvatar, // 用户头像 URL
    name: '未填写',
    gender: '男', // 默认为男
    email: '未填写',
    phone: '未填写',
  });

  // 状态：跟踪当前正在编辑的字段 (用于文本输入)
  const [editingField, setEditingField] = useState(null);

  // 状态：控制性别选择器的显示/隐藏 (使用 NutUI Picker 的 visible prop)
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const genderOptions = [
    [
      { value: 1, label: '男' },
      { value: 2, label: '女' },
    ],
  ];

  // 自定义 NutUI Cell 的样式变量
  const customCellTheme = {
    '--nutui-cell-desc-color': '#999', // 右侧描述文字颜色
    '--nutui-cell-extra-text-color': 'unset',
    '--nutui-cell-extra-font-weight': 'normal', // 确保编辑时文本粗细正常
    '--nutui-cell-extra-line-height': 'var(--nutui-cell-title-line-height)', // 使 Input 与 Title 对齐
  };

  // 处理点击信息项的函数，切换文本编辑状态
  const handleFieldClick = (field) => {
    if (!editingField || editingField === field) {
      setEditingField(field);
    }
  };

  // 处理输入框值变化的函数，实时更新 userInfo 状态
  const handleInputChange = (field, value) => {
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  // 处理输入框失去焦点的函数 (通常在这里触发保存操作)
  const handleInputBlur = (field) => {
    console.log(`字段 ${field} 失去焦点，准备保存值: ${userInfo[field]}`);
    // TODO: 在这里调用后端 API 保存 userInfo[field] 的新值
    setEditingField(null); // 失去焦点后退出编辑模式
  };

  // 处理输入框确认（例如按回车键）的函数 (也可以在这里触发保存操作)
  const handleInputConfirm = (field) => {
    // TODO: 在这里调用后端 API 保存 userInfo[field] 的新值
    setEditingField(null); // 确认后退出编辑模式
  };

  // 处理点击退出登录的函数
  const handleLogout = () => {
    console.log('点击了退出登录'); 
  };

  // 渲染可编辑字段的函数，根据 editingField 状态渲染 Input 或 Text
  const renderEditableField = (field, title, type = 'text') => {
    const isEditing = editingField === field;
    return (
      <Cell
        key={field} // 加上 key 提高渲染效率
        title={title}
        isLink={!isEditing} // 编辑时隐藏箭头
        onClick={() => handleFieldClick(field)}
        extra={
          isEditing ? (
            // 编辑模式：渲染 Input 输入框
            <Input
              type={type}
              value={userInfo[field]}
              onInput={(e) => handleInputChange(field, e.detail.value)} 
              onBlur={() => handleInputBlur(field)}
              onConfirm={() => handleInputConfirm(field)}
              autoFocus
              className='editable-input' // 自定义样式类
              placeholder={`请输入${title}`} // 添加 placeholder
              style={{ width: '100%' }} // 确保 Input 宽度足够显示内容
            />
          ) : (
            // 展示模式：渲染 Text
            <Text>{userInfo[field]}</Text>
          )
        }
      />
    );
  };

  // 处理 NutUI 性别选择器确认
  const onGenderPickerConfirm = (selectedOptions) => {
    // selectedOptions 是一个数组，单列选择器时只有一个元素
    const selectedGenderLabel = selectedOptions[0]?.label; // 获取选中的性别文本
    if (selectedGenderLabel) {
      setUserInfo(prevInfo => ({
        ...prevInfo,
        gender: selectedGenderLabel, 
      }));
      // TODO: 在这里调用后端 API 保存性别
      console.log(`选择了性别: ${selectedGenderLabel}`); // 示例日志
    }
    setShowGenderPicker(false); // 隐藏选择器
  };

  // 处理 NutUI 性别选择器关闭 (包括点击取消和蒙层)
  const onGenderPickerClose = () => {
    setShowGenderPicker(false); // 隐藏选择器
  };

  // 根据当前的 userInfo.gender 找到对应的 value，用于 NutUI Picker 的 value 属性
  const getCurrentGenderValue = () => {
    const foundOption = genderOptions[0].find(option => option.label === userInfo.gender);
    // NutUI Picker 的 value 期望一个数组，包含选中项的 value
    return foundOption ? [foundOption.value] : [genderOptions[0][0].value]; // 如果当前性别不在选项中，默认选中第一个
  };


  return (
    <ConfigProvider themeVars={customCellTheme}>
      <View>
      {process.env.TARO_ENV === 'h5' && <TitleH5 title='基本信息' />}
      </View>
      <View className='user-profile-page'>
        {/* 头像 - 通常是图片上传，不在此处实现文本编辑 */}
        <Cell
          title='头像'
          isLink
          extra={
            <View className='avatar-extra'>
              <Image src={userInfo.avatarUrl} className='avatar-image' mode='aspectFill' style={{
                width: '30px',
                height: '30px'
              }} />
            </View>
          }
          onClick={() => { /* TODO: 实现头像编辑/上传逻辑 */ }}
        />

        {/* 其他信息项分组 */}
        <CellGroup>
          {/* 姓名 */}
          {renderEditableField('name', '姓名', 'text')}

          {/* 性别 - 使用 NutUI Picker */}
          <Cell
            title='性别'
            extra={userInfo.gender} // 显示 userInfo.gender
            isLink
            onClick={() => setShowGenderPicker(true)} // 点击时显示性别选择器
          />
          {/* NutUI Picker 组件 */}
          <Picker
            title="性别"
            visible={showGenderPicker} // 控制显示/隐藏
            options={genderOptions} // 选项数据
            value={getCurrentGenderValue()} // 设置当前选中值
            onConfirm={onGenderPickerConfirm} // 确认选择时触发
            onClose={onGenderPickerClose} // 关闭选择器时触发
          />

          {/* 邮箱 */}
          {renderEditableField('email', '邮箱', 'text')}

          {/* 电话 */}
          {renderEditableField('phone', '电话', 'number')}

        </CellGroup>

        {/* 退出登录按钮 */}
        <Cell
          title='退出登录'
          className='logout-cell' // 应用自定义 CSS 类
          onClick={handleLogout}
        />
      </View>
    </ConfigProvider>
  );
};

export default UserProfile;
