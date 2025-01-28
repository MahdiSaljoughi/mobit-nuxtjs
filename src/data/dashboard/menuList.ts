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
    title: "خانه",
    icon: "",
    href: "/",
  },
  {
    id: id++,
    title: "",
    icon: "",
    href: "/",
  },
];
