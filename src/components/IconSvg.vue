<script setup lang="ts">
const props = defineProps<{ iconId: string; viewBox?: string }>();

const viewBox = props.viewBox || "0 0 24 24";
</script>

<template>
  <svg class="icon" :viewBox="viewBox">
    <use :xlink:href="`/_nuxt/assets/icons.svg#${iconId}`" />
  </svg>
</template>
