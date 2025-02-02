<script setup lang="ts">
const { status } = useAuths();
const { userInfo } = await useUserInfo();
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div class="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
      <IconSvg icon-id="i-profilefill" class="w-6 text-main" />
    </div>
    <p v-if="status === 'loading'" class="text-sm mt-1">درحال بارگذاری</p>
    <p v-else class="text-sm mt-1">{{ userInfo?.user_name }}</p>
  </div>
</template>
