interface IHomeCategory {
  id: number;
  title: string;
  srcImg: string;
  alt: string;
  href: string;
}

let id = 0;
export const homeCategory: IHomeCategory[] = [
  {
    id: id++,
    title: "گوشی موبایل",
    srcImg: "/images/home/category/8mobile.svg",
    alt: "گوشی موبایل",
    href: "https://www.mobit.ir/search/category-mobilephone",
  },
  {
    id: id++,
    title: "جانبی موبایل",
    srcImg: "/images/home/category/8adaptor.svg",
    alt: "جانبی موبایل",
    href: "https://www.mobit.ir/search/category-mobile-accessories",
  },
  {
    id: id++,
    title: "قطعات کامپیوتر",
    srcImg: "/images/home/category/8case.svg",
    alt: "قطعات کامپیوتر",
    href: "https://www.mobit.ir/search/category-computer-devices",
  },
  {
    id: id++,
    title: "لپ تاپ",
    srcImg: "/images/home/category/8mac.svg",
    alt: "لپ تاپ",
    href: "https://www.mobit.ir/search/category-laptop-ultrabook",
  },
  {
    id: id++,
    title: "تبلت",
    srcImg: "/images/home/category/8tablet.svg",
    alt: "تبلت",
    href: "https://www.mobit.ir/search/category-tablets-readers",
  },
  {
    id: id++,
    title: "پاور بانک",
    srcImg: "/images/home/category/8power.svg",
    alt: "پاور بانک",
    href: "https://www.mobit.ir/search/category-powerbank",
  },
  {
    id: id++,
    title: "هندزفری",
    srcImg: "/images/home/category/8airpod.svg",
    alt: "هندزفری",
    href: "https://www.mobit.ir/search/category-headphones-headset-handsfree",
  },
  {
    id: id++,
    title: "ساعت هوشمند",
    srcImg: "/images/home/category/8wach.svg",
    alt: "ساعت هوشمند",
    href: "https://www.mobit.ir/search/category-smart-watch-wristband",
  },
];
