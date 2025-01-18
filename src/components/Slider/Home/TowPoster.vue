<script setup lang="ts">
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
</script>

<template>
  <Swiper
    :centered-slides="true"
    :loop-additional-slides="30"
    :loop="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :round-lengths="true"
    :breakpoints="{
      0: {
        slidesPerView: 1,
      },
    }"
    :modules="[Autoplay]"
    :slides-per-view="1"
  >
    <SwiperSlide>
      <NuxtLink
        to="https://www.mobit.ir/search/category-smart-watch?sort=-created&isMain=false"
      >
        <NuxtImg
          src="/images/home/tow-poster/poster1.webp"
          alt=""
          class="w-full"
        />
      </NuxtLink>
    </SwiperSlide>
    <SwiperSlide>
      <NuxtLink
        to="https://www.mobit.ir/search/category-headphones-headset-handsfree?isMain=false"
      >
        <NuxtImg
          src="/images/home/tow-poster/poster2.webp"
          alt=""
          class="w-full"
        />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>
