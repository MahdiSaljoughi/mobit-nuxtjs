<script setup lang="ts">
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import type { TProduct } from "~/types";

defineProps<{ products?: TProduct[] }>();
</script>

<template>
  <Swiper
    class="relative w-full"
    :round-lengths="true"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :breakpoints="{
      0: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      1000: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1500: {
        slidesPerView: 4.5,
        spaceBetween: 20,
      },
    }"
    :modules="[Navigation]"
    :slides-per-view="1"
  >
    <SwiperSlide v-for="product in products" :key="product.id">
      <div class="sm:p-2">
        <ProductComponentsSingleSlider :product="product" />
      </div>
    </SwiperSlide>

    <!-- navigations -->
    <button
      class="swiper-button-prev absolute z-10 bottom-12 right-1 hidden lg:flex items-center justify-center p-2.5 bg-white dark:bg-zinc-700 rounded-xl shadow"
    >
      <UIcon name="i-solar-alt-arrow-right-line-duotone" size="20" />
    </button>

    <button
      class="swiper-button-next absolute z-10 bottom-12 left-1 hidden lg:flex items-center justify-center p-2.5 bg-white dark:bg-zinc-700 rounded-xl shadow"
    >
      <UIcon
        name="i-solar-alt-arrow-right-line-duotone"
        size="20"
        class="rotate-180"
      />
    </button>
  </Swiper>
</template>
