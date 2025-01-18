interface IBrands {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  href: string;
}

let id = 0;
export const brands: IBrands[] = [
  {
    id: id++,
    title: "سامسونگ",
    imgSrc: "/images/home/brands/1.webp",
    alt: "samsung",
    href: "https://www.mobit.ir/brand/samsung",
  },
  {
    id: id++,
    title: "اپل",
    imgSrc: "/images/home/brands/2.webp",
    alt: "apple",
    href: "https://www.mobit.ir/brand/apple",
  },
  {
    id: id++,
    title: "نوکیا",
    imgSrc: "/images/home/brands/3.webp",
    alt: "nokia",
    href: "https://www.mobit.ir/brand/nokia",
  },
  {
    id: id++,
    title: "موتورولا",
    imgSrc: "/images/home/brands/4.webp",
    alt: "motorola",
    href: "https://www.mobit.ir/brand/motorola",
  },
  {
    id: id++,
    title: "شیائومی",
    imgSrc: "/images/home/brands/5.webp",
    alt: "xiaomi",
    href: "https://www.mobit.ir/brand/xiaomi",
  },
  {
    id: id++,
    title: "ریلمی",
    imgSrc: "/images/home/brands/6.webp",
    alt: "realme",
    href: "https://www.mobit.ir/brand/realme",
  },
];
