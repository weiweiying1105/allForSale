import { get } from "../../utils/fetch";

/** 获取商品列表 */
export async function fetchGood(productId) {
  if (!productId) {
    return Promise.reject("缺少商品id");
  }
  const { data } = await get(`/product/detail`, { productId });
  console.log("goodsDetail", data.data);
  return new Promise((resolve) => {
    resolve(data.data);
  });
}
