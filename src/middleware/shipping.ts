export default defineNuxtRouteMiddleware(async (to) => {
  const session = await useAuths().getSession();

  if (to.path.startsWith("/shipping")) {
    if (!session?.user) {
      return navigateTo("/auth");
    }
    return;
  }
});
