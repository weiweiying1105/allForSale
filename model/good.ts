/**
 * 规格值定义
 */
interface SpecValue {
  /** 规格值ID */
  specValueId: string;
  /** 规格ID */
  specId: string | null;
  /** SaaS ID */
  saasId: string | null;
  /** 规格值名称 */
  specValue: string;
  /** 规格值图片 */
  image: string | null;
}

/**
 * 商品规格定义
 */
interface Spec {
  /** 规格ID */
  specId: string;
  /** 规格名称 */
  title: string;
  /** 规格值列表 */
  specValueList: SpecValue[];
}

/**
 * 价格信息
 */
interface PriceInfo {
  /** 价格类型 (1: 销售价, 2: 划线价) */
  priceType: number;
  /** 价格（以分为单位） */
  price: string;
  /** 价格类型名称 */
  priceTypeName: string | null;
}

/**
 * 库存信息
 */
interface StockInfo {
  /** 库存数量 */
  stockQuantity: number;
  /** 安全库存 */
  safeStockQuantity: number;
  /** 已售数量 */
  soldQuantity: number;
}

/**
 * 重量信息
 */
interface Weight {
  /** 重量值 */
  value: number | null;
  /** 重量单位 */
  unit: string;
}

/**
 * SKU规格信息
 */
interface SkuSpecInfo {
  /** 规格ID */
  specId: string;
  /** 规格名称 */
  specTitle: string | null;
  /** 规格值ID */
  specValueId: string;
  /** 规格值名称 */
  specValue: string | null;
}

/**
 * SKU定义（库存单元）
 */
interface Sku {
  /** SKU ID */
  skuId: string;
  /** SKU图片 */
  skuImage: string | null;
  /** 规格信息 */
  specInfo: SkuSpecInfo[];
  /** 价格信息 */
  priceInfo: PriceInfo[];
  /** 库存信息 */
  stockInfo: StockInfo;
  /** 重量信息 */
  weight: Weight | null;
  /** 体积信息 */
  volume: any;
  /** 利润价格 */
  profitPrice: any;
}

/**
 * 商品标签
 */
interface SpuTag {
  /** 标签ID */
  id: string | null;
  /** 标签名称 */
  title: string;
  /** 标签图片 */
  image: string | null;
}

/**
 * 限购信息
 */
interface LimitInfo {
  /** 限购文案 */
  text: string;
}

/**
 * 商品定义（SPU级别）
 */
interface Good {
  /** SaaS ID */
  saasId: string;
  /** 店铺ID */
  storeId: string;
  /** 商品ID (SPU ID) */
  spuId: string;
  /** 商品标题 */
  title: string;
  /** 主图URL */
  primaryImage: string;
  /** 商品图片列表 */
  images: string[];
  /** 商品视频 */
  video: string | null;
  /** 商品可用状态 */
  available?: number;
  /** 最低销售价 */
  minSalePrice: string | number;
  /** 最低划线价 */
  minLinePrice: string | number;
  /** 最高销售价 */
  maxSalePrice: string | number;
  /** 最高划线价 */
  maxLinePrice: string | number;
  /** SPU总库存 */
  spuStockQuantity: number;
  /** 已售数量 */
  soldNum: number;
  /** 上架状态 (1: 上架) */
  isPutOnSale: number;
  /** 类目ID列表 */
  categoryIds?: string[];
  /** 规格列表 */
  specList: Spec[];
  /** SKU列表 */
  skuList: Sku[];
  /** 商品标签列表 */
  spuTagList: SpuTag[];
  /** 限购信息 */
  limitInfo?: LimitInfo[];
  /** 商品详情图片列表 */
  desc: string[];
  /** 英文标题 */
  etitle: string;
  /** 分组ID列表 */
  groupIdList?: string[];
  /** 促销信息 */
  promotionList?: any;
  /** 最低利润价 */
  minProfitPrice?: any;
  /** 是否售罄 */
  isSoldOut?: boolean;
}

