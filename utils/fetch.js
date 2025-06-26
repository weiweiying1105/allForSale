/**
 * 通用请求方法
 * @param {string} url 请求地址
 * @param {object} data 请求参数
 * @param {string} method 请求方法
 * @returns {Promise} 返回 Promise
 */

const { baseUrl } = require('../config/index');
function request({ url, data = {}, method = 'GET' }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl+url,
      data: data,
      headers:{
        'content-type': 'application/json', // 默认值
        "openid": wx.getStorageSync('openid')||'',
      },
      method: method,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * GET 请求
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return request({ url, data: params, method: 'GET' });
}

/**
 * POST 请求
 * @param {string} url 请求地址
 * @param {object} data 请求体
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return request({ url, data, method: 'POST' });
}

/**
 * 示例：获取个人中心信息
 */
export function fetchUserCenter() {
  return get('https://URL');
}