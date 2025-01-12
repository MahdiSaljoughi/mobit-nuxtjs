<template>
  <header
    class="sticky top-0 z-50 border-b dark:border-none bg-white dark:bg-zinc-900 text-[12.8px]"
  >
    <Container>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-20">
          <NuxtLink to="/" class="w-20 block mt-1">
            <NuxtImg src="/images/logo/logo.svg" alt="logo" />
          </NuxtLink>

          <HeaderMegaMenu />

          <div class="">
            <UInput
              icon="i-heroicons-magnifying-glass"
              placeholder="جستجو در مبیت ..."
            />
          </div>
        </div>
        <div class="flex items-center gap-x-6 text-xs">
          <NuxtLink to="/auth" class="flex items-center gap-x-2">
            <UIcon name="i-solar-user-bold" class="size-5" />
            <span>ورود / ثبت نام</span>
          </NuxtLink>

          <NuxtLink to="/cart" class="flex items-center">
            <UIcon name="i-heroicons-shopping-cart-solid" class="size-5" />
          </NuxtLink>
          <ThemSwitcher />
        </div>
      </div>
    </Container>
  </header>
</template>
