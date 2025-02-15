import type { TProduct } from "~/types";

const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;
  const token = useAuths().accessToken;

  const getAll = () =>
    useAsyncData<TProduct[]>("all-products", () =>
      $fetch<TProduct[]>(BASE_URL)
    );

  const getBySlug = (slug: string) =>
    useAsyncData<TProduct>(`product-${slug}`, () =>
      $fetch<TProduct>(`${BASE_URL}/slug/${slug}`)
    );

  const update = (slug: string, dataProduct: Partial<TProduct>) => {
    if (!token) {
      return { data: null, error: new Error("دسترسی غیرمجاز") };
    }

    return useFetch(`${BASE_URL}/slug/${slug}`, {
      method: "PATCH",
      key: `update-product-${slug}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: dataProduct,
      onResponse({ response }) {
        if (!response.ok) {
          console.error("خطا در بروزرسانی محصول:", response);
        }
      },
    });
  };

  const remove = (id: number) => {
    if (!token) {
      return { data: null, error: new Error("دسترسی غیرمجاز") };
    }

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
