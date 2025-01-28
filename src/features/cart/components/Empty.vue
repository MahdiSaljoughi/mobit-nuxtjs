<template>
  <div class="flex flex-col items-center justify-center gap-y-6">
    <NuxtImg
      src="/images/cart/empty.svg"
      alt="cart empty"
      class="w-52 lg:w-72"
    />
    <p class="opacity-80">سبد خرید شما خالی است</p>
    <p class="text-sx opacity-70">
      مبیت کالاهای زیادی دارد که شما دوست خواهید داشت
    </p>
    <NuxtLink
      to="/"
      class="inline-block bg-main text-white px-12 py-3 text-sx rounded-xl"
    >
      شروع خرید
    </NuxtLink>
  </div>
</template>
