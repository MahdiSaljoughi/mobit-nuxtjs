import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    typeCheck: false,
  },

  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/image",
    "nuxt-swiper",
  ],

  auth: {
    baseURL: "http://localhost:3000/api/auth",
    originEnvKey: "http://localhost:3000/api/auth",
  },

  imports: {
    dirs: ["features/**"],
  },

  components: ["~/components", { path: "~/features", pathPrefix: true }],

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
    authSecret: process.env.NUXT_AUTH_SECRET,
    public: {
      apiBase: process.env.API_URL,
      dataBaseUrl: process.env.DATABASE_URL,
    },
  },
});
