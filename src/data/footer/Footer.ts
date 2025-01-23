interface INemads {
  name: string;
  imgSrc: string;
  link?: string;
}

interface IDataTopIcons {
  href: string;
  imgSrc: string;
  title: string;
}

interface IMainDataChild {
  name: string;
  href: string;
}
interface IMainData {
  title: string;
  child: IMainDataChild[];
}

interface IMobileAppChild {
  name: string;
  href: string;
  imgSrc: string;
}

interface IFooter {
  instagramLink: {
    href: string;
    imgSrc: string;
    imgSrcHover: string;
  };
  aparatLink: {
    href: string;
    imgSrc: string;
    imgSrcHover: string;
  };
  nemads: INemads[];
  timeWork: string;
  phone: string;
  email: string;
  dataTopIcons: IDataTopIcons[];
  mainData: IMainData[];
  mobileApp: {
    title: string;
    imgSrc: string;
    child: IMobileAppChild[];
  };
  avapardaz: {
    title: string;
    href: string;
  };
  about: {
    title: string;
    description: string;
  };
}

export const footer: IFooter = {
  aparatLink: {
    href: "https://aparat.com/mobit",
    imgSrc: "/images/footer/aparat.svg",
    imgSrcHover: "/images/footer/hAparat.svg",
  },
  instagramLink: {
    href: "https://instagram.com/mobit.ir",
    imgSrc: "/images/footer/instagram.svg",
    imgSrcHover: "/images/footer/hInstagram.svg",
  },
  about: {
    title: "فروشگاه اینترنتی مبیت، خرید آسان کالای دیجیتال با مناسب ترین قیمت",
    description:
      "فروشگاه اینترنتی مبیت از جمله عرضه‌کنندگان کالای دیجیتال در سراسر کشور است که انواع کالاهای دیجیتال از جمله گوشی موبایل، لپ تاپ، تبلت و لوازم جانبی گوشی را با قیمت مناسب و ضمانت اصالت کالا به فروش می‌رساند. فعالیت مبیت از سال 1393 به صورت رسمی آغاز شد و به لطف سالیان تجربه ما در زمینه فروش حضوری، توانستیم نیاز کاربران را به خوبی برآورده سازیم و تجربه متفاوتی را از خرید کالای دیجیتال برای کاربران رقم بزنیم. شما می‌توانید گوشی، لپ تاپ، تبلت و انواع لوازم جانبی مورد نظر خود را با مناسب‌ترین قیمت از مبیت خریداری کنید و در کوتاه‌ترین زمان ممکن آن را تحویل بگیرید. تیم پشتیبانی مبیت نیز همراه شما خواهد بود تا در مراحل خرید هر کالایی بهترین مشاوره را ارائه کند و تمامی سوالات شما را پس از خرید نیز پاسخگو باشد. فروشگاه اینترنتی مبیت علاوه بر ارائه خدمات به مصرف کنندگان امکان خرید عمده برای همکاران را نیز فراهم ساخته است؛ البته تسویه مدت دار نیز جزئی از خدمات مبیت برای شماست تا بتوانید کالای فروشگاه خود را به راحتی و بدون هیچ گونه دغدغه‌ای در هر زمان تامین کنید. در فروشگاه اینترنتی مبیت شما می‌توانید قیمت روز انواع کالای دیجیتال را از محبوب‌ترین برندهای بازار با اطلاعات کامل فنی ببینید و قیمت روز انواع گوشی های سامسونگ، شیائومی، اپل، هواوی و .. را برای اطلاع مشاهده نمایید. از دیگر مزایای فروشگاه مبیت می‌توان به اطلاعات فنی دقیق و بررسی‌های تخصصی مرتبط با انواع گوشی موبایل، هدفون و لوازم جانبی از جمله پاوربانک اشاره کرد، که شما را در تجربه خریدی بی‌نظیر همراهی می‌کند. ما در مبیت این امکان را فراهم ساخته‌ایم تا شما کامل‌ترین پکیج لوازم جانبی گوشی خود را به راحتی و در یک دسته‌بندی جداگانه بیابید و در کوتاه‌ترین زمان ممکن خرید خود را از گارد و گلس گرفته تا شارژر اصلی یا پاوربانک و هدفون متناسب با گوشی خود انجام دهید. بطور کلی هدف همیشه در مبیت جلب رضایت کاربران بوده است؛ چه کسانی که به صورت عمده و برای فروشگاه حضوری خود خرید می‌کنند و چه کاربرانی که به صورت جزئی خرید می‌کنند.",
  },
  mobileApp: {
    title: "کارایی بهتر در اپلیکیشن مبیت",
    imgSrc: "/images/logo/icon.png",
    child: [
      {
        name: "bazaar",
        href: "https://cafebazaar.ir/app/com.avapardaz.mobit",
        imgSrc: "/images/footer/bazar.svg",
      },
      {
        name: "iapps",
        href: "https://iapps.ir/app/%D9%85%D8%A8%DB%8C%D8%AA/165980243",
        imgSrc: "/images/footer/iapps.svg",
      },
      {
        name: "download-app",
        href: "https://mobit.ir/download-app",
        imgSrc: "/images/footer/download.svg",
      },
    ],
  },
  avapardaz: {
    title: "آواپرداز کیهان کریمان",
    href: "https://avapardaz.ir",
  },
  dataTopIcons: [
    {
      href: "https://mobit.ir/page/send-method",
      title: "ارسال سریع کالا",
      imgSrc: "/images/footer/fastSend.svg",
    },
    {
      href: "https://mobit.ir/page/refunds",
      title: "مهلت ۷ روز بازگشت کالا",
      imgSrc: "/images/footer/productReturn.svg",
    },
    {
      href: "https://mobit.ir/contact-us",
      title: "پشتیبانی تلفنی",
      imgSrc: "/images/footer/phoneSupport.svg",
    },
    {
      href: "https://mobit.ir/page/guarantee",
      title: "تضمین اصالت کالا",
      imgSrc: "/images/footer/productGuaranty.svg",
    },
  ],
  email: "info@mobit.ir",
  mainData: [
    {
      title: "با مبیت",
      child: [
        { name: "درباره مبیت", href: "https://mobit.ir/page/about-us" },
        { name: "تماس با مبیت", href: "https://mobit.ir/contact-us" },
        {
          name: "تماس با مدیریت",
          href: "https://mobit.ir/contact-us?receiverSection=5",
        },
        { name: "فروش عمده به همکار", href: "https://mobithamkar.ir/provider" },
        { name: "شعبه حضوری", href: "https://mobit.ir/face-to-face-sell/asr" },
      ],
    },
    {
      title: "راهنمای خرید",
      child: [
        {
          name: "روش های پرداخت",
          href: "https://mobit.ir/page/pay-method",
        },
        {
          name: "روش های ارسال کالا",
          href: "https://mobit.ir/page/send-method",
        },
        {
          name: "لغو و بازگشت کالا",
          href: "https://mobit.ir/page/refunds",
        },
        {
          name: "ضمانت اصالت کالا",
          href: "https://mobit.ir/page/guarantee",
        },
      ],
    },
    {
      title: "خدمات مشتریان",
      child: [
        {
          name: "راهنمای جامع",
          href: "https://mobit.ir/mag/category/review/buyers-guide-review/",
        },
        {
          name: "شرایط و قوانین",
          href: "https://mobit.ir/page/terms-of-use",
        },
        { name: "سوالات متداول", href: "https://mobit.ir/faq" },
        {
          name: "حریم خصوصی",
          href: "https://mobit.ir/page/privacy-policy",
        },
      ],
    },
    {
      title: "قیمت گوشی",
      child: [
        {
          name: "قیمت روز گوشی موبایل",
          href: "https://mobit.ir/search/category-mobilephone",
        },
        {
          name: "قیمت گوشی سامسونگ",
          href: "https://mobit.ir/search/category-mobilephone/samsung",
        },
        {
          name: "قیمت گوشی شیائومی",
          href: "https://mobit.ir/search/category-mobilephone/xiaomi",
        },
        {
          name: "قیمت گوشی اپل",
          href: "https://mobit.ir/search/category-mobilephone/apple",
        },
        {
          name: "قیمت گوشی آنر",
          href: "https://mobit.ir/search/category-mobilephone/honor",
        },
      ],
    },
    {
      title: "قیمت کالای دیجیتال",
      child: [
        {
          name: "قیمت هدفون، هدست، هندزفری",
          href: "https://mobit.ir/search/category-headphones-headset-handsfree",
        },
        {
          name: "قیمت تلویزیون",
          href: "https://mobit.ir/search/category-television",
        },
        {
          name: "قیمت کنسول بازی خانگی",
          href: "https://mobit.ir/search/category-home-game-console",
        },
        {
          name: "قیمت لپ تاپ",
          href: "https://mobit.ir/search/category-laptop-ultrabook",
        },
        {
          name: "قیمت تبلت",
          href: "https://mobit.ir/search/category-tablet",
        },
      ],
    },
  ],
  nemads: [
    // {
    //   name: "enamad",
    //   imgSrc:
    //     "https://trustseal.enamad.ir/logo.aspx?id=87935&Code=CvuYbfJQzS4Dy7RHpIAsDtE7jEBsYRSK",
    //   link: "https://trustseal.enamad.ir/?id=87935&amp;Code=CvuYbfJQzS4Dy7RHpIAsDtE7jEBsYRSK",
    // },
    { name: "ecunion", imgSrc: "/images/footer/ecunion.png", link: "/" },
    { name: "samandehi", imgSrc: "/images/footer/samandehi.png", link: "/" },
    // { name: "sep", imgSrc: "/images/footer/sep-logo.jpg", link: "/" },
  ],
  phone: "03491002425",
  timeWork: "شنبه تا چهارشنبه ۸ الی ۲۱ - پنجشنبه 8 الی ۲۰:۳۰",
};
