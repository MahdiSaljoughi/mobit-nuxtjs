<template>
  <div class="flex flex-col gap-y-4">
    <div
      class="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 w-full p-5 rounded-xl"
    >
      <span>پربازدید های ماه</span>
      <NuxtLink
        to="https://www.mobit.ir/search/index?slider_id%5B0%5D=6&sort=-created"
        class="flex items-center gap-x-2 text-sm opacity-50"
      >
        <span>مشاهده همه</span>
        <UIcon
          name="i-solar-alt-arrow-right-line-duotone"
          size="16"
          class="rotate-180"
        />
      </NuxtLink>
    </div>
    <SliderProduct :products="[]" />
  </div>
</template>
