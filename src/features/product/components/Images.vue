<!-- <script setup lang="ts">
defineProps<{
  images: {
    url: string;
  }[];
  alt: string;
}>();

const imagePreview = ref<number>(0);
</script>

<template>
  <div class="flex flex-col gap-y-6 w-full lg:max-w-96 lg:min-w-96">
    <div class="rounded-2xl bg-zinc-100 dark:bg-zinc-900">
      <div class="w-full max-w-96 mx-auto p-8">
        <NuxtImg
          :src="images[imagePreview]?.url"
          :alt="alt"
          class="w-full"
          draggable="false"
        />
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="w-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-2"
        @click="imagePreview = index"
      >
        <NuxtImg
          :src="image.url"
          :alt="alt"
          class="rounded-2xl w-full"
          draggable="false"
        />
      </button>
    </div>
  </div>
</template> -->

<script setup lang="ts">
const props = defineProps<{
  images: { url: string }[];
  alt: string;
}>();

const imagePreview = ref<number>(0);
const isActive = (index: number) => imagePreview.value === index;
const direction = ref<"left" | "right">("right");

const nextImage = () => {
  direction.value = "left";
  imagePreview.value = (imagePreview.value + 1) % props.images.length;
};

const prevImage = () => {
  direction.value = "right";
  imagePreview.value =
    (imagePreview.value - 1 + props.images.length) % props.images.length;
};

const selectImage = (index: number) => {
  direction.value = index > imagePreview.value ? "right" : "left";
  imagePreview.value = index;
};

let startX = 0;
const handleTouchStart = (event: TouchEvent) => {
  startX = event.touches[0].clientX;
};

const handleTouchEnd = (event: TouchEvent) => {
  const endX = event.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) nextImage();
  if (diff < -50) prevImage();
};

let isDragging = false;
const handleMouseDown = (event: MouseEvent) => {
  startX = event.clientX;
  isDragging = true;
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging) return;
  const diff = startX - event.clientX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) nextImage();
    else prevImage();
    isDragging = false;
  }
};

const handleMouseUp = () => {
  isDragging = false;
};
</script>

<template>
  <div class="flex flex-col gap-y-4 w-full lg:max-w-96 lg:min-w-96">
    <HomePromotionHeadersMobile
      :is-title="false"
      href="https://www.mobit.ir/promotion"
    />

    <div
      class="flex items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden w-full lg:w-96 lg:h-96 relative"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    >
      <div class="w-96 h-96 mx-auto p-8 flex items-center justify-center">
        <transition
          :name="direction === 'right' ? 'slide-right' : 'slide-left'"
          mode="out-in"
        >
          <NuxtImg
            :key="imagePreview"
            :src="images[imagePreview]?.url"
            :alt="alt"
            class="w-full h-full object-cover select-none"
            draggable="false"
          />
        </transition>
      </div>
      <div
        class="flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 absolute top-3 right-3 lg:top-auto lg:right-auto lg:bottom-3 w-12 h-28 lg:w-52 lg:h-12 rounded-xl"
      />
      <div class="flex lg:hidden items-center gap-x-1 absolute bottom-3">
        <button
          v-for="(image, index) in images"
          :key="index"
          class="size-2 rounded-xl transition-colors duration-300"
          :class="
            isActive(index)
              ? 'w-3 bg-black/70 dark:bg-zinc-400'
              : 'bg-black/30 dark:bg-zinc-700'
          "
          @click="selectImage(index)"
        />
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <button
        v-for="(image, index) in images"
        :key="index"
        class="size-[84px] bg-zinc-100 dark:bg-zinc-800 rounded-xl p-2"
        :class="isActive(index) ? 'shadow-around' : ''"
        @click="selectImage(index)"
      >
        <NuxtImg
          :src="image.url"
          :alt="alt"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-105 select-none"
          draggable="false"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s ease;
}
.slide-left-enter {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
