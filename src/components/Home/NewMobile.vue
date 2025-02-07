<script setup lang="ts">
const { data } = await useProduct().getAll();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div
      class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 px-2 py-3.5 lg:p-5 rounded-xl"
    >
      <span class="text-sm lg:text-base">جدیدترین گوشی ها</span>
      <NuxtLink
        to="https://www.mobit.ir/search/index?slider_id%5B0%5D=3&sort=-created"
        class="flex items-center gap-x-2 text-xs lg:text-sm opacity-50 dark:opacity-100"
      >
        <span>مشاهده همه</span>
        <UIcon
          name="i-solar-alt-arrow-right-line-duotone"
          size="16"
          class="rotate-180"
        />
      </NuxtLink>
    </div>
    <SliderProduct :products="data?.products" />
  </div>
</template>
