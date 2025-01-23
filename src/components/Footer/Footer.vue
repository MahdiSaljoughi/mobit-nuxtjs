<script setup lang="ts">
import { footer } from "~/data/footer/Footer";

const scrollToTop = () => {
  scrollTo({ top: 0, behavior: "smooth" });
};

const isInstagramHover = ref<boolean>(false);
const isAparatHover = ref<boolean>(false);
const isShowDescription = ref<boolean>(false);
</script>

<template>
  <footer class="2xl:w-[93%] mx-3 2xl:mx-auto">
    <div class="flex items-center justify-center">
      <button
        class="bg-zinc-100 dark:bg-zinc-800 h-[2.31rem] lg:h-10 w-32 lg:w-[9.25rem] text-xs lg:text-sm rounded-t-xl"
        @click="scrollToTop"
      >
        <div
          class="flex items-center gap-x-2 justify-center hover:text-blue-500 duration-300"
        >
          <p class="opacity-80">بازگشت به بالا</p>
          <UIcon name="i-heroicons-chevron-up" size="16" />
        </div>
      </button>
    </div>

    <div
      class="bg-zinc-100 dark:bg-zinc-800 rounded-xl lg:flex lg:justify-between lg:pr-3 xl:px-6"
    >
      <div class="hidden lg:flex flex-col gap-y-4 pt-6 text-xs">
        <p class="text-sm opacity-80">پشتیبانی</p>
        <div class="flex items-center gap-x-3">
          <p class="font-[IRAN-R]">تلفنی :</p>
          <a :href="`tel:${footer.phone}`" class="font-[IRAN-R]">
            {{ footer.phone }}
          </a>
          <span class="block w-px bg-zinc-200 dark:bg-zinc-500 h-8" />
          <span>
            {{ footer.timeWork }}
          </span>
        </div>
        <div class="flex items-center gap-x-3">
          <span class="opacity-80">ایمیل :</span>
          <a :href="`mailto:${footer.email}`" class="font-[IRAN-R]">
            {{ footer.email }}</a
          >
        </div>
      </div>
      <div
        class="grid grid-cols-2 grid-rows-2 lg:flex items-center py-4 lg:py-10 gap-y-8"
      >
        <div
          v-for="(item, index) in footer.dataTopIcons"
          :key="index"
          class="flex items-center justify-center"
        >
          <NuxtLink
            :to="item.href"
            class="flex flex-col items-center gap-y-6 lg:gap-y-8 w-36 lg:w-[9.25rem]"
          >
            <NuxtImg
              :src="item.imgSrc"
              :alt="item.title"
              class="w-14 lg:w-16"
            />
            <p class="text-xs opacity-80">
              {{ item.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="flex lg:hidden flex-col gap-y-5 py-5 text-xs">
      <p class="text-base mb-2 opacity-80">پشتیبانی</p>
      <div class="flex items-center gap-x-3">
        <span class="opacity-70">تلفنی :</span>
        <a :href="`tel:${footer.phone}`" class="opacity-80">
          {{ footer.phone }}
        </a>
      </div>
      <p class="opacity-60">شنبه تا چهارشنبه ۸ الی ۲۱ - پنجشنبه 8 الی ۲۰:۳۰</p>
      <div class="flex items-center gap-x-3">
        <span class="opacity-70">ایمیل :</span>
        <a :href="`mailto:${footer.email}`" class="opacity-80">
          {{ footer.email }}</a
        >
      </div>
    </div>

    <div class="flex flex-col lg:flex-row lg:justify-between lg:py-6">
      <div
        class="flex justify-between gap-x-10 md:gap-0 overflow-y-hidden overflow-x-auto w-full lg:w-2/3 xl:w-[58%] pb-5 lg:pb-0"
      >
        <div
          v-for="(items, index) in footer.mainData"
          :key="index"
          class="w-max whitespace-nowrap"
        >
          <p class="text-sm lg:text-base mb-6 opacity-80">{{ items.title }}</p>
          <div class="flex flex-col gap-y-5">
            <NuxtLink
              v-for="(item, i) in items.child"
              :key="i"
              class="text-xs opacity-60 hover:text-blue-500 duration-300"
              :to="item.href"
              target="_blank"
              >{{ item.name }}</NuxtLink
            >
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <p class="text-sm lg:text-base lg:mt-1 lg:ml-2 opacity-70">
            با ما همراه باشید
          </p>
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="footer.instagramLink.href"
              @mouseenter="isInstagramHover = true"
              @mouseleave="isInstagramHover = false"
            >
              <NuxtImg
                v-show="isInstagramHover === false"
                :src="footer.instagramLink.imgSrc"
                :alt="footer.instagramLink.href"
                width="48"
              />
              <NuxtImg
                v-show="isInstagramHover"
                :src="footer.instagramLink.imgSrcHover"
                :alt="footer.instagramLink.href"
                width="48"
              />
            </NuxtLink>
            <NuxtLink
              :to="footer.aparatLink.href"
              @mouseenter="isAparatHover = true"
              @mouseleave="isAparatHover = false"
            >
              <NuxtImg
                v-show="isAparatHover === false"
                :src="footer.aparatLink.imgSrc"
                :alt="footer.aparatLink.href"
                width="48"
              />
              <NuxtImg
                v-show="isAparatHover"
                :src="footer.aparatLink.imgSrcHover"
                :alt="footer.aparatLink.href"
                width="48"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-y-5 lg:flex-row justify-between pb-4 pt-5 lg:py-2 px-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
    >
      <div class="flex items-center justify-center gap-x-4">
        <NuxtImg :src="footer.mobileApp.imgSrc" width="34" />
        <p class="text-blue-500 lg:text-lg">
          {{ footer.mobileApp.title }}
        </p>
      </div>
      <div
        class="grid gap-5 lg:gap-x-4 lg:gap-y-2 grid-cols-2 grid-rows-2 lg:flex"
      >
        <NuxtLink
          v-for="(app, idx) in footer.mobileApp.child"
          :key="idx"
          target="_blank"
          :to="app.href"
          class="flex items-center justify-center px-6 py-1 bg-white rounded-xl shadow h-12 lg:h-auto"
        >
          <NuxtImg :src="app.imgSrc" width="130" />
        </NuxtLink>

        <NuxtLink
          to="https://www.mobit.ir/download-app"
          class="flex items-center justify-center gap-x-2 px-4 py-1 bg-white text-black rounded-xl shadow"
        >
          <span class="text-xs">بیشتر</span>
          <UIcon name="i-heroicons-chevron-left" size="16" />
        </NuxtLink>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row items-start justify-between mt-6">
      <div class="w-full lg:w-[55%]">
        <h1 class="mb-3 text-[12.8px] lg:text-base leading-7">
          {{ footer.about.title }}
        </h1>
        <p
          :class="`text-justify text-xs opacity-70 transition-all leading-6 ${
            isShowDescription === false && 'line-clamp-2'
          }`"
        >
          {{ footer.about.description }}
        </p>
        <button
          class="flex items-center gap-x-3 mb-2 mt-4 text-blue-500 text-xs"
          @click="isShowDescription = !isShowDescription"
        >
          <span v-show="isShowDescription === false">مشاهده بیشتر</span>
          <span v-show="isShowDescription">مشاهده کمتر</span>
          <UIcon
            name="i-heroicons-chevron-left"
            :class="`${isShowDescription ? 'rotate-90' : '-rotate-90'}`"
            size="16"
          />
        </button>
      </div>
      <div
        class="flex flex-row-reverse items-center justify-evenly w-full lg:justify-start lg:w-[40%] flex-wrap mb-8 mt-4"
      >
        <NuxtLink v-for="(nemad, i) in footer.nemads" :key="i" :to="nemad.link">
          <NuxtImg :src="nemad.imgSrc" :alt="nemad.name" width="94" />
        </NuxtLink>
      </div>
    </div>

    <p
      class="text-xs text-center lg:text-right py-6 lg:pb-20 leading-6 border-t border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
    >
      کلیه حقوق این سایت متعلق به شرکت
      <NuxtLink
        target="_blank"
        :to="footer.avapardaz.href"
        class="text-[#5FAAAF]"
      >
        {{ footer.avapardaz.title }}
      </NuxtLink>
      می باشد.
    </p>
  </footer>
</template>
