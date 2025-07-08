/** 单个商品规格信息 */
interface SpecInfo {
  specTitle: string; // 规格名，例如“颜色”
  specValue: string; // 规格值，例如“红色”
}

/** 商品确认数据结构（用于结算页） */
interface ConfirmGoodsItem {
  storeId: string;             // 店铺 ID
  spuId: string;               // 商品 SPU ID
  skuId: string;               // 商品 SKU ID
  goodsName: string;          // 商品名称
  image: string;              // 商品主图
  reminderStock: number;      // 库存提醒数量
  quantity: number;           // 购买数量
  payPrice: string;           // 实际支付价格（单位：分，字符串格式）
  totalSkuPrice: string;      // SKU 总价（可与 payPrice 相同）
  discountSettlePrice: string;// 折后价格（最终结算价）
  realSettlePrice: string;    // 实际结算价格（可与 discountSettlePrice 相同）
  settlePrice: string;        // 结算价（基本等于单价）
  oriPrice: string;           // 原价
  tagPrice: string | null;    // 标签价（如市场参考价）
  tagText: string[] | null;   // 标签文本数组
  skuSpecLst: SpecInfo[];     // 规格列表
  promotionIds: string | null;// 所参与的促销 ID（可选）
  weight: number;             // 重量，单位 KG
  unit: string;               // 重量单位（如“KG”）
  volume: string | null;      // 商品体积
  masterGoodsType: number;    // 主商品类型（如 0 = 正常商品）
  viceGoodsType: number;      // 副商品类型（如赠品等）
  roomId: string | null;      // 直播间 ID（用于直播电商）
  egoodsName: string | null;  // 英文名称（国际化场景）
}

/** 单个优惠券数据结构 */
interface Coupon {
  couponId: number;       // 优惠券 ID
  storeId: string;        // 所属店铺 ID
  status?: string;        // 可选状态，如 "default" 代表可用
  type?: number;          // 优惠券类型，1 = 减免金额，2 = 折扣
  value?: number;         // 折扣值，如 10 表示打 10 折
}

/** 单个店铺结算数据 */
interface StoreGoodsSettle {
  storeId: string;                    // 店铺 ID
  storeName: string;                 // 店铺名称
  remark: string | null;             // 备注
  goodsCount: number;                // 商品数量
  deliveryFee: string;               // 运费（单位：分）
  deliveryWords: string | null;     // 运费文案
  storeTotalAmount: string;         // 店铺商品总额（单位：分）
  storeTotalPayAmount: string;      // 店铺支付金额（减去优惠等）
  storeTotalDiscountAmount: string; // 店铺优惠金额
  storeTotalCouponAmount: string;   // 店铺优惠券金额
  skuDetailVos: ConfirmGoodsItem[]; // 店铺商品详情列表
  couponList: Coupon[];             // 可用的优惠券列表
}

/** 结算地址结构 */
interface UserAddress {
  name: string;
  phone: string;
  address: string;
  [key: string]: any; // 可以根据需要扩展更多字段
}

/** 结算数据结构 */
interface SettleDetailResponse {
  data: {
    settleType: number;               // 结算类型，0=无需地址，1=需要地址
    userAddress: UserAddress | null; // 用户地址（可选）
    totalGoodsCount: number;         // 商品总数量
    packageCount: number;            // 包裹数量
    totalAmount: string;             // 商品原价总金额（单位：分）
    totalPayAmount: number | string; // 实付金额（单位：分）
    totalDiscountAmount: string;     // 总优惠金额（单位：分）
    totalPromotionAmount: string;    // 活动促销减免金额
    totalCouponAmount: number | string; // 优惠券总金额
    totalSalePrice: number | string; // 售卖价格总额
    totalGoodsAmount: string;        // 商品金额总额
    totalDeliveryFee: string;        // 运费总额
    invoiceRequest: any;             // 发票请求信息（可选）
    skuImages: any;                  // 商品图信息（可选）
    deliveryFeeList: any;            // 运费详情（可选）
    storeGoodsList: StoreGoodsSettle[]; // 店铺结算列表
    inValidGoodsList: any;           // 无效商品（可选）
    outOfStockGoodsList: any;        // 缺货商品
    limitGoodsList: any;             // 限购商品
    abnormalDeliveryGoodsList: any;  // 异常配送商品
    invoiceSupport: number;          // 是否支持开发票
  };
  code: string;              // 返回状态码
  msg: string | null;        // 错误信息
  requestId: string;         // 请求 ID
  clientIp: string;          // 客户端 IP（模拟）
  rt: number;                // 响应耗时（单位：ms）
  success: boolean;          // 请求是否成功
}
