/** Types aligned with Shop API responses and checkout payload */

export interface ShopCollectionRef {
  id?: number;
  name?: string;
  title?: string;
}

export interface ShopProductListItem {
  id: number;
  name: string;
  image: string | null;
  startingPrice: number;
  collections: ShopCollectionRef[] | null;
}

export interface ShopVariantOption {
  name?: string;
  value?: string;
}

export interface ShopProductVariant {
  id: number;
  name: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  options?: string[];
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
  option4?: string | null;
}

export interface ShopProductOption {
  id?: number;
  name: string;
  values: string[];
}

export interface ShopModifierOption {
  id: number;
  name: string;
  price: number;
  isDefault?: boolean;
  imgUrl?: string;
}

export interface ShopModifier {
  id: number;
  name: string;
  description?: string;
  type?: string;
  min?: number;
  max?: number;
  isRequired?: boolean;
  options: ShopModifierOption[];
}

export interface ShopProductDetails {
  id: number;
  name: string;
  startingPrice?: number;
  description?: string | null;
  image?: string | null;
  images?: string[] | null;
  collections?: string[] | ShopCollectionRef[];
  options?: ShopProductOption[];
  variants?: ShopProductVariant[];
  modifiers?: ShopModifier[];
}

export interface CheckoutModifierOptionPayload {
  optionId: number;
  optionName: string;
  priceAdjustment: number;
}

export interface CheckoutModifierPayload {
  id: number;
  name: string;
  options: CheckoutModifierOptionPayload[];
}

export interface CheckoutLinePayload {
  id: number;
  variantId: number;
  quantity: number;
  modifiers: CheckoutModifierPayload[];
  note: string;
}

export interface CheckoutAddressPayload {
  id: string;
  isDefault: boolean;
  addrressName: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CheckoutCustomerPayload {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: string;
  pickupTime?: string;
  shipping: CheckoutAddressPayload;
  billing: CheckoutAddressPayload;
  isBillingSameAsShipping: boolean;
  // Optional server response stored after creating checkout (e.g. payment/bill data)
  serverResponse?: unknown;
}

export interface CheckoutRequestBody {
  items: CheckoutLinePayload[];
  customerInfo: CheckoutCustomerPayload;
  utcOffset: number;
}
