<script setup lang="ts">
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { brands } from "~/data/home/Brands";
</script>

<template>
  <Swiper
    class="relative w-full"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :breakpoints="{
      0: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      600: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1000: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    }"
    :modules="[Navigation]"
  >
    <SwiperSlide v-for="brand in brands" :key="brand.id">
      <NuxtLink :to="brand.href" class="flex flex-col gap-y-4">
        <NuxtImg
          :src="brand.imgSrc"
          :alt="brand.alt"
          class="w-32 md:w-36 lg:w-44 xl:w-56"
        />
        <p class="text-center text-xs opacity-70">{{ brand.title }}</p>
      </NuxtLink>
    </SwiperSlide>

    <!-- navigations -->
    <button
      class="swiper-button-prev absolute z-10 bottom-20 right-1 hidden lg:flex items-center justify-center p-2.5 bg-white dark:bg-zinc-700 rounded-xl shadow"
    >
      <UIcon name="i-solar-alt-arrow-right-line-duotone" size="20" />
    </button>

    <button
      class="swiper-button-next absolute z-10 bottom-20 left-1 hidden lg:flex items-center justify-center p-2.5 bg-white dark:bg-zinc-700 rounded-xl shadow"
    >
      <UIcon
        name="i-solar-alt-arrow-right-line-duotone"
        size="20"
        class="rotate-180"
      />
    </button>
  </Swiper>
</template>
