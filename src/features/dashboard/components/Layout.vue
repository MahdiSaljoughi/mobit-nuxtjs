<script setup lang="ts">
import { menuList } from "@/data/dashboard/menuList";

const fullScreen = ref<boolean>(false);
const isShowMenu = ref<boolean>(true);

const handleFullScreen = () => {
  fullScreen.value = !fullScreen.value;
};
</script>

<template>
  <div
    :class="`h-screen hidden lg:flex items-center justify-center ${
      fullScreen === false && 'lg:px-8 xl:px-16 2xl:px-24'
    }`"
  >
    <div
      :class="`w-full ${
        fullScreen === true && 'h-screen'
      } flex gap-x-8 p-8 rounded-3xl bg-zinc-50 dark:bg-black/20`"
    >
      <div v-if="isShowMenu" className="min-w-52 flex flex-col gap-y-8">
        <NuxtLink to="/" class="flex items-center gap-x-2 mt-2">
          <LogoDarkAndLight width="{12}" />
          <div className="text-xl">مبیت</div>
        </NuxtLink>
        <div className="flex flex-col gap-y-4 -mr-4">
          <NuxtLink
            v-for="item in menuList"
            :key="item.id"
            :to="item.href"
            class="flex items-center gap-x-3 hover:scale-105 transition-transform p-4 rounded-2xl"
          >
            <span>{{ item.title }}</span>
          </NuxtLink>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <button isIconOnly @click="isShowMenu = !isShowMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M20 7H4m16 5H4m16 5H4"
                />
              </svg>
            </button>
            <button isIconOnly @click="handleFullScreen">
              <svg
                v-show="fullScreen"
                xmlns="http://www.w3.org/2000/svg"
                width="1.4rem"
                height="1.4rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M14 1.25a.75.75 0 0 1 .75.75c0 1.907.002 3.261.14 4.29c.135 1.005.389 1.585.812 2.008s1.003.677 2.009.812c1.027.138 2.382.14 4.289.14a.75.75 0 0 1 0 1.5h-.056c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V2a.75.75 0 0 1 .75-.75m-4 0a.75.75 0 0 1 .75.75v.056c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H2a.75.75 0 0 1 0-1.5c1.907 0 3.261-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812s.677-1.003.812-2.009c.138-1.028.14-2.382.14-4.289a.75.75 0 0 1 .75-.75M1.25 14a.75.75 0 0 1 .75-.75h.056c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433V22a.75.75 0 0 1-1.5 0c0-1.907-.002-3.262-.14-4.29c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.028-.138-2.382-.14-4.289-.14a.75.75 0 0 1-.75-.75m20.694-.75H22a.75.75 0 0 1 0 1.5c-1.907 0-3.262.002-4.29.14c-1.005.135-1.585.389-2.008.812s-.677 1.003-.812 2.009c-.138 1.027-.14 2.382-.14 4.289a.75.75 0 0 1-1.5 0v-.056c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                v-show="fullScreen === false"
                xmlns="http://www.w3.org/2000/svg"
                width="1.8em"
                height="1.8em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 6a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v2a1 1 0 0 0 2 0zm0 12a1 1 0 0 0 1 1h2a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3v-2a1 1 0 1 1 2 0zM18 5a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0V6a3 3 0 0 0-3-3h-2a1 1 0 1 0 0 2zm1 13a1 1 0 0 1-1 1h-2a1 1 0 1 0 0 2h2a3 3 0 0 0 3-3v-2a1 1 0 1 0-2 0z"
                />
              </svg>
            </button>
            <ThemSwitcher />
          </div>
          <!-- <DesktopAvatar shopId={shopid} /> -->
        </div>
        <div
          className="h-[700px] overflow-y-auto overflow-x-hidden bg-zinc-100 dark:bg-black/20 p-4 rounded-2xl scrollbar-custom"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
