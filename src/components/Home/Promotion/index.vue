<script setup lang="ts">
defineProps<{
  title: string;
  href: string;
}>();

const { products } = await useProduct().getAll();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <HomePromotionHeaders :title="title" :href="href" />

    <SliderProduct :products="products" />
  </div>
</template>
