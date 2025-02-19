const useOrder = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/orders`;

  const create = (body: Partial<TOrder>) =>
    useFetch<TOrder>(BASE_URL, {
      method: "POST",
      key: "create-order",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: body,
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createProduct = (body: any[]) =>
    useFetch(`${BASE_URL}/products`, {
      method: "POST",
      key: "create-order",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: body,
    });

  const getAll = () =>
    useFetch<TOrder[]>(BASE_URL, {
      key: "all-order",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      lazy: true,
      cache: "default",
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });

  const getById = (id: number) =>
    useFetch<TOrder>(`${BASE_URL}/${id}`, {
      key: `order-${id}`,
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });

  const updateOrderUser = (data: Partial<TOrder>, id: number) =>
    useFetch(`${BASE_URL}/user/${id}`, {
      method: "PATCH",
      key: "update-order",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: data,
    });

  const update = (data: Partial<TOrder>, id: number) =>
    useFetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      key: "update-order",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: data,
    });

  const remove = (id: number) =>
    useFetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      key: "remove-order",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
    });

  return {
    create,
    createProduct,
    getAll,
    getById,
    updateOrderUser,
    update,
    remove,
  };
};

export default useOrder;
