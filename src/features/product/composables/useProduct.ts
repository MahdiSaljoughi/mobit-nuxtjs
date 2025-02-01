export const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;

  const getAll = () => {
    const { data, error } = useFetch<{ products: TProduct[] }>(BASE_URL, {
      key: "all-products",
      // transform: (response) => response.products,
      // watch: false,
    });
    return { data, error };
  };

  return { getAll };
};
