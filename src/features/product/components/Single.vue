<script setup lang="ts">
import type { TProduct } from "~/types";

defineProps<{ product: TProduct }>();
</script>

<template>
  <NuxtLink
    :to="`/products/${product?.slug}`"
    class="hidden lg:flex flex-row lg:flex-col gap-y-3 lg:w-80 hover:shadow-around rounded-xl p-2 duration-300 group"
  >
    <div
      class="flex items-center justify-center lg:h-52 bg-zinc-100 dark:bg-zinc-800 rounded-2xl relative"
    >
      <NuxtImg
        :src="product?.images[0]?.url"
        :alt="product?.title"
        class="max-w-20 sm:max-w-32 lg:min-w-28 lg:group-hover:scale-110 duration-300"
      />

      <div class="absolute top-0 flex justify-between w-full px-3 pt-3">
        <div class="flex flex-col items-start gap-y-3 text-xs text-white">
          <div
            v-if="product?.variants[0]?.quantity! > 0 && product?.variants[0]?.discount"
            class="flex items-center gap-x-1 bg-red-400 dark:bg-red-500 rounded-lg px-1.5 py-1"
          >
            <span>{{ product?.variants[0]?.discount }}</span>
            <IconSvg icon-id="i-percent" class="size-4" />
          </div>
          <div
            v-if="product?.variants[0]?.quantity! > 0 && product?.is_fast_delivery"
            class="flex items-center gap-x-1 bg-orange-400 rounded-lg px-1.5 py-0.5"
          >
            <IconSvg icon-id="i-fast" class="size-5" />
            <span>سریع</span>
          </div>
        </div>
        <div v-if="product?.variants[0]?.quantity! > 0 && product?.is_offer">
          <IconSvg
            icon-id="i-promotion-percent"
            class="size-7 text-red-400 dark:text-red-500"
          />
        </div>
      </div>

      <div
        v-if="product?.variants[0]?.quantity! > 0"
        class="flex items-center gap-x-1 absolute bottom-3 right-3 bg-black/10 dark:bg-white/10 p-2 rounded-lg"
      >
        <p
          v-for="variant in product.variants"
          :key="variant.id"
          :style="{ backgroundColor: variant.value }"
          class="size-1.5 rounded-full"
        />
      </div>

      <div v-if="product?.variants[0]?.quantity! <= 0">
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
        v-if="product?.variants[0]?.quantity! > 0 && product?.variants[0]?.discount"
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
      <div
        v-else-if="product?.variants[0]?.quantity! > 0"
        class="flex items-center justify-end"
      >
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
        v-if="product?.variants[0]?.quantity! <= 0"
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

  <NuxtLink
    :to="`/products/${product?.slug}`"
    class="flex lg:hidden flex-col gap-y-4 border-b dark:border-zinc-700 pb-3"
  >
    <div class="flex gap-x-3">
      <div
        class="flex items-center justify-center max-w-28 max-h-28 sm:max-w-32 sm:max-h-32 md:max-w-36 md:max-h-36 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-2 pb-3 relative"
      >
        <NuxtImg
          :src="product?.images[0]?.url"
          :alt="product?.title"
          class="w-full max-w- 24 sm:max-w- 28"
        />

        <div
          v-if="product?.variants[0]?.quantity! > 0"
          class="flex items-center gap-x-1 absolute bottom-2 right-2 bg-zinc-200 dark:bg-zinc-600 p-2 rounded-md"
        >
          <p
            v-for="variant in product.variants"
            :key="variant.id"
            :style="{ backgroundColor: variant.value }"
            class="size-1.5 rounded-full"
          />
        </div>

        <div v-if="product?.variants[0]?.quantity! <= 0">
          <p
            class="absolute bottom-1.5 left-1.5 text-xs text-white bg-slate-400 dark:bg-slate-700 py-0.5 px-1 rounded-md z-10"
          >
            ناموجود
          </p>
          <div
            class="absolute inset-0 bg-white/60 dark:bg-black/50 rounded-xl"
          />
        </div>
      </div>
      <div
        :class="`flex flex-col w-full ${
          product.variants[0].discount ? 'gap-y-2' : 'gap-y-6'
        }`"
      >
        <h2
          class="leading-6 line-clamp-2 text-xs sm:text-sx text-zinc-700 dark:text-zinc-100 h-12"
        >
          {{ product?.title }}
        </h2>

        <div
          v-if="product?.variants[0]?.quantity! <= 0"
          class="flex items-center gap-x-1 text-main"
        >
          <IconSvg icon-id="i-notification" class="size-5" />
          <span class="text-xs">موجود شد به من اطلاع بده !</span>
          <UIcon
            name="i-solar-alt-arrow-up-linear"
            class="-rotate-90 mb-1"
            size="14"
          />
        </div>

        <div v-else class="flex flex-col items-end">
          <div v-if="product?.variants[0]?.discount">
            <div class="flex items-center gap-x-2">
              <p class="line-through opacity-70 text-sx mt-1">
                {{ product?.variants[0]?.price.toLocaleString() }}
              </p>
              <div
                class="flex items-center gap-x-1 bg-red-400 dark:bg-red-500 rounded-md px-1 py-0.5 text-white text-xs"
              >
                <span>{{ product?.variants[0]?.discount }}</span>
                <IconSvg icon-id="i-percent" class="size-4" />
              </div>
            </div>
            <div class="flex items-center justify-end gap-x-2 mt-4">
              <p class="text-xs">
                {{
                  product?.variants[0]?.price_after_discount?.toLocaleString()
                }}
                <span class="text-xs text-zinc-600 dark:text-zinc-300 mr-1">
                  تومان
                </span>
              </p>
            </div>
          </div>

          <div v-else class="flex items-center justify-end">
            <p class="text-xs">
              {{ product?.variants[0]?.price?.toLocaleString() }}
              <span class="text-xs text-zinc-600 dark:text-zinc-300 mr-1">
                تومان
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-start gap-x-2 text-xs">
          <div
            v-if="product?.variants[0]?.quantity! > 0 && product?.is_fast_delivery"
            class="flex items-center gap-x-1 bg-orange-400 rounded-lg px-1 py-0.5 text-white"
          >
            <IconSvg icon-id="i-fast" class="size-6" />
          </div>
          <div v-if="product?.variants[0]?.quantity! > 0 && product?.is_offer">
            <IconSvg
              icon-id="i-promotion-percent"
              class="size-7 text-red-400 dark:text-red-500"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-end gap-x-2">
          <div v-if="false" class="flex items-center gap-x-1 text-sx">
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
    </div>
  </NuxtLink>
</template>
