import type { TProduct } from "~/types";

const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;

  const getAll = async () => {
    try {
      const { status, data, error, refresh } = await useAsyncData<{
        products: TProduct[];
      }>("all-products", async () => await $fetch(BASE_URL));
      return { status, data, error, refresh };
    } catch (err) {
      return {
        status: 500,
        message: err instanceof Error ? err.message : "خطای ناشناخته",
      };
    }
  };

  const getBySlug = async (slug: string) => {
    try {
      const { status, data, error } = await useAsyncData<{
        product: TProduct;
      }>(`product-${slug}`, async () => await $fetch(`${BASE_URL}/${slug}`));
      return { status, product: data.value?.product, error };
    } catch (err) {
      return {
        status: 500,
        message: err instanceof Error ? err.message : "خطای ناشناخته",
      };
    }
  };

  return { getAll, getBySlug };
};

export default useProduct;
