import type { TProduct } from "~/types";

const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;

  const getAll = async () => {
    const { status, data, error } = await useFetch<{
      products: TProduct[];
    }>(BASE_URL, {
      key: "all-products",
    });
    return { status, products: data.value?.products, error };
  };

  return { getAll };
};

export default useProduct;
