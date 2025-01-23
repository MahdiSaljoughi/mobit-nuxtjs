<script setup lang="ts">
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { mag } from "~/data/home/Mag";
</script>

<template>
  <Swiper
    class="w-full"
    :breakpoints="{
      0: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      630: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      800: {
        slidesPerView: 3.2,
        spaceBetween: 20,
      },
    }"
  >
    <SwiperSlide v-for="item in mag" :key="item.id">
      <HomeMagSingle :mag="item" />
    </SwiperSlide>
  </Swiper>
</template>
