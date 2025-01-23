<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
      color="gray"
      variant="link"
      aria-label="Theme"
      class="fixed top-12 left-2.5 lg:top-5 lg:left-5 z-50"
      @click="isDark = !isDark"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>
