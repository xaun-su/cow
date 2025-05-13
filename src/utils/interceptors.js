import Taro from '@tarojs/taro';

const customInterceptor = chain => {
  // let datacenter_img_base_url = process.env.COWA_DATACENTER; // 移除或注释掉这一行

  // ## 请求发出前处理
  const requestParams = chain.requestParams;
  const { url } = requestParams;
  // 确保在 chain.proceed() 之前修改 requestParams
  requestParams.header = {
    ...requestParams.header,
    // TODO: 将这里的 '' 替换为实际获取 Token 的逻辑，例如从 Taro.getStorageSync 获取
    Token: '', // 将token添加到头部
  };


  // ## 请求后处理响应
  return chain.proceed(requestParams).then(res => {
    console.log(res?.statusCode);
    // 根据你的需求，决定是返回完整响应对象还是只返回数据
    // return res; // 返回完整响应对象
    return res?.data; // 只返回数据
  });
};

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor];

export default interceptors;
