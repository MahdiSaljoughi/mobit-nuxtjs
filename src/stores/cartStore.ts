import { defineStore } from "pinia";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  slug: string;
  image: string;
  variant: TProductVariant;
};

type CartState = {
  items: CartItem[];
};

export const useCartStore = defineStore("cart", {
  state: (): CartState => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return {
        items: savedCart ? JSON.parse(savedCart) : [],
      };
    }
    return { items: [] };
  },
  actions: {
    addToCart(item: CartItem) {
      const itemIndex = this.items.findIndex(
        (i) => i.variant.id === item.variant.id
      );
      if (itemIndex >= 0) {
        this.items[itemIndex].quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      this.saveCart();
    },
    removeFromCart(variantId: number) {
      const itemIndex = this.items.findIndex(
        (item) => item.variant.id === variantId
      );
      if (itemIndex >= 0) {
        if (this.items[itemIndex].quantity === 1) {
          this.items.splice(itemIndex, 1);
        } else {
          this.items[itemIndex].quantity--;
        }
        this.saveCart();
      }
    },
    clearCart() {
      this.items = [];
      localStorage.removeItem("cart");
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    loadCart() {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          this.items = JSON.parse(savedCart);
        }
      }
    },
  },
  getters: {
    cartItemCount: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
});
