<script setup lang="ts">
definePageMeta({
  middleware: ["dashboard"],
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <template #main>
      <div>Dashboard</div>
    </template>
  </NuxtLayout>
</template>
