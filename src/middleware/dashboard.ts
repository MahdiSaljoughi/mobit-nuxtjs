export default defineNuxtRouteMiddleware(async () => {
  const session = await useAuths().getSession();

  const { userInfo } = await useUser().info();

  if (!session?.user) {
    return navigateTo("/auth");
  } else if (userInfo?.role !== "ADMIN") {
    return navigateTo("/profile");
  }
});
