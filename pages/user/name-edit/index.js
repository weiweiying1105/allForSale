const { post } = require("../../../utils/fetch");

Page({
  data: {
    nameValue: "",
  },
  onLoad(options) {
    const { name } = options;
    this.setData({
      nameValue: name,
    });
  },
  async onSubmit() {
    await post("/updateUserInfo", {
      nickName: this.data.nameValue,
    });
    wx.navigateBack({ backRefresh: true });
  },
  clearContent() {
    this.setData({
      nameValue: "",
    });
  },
});
