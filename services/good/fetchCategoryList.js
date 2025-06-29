import { config } from "../../config/index";
import { get } from "../../utils/fetch";

/** 获取商品列表 */
function mockFetchGoodCategory() {
  const { delay } = require("../_utils/delay");
  const { getCategoryList } = require("../../model/category");
  return delay().then(() => getCategoryList());
}

/** 获取商品列表 */
export async function getCategoryList() {
  const res = await get("/categories");
  return new Promise((resolve) => {
    resolve(res.data);
  });
}
