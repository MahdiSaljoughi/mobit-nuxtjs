const useAuths = () => {
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

  const accessToken = data.value?.user.access_token;

  return {
    accessToken,
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
