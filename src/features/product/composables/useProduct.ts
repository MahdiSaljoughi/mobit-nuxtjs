import type { TProduct } from "~/types";

const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;

  const getAll = async () => {
    const { status, data, error } = await useFetch<{ products: TProduct[] }>(
      BASE_URL,
      {
        key: "all-products",
      }
    );
    return { status, products: data.value?.products, error };
  };

  const getBySlug = async (slug: string) => {
    const { status, data, error } = await useFetch<{ product: TProduct }>(
      `${BASE_URL}/${slug}`,
      {
        key: `product-${slug}`,
      }
    );
    return { status, product: data.value?.product, error };
  };

  return { getAll, getBySlug };
};

export default useProduct;
