<script setup lang="ts"></script>

<template>
  <div class="min-h-screen">
    <Header />
    <slot name="main" />
    <Footer />
    <MenuBottomMenu />
  </div>
</template>
