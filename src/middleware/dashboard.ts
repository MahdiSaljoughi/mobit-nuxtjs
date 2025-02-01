export default defineNuxtRouteMiddleware(async (to) => {
  const session = await useAuths().getSession();
  const { user } = useUserInfo();

  if (to.path.startsWith("/dashboard")) {
    if (!session?.user) {
      return navigateTo("/auth");
    } else if (user?.role !== "ADMIN") {
      return navigateTo("/profile");
    }
    return;
  }
});
