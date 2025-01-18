interface IFourPoster {
  id: number;
  imgSrc: string;
  alt: string;
  href: string;
}

let id = 0;
export const fourPoster: IFourPoster[] = [
  {
    id: id++,
    imgSrc: "/images/home/four-poster/1.png",
    alt: "samsung",
    href: "https://www.mobit.ir/search/?search_key=qcy",
  },
  {
    id: id++,
    imgSrc: "/images/home/four-poster/2.png",
    alt: "apple",
    href: "https://www.mobit.ir/search/category-powerbank?category_slug=powerbank&category_id=9&search_key=%DA%A9%D9%84%D9%88%D9%85%D9%86",
  },
  {
    id: id++,
    imgSrc: "/images/home/four-poster/3.png",
    alt: "nokia",
    href: "https://www.mobit.ir/search/?search_key=TCH",
  },
  {
    id: id++,
    imgSrc: "/images/home/four-poster/4.png",
    alt: "motorola",
    href: "https://www.mobit.ir/search/?search_key=%D9%85%DB%8C%DA%A9%D8%B1%D9%88%D9%81%D9%88%D9%86%20&brand_id%5B0%5D=1932",
  },
];
