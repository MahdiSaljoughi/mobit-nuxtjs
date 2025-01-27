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

  return {
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
