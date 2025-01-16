// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/image", "nuxt-swiper", "@prisma/nuxt"],

  srcDir: "src/",

  app: {
    head: {
      htmlAttrs: {
        lang: "fa-IR",
        dir: "rtl",
      },
      link: [
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/images/logo/icon.png",
        },
        // { rel: "manifest", href: "/site.webmanifest" },
        // { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#3b82f6" },
        // {
        //   rel: "apple-touch-icon",
        //   sizes: "180x180",
        //   href: "/assets/logo/icon.png",
        // },
        // {
        //   rel: "android-chrome",
        //   sizes: "192x192",
        //   href: "/assets/logo/icon.png",
        // },
        // {
        //   rel: "splash-screen",
        //   sizes: "512x512",
        //   href: "/assets/logo/icon.png",
        // },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    apiSecret: "",
    public: {
      apiBase: process.env.API_URL,
    },
  },
});