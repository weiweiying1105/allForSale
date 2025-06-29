import { fetchPerson } from "../../../services/usercenter/fetchPerson";
import { phoneEncryption } from "../../../utils/util";
import Toast from "tdesign-miniprogram/toast/index";

import { Cloudinary } from "@cloudinary/url-gen";
import { post } from "../../../utils/fetch";

const _cloudinary = new Cloudinary({
  cloud_name: "dc6wdjxld",
  api_key: "925588468673723",
  api_secret: "gBuAbiJsd-4jaWEDqpCkbwNMogk",
});
console.log(_cloudinary);
Page({
  data: {
    selectedFile: null,
    personInfo: {
      avatarUrl: "",
      nickName: "",
      gender: 0,
      phoneNumber: "",
    },
    showUnbindConfirm: false,
    pickerOptions: [
      {
        name: "男",
        code: "1",
      },
      {
        name: "女",
        code: "2",
      },
    ],
    typeVisible: false,
    genderMap: ["", "男", "女"],
  },
  onLoad() {
    this.init();
  },
  init() {
    this.fetchData();
  },
  fetchData() {
    fetchPerson().then((personInfo) => {
      console.log("personInfo", personInfo);
      this.setData({
        personInfo,

        "personInfo.phoneNumber": personInfo.phoneNumber
          ? phoneEncryption(personInfo.phoneNumber)
          : "",
      });
    });
  },
  onClickCell({ currentTarget }) {
    const { dataset } = currentTarget;
    const { nickName } = this.data.personInfo;

    switch (dataset.type) {
      case "gender":
        this.setData({
          typeVisible: true,
        });
        break;
      case "name":
        wx.navigateTo({
          url: `/pages/user/name-edit/index?name=${!!nickName ? nickName : ""}`,
        });
        break;
      case "avatarUrl":
        this.toModifyAvatar();
        break;
      default: {
        break;
      }
    }
  },
  onClose() {
    this.setData({
      typeVisible: false,
    });
  },
  onConfirm(e) {
    const { value } = e.detail;
    this.setData(
      {
        typeVisible: false,
        "personInfo.gender": value,
      },
      () => {
        Toast({
          context: this,
          selector: "#t-toast",
          message: "设置成功",
          theme: "success",
        });
      }
    );
  },
  async handleUpload(selectedFile, filePath) {
    const _this = this;
    if (!selectedFile) return;

    try {
      // const formData = new FormData();
      // formData.append("file", selectedFile);
      // formData.append("upload_preset", "inventory");

      // const response = await fetch(
      // `https://api.cloudinary.com/v1_1/${
      //   _cloudinary.config().cloud_name
      // }/image/upload`,
      //   {
      //     method: "POST",
      //     body: formData,
      //   }
      // );
      wx.uploadFile({
        url: `https://api.cloudinary.com/v1_1/${_cloudinary.cloudinaryConfig.cloud_name}/image/upload`,
        filePath: selectedFile,
        name: "file",
        formData: {
          file: selectedFile,
          upload_preset: "inventory",
        },
        success(res) {
          // 处理返回结果
          console.log("处理返回结果", res);
          const { url } = JSON.parse(res.data);
          _this.avatarUrl = url;
          _this.updateUserInfo(url);
        },
        fail(err) {
          // 错误处理
        },
      });

      // const data = await response.json();
      // if (data.secure_url) {
      //   this.avatarUrl = data.secure_url;
      //   await updateUserInfo();
      // }
    } catch (error) {
      console.error("保存图片失败:", error);
    }
  },
  async updateUserInfo(avatarUrl) {
    return await post("/updateUserInfo", {
      avatarUrl,
    });
  },
  async toModifyAvatar() {
    try {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: async (res) => {
          console.log("选择图片成功:", res);
          const tempFilePaths = res.tempFilePaths;
          const selectedFile = tempFilePaths[0];
          this.selectedFile = selectedFile;
          this.handleUpload(selectedFile, tempFilePaths);
        },
      });
    } catch (error) {
      if (error.errMsg === "chooseImage:fail cancel") return;
      Toast({
        context: this,
        selector: "#t-toast",
        message: error.errMsg || error.msg || "修改头像出错了",
        theme: "error",
      });
    }
  },
});
