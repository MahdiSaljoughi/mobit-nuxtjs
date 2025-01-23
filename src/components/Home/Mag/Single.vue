<script setup lang="ts">
import type { IMag } from "~/data/home/Mag";

defineProps<{ mag: IMag }>();
</script>

<template>
  <NuxtLink
    :to="mag.href"
    class="block w-full h-56 group relative lg:size-56 xl:size-72 2xl:size-80 overflow-hidden rounded-2xl shadow-lg"
  >
    <div class="relative w-full h-full overflow-hidden">
      <NuxtImg
        :src="mag.imgSrc"
        :alt="mag.alt"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform transform duration-500"
      />
    </div>
    <span
      class="absolute bottom-0 left-0 w-full p-4 pt-8 text-zinc-100 text-sm lg:text-base lg:leading-8 bg-gradient-to-t from-black to-transparent backdrop-blur-[1px]"
    >
      {{ mag.title }}
    </span>
  </NuxtLink>
</template>
