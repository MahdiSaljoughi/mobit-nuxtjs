<template>
  <!-- Desktop -->
  <header
    class="hidden lg:block lg:px-4 xl:px-8 2xl:px-10 sticky top-0 z-30 border-b dark:border-none bg-white dark:bg-zinc-900 text-xs xl:text-[12.8px]"
  >
    <div class="flex items-center justify-between gap-x-4">
      <div class="flex items-center gap-x-6 2xl:gap-x-14">
        <NuxtLink to="/" class="w-20 block mt-1">
          <NuxtImg src="/images/logo/logo.svg" alt="logo" />
        </NuxtLink>

        <MenuMegaMenu />

        <div
          class="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-xl pr-4"
        >
          <UIcon
            name="i-solar-magnifer-linear"
            class="size-4 xl:size-5 opacity-50"
          />
          <div class="h-6 w-px bg-slate-400 opacity-50 mx-4" />
          <input
            type="text"
            placeholder="جستجو در مبیت"
            class="outline-none h-11 xl:w-48 2xl:w-96 pl-4 rounded-xl bg-zinc-100 dark:bg-zinc-800"
          />
        </div>
      </div>
      <div class="flex items-center gap-x-4 xl:gap-x-6 text-xs">
        <NuxtLink to="/auth" class="flex items-center gap-x-2">
          <UIcon name="i-solar-user-bold" class="size-4 xl:size-5" />
          <span class="hidden xl:block">ورود / ثبت نام</span>
        </NuxtLink>

        <NuxtLink to="/cart" class="flex items-center">
          <UIcon
            name="i-heroicons-shopping-cart-solid"
            class="size-4 xl:size-5"
          />
        </NuxtLink>
      </div>
    </div>
  </header>

  <HeaderMobile />
</template>
