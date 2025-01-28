<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const { signOut } = useAuths();

const handleSignOut = async () => {
  await signOut();
};
</script>

<template>
  <Container>
    <p>profile</p>

    <button
      class="flex items-center gap-x-2 px-6 py-2 bg-red-500 text-white rounded-xl"
      @click="handleSignOut"
    >
      <UIcon name="i-solar-logout-linear" class="size-5" />
      <span>خروج</span>
    </button>
  </Container>
</template>
