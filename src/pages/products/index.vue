<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { data, error } = await useProduct().getAll();

const links = [
  {
    label: "",
    icon: "i-solar-home-smile-linear",
    to: "/",
  },
  {
    label: "کالای دیجیتال",
    to: "/products",
  },
];
</script>

<template>
  <Container>
    <div class="pt-6 pb-10">
      <div class="flex items-center gap-x-4 mb-4 lg:mb-6">
        <p class="text-xs text-zinc-600 dark:text-zinc-300">
          شما اینجا هستید :
        </p>
        <UBreadcrumb
          :links="links"
          :ui="{
            base: 'text-xs',
          }"
        />
      </div>

      <div v-if="error" class="bg-red-500 text-white p-10 rounded-3xl">
        {{ error }}
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-6">
        <div>
          <!-- Desktop -->
          <div class="hidden lg:block w-64 sticky top-24">
            <div
              class="flex flex-col gap-y-4 bg-zinc-100 dark:bg-zinc-800 text-sx p-3 rounded-xl"
            >
              <div class="border-b-2 dark:border-zinc-700 pb-4">
                <p>فقط کالا های موجود</p>
              </div>
              <div><p>محدوده قیمت (تومان)</p></div>
            </div>
          </div>

          <!-- Mobile -->
          <div class="block lg:hidden">
            <button
              class="flex items-center gap-x-4 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-xl"
            >
              <UIcon name="i-solar-filter-linear" />
              <span class="text-sx">فیلتر ها</span>
            </button>
          </div>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          <div v-for="product in data" :key="product.id">
            <ProductComponentsSingle :product="product" />
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
