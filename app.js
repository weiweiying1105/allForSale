import updateManager from './common/updateManager.js';
const AuthStepType={
  ONE:1,
  TWO:2,
  THREE:3
}
App({
  globalData: {
    userInfo: null,
    openid: null,
    customerId:'',
    baseUrl:'http://localhost:8000/mini',
    currAuthStep:AuthStepType.ONE,
   
  },
  onLaunch: function () {
    // this.checkLogin()
  },
  async checkLogin(){
    const openid=wx.getStorageSync('openid');
    if(!openid){
    return await this.wxLogin()
    }else{
      this.globalData.openid=openid;
    return await  this.getUserInfo()
    }
  },
 // 微信登录
async wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: `${this.globalData.baseUrl}/wxLogin`,
            method: 'POST',
            data: { code: res.code },
            success: (response) => {
              if (response.data.code === 200) {
                const { openid, customerId } = response.data.data;
                this.globalData.openid = openid;
                this.globalData.customerId = customerId;
                wx.setStorageSync('openid', openid);
                wx.setStorageSync('customerId', customerId);
                resolve({ openid, customerId });
              } else {
                reject(new Error('登录接口返回错误'));
              }
            },
            fail: (error) => {
              reject(error);
            }
          });
        } else {
          reject(new Error('wx.login 获取 code 失败'));
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
},

  // 获取用户信息
  async getUserInfo() {
      return new Promise((resolve, reject) => {
    wx.request({
      url: `${this.globalData.baseUrl}/getUserInfo`,
      method: 'GET',
      success: (response) => {
        if (response.data.code === 200) {
          this.globalData.userInfo = response.data.data.userInfo;
           resolve({userInfo:this.globalData.userInfo})
        }
      }
    });
  })
  },
  onShow: function () {
    updateManager();
  },
});
