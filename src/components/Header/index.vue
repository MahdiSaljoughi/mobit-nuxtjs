<script setup lang="ts">
import { useCartStore } from "~/stores/cartStore";

const { userInfo } = await useUser().info();
const { status } = useAuths();

const userHref = computed(() =>
  userInfo?.role === "ADMIN" ? "/dashboard" : "/profile"
);

const cartStore = useCartStore();
const { items } = cartStore;
</script>

<template>
  <!-- Desktop -->
  <header
    class="hidden lg:block lg:px-4 xl:px-8 2xl:px-14 sticky top-0 z-30 border-b dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs xl:text-sx"
  >
    <div class="flex items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="w-[84px] block mt-1 lg:ml-4 2xl:ml-14">
        <NuxtImg src="/images/logo/logo.svg" alt="logo" />
      </NuxtLink>

      <div class="flex items-center w-full">
        <!-- Menu -->
        <MenuMega class="ml-8 2xl:ml-14" />

        <!-- Search -->
        <div
          class="flex items-center flex-grow min-w-0 max-w-[520px] bg-zinc-100 dark:bg-zinc-800 rounded-xl pr-4 ml-4 2xl:ml-24"
        >
          <button class="flex items-center justify-center">
            <UIcon
              name="i-heroicons-magnifying-glass-20-solid"
              class="size-5 opacity-50"
            />
          </button>
          <div class="hidden xl:block h-6 w-px bg-slate-400 opacity-50 mr-2" />
          <input
            type="text"
            placeholder="جستجو در مبیت"
            class="flex-grow h-11 pl-4 pr-2 rounded-xl bg-zinc-100 dark:bg-zinc-800"
          />
        </div>

        <!-- Login And Cart -->
        <div class="flex items-center gap-x-4 xl:gap-x-6 2xl:gap-x-10 text-xs">
          <NuxtLink
            :to="status === 'authenticated' ? userHref : '/auth'"
            class="flex items-center gap-x-2"
          >
            <div class="relative">
              <IconSvg icon-id="i-profilefill" class="w-6" />
              <div
                v-if="status === 'authenticated'"
                class="bg-main size-1.5 rounded-full absolute bottom-0.5 right-1"
              />
            </div>
            <p class="hidden xl:block">
              <span v-if="status === 'loading'">در حال بررسی</span>
              <span v-if="status === 'authenticated'" class="mt-0.5 block">
                {{
                  (userInfo?.user_name ?? "").length > 14
                    ? (userInfo?.user_name ?? "").slice(0, 14) + "..."
                    : userInfo?.user_name ?? ""
                }}
              </span>
              <span v-else>ورود / ثبت نام</span>
            </p>
          </NuxtLink>
          <NuxtLink to="/cart" class="flex items-center gap-x-2">
            <IconSvg icon-id="i-cart-fill-new" class="w-5" />
            <p v-if="items.length > 0" class="hidden 2xl:block">
              {{ `${items.reduce((acc, cur) => acc + cur.quantity, 0)} کالا` }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile -->
  <HeaderMobile />
</template>
