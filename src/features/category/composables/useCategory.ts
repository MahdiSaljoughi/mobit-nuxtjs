const useCategory = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/categories`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const create = (body: any) =>
    useFetch(BASE_URL, {
      method: "POST",
      key: "create-category",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: body,
    });

  const getAll = () =>
    useAsyncData<TCategory[]>("all-category", () => $fetch(BASE_URL));

  const getById = (id: number) =>
    useAsyncData<TCategory>(`category-${id}`, () =>
      $fetch(`${BASE_URL}/${id}`)
    );

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
