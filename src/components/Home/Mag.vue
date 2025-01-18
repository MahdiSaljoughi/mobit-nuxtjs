<script setup lang="ts">
import { mag } from "~/data/home/Mag";
</script>

<template>
  <div class="flex flex-col gap-y-8 mt-8">
    <span class="text-xl">اخبار پربازدید تکنولوژی</span>
    <div class="hidden lg:flex items-center gap-x-8">
      <NuxtLink
        v-for="item in mag"
        :key="item.id"
        :to="item.href"
        class="block relative hover:scale-110 duration-500 transition-transform"
      >
        <NuxtImg :src="item.imgSrc" :alt="item.alt" class="rounded-2xl" />
        <span class="text-white absolute bottom-4 right-4 backdrop-blur-3xl">{{
          item.title
        }}</span>
      </NuxtLink>
    </div>
    <div class="block lg:hidden">
      <SliderHomeMag />
    </div>
  </div>
</template>
