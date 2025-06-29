import { get } from "../../utils/fetch";
import { config } from "../../config/index";

/** 获取个人中心信息 */
function mockFetchPerson() {
  const { delay } = require("../_utils/delay");
  const { genSimpleUserInfo } = require("../../model/usercenter");
  const { genAddress } = require("../../model/address");
  const address = genAddress();
  return delay().then(() => ({
    ...genSimpleUserInfo(),
    address: {
      provinceName: address.provinceName,
      provinceCode: address.provinceCode,
      cityName: address.cityName,
      cityCode: address.cityCode,
    },
  }));
}

/** 获取个人中心信息 */
export async function fetchPerson() {
  const { data } = await get("/getUserInfo");
  console.log("用户个人信息", data);
  return new Promise((resolve) => {
    resolve(data?.data?.userInfo);
  });
}
