<script setup lang="ts">
defineProps<{
  isTitle: boolean;
  title?: string;
  href: string;
}>();
</script>

<template>
  <NuxtLink
    :to="href"
    class="flex items-center justify-between bg-red-500/80 text-white px-2 h-12 rounded-xl"
  >
    <div class="flex items-center gap-x-2">
      <IconSvg v-if="isTitle" icon-id="i-promotion-percent" class="w-6" />
      <p v-if="isTitle" class="text-xs">{{ title }}</p>
    </div>

    <HomeOfferTimerMobile />
  </NuxtLink>
</template>
