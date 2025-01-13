<script setup lang="ts">
import { MenuData } from "~/data/header/menu";
import { MegaMenuData } from "~/data/header/mega_menu";

const showMenu = ref<boolean>(false);
const activeSubMenuIndex = ref<number>(0);
</script>

<template>
  <div class="flex items-center gap-x-4 xl:gap-x-10">
    <div
      class="relative cursor-pointer transition-colors z-40"
      @mouseenter="showMenu = true"
      @mouseleave="showMenu = false"
    >
      <div
        :class="`menu-item flex items-center gap-x-2 xl:gap-x-4 ${
          showMenu && 'text-blue-500'
        }`"
      >
        <UIcon name="i-solar-widget-2-bold" class="size-5" />
        <span>دسته بندی ها</span>
      </div>
      <div
        v-if="showMenu"
        class="absolute top-16 right-0 w-60 bg-white dark:bg-zinc-900 shadow-xl rounded-br-xl py-2"
      >
        <div
          v-for="(item, index) in MegaMenuData"
          :key="index"
          :class="`flex items-center gap-x-2 px-3 py-1.5 cursor-pointer transition-all border-y-2 border-white/0 ${
            activeSubMenuIndex === index &&
            'border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800'
          }`"
          @mouseenter="activeSubMenuIndex = index"
          @mouseleave="activeSubMenuIndex = 0"
        >
          <NuxtImg :src="item.image" :alt="item.title" class="w-10" />
          <p :class="activeSubMenuIndex === index && 'text-blue-500'">
            {{ item.title }}
          </p>
          <div
            v-show="activeSubMenuIndex === index"
            :class="`flex flex-col flex-wrap gap-x-8 gap-y-2.5 pr-2 ${
              activeSubMenuIndex === 0 || activeSubMenuIndex === 1
                ? 'w-[500px]'
                : activeSubMenuIndex === 2
                ? 'w-[700px]'
                : 'w-60'
            } h-full absolute top-0 right-full bg-white dark:bg-zinc-900 shadow-xl pb-2 rounded-bl-xl`"
          >
            <NuxtLink
              v-for="(child, idx) in item.child"
              :key="idx"
              to="/"
              :class="`text-zinc-500 dark:text-zinc-300 hover:text-blue-500 dark:hover:text-blue-500 py-1 ${
                child.border_r
                  ? 'border-r-4 border-blue-500 rounded-r-[4px] pr-2 text-[12.8px]'
                  : 'text-xs'
              } transition-colors`"
            >
              {{ child.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <NuxtLink
      v-for="(menu_item, index) in MenuData"
      :key="index"
      :to="menu_item.href"
      class="menu-item relative hover:text-blue-500 transition-colors flex items-center gap-x-2 xl:gap-x-4"
    >
      <UIcon :name="menu_item.icon" class="size-5" />
      {{ menu_item.title }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.menu-item {
  padding-bottom: 24px;
  padding-top: 24px;
}

.menu-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0%;
  height: 3px;
  background-color: #377dff;
  transition: width 0.3s ease-out;
  border-radius: 40px;
  z-index: 50;
}

.menu-item:hover::after {
  width: 100%;
}
</style>
