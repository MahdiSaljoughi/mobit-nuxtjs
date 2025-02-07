<script setup lang="ts">
defineProps<{
  title: string;
  href: string;
}>();

const { data } = await useProduct().getAll();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <HomeOfferHeaders :title="title" :href="href" />

    <SliderProduct :products="data?.products" />
  </div>
</template>
