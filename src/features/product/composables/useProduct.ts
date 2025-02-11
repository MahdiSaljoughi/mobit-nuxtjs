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

  const update = async (slug: string, dataProduct: Partial<TProduct>) => {
    try {
      const { data, error } = await useFetch(`${BASE_URL}/${slug}`, {
        method: "PUT",
        key: "update-product",
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
        body: dataProduct,
      });
      console.log(dataProduct);
      return { data, error };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  const remove = async (id: number) => {
    try {
      const { data, error } = await useFetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        key: "remove-product",
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
      });

      return { data: data.value, error };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  return { getAll, getBySlug, update, remove };
};

export default useProduct;
