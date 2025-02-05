import type { TUser } from "~/types";

const useUser = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/users`;

  const info = async () => {
    try {
      const { data, error, status } = await useFetch<{
        status_code: number;
        user: TUser;
      }>(`${BASE_URL}/info`, {
        key: "info-user",
        headers: {
          Authorization: `Bearer ${
            useAuths().data.value?.user.access_token &&
            useAuths().data.value?.user.access_token
          }`,
        },
      });

      return { userInfo: data.value?.user, error, status };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  const getAll = async () => {
    try {
      const { status, data, error, refresh } = await useFetch<{
        users: TUser[];
      }>(BASE_URL, {
        key: "all-users",
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
      });

      return { status, users: data.value?.users, error, refresh };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  const getById = (id: number) => {
    try {
      const { status, data, error } = useFetch<{
        user: TUser;
      }>(`${BASE_URL}/${id}`, {
        key: "user-by-id",
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
      });

      return { status, user: data.value?.user, error };
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

  return { info, getAll, getById, remove };
};

export default useUser;
