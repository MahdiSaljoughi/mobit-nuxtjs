import type { TUser } from "~/types";

const useUsers = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/users`;

  const getAll = async () => {
    try {
      const { status, data, error } = await useLazyFetch<{ users: TUser[] }>(
        BASE_URL,
        {
          key: "users",
          headers: {
            Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
          },
        }
      );

      return { status, users: data.value?.users, error };
    } catch (error: unknown | Error) {
      return {
        status_code: 500,
        message: error instanceof Error ? error.message : "خطای ناشناخته",
      };
    }
  };

  return { getAll };
};

export default useUsers;
