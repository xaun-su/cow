import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { Cell, CellGroup, ConfigProvider } from '@nutui/nutui-react-taro';
import { ArrowRight } from '@nutui/icons-react-taro'; // 导入箭头图标
import './index.less'; // 引入样式文件

// 导入一个占位的头像图片，请替换为你自己的图片路径
import defaultAvatar from '../../static/images/惊叹号、感叹号.png'; // 假设你有一个默认头像图片

const UserProfile = () => {
  // 模拟用户数据，实际应用中这些数据会从后端获取或通过状态管理维护
  const [userInfo, setUserInfo] = useState({
    avatarUrl: defaultAvatar, // 用户头像 URL
    name: '未填写',
    gender: '未选择',
    email: '未填写',
    phone: '未填写',
  });

  // 自定义 NutUI Cell 的样式变量
  const customCellTheme = {
    // 可以根据需要覆盖 NutUI 的默认 Cell 样式
    // '--nutui-cell-padding': '15px 16px', // 调整 Cell 的内边距
    // '--nutui-cell-border-bottom': '1px solid #eee', // 调整 Cell 的底部边框
    '--nutui-cell-desc-color': '#999', // 右侧描述文字颜色
  };

  // 处理点击信息项的函数（例如跳转到编辑页面）
  const handleEditInfo = (field) => {
    console.log(`点击了编辑 ${field}`);
    // 在实际应用中，你可以在这里实现页面跳转、显示编辑弹窗等逻辑
    // 例如：Taro.navigateTo({ url: `/pages/edit-profile/index?field=${field}` });
  };

  // 处理点击退出登录的函数
  const handleLogout = () => {
    console.log('点击了退出登录');
    // 在实际应用中，这里应该执行退出登录的逻辑，例如：
    // 1. 清除用户登录状态（如 token）
    // 2. 重定向到登录页面
    // Taro.removeStorageSync('token');
    // Taro.redirectTo({ url: '/pages/login/index' });
  };

  return (
    
    <ConfigProvider themeVars={customCellTheme}>
      <View className='user-profile-page'>
        {/* 头像 */}
        {/* Cell 组件的 extra 属性可以自定义右侧内容 */}
        {/* isLink 属性会自动在右侧添加一个箭头 */}
        <Cell
          title='头像'
          isLink
          extra={
            <View className='avatar-extra'>
              <Image src={userInfo.avatarUrl} className='avatar-image' mode='aspectFill' style={{
                width: '30px',
                height: '30px'
              }}/>
              {/* NutUI 的 isLink 会自动添加 ArrowRight 图标，无需手动添加 */}
              <ArrowRight size={16} color='#999' />
            </View>
          }
          onClick={() => handleEditInfo('头像')}
        />

        {/* 其他信息项分组 */}
        {/* CellGroup 可以将 Cell 分组，提供统一的上下边距和可选的标题 */}
        {/* 图片中没有分组标题，所以我们不设置 title */}
        <CellGroup>
          <Cell
            title='姓名'
            extra={userInfo.name}
            isLink
            onClick={() => handleEditInfo('姓名')}
          />
          <Cell
            title='性别'
            extra={userInfo.gender}
            isLink
            onClick={() => handleEditInfo('性别')}
          />
          <Cell
            title='邮箱'
            extra={userInfo.email}
            isLink
            onClick={() => handleEditInfo('邮箱')}
          />
          <Cell
            title='电话'
            extra={userInfo.phone}
            isLink
            onClick={() => handleEditInfo('电话')}
          />
        </CellGroup>

        {/* 退出登录按钮 */}
        {/* 使用 Cell 来模拟一个全宽的按钮，并应用自定义样式居中 */}
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
