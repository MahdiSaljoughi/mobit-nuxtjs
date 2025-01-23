<script setup lang="ts"></script>

<template>
  <div class="min-h-screen">
    <Header />
    <ThemSwitcher />
    <slot name="main" />
    <Footer />
    <MenuBottomMenu />
  </div>
</template>
