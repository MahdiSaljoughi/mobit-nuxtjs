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
  access_token: string | null;
};

declare type TProduct = {
  id: number;
  title: string;
  title_eng: string;
  slug: string;
  price: number | null;
  images: { id: number; url: string; productId: number }[];
  variants: {
    id: number;
    price: number;
    discount_percentage: number | null;
    productId: number;
    attributes: unknown;
    quantity: number;
    price_after_discount: number;
  }[];
  discount_percentage: number | null;
  description: string;
  created_by: number;
};
