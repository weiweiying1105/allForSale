import { get, post } from "./fetch";

export function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 这里可以调用后端接口换取openid
          // 假设直接返回code作为openid示例
          post('/wxLogin', { code: res.code }).then((res) => {
            console.log('wxLogin',res);
            wx.setStorageSync('openid', res.openid);
            resolve(res.openid);
          })
          resolve(res.code);
        } else {
          reject(new Error('登录失败，无法获取code'));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}