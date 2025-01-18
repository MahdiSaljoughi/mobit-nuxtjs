<script setup lang="ts">
const inputDays = ref(2);
const totalSeconds = ref(inputDays.value * 24 * 60 * 60);
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

const days = computed(() => Math.floor(totalSeconds.value / (24 * 60 * 60)));
const hours = computed(() =>
  Math.floor((totalSeconds.value % (24 * 60 * 60)) / 3600)
);
const minutes = computed(() => Math.floor((totalSeconds.value % 3600) / 60));
const seconds = computed(() => totalSeconds.value % 60);

const startTimer = () => {
  if (interval.value) clearInterval(interval.value);
  interval.value = setInterval(updateTime, 1000);
};

onMounted(() => {
  startTimer();
});
</script>

<template>
  <div class="flex items-center gap-x-2">
    <!-- نمایش ثانیه -->
    <div
      class="flex items-center justify-center bg-white size-8 lg:w-12 lg:h-11 text-sm lg:text-xl rounded-lg lg:rounded-xl text-black"
    >
      {{ formatTime(seconds) }}
    </div>

    <span class="hidden lg:block text-2xl">:</span>

    <!-- نمایش دقیقه -->
    <div
      class="flex items-center justify-center bg-white size-8 lg:w-12 lg:h-11 text-sm lg:text-xl rounded-lg lg:rounded-xl text-black"
    >
      {{ formatTime(minutes) }}
    </div>

    <span class="hidden lg:block text-2xl">:</span>

    <!-- نمایش ساعت -->
    <div
      class="flex items-center justify-center bg-white size-8 lg:w-12 lg:h-11 text-sm lg:text-xl rounded-lg lg:rounded-xl text-black"
    >
      {{ formatTime(hours) }}
    </div>

    <span class="hidden lg:block text-2xl">:</span>

    <!-- نمایش روز -->
    <div
      class="flex items-center justify-center bg-white size-8 lg:w-12 lg:h-11 text-sm lg:text-xl rounded-lg lg:rounded-xl text-black"
    >
      {{ formatTime(days) }}
    </div>
  </div>
</template>
