<script setup lang="ts">
const route = useRoute();

const slug = route.params.slug;

const { data, status } = useProduct().getBySlug(String(slug));
</script>

<template>
  <div>
    {{ status }}
    {{ data?.product }}
  </div>
</template>
