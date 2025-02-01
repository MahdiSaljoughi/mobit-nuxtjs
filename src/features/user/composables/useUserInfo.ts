const useUserInfo = () => {
  const BASE_URL = `${useRuntimeConfig().public.apiBase}/users/info`;

  const { status } = useAuths();

  if (status.value === "loading") {
    return {
      status_code: 200,
      statuss: "loading",
      user: null,
    };
  } else if (status.value === "unauthenticated") {
    return {
      status_code: 401,
      statuss: "unauthenticated",
      user: null,
    };
  }

  try {
    const { data, error } = useFetch<{
      user: TUser;
      status_code: number;
    }>(BASE_URL, {
      key: "user-info",
      // watch: [status],
      headers: {
        Authorization: `Bearer ${useAuths().data?.value?.user.access_token}`,
      },
    });

    if (error.value) {
      return {
        status_code: 404,
        statuss: "not_found",
        user: null,
      };
    }

    const user = data.value?.user;

    return { user, error };
  } catch (error) {
    return {
      status_code: 500,
      message: error.message,
    };
  }
};

export default useUserInfo;
