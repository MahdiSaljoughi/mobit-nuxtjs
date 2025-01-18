<script setup lang="ts">
import { fourPoster } from "~/data/home/FourPoster";
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <NuxtLink
      v-for="poster in fourPoster"
      :key="poster.id"
      :to="poster.href"
      class="block"
    >
      <NuxtImg :src="poster.imgSrc" :alt="poster.alt" class="w-full" />
    </NuxtLink>
  </div>
</template>
