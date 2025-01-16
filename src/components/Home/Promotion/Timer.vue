<script setup lang="ts">
const totalSeconds = ref(200000);
const interval = ref<ReturnType<typeof setInterval> | null>(null);

const updateTime = () => {
  if (totalSeconds.value > 0) {
    totalSeconds.value--;
  } else {
    clearInterval(interval.value!);
  }
};

const formatTime = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const startTimer = () => {
  interval.value = setInterval(updateTime, 1000);
};

onMounted(() => {
  startTimer();
});
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div
      class="flex items-center justify-center bg-white size-8 lg:w-12 lg:h-11 text-sm lg:text-xl rounded-lg lg:rounded-xl text-black"
    >
      {{ formatTime(totalSeconds % 60) }}
    </div>
    <span class="hidden lg:block text-2xl">:</span>
    <div
      class="flex items-center justify-center bg-white size-8 lg:w-12 lg:h-11 text-sm lg:text-xl rounded-lg lg:rounded-xl text-black"
    >
      {{ formatTime(Math.floor((totalSeconds % 3600) / 60)) }}
    </div>
    <span class="hidden lg:block text-2xl">:</span>
    <div
      class="flex items-center justify-center bg-white size-8 lg:w-12 lg:h-11 text-sm lg:text-xl rounded-lg lg:rounded-xl text-black"
    >
      {{ formatTime(Math.floor(totalSeconds / 3600)) }}
    </div>
  </div>
</template>
