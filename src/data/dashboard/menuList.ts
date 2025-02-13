interface IMenuItem {
  id: number;
  title: string;
  icon: string;
  href: string;
}

let id = 0;

export const menuList: IMenuItem[] = [
  {
    id: id++,
    title: "صفحه اصلی",
    icon: "i-homefill",
    href: "/",
  },
  {
    id: id++,
    title: "داشبورد",
    icon: "i-dashboard",
    href: "/dashboard",
  },
  {
    id: id++,
    title: "سفارشات",
    icon: "i-order",
    href: "/dashboard/orders",
  },
  {
    id: id++,
    title: "محصولات",
    icon: "i-categoryfill",
    href: "/dashboard/products",
  },
  {
    id: id++,
    title: "کاربران",
    icon: "i-profilefill",
    href: "/dashboard/users",
  },
  {
    id: id++,
    title: "دسته بندی ها",
    icon: "i-categoryfill",
    href: "/dashboard/categories",
  },
  {
    id: id++,
    title: "حساب کاربری",
    icon: "i-profile",
    href: "/profile",
  },
];
