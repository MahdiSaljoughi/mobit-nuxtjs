const useAuths = () => {
  const getAccessToken = async () => {
    const headers = useRequestHeaders(["cookie"]) as HeadersInit;
    const { data } = await useLazyAsyncData<{ session_token: string }>(
      "access-token",
      () => $fetch(`${useRuntimeConfig().public.apiBase}/token`, { headers })
    );

    return data.value?.session_token;
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
