<script setup lang="ts">
import useAuths from "~/features/auth/composables/useAuths";

const { status, signIn, signOut } = await useAuths();
const loggedIn = computed(() => status.value === "authenticated");

async function handleSignIn() {
  await signIn();
}

async function handleSignOut() {
  await signOut();
}
</script>

<template>
  <!-- Desktop -->
  <header
    class="hidden lg:block lg:px-4 xl:px-8 2xl:px-14 sticky top-0 z-30 border-b dark:border-none bg-white dark:bg-zinc-900 text-xs xl:text-[12.8px]"
  >
    <div class="flex items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="w-[84px] block mt-1 lg:ml-4 2xl:ml-14">
        <NuxtImg src="/images/logo/logo.svg" alt="logo" />
      </NuxtLink>

      <div class="flex items-center w-full">
        <!-- Menu -->
        <MenuMegaMenu class="ml-8 2xl:ml-14" />

        <!-- Search -->
        <div
          class="flex items-center flex-grow min-w-0 max-w-[520px] bg-zinc-100 dark:bg-zinc-800 rounded-xl pr-4 ml-4 2xl:ml-24"
        >
          <button class="flex items-center justify-center">
            <UIcon name="i-solar-magnifer-linear" class="size-5 opacity-50" />
          </button>
          <div class="hidden xl:block h-6 w-px bg-slate-400 opacity-50 mr-2" />
          <input
            type="text"
            placeholder="جستجو در مبیت"
            class="flex-grow outline-none h-11 pl-4 pr-2 rounded-xl bg-zinc-100 dark:bg-zinc-800"
          />
        </div>

        <!-- Login And Cart -->
        <div class="flex items-center gap-x-4 xl:gap-x-6 2xl:gap-x-10 text-xs">
          <NuxtLink
            :to="!loggedIn ? '/auth' : '/profile'"
            class="flex items-center gap-x-2"
          >
            <IconSvg icon-id="i-profilefill" class="w-6" />
            <button v-if="loggedIn" @click="handleSignOut">Sign Out</button>
            <span v-else class="hidden xl:block">ورود / ثبت نام</span>
          </NuxtLink>
          <button @click="handleSignIn">Sign In</button>
          <NuxtLink to="/cart" class="flex items-center">
            <IconSvg icon-id="i-cart-fill-new" class="w-5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>

  <HeaderMobile />
</template>
