declare type TUser = {
  id: number;
  user_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string;
  role: string;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
};

declare type TProductImage = { id: number; url: string; product_id: number };

declare type TProductVariant = {
  id: number;
  product_id: number;
  quantity: number;
  hex_code: string;
  color_name: string;
  price: number;
  discount: number | null;
  price_after_discount: number | null;
};

declare type TProduct = {
  id: number;
  title: string;
  title_eng: string;
  slug: string;
  is_show: boolean;
  description: string;
  created_by: number;
  is_fast_delivery: boolean;
  is_offer: boolean;
  brand: string;
  brand_eng: string;
  is_fake: boolean;
  category_id: number;
  created_at: Date;
  updated_at: Date;
  images: TProductImage[];
  variants: TProductVariant[];
  category: TCategory;
  author: { user_name: string | null };
};

declare type TCategory = {
  id: number;
  title: string;
  title_eng: string;
  url: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
};

declare type TProductOrder = {
  id: number;
  price: number;
  order_id: number;
  product_id: number;
  quantity: number;
  color_name: string;
  hex_code: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  product: TProduct;
};

declare type TOrderStatus = {
  PENDING: string;
  PROCESSING: string;
  SHIPPED: string;
  DELIVERED: string;
  CANCELED: string;
};

declare type TOrderPayMentMethod = {
  ONLINE: string;
  FACETOFACE: string;
};

declare type TOrder = {
  id: number;
  customer_id: number;
  total_price: number;
  status: keyof TOrderStatus;
  payment_method: keyof TOrderPayMentMethod;
  delivery_address: string;
  created_at: Date;
  updated_at: Date;
  products: TProductOrder[];
  customer: TUser;
};
