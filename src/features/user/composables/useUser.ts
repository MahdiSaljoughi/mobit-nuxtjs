import type { TUser } from "~/types";

const useUser = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/users`;

  const info = async () => {
    const { data } = await useAsyncData<{ user: TUser }>("user-info", () =>
      $fetch(`${BASE_URL}/info`, {
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
      })
    );

    return { userInfo: data.value?.user };
  };

  const getAll = () => {
    const { data, status, error, refresh } = useLazyAsyncData<{
      users: TUser[];
    }>("all-users", () =>
      $fetch(BASE_URL, {
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
      })
    );

    return { status, data, error, refresh };
  };

  const getById = (id: number) => {
    const { status, data } = useLazyAsyncData<{
      user: TUser;
    }>(`user-${id}`, () =>
      $fetch(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
      })
    );

    return { status, user: data.value?.user };
  };

  const update = (dataUser: Partial<TUser>) => {
    return useFetch(`${BASE_URL}/${dataUser.id}`, {
      method: "PUT",
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

  return { info, getAll, getById, update, remove };
};

export default useUser;
