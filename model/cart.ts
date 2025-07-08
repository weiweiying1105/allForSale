import { mockIp, mockReqId } from '../utils/mock';

/**
 * 商品规格信息，例如颜色、尺码等
 */
interface SpecInfo {
  specTitle: string; // 规格名称，例如“颜色”
  specValue: string; // 规格值，例如“红色”
}

/**
 * 商品标签，例如“爆款”、“新品”
 */
interface Tag {
  text: string; // 标签文字内容
}

/**
 * 单个商品信息结构
 */
interface GoodsItem {
  uid: string;                 // 用户ID（或加入购物车的唯一标识）
  saasId: string;              // 商户/租户ID（SaaS场景）
  storeId: string;             // 所属店铺ID
  spuId: string;               // SPU ID（商品通用信息ID）
  skuId: string;               // SKU ID（具体的商品规格ID）
  isSelected: number;          // 是否被选中，1=选中，0=未选中
  thumb: string;               // 商品缩略图
  title: string;               // 商品标题
  primaryImage: string;        // 商品主图
  quantity: number;            // 购物车中购买的数量
  stockStatus: boolean;        // 是否有库存
  stockQuantity: number;       // 实际库存数量
  price: string;               // 售价（单位：分）
  originPrice: string;         // 原价（单位：分）
  tagPrice: string | null;     // 标签价（可能为空）
  tagText?: string[] | null;   // 价格下方附加标签文字
  titlePrefixTags: Tag[] | null; // 标题前缀标签
  roomId: string | null;       // 直播间ID（如果商品来源于直播）
  specInfo: SpecInfo[];        // 商品规格信息
  joinCartTime: string;        // 加入购物车的时间
  available: number;           // 是否可用（0=不可用，1=可用）
  putOnSale: number;           // 是否已上架（1=上架，0=下架）
  etitle: string | null;       // 英文标题（可用于国际化）
}

/**
 * 单条促销活动信息（如满减、满折）
 */
interface Promotion {
  title: string | null;           // 促销标题
  promotionCode: string;          // 促销编码
  promotionSubCode: string | null;// 子促销编码（如阶梯满减等）
  promotionId: string | null;     // 促销ID
  tagText: string[] | null;       // 标签文字（如“满减”）
  promotionStatus: number | null; // 活动状态（例如 1=进行中）
  tag: string | null;             // 活动标记
  description: string | null;     // 活动描述
  doorSillRemain: number | null;  // 距满减/满折门槛还差多少金额（单位：分）
  isNeedAddOnShop: number;        // 是否需要额外加购商品才满足条件（1=是）
  goodsPromotionList: GoodsItem[];// 参与该促销的商品列表
  lastJoinTime: string | null;    // 最后参与活动时间
}

/**
 * 店铺包邮促销信息（全场满多少包邮）
 */
interface PostageFreePromotion {
  title: string | null;           // 活动标题
  promotionCode: string | null;  // 活动编码
  promotionSubCode: string | null;// 子编码
  promotionId: string | null;    // 活动ID
  tagText: string[] | null;      // 活动标签文字
  promotionStatus: number | null;// 状态
  tag: string | null;            // 标签标记
  description: string | null;    // 活动描述
  doorSillRemain: number | null; // 距包邮门槛还差金额（单位：分）
  isNeedAddOnShop: number;       // 是否需要加购满足条件
}

/**
 * 单个店铺及其商品信息
 */
interface StoreGoods {
  storeId: string;                        // 店铺ID
  storeName: string;                      // 店铺名称
  storeStatus: number;                    // 店铺状态（如是否营业）
  totalDiscountSalePrice: string;        // 总优惠后金额（单位：分）
  promotionGoodsList: Promotion[];       // 促销活动及其商品
  lastJoinTime: string;                  // 最后一次加入购物车时间
  postageFreePromotionVo: PostageFreePromotion; // 包邮促销信息
}

/**
 * 购物车返回的核心数据
 */
interface CartData {
  isNotEmpty: boolean;            // 是否有商品（true=有）
  storeGoods: StoreGoods[];       // 所有店铺及其商品
  invalidGoodItems: GoodsItem[];  // 已失效的商品
  isAllSelected: boolean;         // 是否全选状态
  selectedGoodsCount: number;     // 已选中商品数量
  totalAmount: string;            // 所有商品总价（单位：分）
  totalDiscountAmount: string;    // 所有优惠总额（单位：分）
}

/**
 * 最外层接口返回结构
 */
interface GenCartGroupDataResponse {
  data: CartData;                 // 购物车主体数据
  code: string;                   // 状态码，例如 "Success"
  msg: string | null;             // 错误消息（若失败）
  requestId: string;              // 请求ID（用于追踪）
  clientIp: string;               // 客户端IP（模拟）
  rt: number;                     // 响应耗时（单位：ms）
  success: boolean;               // 是否请求成功
}

/**
 * 生成模拟购物车数据（用于调试或展示测试用例）
 * @returns GenCartGroupDataResponse 包含商品、促销、失效信息等
 */
export function genCartGroupData(): GenCartGroupDataResponse {
  const resp: GenCartGroupDataResponse = {
    data: {
      isNotEmpty: true,
      storeGoods: [
        // 示例数据请在此补充，包含促销、商品等（暂略）
      ],
      invalidGoodItems: [
        // 示例失效商品列表（暂略）
      ],
      isAllSelected: false,
      selectedGoodsCount: 16,     // 当前选中商品数量
      totalAmount: '179997',      // 所有商品价格总和（单位：分）
      totalDiscountAmount: '110000', // 所有商品优惠总和（单位：分）
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),       // 模拟生成的请求ID
    clientIp: mockIp(),           // 模拟生成的客户端IP
    rt: 269,                      // 响应耗时（单位：ms）
    success: true,                // 成功标志
  };
  return resp;
}
