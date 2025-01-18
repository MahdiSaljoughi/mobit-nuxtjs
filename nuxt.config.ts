export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/image", "nuxt-swiper"],

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
