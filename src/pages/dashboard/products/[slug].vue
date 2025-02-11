<script setup lang="ts">
const route = useRoute();

const slug = route.params.slug;

const { product, status } = await useProduct().getBySlug(String(slug));
</script>

<template>
  <div>
    {{ status }}
    {{ product }}
  </div>
</template>
