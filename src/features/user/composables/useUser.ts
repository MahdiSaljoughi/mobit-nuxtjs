const useUser = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/users`;

  const info = async () => {
    const { data, refresh } = await useAsyncData<TUser>("user-info", () =>
      $fetch(`${BASE_URL}/info`, {
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
      })
    );

    return { userInfo: data.value, refresh };
  };

  const updateInfo = (dataUser: Partial<TUser>) => {
    return useFetch(`${BASE_URL}/info`, {
      method: "PATCH",
      key: "update-user-info",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
      body: dataUser,
    });
  };

  const getAll = () =>
    useFetch<TUser[]>(BASE_URL, {
      key: "all-users",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });

  const getById = (id: number) => {
    const { status, data } = useFetch<TUser>(`${BASE_URL}/${id}`, {
      key: `user-${id}`,
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key];
      },
    });
    return { status, user: data.value };
  };

  const update = (dataUser: Partial<TUser>) => {
    return useFetch(`${BASE_URL}/${dataUser.id}`, {
      method: "PATCH",
      key: "update-user",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
      body: dataUser,
    });
  };

  const remove = (id: number) => {
    const { data, error } = useFetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      key: "remove-user",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
    });

    return { data: data.value, error };
  };

  return { info, getAll, getById, updateInfo, update, remove };
};

export default useUser;
