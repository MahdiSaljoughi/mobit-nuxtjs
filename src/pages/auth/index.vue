<script setup lang="ts">
import FormAuth from "~/modules/auth/components/FormAuth.vue";
</script>

<template>
  <div class="">
    <div class="flex items-center justify-center h-screen px-4">
      <div class="w-96 h-96 rounded-3xl p-4 shadow">
        <FormAuth />
      </div>
    </div>
    <div class="fixed bottom-0 inset-x-0 bg-slate-500">footer</div>
  </div>
</template>
