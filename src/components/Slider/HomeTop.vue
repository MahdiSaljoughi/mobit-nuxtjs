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
  <div>
    <Swiper
      ref="swiper"
      class="relative group"
      :centered-slides="true"
      :loop-additional-slides="30"
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
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

      <div
        class="flex items-center justify-center gap-x-2 absolute inset-x-0 bottom-6 lg:bottom-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 z-10"
      >
        <button
          class="swiper-button-prev flex items-center justify-center p-1.5 bg-white dark:bg-zinc-700 rounded-lg shadow"
        >
          <UIcon name="i-solar-alt-arrow-right-line-duotone" size="16" />
        </button>

        <!-- Progress indicators -->
        <div class="flex items-center gap-x-1">
          <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            class="relative size-2.5 bg-white/60 dark:bg-black/30 rounded overflow-hidden cursor-pointer shadow hover:scale-110"
            @click="goToSlide(index)"
          >
            <div
              class="absolute inset-0 bg-white dark:bg-zinc-600 transition-transform shadow hover:scale-110"
              :style="{
                transform:
                  activeSlide === index && isInitialized
                    ? 'scaleX(1)'
                    : 'scaleX(0)',
                transformOrigin: 'right',
                transitionDuration:
                  activeSlide === index && isInitialized ? '4000ms' : '0ms',
              }"
            />
          </div>
        </div>

        <button
          class="swiper-button-next flex items-center justify-center p-1.5 bg-white dark:bg-zinc-700 rounded-lg shadow"
        >
          <UIcon
            name="i-solar-alt-arrow-right-line-duotone"
            size="16"
            class="rotate-180"
          />
        </button>
      </div>
    </Swiper>
  </div>
</template>
