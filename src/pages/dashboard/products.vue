<script setup lang="ts">
definePageMeta({
  middleware: ["dashboard"],
  layout: "dashboard",
});
</script>

<template>
  <div>
    <DashboardComponentsTablesProduct />
  </div>
</template>
