<template>
  <div class="min-h-screen">
    <div class="hidden lg:inline">
      <Header />
    </div>

    <ThemSwitcher />

    <slot />

    <div class="hidden lg:block">
      <Footer />
    </div>

    <MenuBottom />
  </div>
</template>
