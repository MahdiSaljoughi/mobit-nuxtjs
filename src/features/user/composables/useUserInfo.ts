import type { TUser } from "~/types";

const useUserInfo = async () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/users/info`;

  try {
    const { data, error } = await useFetch<{
      status_code: number;
      user: TUser;
    }>(BASE_URL, {
      key: "user-info",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
    });

    return { userInfo: data.value?.user, error };
  } catch (error: unknown | Error) {
    return {
      status_code: 500,
      message: error instanceof Error ? error.message : "خطای ناشناخته",
    };
  }
};

export default useUserInfo;
