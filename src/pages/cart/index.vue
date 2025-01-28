<script setup lang="ts"></script>

<template>
  <NuxtLayout name="main-lg">
    <template #main>
      <Container>
        <div
          class="sticky top-0 pt-8 pb-3 border-b-2 border-zinc-100 dark:border-zinc-700 z-20"
        >
          Header
        </div>

        <div class="py-32">
          <div v-if="true">
            <CartComponentsEmpty />
          </div>
        </div>
      </Container>
    </template>
  </NuxtLayout>
</template>
