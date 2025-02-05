<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";
import { computed } from "vue";

const props = defineProps<{
  id: number;
  title: string;
  price: number;
  slug: string;
  image: string;
}>();

const cartStore = useCartStore();

const itemInCart = computed(() =>
  cartStore.items.find((item) => item.id === props.id)
);
const itemQuantity = computed(() => itemInCart.value?.quantity ?? 0);

const addToCart = () => {
  const newItem = {
    id: props.id,
    title: props.title,
    price: props.price,
    quantity: 1,
    slug: props.slug,
    image: props.image,
  };
  cartStore.addToCart(newItem);

  if (itemQuantity.value === 1) navigateTo("/cart");
};

const removeFromCart = () => {
  if (itemQuantity.value > 0) {
    cartStore.removeFromCart(props.id);
  }
};
</script>

<template>
  <div>
    <div
      v-if="itemQuantity > 0"
      class="flex items-center justify-between px-4 py-2 rounded-xl border-2 dark:border-zinc-800 min-w-40"
    >
      <button class="text-blue-500" @click="addToCart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v14m-7-7h14"
          />
        </svg>
      </button>

      <span>{{ itemQuantity }}</span>

      <button class="text-red-500" @click="removeFromCart">
        <svg
          v-if="itemQuantity > 1"
          xmlns="http://www.w3.org/2000/svg"
          width="1.2em"
          height="1.5em"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="1.4em"
          height="1.4em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
          />
        </svg>
      </button>
    </div>

    <button
      v-else
      class="rounded-xl bg-blue-500 hover:bg-blue-600 transition-all hover:ring-4 ring-blue-500/50 text-white px-4 py-2.5 text-sm md:w-full"
      @click="addToCart"
    >
      افزودن به سبد خرید
    </button>
  </div>
</template>
