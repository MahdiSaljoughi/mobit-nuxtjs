declare enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
}

declare type TUser = {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
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
  price: number;
  images: [{ id: number; url: string }];
  variants: [];
  discount_percentage: number;
  description: string;
  created_by: number;
};
