import type { TUser } from "~/types";

const useUser = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/users`;
  const info = async () => {
    try {
      const { data } = await useAsyncData<{ user: TUser }>(
        "user-info",
        async () =>
          await $fetch(`${BASE_URL}/info`, {
            headers: {
              // Authorization: `Bearer ${await useAuths().getAccessToken()}`,
              Authorization: `Bearer ${await useAuths().data.value?.user
                .access_token}`,
            },
          })
      );

      return { userInfo: data.value?.user };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  const getAll = async () => {
    try {
      const { data, status, error, refresh } = await useLazyAsyncData<{
        users: TUser[];
      }>(
        "all-users",
        async () =>
          await $fetch(BASE_URL, {
            headers: {
              Authorization: `Bearer ${
                useAuths().data.value?.user.access_token
              }`,
            },
          })
      );

      return { status, data, error, refresh };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  const getById = async (id: number) => {
    try {
      const { status, data } = await useAsyncData<{
        user: TUser;
      }>(
        `user-${id}`,
        async () =>
          await $fetch(`${BASE_URL}/${id}`, {
            headers: {
              Authorization: `Bearer ${
                useAuths().data.value?.user.access_token
              }`,
            },
          })
      );

      return { status, user: data.value?.user };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  const update = async (dataUser: Partial<TUser>) => {
    try {
      const { data, error } = await useFetch(`${BASE_URL}/${dataUser.id}`, {
        method: "PUT",
        key: "update-user",
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
        body: dataUser,
      });

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
        key: "remove-user",
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

  return { info, getAll, getById, update, remove };
};

export default useUser;
