import { useCartStore } from "~/stores/cartStore";

export default defineNuxtRouteMiddleware(async () => {
  const session = await useAuths().getSession();

  const { items } = useCartStore();

  if (!session?.user) {
    return navigateTo("/auth");
  }

  if (items.length === 0) {
    return navigateTo("/cart");
  }
});
