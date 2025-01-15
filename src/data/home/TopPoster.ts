interface ISlide {
  id: number;
  srcImg: string;
  srcImgMobile: string;
  alt: string;
  href: string;
}

let imgId = 0;
export const slides: ISlide[] = [
  {
    id: imgId++,
    srcImg: "/images/home/poster/1.jpg",
    srcImgMobile: "/images/home/poster/1mobile.jpg",
    alt: "poster1",
    href: "/",
  },
  {
    id: imgId++,
    srcImg: "/images/home/poster/2.jpg",
    srcImgMobile: "/images/home/poster/2mobile.webp",
    alt: "poster2",
    href: "/",
  },
  {
    id: imgId++,
    srcImg: "/images/home/poster/3.gif",
    srcImgMobile: "/images/home/poster/3mobile.jpg",
    alt: "poster3",
    href: "/",
  },
  {
    id: imgId++,
    srcImg: "/images/home/poster/4.webp",
    srcImgMobile: "/images/home/poster/4mobile.webp",
    alt: "poster4",
    href: "/",
  },
  {
    id: imgId++,
    srcImg: "/images/home/poster/5.webp",
    srcImgMobile: "/images/home/poster/5mobile.webp",
    alt: "poster5",
    href: "/",
  },
  {
    id: imgId++,
    srcImg: "/images/home/poster/6.gif",
    srcImgMobile: "/images/home/poster/6mobile.webp",
    alt: "poster6",
    href: "/",
  },
  {
    id: imgId++,
    srcImg: "/images/home/poster/7.webp",
    srcImgMobile: "/images/home/poster/7mobile.webp",
    alt: "poster7",
    href: "/",
  },
];
