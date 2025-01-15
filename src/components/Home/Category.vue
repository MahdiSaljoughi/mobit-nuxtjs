<script setup lang="ts">
import { homeCategory } from "~/data/home/Category";
</script>

<template>
  <div>
    <span class="block lg:hidden text-sm mt-1 mb-3">دسته بندی های منتخب</span>
    <div
      class="w-full flex items-center justify-evenly lg:justify-between flex-wrap gap-6 sm:gap-10 lg:mt-6"
    >
      <NuxtLink
        v-for="category in homeCategory"
        :key="category.id"
        :to="category.href"
        class="flex flex-col items-center gap-y-3"
      >
        <div
          class="bg-zinc-100 dark:bg-zinc-800 rounded-2xl block cursor-pointer w-16 lg:w-[72px]"
        >
          <NuxtImg :src="category.srcImg" :alt="category.alt" class="w-full" />
        </div>
        <span class="text-[10px] xl:text-[12.8px]">{{ category.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
