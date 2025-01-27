<template>
  <div class="flex flex-col items-center">
    <NuxtLink to="/" class="mb-8">
      <NuxtImg src="/images/logo/mobit-logo.svg" width="124" />
    </NuxtLink>
    <div
      class="w- full lg:w-[410px] lg:dark:bg-zinc-900 rounded-3xl p-5 custom-shadow"
    >
      <AuthComponentsForm />
    </div>

    <div
      class="flex items-center gap-x-4 text-zinc-400 dark:text-zinc-600 text-xs mt-4"
    >
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <div class="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
      <NuxtLink to="/">حریم خصوصی</NuxtLink>
      <div class="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
      <NuxtLink to="/">سوالات متداول</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.custom-shadow {
  --shadow: 0px 2px 14px #0000001a;
  box-shadow: var(--ring-offset-shadow, 0 0 #0000),
    var(--ring-shadow, 0 0 #0000), var(--shadow);
}
</style>
