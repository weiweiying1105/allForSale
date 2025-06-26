import { config } from '../../config/index';
import { get } from '../../utils/fetch';

/** 获取个人中心信息 */
function mockFetchUserCenter() {
  const { delay } = require('../_utils/delay');
  const { genUsercenter } = require('../../model/usercenter');
  return delay(200).then(() => genUsercenter());
}

/** 获取个人中心信息 */
export async function  fetchUserCenter() {
  return get('/getUserCenter')
  // return new Promise((resolve) => {
  //   resolve('real api');
  // });
}
