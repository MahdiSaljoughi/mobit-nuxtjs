<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

cartStore.loadCart();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="blue" />
</template>
