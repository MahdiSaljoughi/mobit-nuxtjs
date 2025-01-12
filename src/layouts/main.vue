<script setup lang="ts"></script>

<template>
  <div>
    <Header />
    <div class="min-h-screen">
      <slot name="main" />
    </div>
    <Footer />
  </div>
</template>
