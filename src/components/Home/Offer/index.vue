<script setup lang="ts">
defineProps<{
  title: string;
  href: string;
}>();

const { data, error, status } = useProduct().getAll();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <HomeOfferHeaders :title="title" :href="href" />

    <UAlert
      v-if="error"
      variant="soft"
      color="red"
      :title="error.statusCode.toString()"
      :description="error.message"
    />

    <div
      v-else-if="status === 'pending'"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
    >
      <SkeletonsProductSingleHome />
      <SkeletonsProductSingleHome class="hidden sm:flex" />
      <SkeletonsProductSingleHome class="hidden md:flex" />
      <SkeletonsProductSingleHome class="hidden lg:flex" />
    </div>

    <SliderProduct v-else :products="data!" />
  </div>
</template>
