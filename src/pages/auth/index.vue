<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="relative">
    <div class="flex items-center h-screen">
      <AuthComponentsSection />
    </div>
    <div class="absolute bottom-0 inset-x-0">
      <NuxtImg
        src="/images/auth/mobit-logo-footer.svg"
        class="hidden lg:block w-full dark:hidden"
      />
      <NuxtImg
        src="/images/auth/mobit-logo-footer-mobile.svg"
        class="block lg:hidden w-full dark:hidden"
      />
    </div>
  </div>
</template>
