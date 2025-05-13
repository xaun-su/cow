import Taro from '@tarojs/taro'; // 引入 Taro 框架，用于发起网络请求等功能
import interceptors from './interceptors'; // 引入之前定义的请求拦截器数组

// 定义获取基础 URL 的函数
// 它接收请求的路径（例如 '/user/good'）作为参数
const getBaseUrl = (url) => {
  // 你的假设的基地址
  const BASE_API_URL = 'http://8.137.157.16:9999';
  // 将基地址和请求路径拼接起来
  // 为了防止出现重复的斜杠或缺少斜杠，可以进行一些处理
  // 这里简单地拼接，假设 url 已经是以 '/' 开头
  return `${BASE_API_URL}${url}`;

  // 如果需要更严谨的处理，可以这样做：
  // const baseUrl = BASE_API_URL.endsWith('/') ? BASE_API_URL.slice(0, -1) : BASE_API_URL;
  // const endpoint = url.startsWith('/') ? url.slice(1) : url;
  // return `${baseUrl}/${endpoint}`;
};


// 添加拦截器到 Taro 的请求链中
// 这样在每次调用 Taro.request 发起请求时，都会先经过这些拦截器处理
interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

// 定义一个 httpRequest 类，用于封装各种 HTTP 请求方法 (GET, POST, PUT, DELETE)
class httpRequest {
  /**
   * 基础请求方法，供其他 HTTP 方法调用
   * @param {object} params - 请求参数对象
   * @param {string} params.url - 请求的 URL 路径 (例如 '/user/good')
   * @param {any} params.data - 请求的数据
   * @param {object} params.header - 请求头对象
   * @param {string} [method='GET'] - 请求方法，默认为 GET
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回 Taro.request 的 Promise 对象
   */
  baseOptions(params, method = 'GET') {
    // 从传入的参数对象中解构出 url, data, header
    let { url, data, header } = params;
    // 调用 getBaseUrl 函数获取完整的请求基础 URL
    // getBaseUrl 会将基地址和传入的 url 路径拼接
    const FULL_REQUEST_URL = getBaseUrl(url);
    // 设置默认的 content-type 为 application/json
    let contentType = 'application/json';
    // 如果 header 中指定了 content-type，则使用 header 中的值，否则使用默认值
    contentType = header && header['content-type'] ? header['content-type'] : contentType;

    // 注意：以下逻辑根据原始代码保留，它检查如果 content-type 不是 application/json，
    // 就尝试使用 data 对象中的 data 属性作为实际的数据。
    // 这个逻辑可能需要根据实际后端接口的数据结构进行调整。
    if (
      contentType!=='application/json'
    ) {
      // 如果 content-type 不是 application/json，则使用 data.data 作为请求体
      data = data.data;
    }

    // 构造 Taro.request 方法所需的选项对象
    const option = {
      url: FULL_REQUEST_URL, // 请求的完整 URL (例如 'http://1.1.1.1:9899/user/good')
      data: data, // 请求发送的数据
      method: method, // 请求方法 (GET, POST, PUT, DELETE 等)
      header: { // 请求头
        'content-type': contentType, // 设置 content-type
        // ## token已在拦截器中实现
        // 'Authorization': Taro.getStorageSync('Authorization') // 原始代码中注释掉了在这里添加 Token 的方式，因为已在拦截器中处理
      },
    };

    // 发起 Taro 网络请求并返回 Promise 对象
    return Taro.request(option);
  }

  /**
   * 封装 GET 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {string | object} [data=''] - 请求的数据 (通常 GET 请求数据放在 url 参数中，这里作为可选参数)
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  get(url, data = '', header = {}) {
    let option = { url, data, header };
    // 调用基础方法发起 GET 请求
    return this.baseOptions(option);
  }

  /**
   * 封装 POST 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {any} data - 请求的数据 (通常 POST 请求数据放在请求体中)
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  post(url, data, header = {}) {
    let params = { url, data, header };
    // 调用基础方法发起 POST 请求，并指定方法为 'POST'
    return this.baseOptions(params, 'POST');
  }

  /**
   * 封装 PUT 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {any} data - 请求的数据
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  put(url, data, header = {}) {
    let option = { url, data, header };
    // 调用基础方法发起 PUT 请求，并指定方法为 'PUT'
    return this.baseOptions(option, 'PUT');
  }

  /**
   * 封装 DELETE 请求
   * @param {string} url - 请求的 URL 路径 (例如 '/user/good')
   * @param {string | object} [data=''] - 请求的数据
   * @param {object} [header={}] - 请求头对象
   * @returns {Promise<Taro.request.SuccessCallbackResult>} - 返回请求的 Promise
   */
  delete(url, data = '', header = {}) {
    let option = { url, data, header };
    // 调用基础方法发起 DELETE 请求，并指定方法为 'DELETE'
    return this.baseOptions(option, 'DELETE');
  }
}

// 导出 httpRequest 类的一个实例，以便可以直接调用其方法发起请求
export default new httpRequest();
