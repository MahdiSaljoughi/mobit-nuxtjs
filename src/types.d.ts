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
  created_at: Date;
  updated_at: Date;
  images: TProductImage[];
  variants: TProductVariant[];
};

declare type TProductVariant = {
  id: number;
  product_id: number;
  quantity: number;
  name: string;
  value: string;
  price: number;
  discount: number | null;
  price_after_discount: number | null;
};

declare type TProductImage = { id: number; url: string; product_id: number };
