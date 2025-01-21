export const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;

  const getAll = async () => {
    try {
      const { data, error, refresh } = await useFetch<{ products: TProduct[] }>(
        BASE_URL
      );
      return { data, error, refresh };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  return { getAll };
};
