import { post } from "../../utils/fetch";

/** 获取加入购物车 */
export async function fetchAddCart(goodId, count = 1) {
  const res = await post;
  return new Promise((resolve) => {
    resolve("real api");
  });
}
