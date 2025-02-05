<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const cartStore = useCartStore();

cartStore.loadCart();
</script>

<template>
  <Head>
    <Title>فروشگاه اینترنتی مبیت</Title>
  </Head>

  <NuxtRouteAnnouncer />

  <NuxtLoadingIndicator color="blue" />

  <UNotifications />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
