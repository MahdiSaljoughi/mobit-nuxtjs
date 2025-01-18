<script setup lang="ts">
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import { slides } from "~/data/home/TopPoster";
import type { Swiper as SwiperClass } from "swiper";

const swiper = ref<SwiperClass | null>(null);
const activeSlide = ref(-1);
const isInitialized = ref(false);

const onSwiper = (instance: SwiperClass) => {
  swiper.value = instance;
  activeSlide.value = instance.realIndex || 0;
  isInitialized.value = true;
};

const onSlideChange = () => {
  if (swiper.value) {
    activeSlide.value = swiper.value.realIndex || 0;
  }
};

const goToSlide = (index: number) => {
  if (swiper.value) {
    swiper.value.slideToLoop(index);
  }
};
</script>

<template>
  <Swiper
    ref="swiper"
    class="relative group"
    :centered-slides="true"
    :loop-additional-slides="30"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :round-lengths="true"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :breakpoints="{
      0: {
        slidesPerView: 1,
      },
    }"
    :modules="[Navigation, Autoplay]"
    :slides-per-view="1"
    @swiper="onSwiper"
    @slide-change="onSlideChange"
  >
    <SwiperSlide v-for="slide in slides" :key="slide.id" class="p-3 lg:p-0">
      <NuxtLink :to="slide.href">
        <NuxtImg
          :src="slide.srcImg"
          :alt="slide.alt"
          class="hidden lg:block w-full"
        />
        <NuxtImg
          :src="slide.srcImgMobile"
          :alt="slide.alt"
          class="block lg:hidden rounded-2xl w-full"
        />
      </NuxtLink>
    </SwiperSlide>

    <!-- navigations -->
    <div
      class="absolute inset-x-0 bottom-3 lg:bottom-1 flex items-center justify-center gap-x-2 z-10"
    >
      <button
        class="swiper-button-prev flex items-center justify-center p-1.5 bg-white dark:bg-zinc-700 rounded-lg shadow opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"
      >
        <UIcon name="i-solar-alt-arrow-right-line-duotone" size="16" />
      </button>

      <!-- Progress indicators -->
      <div class="flex items-center gap-x-1">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="relative overflow-hidden cursor-pointer shadow transition-all duration-300 hover:scale-110"
          :class="{
            'w-3 h-2': activeSlide === index && isInitialized,
            'w-2 h-2': !(activeSlide === index && isInitialized),
            'rounded-full bg-white/60 dark:bg-black/30': true,
          }"
          @click="goToSlide(index)"
        >
          <div
            class="absolute inset-0 bg-white dark:bg-zinc-500 transition-transform"
            :style="{
              transform:
                activeSlide === index && isInitialized
                  ? 'scaleX(1)'
                  : 'scaleX(0)',
              transformOrigin: 'right',
              transitionDuration:
                activeSlide === index && isInitialized ? '8000ms' : '0ms',
            }"
          />
        </div>
      </div>

      <button
        class="swiper-button-next flex items-center justify-center p-1.5 bg-white dark:bg-zinc-700 rounded-lg shadow opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"
      >
        <UIcon
          name="i-solar-alt-arrow-right-line-duotone"
          size="16"
          class="rotate-180"
        />
      </button>
    </div>
  </Swiper>
</template>
