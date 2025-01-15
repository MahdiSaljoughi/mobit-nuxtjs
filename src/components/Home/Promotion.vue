<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-y-4">
    <div
      class="hidden lg:flex items-center justify-between bg-red-500/80 text-white w-full p-5 rounded-xl"
    >
      <div class="flex items-center gap-x-4">
        <!-- <IconSvg icon-id="" /> -->
        <span>پیشنهاد ویژه مبیت</span>
      </div>
      <div>Time</div>
      <NuxtLink
        to="https://www.mobit.ir/promotion"
        class="flex items-center gap-x-2 text-sm"
      >
        <span>مشاهده همه</span>
        <UIcon
          name="i-solar-alt-arrow-right-line-duotone"
          size="16"
          class="rotate-180"
        />
      </NuxtLink>
    </div>

    <NuxtLink
      to="https://www.mobit.ir/promotion"
      class="flex lg:hidden items-center justify-between bg-red-500/80 text-white w-full p-5 rounded-xl"
    >
      <div class="flex items-center gap-x-4">
        <!-- <IconSvg icon-id="" /> -->
        <span>پیشنهاد ویژه مبیت</span>
      </div>
      <div>Time</div>
    </NuxtLink>

    <SliderProduct :products="[]" />
  </div>
</template>
