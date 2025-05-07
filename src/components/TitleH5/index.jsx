import React from 'react';
import Taro from '@tarojs/taro';
// 移除了未使用的 View 导入
import { NavBar, pxTransform, harmony } from '@nutui/nutui-react-taro';
import { ArrowLeft } from '@nutui/icons-react-taro';

const Demo1 = (props) => {
  const { title = '页面标题' } = props;


  // 获取当前页面栈
  const pages = Taro.getCurrentPages();
  // 判断是否是第一页 (页面栈长度为 1)
  const isFirstPage = pages.length === 1;

  // 定义返回上一页的函数
  const handleBackClick = () => {
    // 调用 Taro 的 navigateBack 方法返回上一页
    Taro.navigateBack({
      delta: 1 // delta: 1 表示返回上一页，这是默认值，也可以省略
    }).catch(e => {

      console.error('返回上一页失败:', e);
    });
  };

  return (
    <>
      <NavBar
        title={title}
        // 使用条件渲染：如果不是第一页 (!isFirstPage)，则渲染返回箭头
        back={
          !isFirstPage && (
            <>
              <ArrowLeft style={harmony() ? { marginRight: 16 } : {}} />
            </>
          )
        }
        // 将 onBackClick 事件绑定到 handleBackClick 函数
        onBackClick={handleBackClick}
        style={{ width: '100%', background: '#fff', height: '7vh' }}
      />
    </>
  );
};

export default Demo1;
