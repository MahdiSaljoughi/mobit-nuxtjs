<template>
  <div>
    <div class="flex items-center justify-center h-screen px-2 lg:px-0">
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
