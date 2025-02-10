<script setup lang="ts">
defineProps<{
  title: string;
  href: string;
}>();
</script>

<template>
  <div>
    <div
      class="hidden lg:flex items-center justify-between bg-red-500/80 text-white px-3 h-16 rounded-xl"
    >
      <div class="flex items-center gap-x-4">
        <IconSvg icon-id="i-promotion-percent" class="w-8" />
        <p>{{ title }}</p>
      </div>

      <HomeOfferTimer />

      <NuxtLink :to="href" class="flex items-center gap-x-2 text-sm">
        <span>مشاهده همه</span>
        <UIcon
          name="i-solar-alt-arrow-right-line-duotone"
          size="16"
          class="rotate-180"
        />
      </NuxtLink>
    </div>

    <div class="block lg:hidden">
      <HomeOfferHeadersMobile :is-title="true" :title="title" :href="href" />
    </div>
  </div>
</template>
