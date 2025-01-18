<script setup lang="ts"></script>

<template>
  <div class="hidden lg:flex items-center justify-between gap-x-4">
    <NuxtLink
      to="https://www.mobit.ir/search/category-smart-watch?sort=-created&isMain=false"
      class="block w-full"
    >
      <NuxtImg
        src="/images/home/tow-poster/poster1.webp"
        alt=""
        class="w-full"
      />
    </NuxtLink>
    <NuxtLink
      to="https://www.mobit.ir/search/category-headphones-headset-handsfree?isMain=false"
      class="block w-full"
    >
      <NuxtImg
        src="/images/home/tow-poster/poster2.webp"
        alt=""
        class="w-full"
      />
    </NuxtLink>
  </div>
  <div class="block lg:hidden">
    <SliderHomeTowPoster />
  </div>
</template>
