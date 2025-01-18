<script setup lang="ts">
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { mag } from "~/data/home/Mag";
</script>

<template>
  <Swiper
    :breakpoints="{
      0: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    }"
  >
    <SwiperSlide v-for="item in mag" :key="item.id" :to="item.href">
      <NuxtLink class="block relative">
        <NuxtImg :src="item.imgSrc" :alt="item.alt" class="rounded-2xl" />
        <span class="text-white absolute bottom-4 right-4 backdrop-blur-3xl">{{
          item.title
        }}</span>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>
