<script setup lang="ts">
import type { TProduct } from "~/types";

const props = defineProps<{ product: TProduct }>();

const isAvailableProduct = computed(() => {
  return (
    props.product.variants[0]?.quantity != undefined &&
    props.product.variants[0].quantity > 0
  );
});
</script>

<template>
  <NuxtLink
    :to="`/products/${product?.slug}`"
    class="flex flex-col gap-y-3 lg:w-72 group"
  >
    <div
      class="flex items-center justify-center h-44 sm:h-48 bg-zinc-100 dark:bg-zinc-800 rounded-2xl relative"
    >
      <NuxtImg
        :src="product?.images[0]?.url"
        :alt="product?.title"
        class="max-w-28 sm:max-w -28 lg:min-w-28 lg:group-hover:scale-110 duration-300"
      />

      <div class="absolute top-0 flex justify-between w-full px-3 pt-3">
        <div class="flex flex-col items-start gap-y-3 text-xs text-white">
          <div
            v-if="isAvailableProduct && product?.variants[0]?.discount"
            class="flex items-center gap-x-0.5 bg-red-400 dark:bg-red-500 rounded-md pl-1 pr-1.5 py-1"
          >
            <span>{{ product?.variants[0]?.discount }}</span>
            <IconSvg icon-id="i-percent" class="size-4" />
          </div>
          <div
            v-if="isAvailableProduct && product?.is_fast_delivery"
            class="flex items-center gap-x-1 bg-orange-400 rounded-md px-1 py-0.5"
          >
            <IconSvg icon-id="i-fast" class="size-5" />
            <span>سریع</span>
          </div>
        </div>
        <div v-if="isAvailableProduct && product?.is_offer">
          <IconSvg
            icon-id="i-promotion-percent"
            class="size-7 text-red-400 dark:text-red-500"
          />
        </div>
      </div>

      <div
        v-if="isAvailableProduct"
        class="flex items-center gap-x-1 absolute bottom-3 right-3 bg-black/10 dark:bg-white/10 p-2 rounded-lg"
      >
        <p
          v-for="variant in product.variants"
          :key="variant.id"
          :style="{ backgroundColor: variant.hex_code }"
          class="size-1.5 rounded-full"
        />
      </div>

      <div v-if="!isAvailableProduct">
        <p
          class="absolute bottom-3 left-3 text-xs text-white bg-slate-500/60 dark:bg-slate-600/50 py-1 px-1.5 rounded-lg z-10"
        >
          ناموجود
        </p>
        <div
          class="absolute inset-0 bg-white/60 dark:bg-black/50 rounded-2xl"
        />
      </div>
    </div>
    <div class="flex flex-col justify-between gap-y-4 w-full">
      <h2
        class="leading-6 lg:leading-7 line-clamp-2 text-xs lg:text-sx text-zinc-700 dark:text-zinc-100"
      >
        {{ product?.title }}
      </h2>

      <div
        v-if="isAvailableProduct && product?.variants[0]?.discount"
        class="flex items-center justify-end gap-x-2"
      >
        <p class="line-through opacity-70 text-sx mt-1">
          {{ product?.variants[0]?.price.toLocaleString() }}
        </p>
        <p class="text-xs lg:text-base">
          {{ product?.variants[0]?.price_after_discount?.toLocaleString() }}
          <span
            class="text-xs lg:text-sm text-zinc-600 dark:text-zinc-300 mr-0.5"
          >
            تومان
          </span>
        </p>
      </div>
      <div v-else-if="isAvailableProduct" class="flex items-center justify-end">
        <p class="text-xs lg:text-base">
          {{ product?.variants[0]?.price?.toLocaleString() }}
          <span
            class="text-xs lg:text-sm text-zinc-600 dark:text-zinc-300 mr-0.5"
          >
            تومان
          </span>
        </p>
      </div>

      <button
        v-if="!isAvailableProduct"
        class="flex items-center gap-x-1 text-main"
      >
        <IconSvg icon-id="i-notification" class="size-6" />
        <span class="text-sx">موجود شد به من اطلاع بده !</span>
        <UIcon
          name="i-solar-alt-arrow-up-linear"
          class="-rotate-90 mb-1"
          size="18"
        />
      </button>

      <div class="flex items-center justify-end gap-x-2">
        <div v-if="true" class="flex items-center gap-x-1 text-sx">
          <p class="text-main">نظر دهید</p>
          <p class="text-orange-400 flex items-center">
            ( 1-10 <IconSvg icon-id="i-mobit-score" class="size-6 mb-1" /> )
          </p>
        </div>
        <p v-else class="flex items-center gap-x-1 text-xs">
          <span class="text-zinc-400"> ( {{ 1 }} نظر ) </span>
          <span class="opacity-80">{{ 3 }}</span>
          <IconSvg icon-id="i-star" class="size-6 mb-1" />
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
