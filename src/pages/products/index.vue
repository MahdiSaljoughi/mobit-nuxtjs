<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { data, error } = useProduct().getAll();
</script>

<template>
  <Container>
    <div class="pt-6 pb-10">
      <div v-if="error" class="bg-red-500 text-white p-10 rounded-3xl">
        {{ error }}
      </div>

      <div v-else>
        <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="product in data?.products" :key="product.id">
            <ProductComponentsSingle :product="product" />
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
