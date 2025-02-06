<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

definePageMeta({
  layout: "main-lg",
});

const cartStore = useCartStore();

const { items } = cartStore;
</script>

<template>
  <div>
    <div
      class="sticky top-0 pt-8 pb-3 border-b-2 bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-700 z-20"
    >
      Header
    </div>

    <Container>
      <div class="py-10 lg:py-32">
        <div v-show="items.length === 0">
          <CartComponentsEmpty />
        </div>
        <div v-show="items.length > 0">
          <div
            class="flex flex-col lg:flex-row gap-y-10 justify-between w-full gap-x-10"
          >
            <div class="flex flex-col gap-y-5 w-full">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex flex-col lg:flex-row lg:items-center justify-between gap-y-4 w-full border-b dark:border-zinc-800 pb-2 lg:pb-4"
              >
                <NuxtLink
                  :to="`/products/${item.slug}`"
                  class="flex items-start gap-x-4"
                >
                  <div
                    class="bg-zinc-100 dark:bg-zinc-800 w-60 sm:w-40 p-2 rounded-xl"
                  >
                    <NuxtImg
                      :src="item.image"
                      width="100"
                      :alt="item.title"
                      class="mx-auto"
                    />
                  </div>
                  <p class="pt-2 text-sm leading-7 line-clamp-2">
                    {{ item.title }}
                  </p>
                </NuxtLink>
                <div
                  class="flex flex-row-reverse justify-between lg:flex-col items-center lg:items-stretch"
                >
                  <span class="lg:pb-4 text-left">
                    {{ item.price.toLocaleString() }} تومان
                  </span>
                  <CartComponentsItemCounter
                    :id="item.id"
                    :title="item.title"
                    :price="item.price"
                    :slug="item.slug"
                    :image="item.image"
                  />
                </div>
              </div>
            </div>
            <div>
              <div
                class="bg-zinc-50 dark:bg-zinc-800 sticky top-24 rounded-2xl lg:w-96 flex flex-col gap-y-4 justify-between p-4 mb-20 lg:mb-0"
              >
                <p class="opacity-70">اطلاعات پرداخت</p>
                <div class="flex items-center justify-between w-full text-sm">
                  <p>مبلغ کالاها</p>
                  <span>
                    {{
                      items
                        .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                        .toLocaleString()
                    }}
                    <span class="text-zinc-500 text-xs mr-0.5">تومان</span>
                  </span>
                </div>
                <div class="flex items-center justify-between w-full">
                  <span class="block text-sm">هزینه ارسال</span>
                  <span class="block text-sm text-zinc-500">
                    در مرحله بعد مشخص می شود
                  </span>
                </div>
                <div
                  class="w-full flex items-center justify-between border-t dark:border-zinc-700 pt-4"
                >
                  <span class="text-sm">مبلغ قابل پرداخت :</span>
                  <span>
                    {{
                      items
                        .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                        .toLocaleString()
                    }}
                    <span class="text-zinc-500 text-xs mr-0.5">تومان</span>
                  </span>
                </div>
                <NuxtLink
                  :to="useAuths().data.value?.user ? '/shipping' : '/auth'"
                  class="rounded-xl bg-main hover:bg-blue-600 text-white p-2.5 w-full transition-colors text-center"
                >
                  ادامه
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>
