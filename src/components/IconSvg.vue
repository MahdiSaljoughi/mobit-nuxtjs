<script setup lang="ts">
const props = defineProps<{ iconId: string; viewBox?: string }>();

const viewBox = props.viewBox || "0 0 24 24";
</script>

<template>
  <svg :viewBox="viewBox">
    <use :href="`/svg/icons.svg#${iconId}`" />
  </svg>
</template>
