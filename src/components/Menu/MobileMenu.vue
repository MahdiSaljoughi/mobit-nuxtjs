<script setup lang="ts">
import { MegaMenuData } from "~/data/header/mega_menu";
import { MenuData } from "~/data/header/menu";

const isOpenMenu = ref<boolean>(false);
const isOpenCategory = ref<boolean>(true);
const activeIndex = ref<number | null>(null);

const openMenu = () => {
  isOpenMenu.value = true;
  document.body.classList.add("overflow-hidden");
};

const closeMenu = () => {
  isOpenMenu.value = false;
  document.body.classList.remove("overflow-hidden");
};

const handleResize = () => {
  if (window.innerWidth >= 1024 && isOpenMenu.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const toggleSubMenu = (index: number): void => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <button class="flex items-center" @click="openMenu">
    <UIcon
      name="i-heroicons-solid-dots-vertical"
      class="text-blue-500"
      size="20"
    />
  </button>

  <!-- Menu -->
  <transition name="menu">
    <div
      v-if="isOpenMenu"
      class="block lg:hidden bg-white dark:bg-zinc-900 fixed right-0 inset-y-0 w-3/4 sm:w-1/2 z-50 shadow-md text-[12.8px] overflow-y-auto"
    >
      <div class="pt-6 px-3 flex flex-col gap-y-8">
        <NuxtLink to="/" class="w-20 block mx-auto">
          <NuxtImg src="/images/logo/logo.svg" alt="logo" />
        </NuxtLink>

        <div class="flex flex-col gap-y-6">
          <NuxtLink
            v-for="(menu_item, index) in MenuData"
            :key="index"
            :to="menu_item.href"
            class="flex items-center gap-x-4"
          >
            <UIcon :name="menu_item.icon" size="24" />
            {{ menu_item.title }}
          </NuxtLink>

          <menu>
            <div
              class="flex items-center justify-between mb-4"
              @click="isOpenCategory = !isOpenCategory"
            >
              <div class="flex items-center gap-x-4">
                <UIcon
                  name="i-solar-widget-2-bold"
                  size="24"
                  class="opacity-70"
                />
                <span>دسته بندی ها</span>
              </div>
              <span
                class="transform transition-transform"
                :class="{ 'rotate-180': isOpenCategory === false }"
              >
                <UIcon
                  name="i-solar-alt-arrow-up-linear"
                  size="16"
                  class="opacity-70"
                />
              </span>
            </div>

            <ul v-show="isOpenCategory">
              <li
                v-for="(item, index) in MegaMenuData"
                :key="index"
                class="border-zinc-100 dark:border-zinc-800"
                :class="MegaMenuData.length - 1 !== index && 'border-b'"
              >
                <div
                  class="w-full flex justify-between items-center py-3"
                  @click="toggleSubMenu(index)"
                >
                  <div class="flex items-center gap-x-2">
                    <NuxtImg :src="item.image" :alt="item.title" class="w-8" />
                    <p class="text-zinc-600 dark:text-zinc-400">
                      {{ item.title }}
                    </p>
                  </div>
                  <span
                    class="transform transition-transform"
                    :class="{ 'rotate-180': activeIndex !== index }"
                  >
                    <UIcon
                      name="i-solar-alt-arrow-up-linear"
                      size="14"
                      class="opacity-70"
                    />
                  </span>
                </div>

                <ul class="flex flex-col gap-y-2 text-xs text-zinc-500">
                  <li
                    v-for="(child, idx) in item.child"
                    v-show="activeIndex === index"
                    :key="idx"
                  >
                    <NuxtLink
                      :to="child.link"
                      class="block"
                      :class="
                        child.border_r
                          ? 'border-r-4 border-blue-500 mb-2 pr-4 rounded-r-md'
                          : 'pb-2'
                      "
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </menu>
        </div>
      </div>
    </div>
  </transition>

  <!-- Overlay -->
  <transition name="overlay">
    <div
      v-if="isOpenMenu"
      class="block lg:hidden bg-black/10 fixed inset-0 z-40"
      @click="closeMenu"
    />
  </transition>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.menu-enter-from {
  transform: translateX(100%);
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
  transform: translateX(100%);
  opacity: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease;
}
.overlay-enter-from {
  opacity: 0;
}
.overlay-enter-to {
  opacity: 1;
}
.overlay-leave-from {
  opacity: 1;
}
.overlay-leave-to {
  opacity: 0;
}
</style>
