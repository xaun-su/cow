import React from 'react';
import Taro from '@tarojs/taro';
// 导入 NutUI 组件
import { NavBar, Badge } from '@nutui/nutui-react-taro';
// 导入 Taro 的 View 组件
import { View } from '@tarojs/components';
// 导入 Taro 的 Navigator 组件
import { Navigator } from '@tarojs/components';
import './index.less'; // 引入样式文件，确保 iconfont 在这里被正确引入

const Demo1 = (props) => {
  const { title = '页面标题' } = props;
  return (
    <View style={{height:'7vh', display:'flex'}}>
      <NavBar
        title={title}
        left={
          <Navigator
            className='index-bell'
            url='/homePack/pages/message/index'
            style={{ marginRight: 16 }}
          >
            <Badge value={8}>
              {/* iconfont 是全局类名，不加前缀 */}
              {/* 确保 iconfont 相关的 CSS 和字体文件在 H5 环境下被正确加载 */}
              <i className='iconfont icon-lingdang'></i>
            </Badge>
          </Navigator>
        }
      />
    </View>
  );
};

export default Demo1;
