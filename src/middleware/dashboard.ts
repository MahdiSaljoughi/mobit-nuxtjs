export default defineNuxtRouteMiddleware(async (to) => {
  const session = await useAuths().getSession();
  const { userInfo } = await useUserInfo();

  if (to.path.startsWith("/dashboard")) {
    if (!session?.user) {
      return navigateTo("/auth");
    } else if (userInfo?.role !== "ADMIN") {
      return navigateTo("/profile");
    }
    return;
  }
});
