<script setup lang="ts">
const { getAll } = useProduct();
const { data, error, refresh } = await getAll();
</script>

<template>
  <Container>
    <div class="py-10">
      <p class="text-xl">همه محصولات</p>
      <div v-if="error" class="bg-red-500 text-white p-10 rounded-3xl">
        {{ error }}
      </div>
      <div v-else>
        <button @click="refresh()">رفرش</button>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div v-for="product in data!.products" :key="product.id">
            <ProductComponentsSingle :product="product" />
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
