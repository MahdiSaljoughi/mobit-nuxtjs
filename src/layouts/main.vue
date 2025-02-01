<template>
  <div class="min-h-screen">
    <Header />

    <div class="fixed bottom-8 lg:bottom-[unset] lg:top-1 left-0 z-50">
      <ThemSwitcher />
    </div>

    <slot />

    <Footer />

    <MenuBottom />
  </div>
</template>
