<template>
  <div class="min-h-screen">
    <div class="hidden lg:block">
      <Header />
    </div>

    <div class="inline lg:hidden">Header</div>

    <div class="fixed lg:top-1 left-0 z-50">
      <ThemSwitcher />
    </div>

    <slot />

    <div class="hidden lg:block">
      <Footer />
    </div>
  </div>
</template>
