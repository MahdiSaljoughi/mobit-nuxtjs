export interface IMag {
  id: number;
  title: string;
  imgSrc: string;
  alt: string;
  href: string;
}

let id = 0;
export const mag: IMag[] = [
  {
    id: id++,
    title: "بهترین گوشی سامسونگ برای عکاسی؛ شریکی برای ثبت لحظات شما",
    imgSrc: "/images/home/mag/1.png",
    alt: "best-samsung-phone-for-photography",
    href: "https://www.mobit.ir/mag/best-samsung-phone-for-photography/",
  },
  {
    id: id++,
    title: "راهنمای خرید بهترین گوشی تا 9 میلیون تومان؛ ارزان ولی با کیفیت",
    imgSrc: "/images/home/mag/2.jpg",
    alt: "best-phone-to-9-milion",
    href: "https://www.mobit.ir/mag/best-phone-to-9-milion/",
  },
  {
    id: id++,
    title: "راهنمای خرید بهترین ساعت هوشمند تا 5 میلیون؛ پول خود را هدر ندهید",
    imgSrc: "/images/home/mag/3.jpg",
    alt: "best-smart-watch-to-5-milions",
    href: "https://www.mobit.ir/mag/best-smart-watch-to-5-milions/",
  },
  {
    id: id++,
    title: "شیائومی 13T؛ یک گوشی هوشمند میان رده با دوربین پرچمدار",
    imgSrc: "/images/home/mag/4.jpg",
    alt: "xiaomi-13-t-review",
    href: "https://www.mobit.ir/mag/xiaomi-13-t-review/",
  },
];
