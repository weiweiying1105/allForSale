import { config } from "../../config/index";
import { get } from "../../utils/fetch";

/** 获取个人中心信息 */
export async function fetchUserCenter() {
  return get("/getUserCenter");
}
