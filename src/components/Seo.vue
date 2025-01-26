<!-- <script setup lang="ts">
const props = defineProps<{ seo: any }>();
const seoRef = computed(() => props.seo);
const _seo = seoRef.value ?? seoRef;

const metaTitle = _seo.metaTitle ?? "";
const metaSocial = _seo.metaSocial ?? [];
const twitterSeo = metaSocial[0];
const metaImage =
  _seo.metaImage && _seo.metaImage.data && _seo.metaImage.data.attributes.url;
const twitterTitle = (twitterSeo && twitterSeo.title) ?? "";
const twitterDescription = (twitterSeo && twitterSeo.description) ?? "";
const twitterImage = (twitterSeo && twitterSeo.image.data.attributes.url) ?? "";
const metaRobots = _seo.metaRobots ?? "index, follow";
const structuredData = _seo.structuredData ?? "";
const metaDescription = _seo.metaDescription ?? "";
const metaKeywords = _seo.keywords ?? "";
const metaCanonicalURL = _seo.canonicalURL ?? "";
const metaViewport = _seo.metaViewport ?? "width=device-width,initial-scale=1";

useHead({
  script: [
    {
      children: `
      ${JSON.stringify(structuredData)}
      `,
      type: "application/ld+json",
      tagPosition: "head",
    },
    {
      children: `
              if (localStorage.theme === 'dark' || !('theme' in localStorage) ||(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) 
              {
                document.getElementsByTagName("html")[0].setAttribute("class", "dark");
              }
              else {
                document.getElementsByTagName("html")[0].classList.remove("dark");
              }
        `,
    },
  ],
  meta: [
    {
      name: "language",
      content: "fa",
    },
    {
      name: "keywords",
      content: `${metaKeywords}`,
    },
    {
      name: "description",
      content: `${metaDescription}`,
    },
    {
      property: "og:title",
      content: `${metaTitle}`,
    },
    {
      property: "og:description",
      content: `${metaDescription}`,
    },
    {
      name: "robots",
      content: `${metaRobots}`,
    },
    {
      name: "viewport",
      content: `${metaViewport}`,
    },
    {
      name: "twitter:card",
      content: "summary",
    },
    {
      name: "twitter:image",
      content: "",
    },
    {
      property: "og:image",
      content: "",
    },
    {
      name: "twitter:title",
      content: `${twitterTitle}`,
    },
    {
      name: "twitter:description",
      content: `${twitterDescription}`,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: metaCanonicalURL,
    },
  ],
});
</script>

<template>
  <Head>
    <Title>{{ metaTitle }}</Title>
  </Head>
</template> -->

<template>
  <div>1</div>
</template>
