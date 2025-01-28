<template>
  <div class="flex flex-col w-full px-4 sm:px-0">
    <NuxtLink to="/" class="mb-8 mx-auto">
      <NuxtImg src="/images/logo/mobit-logo.svg" width="124" />
    </NuxtLink>
    <div
      class="w-full sm:w-96 lg:w-[420px] mx-auto sm:dark:bg-zinc-900 rounded-3xl sm:p-5 sm:shadow-auth"
    >
      <AuthComponentsForm />
    </div>

    <div
      class="flex items-center gap-x-4 text-zinc-400 dark:text-zinc-600 text-xs mt-4 mx-auto"
    >
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <div class="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
      <NuxtLink to="/">حریم خصوصی</NuxtLink>
      <div class="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
      <NuxtLink to="/">سوالات متداول</NuxtLink>
    </div>
  </div>
</template>
