<script setup lang="ts">
definePageMeta({
  middleware: ["dashboard"],
  layout: "dashboard",
});
</script>

<template>
  <div>
    <DashboardComponentsTablesUsers />
  </div>
</template>
