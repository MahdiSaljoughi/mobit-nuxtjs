<script setup lang="ts">
import { menuList } from "@/data/dashboard/menuList";

const { signOut } = useAuths();

const fullScreen = ref<boolean>(false);
const isShowMenu = ref<boolean>(true);

const menuRef = ref();

const handleMenuClose = () => {
  if (menuRef.value) {
    menuRef.value.closeMenu();
  }
};
</script>

<template>
  <div>
    <!-- Desktop -->
    <div
      class="h-screen hidden lg:flex"
      :class="fullScreen === false && 'p-10 2xl:p-20'"
    >
      <div
        class="w-full flex p-8 rounded-3xl"
        :class="fullScreen ? 'min-h-screen' : 'shadow-around'"
      >
        <transition name="menu">
          <div v-if="isShowMenu" class="w-48 flex flex-col gap-y-10">
            <NuxtLink to="/" class="mt-2.5">
              <NuxtImg src="/images/logo/logo.svg" alt="logo" width="110" />
            </NuxtLink>
            <div class="flex flex-col -mr-4">
              <NuxtLink
                v-for="item in menuList"
                :key="item.id"
                :to="item.href"
                class="flex items-center gap-x-4 p-5 rounded-r-2xl hover:text-main"
                :class="
                  $route.path === item.href &&
                  'bg-zinc-50 dark:bg-zinc-900 text-main rounded-l-custom relative'
                "
              >
                <IconSvg :icon-id="item.icon" class="w-6" />
                <span class="text-sm mt-0.5 duration-300">
                  {{ item.title }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </transition>
        <div class="w-full flex flex-col gap-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-3">
              <button
                class="flex items-center justify-center"
                @click="isShowMenu = !isShowMenu"
              >
                <IconSvg icon-id="i-menu" class="size-[35px] text-main" />
              </button>
              <button class="block" @click="fullScreen = !fullScreen">
                <IconSvg
                  v-show="fullScreen === false"
                  icon-id="i-not-fullscreen"
                  class="size-8 text-main"
                />
                <IconSvg
                  v-show="fullScreen"
                  icon-id="i-fullscreen"
                  class="size-8 text-main"
                />
              </button>

              <ThemSwitcher />
            </div>

            <div class="flex items-center gap-x-2">
              <UserComponentsUserInfo dir="ltr" />
              <button class="mt-1 text-red-500" @click="signOut()">
                <UIcon name="i-solar-logout-2-line-duotone" size="22" />
              </button>
            </div>
          </div>
          <div
            class="h-full overflow-y-auto overflow-x-hidden bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="block lg:hidden min-h-screen">
      <header class="px-4 pb-10 sticky top-6 z-30">
        <div class="bg-white dark:bg-zinc-900 shadow-around p-4 rounded-3xl">
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="w-10 block">
              <NuxtImg src="/images/logo/mobit-logo.svg" alt="logo" />
            </NuxtLink>

            <p class="text-sm text-main">مبیت</p>

            <MenuMobile
              ref="menuRef"
              icon-name="i-heroicons-solid-dots-vertical"
              icon-size="20"
            >
              <div class="pt-8 px-3 flex flex-col gap-y-8">
                <NuxtLink
                  to="/"
                  class="w-24 block mx-auto"
                  @click="handleMenuClose"
                >
                  <NuxtImg src="/images/logo/logo.svg" alt="logo" />
                </NuxtLink>

                <div class="flex flex-col gap-y-2">
                  <NuxtLink
                    v-for="item in menuList"
                    :key="item.id"
                    :to="item.href"
                    class="flex items-center gap-x-4 p-4 rounded-2xl"
                    :class="
                      $route.path === item.href &&
                      'bg-zinc-50 dark:bg-black/20 text-main'
                    "
                    @click="handleMenuClose"
                  >
                    <IconSvg :icon-id="item.icon" class="w-6" />
                    {{ item.title }}
                  </NuxtLink>
                </div>
              </div>

              <div class="flex items-center gap-x-4 fixed bottom-6 right-3">
                <UserComponentsUserInfo />
                <button
                  class="flex items-center gap-x-2 text-red-500"
                  @click="signOut()"
                >
                  <p>خروج</p>
                  <UIcon name="i-solar-logout-2-line-duotone" size="22" />
                </button>
              </div>
            </MenuMobile>
          </div>
        </div>
      </header>

      <div class="p-3 sm:p-6 md:p-8 lg:p-10">
        <slot />
      </div>

      <ThemSwitcher />
      <MenuBottom />
    </div>
  </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}
.menu-enter-from {
  transform: translateX(20%);
  opacity: 0;
}
.menu-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.menu-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.menu-leave-to {
  transform: translateX(20%);
  opacity: 0;
}

.rounded-l-custom::before,
.rounded-l-custom::after {
  content: "";
  position: absolute;
  left: 0;
  width: 60px;
  height: 60px;
  background: transparent;
}

.rounded-l-custom::before {
  bottom: 60px;
  border-bottom-left-radius: 50%;
  box-shadow: 0 20px 0 0 #fafafa;
  z-index: -1;
}

.rounded-l-custom::after {
  top: 60px;
  border-top-left-radius: 50%;
  box-shadow: 0 -20px 0 0 #fafafa;
  z-index: -1;
}

.dark .rounded-l-custom::before {
  box-shadow: 0 20px 0 0 #18181b;
}

.dark .rounded-l-custom::after {
  box-shadow: 0 -20px 0 0 #18181b;
}
</style>
