<template>
  <header
    class="block lg:hidden p-4 sticky top-0 z-30 border-b dark:border-none bg-white dark:bg-zinc-900 text-sx"
  >
    <div class="w-full flex items-center gap-x-2">
      <div>
        <NuxtLink to="/" class="w-10 block">
          <NuxtImg src="/images/logo/mobit-logo.svg" alt="logo" />
        </NuxtLink>
      </div>

      <div
        class="flex items-center w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl pr-4"
      >
        <UIcon name="i-solar-magnifer-linear" class="opacity-50" size="20" />
        <input
          type="text"
          placeholder="جستجو در مبیت"
          class="outline-none p-3 h-12 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800"
        />
      </div>

      <MenuMobile />
    </div>
  </header>
</template>
