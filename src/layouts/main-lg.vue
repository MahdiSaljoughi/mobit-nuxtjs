<template>
  <div class="min-h-screen">
    <div class="hidden lg:inline">
      <Header />
    </div>
    <ThemSwitcher />
    <slot name="main" />
    <div class="hidden lg:block">
      <Footer />
    </div>
    <MenuBottom />
  </div>
</template>
