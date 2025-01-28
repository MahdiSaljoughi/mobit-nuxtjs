export default defineNuxtRouteMiddleware(async (to) => {
  const session = await useAuths().getSession();

  if (to.path.startsWith("/dashboard")) {
    if (!session?.user) {
      return navigateTo("/auth");
    } else if (session?.user.role !== "ADMIN") {
      return navigateTo("/profile");
    }
    return;
  }
});
