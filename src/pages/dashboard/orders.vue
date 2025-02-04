<script setup lang="ts">
definePageMeta({
  middleware: ["dashboard"],
  layout: "dashboard",
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
      <div class="w-full h-72 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      <div class="w-full h-72 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
      <div class="w-full h-72 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
    </div>
    <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
      <div class="w-full h-72 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
      <div class="w-full h-72 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
    </div>
  </div>
</template>
