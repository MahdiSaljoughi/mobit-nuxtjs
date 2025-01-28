export default defineNuxtRouteMiddleware(async (to) => {
  const session = await useAuths().getSession();

  if (to.path.startsWith("/profile")) {
    if (!session?.user) {
      return navigateTo("/auth");
    }
    return;
  }

  if (to.path.startsWith("/auth")) {
    if (session?.user) {
      return navigateTo("/profile");
    }
    return;
  }
});
