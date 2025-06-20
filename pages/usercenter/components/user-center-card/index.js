const  AuthStepType ={
      ONE: 1,
      TWO: 2,
      THREE: 3,
    }

Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    currAuthStep: {
      type: Number,
      value: AuthStepType.ONE,
    },
    userInfo: {
      type: Object,
      value: {},
    },
    isNeedGetUserInfo: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    defaultAvatarUrl: 'https://tdesign.gtimg.com/miniprogram/template/retail/usercenter/icon-user-center-avatar@2x.png',
    AuthStepType,
  },
  methods: {
    gotoUserEditPage() {
      this.triggerEvent('gotoUserEditPage');
    },
    handleChooseAvatar(e){
        const { avatarUrl } = e.detail;
  console.log(avatarUrl);
  uni.uploadFile({
    url: getUrlPrefix() + "h5tool/img",
    filePath: avatarUrl,
    name: "file",
    success: (uploadFileRes) => {
      const avatarUrl = JSON.parse(uploadFileRes.data).data.src;
      handleSubmit({ avatarUrl });
    },
    fail: (error) => {
      console.log("失败");
      console.log(error);
    },
  });
    }
  },
});
