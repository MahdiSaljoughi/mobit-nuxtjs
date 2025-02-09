import type { UserRole } from "@prisma/client";

declare type TUser = {
  id: number;
  user_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string;
  role: UserRole;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
};

declare type TProduct = {
  id: number;
  title: string;
  title_eng: string;
  slug: string;
  price: number | null;
  discount: number | null;
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

declare type TCategory = {
  id: number;
  title: string;
  title_eng: string;
  url: string;
};
