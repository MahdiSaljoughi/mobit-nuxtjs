<script setup lang="ts">
const runTime = useRuntimeConfig();
const products = ref<TProduct[]>([]);

onMounted(async () => {
  const res = await $fetch<{ products: TProduct[] }>(
    `${runTime.public.apiBase}/products`
  );
  products.value = res.products;
});
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div
      class="hidden lg:flex items-center justify-between bg-red-500/80 text-white px-3 h-16 rounded-xl"
    >
      <div class="flex items-center gap-x-4">
        <IconSvg icon-id="i-promotion-percent" class="w-8" />
        <p>پیشنهاد ویژه مبیت</p>
      </div>
      <HomePromotionTimer />
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
      class="flex lg:hidden items-center justify-between bg-red-500/80 text-white px-2 h-12 rounded-xl"
    >
      <div class="flex items-center gap-x-2">
        <IconSvg icon-id="i-promotion-percent" class="w-6" />
        <p class="text-xs">پیشنهاد ویژه مبیت</p>
      </div>
      <HomePromotionTimer />
    </NuxtLink>

    <SliderProduct :products="products" />
  </div>
</template>
