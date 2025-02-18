const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;
  const token = useAuths().accessToken;

  const getAll = () =>
    useFetch<TProduct[]>(BASE_URL, {
      key: "all-products",
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });

  const getBySlug = (slug: string) =>
    useFetch<TProduct>(`${BASE_URL}/slug/${slug}`, {
      key: `product-${slug}`,
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });

  const update = (slug: string, dataProduct: Partial<TProduct>) => {
    return useFetch<TProduct>(`${BASE_URL}/slug/${slug}`, {
      method: "PATCH",
      key: `update-product-${slug}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: dataProduct,
    });
  };

  const remove = (id: number) => {
    return useFetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      key: `remove-product-${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponse({ response }) {
        if (!response.ok) {
          console.error("خطا در حذف محصول:", response);
        }
      },
    });
  };

  return { getAll, getBySlug, update, remove };
};

export default useProduct;
