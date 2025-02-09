<template>
  <div class="min-h-screen">
    <div class="hidden lg:block">
      <Header />
    </div>

    <div class="inline lg:hidden">
      <header
        class="block lg:hidden p-4 sticky top-0 z-30 border-b dark:border-none bg-white dark:bg-zinc-900 text-sx"
      >
        <div class="w-full flex items-center gap-x-3">
          <NuxtLink to="/products" class="block mt-1">
            <UIcon name="i-heroicons-chevron-right-20-solid" size="26" />
          </NuxtLink>

          <SearchComponentsInputMobile />

          <NuxtLink to="/cart" class="block mr-1">
            <IconSvg icon-id="i-cart-fill-new" class="w-6" />
          </NuxtLink>
        </div>
      </header>
    </div>

    <div class="fixed top-12 left-0 lg:top-1 z-50">
      <ThemSwitcher />
    </div>

    <slot />

    <div class="hidden lg:block">
      <Footer />
    </div>
  </div>
</template>
