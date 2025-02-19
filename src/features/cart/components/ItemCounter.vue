<script setup lang="ts">
import { useCartStore } from "@/stores/cartStore";

const props = defineProps<{
  id: number;
  title: string;
  price: number;
  slug: string;
  image: string;
  variant: TProductVariant;
}>();

const cartStore = useCartStore();

const itemInCart = computed(() =>
  cartStore.items.find((item) => item.variant.id === props.variant.id)
);
const itemQuantity = computed(() => itemInCart.value?.quantity ?? 0);

const addToCart = () => {
  if (itemQuantity.value >= props.variant.quantity) {
    useToast().add({
      title: "سقف خرید این کالا تکمیل می باشد.",
      color: "red",
    });
    return;
  }

  const newItem = {
    id: props.id,
    title: props.title,
    price: props.price,
    quantity: 1,
    slug: props.slug,
    image: props.image,
    variant: props.variant,
  };

  cartStore.addToCart(newItem);

  if (itemQuantity.value === 1)
    useToast().add({
      title: "کالا به سبد خرید اضافه شد.",
    });
};

const removeFromCart = () => {
  if (itemQuantity.value > 0) {
    cartStore.removeFromCart(props.variant.id);
  }
};
</script>

<template>
  <div>
    <div
      v-if="itemQuantity > 0"
      class="flex items-center justify-between gap-x-6 xl:gap-x-8 px-3 py-2.5 rounded-xl border-2 dark:border-zinc-700"
    >
      <button class="text-blue-500" @click="addToCart">
        <IconSvg icon-id="i-plus" class="size-5" />
      </button>

      <span class="text-sx">{{ itemQuantity }}</span>

      <button class="text-red-500" @click="removeFromCart">
        <IconSvg v-if="itemQuantity > 1" icon-id="i-minus" class="size-5" />
        <IconSvg v-else icon-id="i-remove" class="size-5" />
      </button>
    </div>

    <button
      v-else
      class="rounded-xl bg-main hover:bg-blue-600 transition-all text-white px-4 py-3 text-sm lg:w-full"
      @click="addToCart"
    >
      افزودن به سبد خرید
    </button>
  </div>
</template>
