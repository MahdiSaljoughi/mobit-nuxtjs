const useAuths = () => {
  const getAccessToken = async () => {
    try {
      const headers = useRequestHeaders(["cookie"]) as HeadersInit;
      const { data } = await useAsyncData<{ session_token: string }>(
        "access-token",
        () => $fetch(`${useRuntimeConfig().public.apiBase}/token`, { headers })
      );

      return data.value?.session_token;
    } catch (err) {
      return {
        status: 500,
        message: err instanceof Error ? err.message : "خطای ناشناخته",
      };
    }
  };

  const {
    status,
    data,
    lastRefreshedAt,
    getCsrfToken,
    getProviders,
    getSession,
    refresh,
    signIn,
    signOut,
  } = useAuth();

  return {
    getAccessToken,
    status,
    data,
    lastRefreshedAt,
    getCsrfToken,
    getProviders,
    getSession,
    refresh,
    signIn,
    signOut,
  };
};

export default useAuths;
