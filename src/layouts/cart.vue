<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const { items } = useCartStore();

const emit = defineEmits(["payment-clicked"]);

const handlePaymentClick = () => {
  emit("payment-clicked");
};
</script>

<template>
  <div class="min-h-screen">
    <div class="hidden xl:inline">
      <Header />
    </div>

    <div class="flex flex-col xl:flex-row gap-x-6 px-3 xl:px-4 2xl:px-20">
      <div class="w-full flex flex-col gap-y-4">
        <div
          class="flex items-center justify-between py-4 lg:mt-6 border-b-2 border-zinc-100 dark:border-zinc-700"
        >
          <div class="flex items-center gap-x-8 text-sx">
            <NuxtLink
              to="/cart"
              class="flex items-center gap-x-3"
              :class="$route.path === '/cart' && 'text-main border-custom'"
            >
              <IconSvg icon-id="i-cart-fill-new" class="size-5" />
              <span>سبد خرید</span>
            </NuxtLink>
            <NuxtLink
              :to="useAuths().data.value?.user ? '/shipping' : '/auth'"
              class="flex items-center gap-x-3"
              :class="$route.path === '/shipping' && 'text-main border-custom'"
            >
              <IconSvg icon-id="i-cart-list" class="size-5" />
              <span>لیست خرید</span>
            </NuxtLink>
          </div>

          <UIcon
            name="i-heroicons-solid-dots-vertical"
            class="cursor-pointer"
          />
        </div>

        <slot />
      </div>

      <div v-if="items.length > 0">
        <div
          class="bg-zinc-50 dark:bg-zinc-900 sticky top-24 rounded-2xl w-full xl:w-72 2xl:w-96 flex flex-col gap-y-4 justify-between p-4 mb-36 xl:mb-0"
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
              {{
                $route.path === "/cart"
                  ? "در مرحله بعد مشخص خواهد شد"
                  : "رایگان"
              }}
            </span>
          </div>
          <div
            class="w-full hidden lg:flex items-center justify-between border-t dark:border-zinc-700 pt-4"
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
            v-if="$route.path === '/cart'"
            :to="useAuths().data.value?.user ? '/shipping' : '/auth'"
            class="hidden lg:block rounded-xl bg-main hover:bg-blue-600 text-white p-2.5 w-full transition-colors text-center"
          >
            ادامه
          </NuxtLink>
          <button
            v-else
            class="hidden lg:block rounded-xl bg-main hover:bg-blue-600 text-white p-2.5 w-full transition-colors text-center"
            @click.prevent="handlePaymentClick"
          >
            پرداخت و تایید نهایی سفارش
          </button>

          <div
            class="flex lg:hidden items-center justify-between fixed bottom-[62px] bg-zinc-100 dark:bg-zinc-800 inset-x-0 p-4"
          >
            <NuxtLink
              v-if="$route.path === '/cart'"
              :to="useAuths().data.value?.user ? '/shipping' : '/auth'"
              class="rounded-xl bg-main hover:bg-blue-600 text-white p-2.5 transition-colors w-1/2 text-center"
            >
              ادامه
            </NuxtLink>
            <button
              v-else
              class="rounded-xl bg-main hover:bg-blue-600 text-white p-2.5 transition-colors text-sm text-center"
              @click.prevent="handlePaymentClick"
            >
              پرداخت و تایید نهایی سفارش
            </button>
            <div class="flex flex-col gap-y-2">
              <span class="text-xs font-IRANr">مبلغ قابل پرداخت</span>
              <span class="text-sx">
                {{
                  items
                    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                    .toLocaleString()
                }}
                <span class="text-zinc-500 text-xs mr-0.5">تومان</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-8 xl:bottom-[unset] xl:top-1 left-0 z-50">
      <ThemSwitcher />
    </div>

    <Footer class="hidden xl:block" />

    <MenuBottom />
  </div>
</template>

<style scoped>
.border-custom {
  position: relative;
}
.border-custom ::after {
  content: "";
  position: absolute;
  bottom: -18px;
  right: 0;
  width: 100%;
  height: 2px;
  background-color: #377dff;
}
</style>
