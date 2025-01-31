<script setup lang="ts">
import { menuList } from "@/data/dashboard/menuList";

const fullScreen = ref<boolean>(false);
const isShowMenu = ref<boolean>(true);
</script>

<template>
  <div>
    <!-- Desktop -->
    <div
      class="h-screen hidden xl:flex"
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
            <div class="flex flex-col gap-y-2 -mr-4">
              <NuxtLink
                v-for="item in menuList"
                :key="item.id"
                :to="item.href"
                class="flex items-center gap-x-3 p-5 rounded-r-2xl hover:text-main"
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
                <UIcon
                  name="i-heroicons-solid-dots-vertical"
                  class="text-main"
                  size="22"
                />
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

            <UserComponentsUserInfo />
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
    <div class="block xl:hidden bg-red-500 p-10">
      <slot />
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
