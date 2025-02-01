<template>
  <div class="min-h-screen">
    <div class="hidden lg:inline">
      <Header />
    </div>

    <div class="fixed bottom-8 lg:bottom-[unset] lg:top-1 left-0 z-50">
      <ThemSwitcher />
    </div>

    <slot />

    <div class="hidden lg:block">
      <Footer />
    </div>

    <MenuBottom />
  </div>
</template>
