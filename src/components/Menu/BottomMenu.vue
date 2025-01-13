<template>
  <div class="pt-12 block lg:hidden z-20">
    <div
      class="py-2 px-6 sm:px-10 fixed bottom-0 inset-x-0 border-t dark:border-none bg-white dark:bg-zinc-900 text-[10px] text-zinc-400 flex items-center justify-between"
    >
      <NuxtLink to="/" class="flex flex-col items-center gap-y-2">
        <UIcon name="i-solar-home-smile-bold" size="20" />
        صفحه اصلی
      </NuxtLink>
      <button class="flex flex-col items-center gap-y-2">
        <UIcon name="i-solar-widget-3-bold-duotone" size="20" />
        دسته بندی
      </button>
      <NuxtLink to="/cart" class="flex flex-col items-center gap-y-2">
        <UIcon name="i-heroicons-shopping-cart-solid" size="20" />
        سبدخرید
      </NuxtLink>
      <NuxtLink to="/auth" class="flex flex-col items-center gap-y-2">
        <UIcon name="i-solar-user-bold" size="20" />
        ورود
      </NuxtLink>
    </div>
  </div>
</template>
