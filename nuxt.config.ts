export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: false },

  typescript: {
    typeCheck: true,
  },

  modules: [
    "@sidebase/nuxt-auth",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/image",
    "nuxt-swiper",
  ],

  plugins: ["~/plugins/pinia.ts"],

  auth: {
    baseURL: `${process.env.API_URL}/auth`,
    globalAppMiddleware: false,
    provider: {
      type: "authjs",
      addDefaultCallbackUrl: false,
    },
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
      meta: [
        {
          name: "theme-color",
          content: "#377DFF",
        },
        {
          name: "color-scheme",
          content: "light",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/images/logo/icon.png",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    apiSecret: "",
    authSecret: process.env.NUXT_AUTH_SECRET,
    public: {
      apiBase: process.env.API_URL,
      dataBaseUrl: process.env.DATABASE_URL,
    },
  },
});
