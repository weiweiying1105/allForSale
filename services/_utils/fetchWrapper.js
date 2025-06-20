
const defaultHeaders ={
  "Content-Type": "application/json",
}
const prefix = 'http://localhost:8000/mini';

// 拦截器函数
function interceptors(response) {
  if (response.statusCode !== 200) {
    throw new Error(response.errMsg);
  }
  return response.data;
}



// GET 请求
export function get(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: prefix + url,
      method: 'GET',
      header: defaultHeaders,
      success: resolve,
      fail: reject,
    });
  }).then(interceptors);
}

// POST 请求
export function post(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: prefix + url,
      method: 'POST',
      header: defaultHeaders,
      data: data,
      success: resolve,
      fail: reject,
    });
  }).then(interceptors);
}