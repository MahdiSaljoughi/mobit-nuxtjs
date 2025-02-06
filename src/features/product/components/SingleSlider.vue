<script setup lang="ts">
import type { TProduct } from "~/types";

defineProps<{ product: TProduct }>();
</script>

<template>
  <NuxtLink
    :to="`/products/${product?.slug}`"
    class="flex flex-col gap-y-3 lg:w-72 group"
  >
    <div
      class="flex items-center justify-center lg:h-48 bg-zinc-100 dark:bg-zinc-800 rounded-2xl relative"
    >
      <NuxtImg
        :src="product?.images[0]?.url"
        :alt="product?.title"
        class="max-w-20 sm:max-w-32 lg:min-w-28 group-hover:scale-110 duration-300"
      />

      <div class="absolute top-0 flex justify-between w-full px-3 pt-3">
        <div class="flex flex-col items-start gap-y-3 text-xs text-white">
          <div
            v-if="false"
            class="flex items-center gap-x-1 bg-red-400 dark:bg-red-500 rounded-lg px-1.5 py-1"
          >
            <span>{{ 9 }}</span>
            <IconSvg icon-id="i-percent" class="size-4" />
          </div>
          <div
            v-if="true"
            class="flex items-center gap-x-1 bg-orange-400 rounded-lg px-1.5 py-0.5"
          >
            <IconSvg icon-id="i-fast" class="size-5" />
            <span>سریع</span>
          </div>
        </div>
        <div v-if="false">
          <IconSvg
            icon-id="i-promotion-percent"
            class="size-7 text-red-400 dark:text-red-500"
          />
        </div>
      </div>

      <div
        class="flex items-center gap-x-1 absolute bottom-3 right-3 bg-black/10 dark:bg-white/10 p-2 rounded-lg"
      >
        <p class="size-1.5 rounded-full bg-main" />
        <p class="size-1.5 rounded-full bg-red-500" />
        <p class="size-1.5 rounded-full bg-emerald-400" />
      </div>
    </div>
    <div class="flex flex-col justify-between gap-y-4 w-full">
      <h2
        class="leading-6 lg:leading-7 line-clamp-2 text-xs lg:text-sx text-zinc-700 dark:text-zinc-100"
      >
        {{ product?.title }}
      </h2>

      <div class="flex items-center justify-end gap-x-2">
        <p v-if="false" class="line-through opacity-70 text-xs">
          {{ product?.price?.toLocaleString() }}
        </p>
        <p v-if="product?.price" class="text-xs lg:text-base">
          {{ product?.price?.toLocaleString() }}
          <span
            class="text-xs lg:text-sm text-zinc-600 dark:text-zinc-300 mr-0.5"
          >
            تومان
          </span>
        </p>
      </div>
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
