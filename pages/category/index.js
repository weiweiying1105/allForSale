import { getCategoryList } from "../../services/good/fetchCategoryList";
Page({
  data: {
    list: [],
  },
  async init() {
    try {
      const { data } = await getCategoryList();
      console.log("分类:", data);
      this.setData({
        list: data,
      });
    } catch (error) {
      console.error("err:", error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(item) {
    const { item: i } = item.detail;
    console.log("item:", i);
    wx.navigateTo({
      url: `/pages/goods/list/index?categoryId=${i.id}`,
    });
  },
  onLoad() {
    this.init(true);
  },
});
