<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

definePageMeta({
  layout: "cart",
});

const { items } = useCartStore();
</script>

<template>
  <div class="mb-4 xl:mb-20">
    <CartComponentsEmpty v-if="items.length <= 0" />

    <div v-else>
      <div
        class="flex flex-col lg:flex-row gap-y-10 justify-between w-full gap-x-10"
      >
        <div class="flex flex-col gap-y-5 w-full">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex flex-col lg:flex-row lg:items-center justify-between gap-y-4 w-full border-b dark:border-zinc-700 pb-2 lg:pb-4"
          >
            <NuxtLink
              :to="`/products/${item.slug}`"
              class="flex items-start gap-x-4"
            >
              <div class="bg-zinc-100 dark:bg-zinc-800 p-3 lg:p-4 rounded-xl">
                <NuxtImg
                  :src="item.image"
                  :alt="item.title"
                  class="mx-auto w-32 sm:w-20"
                />
              </div>
              <div
                class="flex flex-col justify-between h-28 text-xs text-zinc-500 dark:text-zinc-400"
              >
                <p
                  class="text-sx leading-7 line-clamp-2 text-slate-700 dark:text-slate-200"
                >
                  {{ item.title }}
                </p>
                <div
                  class="hidden lg:flex items-center justify-between gap-x-4"
                >
                  <div class="flex items-center gap-x-2">
                    <div
                      :style="{ backgroundColor: item.variant.hex_code }"
                      class="size-5 rounded-md"
                    />
                    <span>{{ item.variant.color_name }}</span>
                  </div>
                  <div class="flex items-center gap-x-2">
                    <IconSvg icon-id="i-store-fill" class="size-5" />
                    <span>تفکر زرین کریمان</span>
                  </div>
                  <div class="flex items-center gap-x-2">
                    <IconSvg icon-id="i-zemanat-product" class="size-5" />
                    <span>18 ماهه شرکتی</span>
                  </div>
                  <div class="flex items-center gap-x-2">
                    <UIcon name="i-eva-car-fill" size="18" />
                    <span>ارسال توسط مبیت از 1 روز دیگر</span>
                  </div>
                </div>
                <button class="hidden lg:flex items-center gap-x-2 text-main">
                  <IconSvg icon-id="i-cart-list" class="size-5" />
                  <span>انتقال به لیست خرید</span>
                  <UIcon
                    name="i-solar-alt-arrow-right-line-duotone"
                    class="rotate-180"
                    size="14"
                  />
                </button>
              </div>
            </NuxtLink>

            <div
              class="grid lg:hidden grid-cols-2 text-xs text-zinc-500 dark:text-zinc-400 gap-4"
            >
              <div class="flex items-center gap-x-2">
                <div
                  :style="{ backgroundColor: item.variant.hex_code }"
                  class="size-5 rounded-md"
                />
                <span>{{ item.variant.color_name }}</span>
              </div>
              <div class="flex items-center gap-x-2">
                <IconSvg icon-id="i-store-fill" class="size-4" />
                <span>تفکر زرین کریمان</span>
              </div>
              <div class="flex items-center gap-x-2">
                <IconSvg icon-id="i-zemanat-product" class="size-5" />
                <span>18 ماهه شرکتی</span>
              </div>
              <div class="flex items-center gap-x-2">
                <UIcon name="i-eva-car-fill" size="16" />
                <span>ارسال توسط مبیت از 1 روز دیگر</span>
              </div>
            </div>

            <div
              class="flex flex-row-reverse justify-between lg:justify-end lg:flex-col items-center lg:items-end h-full gap-y-3"
            >
              <div class="flex flex-col items-end">
                <div v-if="item.variant.discount">
                  <div class="flex items-center gap-x-2">
                    <p class="line-through opacity-70 text-xs font-IRANr mt-1">
                      {{ item.variant.price.toLocaleString() }}
                    </p>
                    <div
                      class="flex items-center gap-x-0.5 bg-red-400 dark:bg-red-500 rounded-md pl-0.5 pr-1.5 py-0.5 text-white text-xs"
                    >
                      <span>{{ item.variant.discount }}</span>
                      <IconSvg icon-id="i-percent" class="size-4" />
                    </div>
                  </div>
                  <div class="flex items-center justify-end gap-x-2 mt-4">
                    <p class="text-xs lg:text-sx">
                      {{ item.variant.price_after_discount?.toLocaleString() }}
                      <span
                        class="text-xs text-zinc-600 dark:text-zinc-300 mr-1"
                      >
                        تومان
                      </span>
                    </p>
                  </div>
                </div>

                <div v-else class="flex items-center justify-end">
                  <p class="text-xs lg:text-sx">
                    {{ item.variant.price.toLocaleString() }}
                    <span class="text-xs text-zinc-600 dark:text-zinc-300 mr-1">
                      تومان
                    </span>
                  </p>
                </div>
              </div>
              <CartComponentsItemCounter
                :id="item.id"
                :title="item.title"
                :price="item.price"
                :slug="item.slug"
                :image="item.image"
                :variant="item.variant"
              />
            </div>

            <button
              class="flex lg:hidden items-center justify-end gap-x-2 text-main text-xs"
            >
              <IconSvg icon-id="i-cart-list" class="size-5" />
              <span>انتقال به لیست خرید</span>
              <UIcon
                name="i-solar-alt-arrow-right-line-duotone"
                class="rotate-180"
                size="14"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
