<script setup lang="ts">
const props = defineProps<{ product: TProduct }>();
console.log(props.product.images[0].url);
</script>

<template>
  <NuxtLink
    :to="`/products/${product.slug}`"
    class="flex gap-x-3 lg:flex-col rounded-2xl py-4 lg:pb-4 group/product transition-colors sm:min-h-40"
  >
    <div
      class="flex items-center justify-center lg:min-w-full lg:min-h-40 bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-3 sm:p-6 lg:p-8"
    >
      <NuxtImg
        :src="product.images[0].url"
        :alt="product.title"
        class="max-w-20 sm:max-w-32 lg:max-w-40 group-hover/product:scale-110 transition-transform-2"
      />
    </div>
    <div class="flex flex-col justify-between gap-y-2 w-full">
      <div class="block lg:pt-4 text-right h-[56px] lg:h-[74px]">
        <h2 class="leading-6 lg:leading-7 line-clamp-2 text-xs lg:text-sm">
          {{ product.title }}
        </h2>
      </div>

      <!-- <div>
        {item.count > 0 ? (
        <span class="text-[12px] lg:text-sm block text-left">
          {item.price.toLocaleString()}
          <span class="text-xs text-zinc-400 mr-1">تومان</span>
        </span>
        ) : (
        <span class="text-red-500 text-[12px] lg:text-sm block text-center">
          ناموجود
        </span>
        )}
      </div> -->
      <div>
        <span class="text-[12px] lg:text-sm block text-left">
          {{ product.price.toLocaleString() }}
          <span class="text-xs text-zinc-400 mr-1">تومان</span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
