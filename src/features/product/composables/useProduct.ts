import type { TProduct } from "~/types";

const useProduct = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/products`;

  const getAll = () =>
    useAsyncData<{ products: TProduct[] }>("all-products", () =>
      $fetch<{ products: TProduct[] }>(BASE_URL)
    );

  const getBySlug = (slug: string) => {
    return useAsyncData<{ product: TProduct }>(`product-${slug}`, () =>
      $fetch<{ product: TProduct }>(`${BASE_URL}/${slug}`)
    );
  };

  const update = (slug: string, dataProduct: Partial<TProduct>) => {
    const token = useAuths().data.value?.user.access_token;
    if (!token) {
      return { data: null, error: new Error("دسترسی غیرمجاز") };
    }

    return useFetch(`${BASE_URL}/${slug}`, {
      method: "PUT",
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
    const token = useAuths().data.value?.user.access_token;
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
