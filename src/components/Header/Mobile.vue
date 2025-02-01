<script setup lang="ts">
import { megaMenuData } from "~/data/header/megaMenu";
import { menuData } from "~/data/header/menu";

const menuRef = ref();
const isOpenCategory = ref<boolean>(true);
const activeIndex = ref<number | null>(null);

const toggleSubMenu = (index: number): void => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const handleMenuClose = () => {
  if (menuRef.value) {
    menuRef.value.closeMenu();
  }
};
</script>

<template>
  <header
    class="block lg:hidden p-4 sticky top-0 z-30 border-b dark:border-none bg-white dark:bg-zinc-900 text-sx"
  >
    <div class="w-full flex items-center gap-x-2">
      <div>
        <NuxtLink to="/" class="w-10 block">
          <NuxtImg src="/images/logo/mobit-logo.svg" alt="logo" />
        </NuxtLink>
      </div>

      <div
        class="flex items-center w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl pr-4"
      >
        <UIcon name="i-solar-magnifer-linear" class="opacity-50" size="20" />
        <input
          type="text"
          placeholder="جستجو در مبیت"
          class="outline-none p-3 h-12 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800"
        />
      </div>

      <MenuMobile
        ref="menuRef"
        icon-name="i-heroicons-solid-dots-vertical"
        icon-size="20"
        @close-menu="handleMenuClose"
      >
        <div class="pt-6 px-3 flex flex-col gap-y-8">
          <NuxtLink to="/" class="w-20 block mx-auto" @click="handleMenuClose">
            <NuxtImg src="/images/logo/logo.svg" alt="logo" />
          </NuxtLink>

          <div class="flex flex-col gap-y-6">
            <NuxtLink
              v-for="(menu_item, index) in menuData"
              :key="index"
              :to="menu_item.href"
              class="flex items-center gap-x-4"
              @click="handleMenuClose"
            >
              <IconSvg :icon-id="menu_item.icon" class="w-7" />
              {{ menu_item.title }}
            </NuxtLink>

            <menu>
              <button
                class="flex items-center justify-between mb-4 w-full"
                @click="isOpenCategory = !isOpenCategory"
              >
                <div class="flex items-center gap-x-4">
                  <IconSvg icon-id="i-categoryfill" class="w-7" />
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
              </button>

              <ul v-show="isOpenCategory">
                <li
                  v-for="(item, index) in megaMenuData"
                  :key="index"
                  class="border-zinc-100 dark:border-zinc-800"
                  :class="megaMenuData.length - 1 !== index && 'border-b'"
                >
                  <button
                    class="w-full flex justify-between items-center py-3"
                    @click="toggleSubMenu(index)"
                  >
                    <div class="flex items-center gap-x-2">
                      <NuxtImg
                        :src="item.image"
                        :alt="item.title"
                        class="w-8"
                      />
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
                  </button>

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
                        @click="handleMenuClose"
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
      </MenuMobile>
    </div>
  </header>
</template>
