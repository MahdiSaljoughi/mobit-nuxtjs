<script setup></script>

<template>
  <div class="min-h-screen">
    <Header />
    <ThemSwitcher />
    <slot name="main" />
    <Footer />
    <MenuBottom />
  </div>
</template>
