<script setup lang="ts">
import { mag } from "~/data/home/Mag";
</script>

<template>
  <div class="flex flex-col gap-y-8 mt-8">
    <span class="text-xl">اخبار پربازدید تکنولوژی</span>
    <div class="hidden lg:flex items-center justify-between gap-x-8">
      <HomeMagSingle v-for="item in mag" :key="item.id" :mag="item" />
    </div>
    <div class="block lg:hidden">
      <SliderHomeMag />
    </div>
  </div>
</template>
