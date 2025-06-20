import { config } from '../../config/index';
import {get} from '../_utils/fetchWrapper';
/** 获取个人中心信息 */
function mockFetchUserCenter() {
  const { delay } = require('../_utils/delay');
  return delay(200).then(() => genUsercenter());
}

export async function genUsercenter() {
  try{
    const response = await get('/getUserInfo');
    const data = await response.json();
    return data;
  }catch(e){
    console.log(e);
  }
}

/** 获取个人中心信息 */
export function fetchUserCenter() {
  if (config.useMock) {
    return mockFetchUserCenter();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
