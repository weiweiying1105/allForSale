/* eslint-disable no-param-reassign */
import { config } from "../../config/index";
import { get } from "../../utils/fetch";

/** 获取商品列表 */
function mockFetchGoodsList(params) {
  const { delay } = require("../_utils/delay");
  const { getSearchResult } = require("../../model/search");

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.minSalePrice;
      item.originPrice = item.maxLinePrice;
      item.desc = "";
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title);
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => {
    return data;
  });
}

/** 获取商品列表 */
export async function fetchGoodsList(params) {
  const { data } = await get("/products", params);
  return new Promise((resolve) => {
    resolve(data);
  });
}
