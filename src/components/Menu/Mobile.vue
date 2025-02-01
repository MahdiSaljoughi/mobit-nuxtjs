<script setup lang="ts">
defineProps<{ iconName: string; iconSize: string }>();

const isOpen = ref<boolean>(false);

const openMenu = () => {
  isOpen.value = true;
  document.body.classList.add("overflow-hidden");
};

const closeMenu = () => {
  isOpen.value = false;
  document.body.classList.remove("overflow-hidden");
};

const handleResize = () => {
  if (window.innerWidth >= 1024 && isOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

defineExpose({ closeMenu });
</script>

<template>
  <button class="flex items-center" @click="openMenu">
    <UIcon :name="iconName" class="text-main" :size="iconSize" />
  </button>

  <!-- Menu -->
  <transition name="menu">
    <div
      v-if="isOpen"
      class="block lg:hidden bg-white dark:bg-zinc-900 fixed right-0 inset-y-0 w-3/4 sm:w-1/2 z-50 shadow-md text-sx overflow-y-auto overflow-x-hidden"
    >
      <slot />
    </div>
  </transition>

  <!-- Overlay -->
  <transition name="overlay">
    <div
      v-if="isOpen"
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
