<script setup lang="ts">
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

defineProps<{ products: TProduct[] }>();
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
        slidesPerView: 1,
        spaceBetween: 0,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      1000: {
        slidesPerView: 3.5,
        spaceBetween: 0,
      },
      1500: {
        slidesPerView: 4.5,
        spaceBetween: 0,
      },
    }"
    :modules="[Navigation]"
    :slides-per-view="1"
  >
    <SwiperSlide v-for="product in products" :key="product.id">
      <div class="sm:p-2">
        <ProductComponentsSingle :product="product" />
      </div>
    </SwiperSlide>

    <!-- navigations -->
    <button
      class="swiper-button-prev absolute z-10 bottom-32 right-1 hidden lg:flex items-center justify-center p-2.5 bg-white dark:bg-zinc-700 rounded-xl shadow"
    >
      <UIcon name="i-solar-alt-arrow-right-line-duotone" size="20" />
    </button>

    <button
      class="swiper-button-next absolute z-10 bottom-32 left-1 hidden lg:flex items-center justify-center p-2.5 bg-white dark:bg-zinc-700 rounded-xl shadow"
    >
      <UIcon
        name="i-solar-alt-arrow-right-line-duotone"
        size="20"
        class="rotate-180"
      />
    </button>
  </Swiper>
</template>
