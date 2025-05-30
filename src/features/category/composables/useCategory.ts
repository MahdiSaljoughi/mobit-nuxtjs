const useCategory = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/categories`;

  const create = (body: Partial<TCategory>) =>
    useFetch(BASE_URL, {
      method: "POST",
      key: "create-category",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: body,
    });

  const getAll = () =>
    useFetch<TCategory[]>(BASE_URL, {
      key: "all-category",
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });

  const getById = (id: number) =>
    useFetch<TCategory>(`${BASE_URL}/${id}`, {
      key: `category-${id}`,
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });

  const update = (dataCategory: Partial<TCategory>) =>
    useFetch(`${BASE_URL}/${dataCategory.id}`, {
      method: "PATCH",
      key: "update-category",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: dataCategory,
    });

  const remove = (id: number) =>
    useFetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      key: "remove-category",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
    });

  return { create, getAll, getById, update, remove };
};

export default useCategory;
