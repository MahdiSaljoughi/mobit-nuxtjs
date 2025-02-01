<script setup lang="ts">
const { data, status } = useAuths();

const userHref = ref<string>(
  data?.value?.user.role === "ADMIN" ? "/dashboard" : "/profile"
);
</script>

<template>
  <div class="pt-16 block lg:hidden z-20">
    <div
      class="fixed bottom-0 inset-x-0 flex items-center justify-between py-2 px-8 sm:px-20 bg-white dark:bg-zinc-900 text-[10px] text-zinc-400 shadow-around z-20"
    >
      <NuxtLink to="/" class="flex flex-col items-center gap-y-2">
        <IconSvg icon-id="i-homefill" class="w-6" />
        صفحه اصلی
      </NuxtLink>
      <button class="flex flex-col items-center gap-y-2">
        <IconSvg icon-id="i-categoryfill" class="w-6" />
        دسته بندی
      </button>
      <NuxtLink to="/cart" class="flex flex-col items-center gap-y-2">
        <IconSvg icon-id="i-cart-fill-new" class="w-5" />
        سبدخرید
      </NuxtLink>
      <NuxtLink
        :to="status === 'authenticated' ? userHref : '/auth'"
        class="flex flex-col items-center gap-y-2"
      >
        <IconSvg icon-id="i-profilefill" class="w-6" />
        <p>
          <span v-if="status === 'authenticated'"> پروفایل </span>
          <span v-else>ورود</span>
        </p>
      </NuxtLink>
    </div>
  </div>
</template>
