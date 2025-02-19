<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "main-lg",
});

const { userInfo, refresh: refreshUser } = await useUser().info();
const { data, refresh } = await useOrder().getAllOrderUser();

const userData = ref({
  user_name: userInfo?.user_name,
  first_name: userInfo?.first_name,
  last_name: userInfo?.last_name,
  email: userInfo?.email,
  phone: userInfo?.phone,
});

const formatJalali = (isoDate: Date) => {
  if (!isoDate) return "نامشخص";

  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const handleSignOut = async () => {
  await useAuths().signOut();
};

const updateUser = async () => {
  await useUser().updateInfo(userData.value);

  refreshUser?.();

  useToast().add({
    title: "اطلاعات با موفقیت بروزرسانی شد",
  });
};

const cancelOrder = async (id: number) => {
  await useOrder().cancelOrderUser(id);

  refresh?.();

  useToast().add({
    title: "سفارش با موفقیت لغو شد",
  });
};
</script>

<template>
  <div
    class="flex flex-col lg:flex-row justify-between gap-x-20 gap-y-4 lg:py-10 lg:px-6 xl:px-20"
  >
    <div class="w-full lg:w-[450px]">
      <div class="rounded-2xl bg-white dark:bg-zinc-900 lg:shadow-around">
        <div class="flex flex-col gap-y-4 p-4">
          <div class="w-full flex items-center justify-between">
            <UserComponentsUserInfo />

            <UPopover>
              <UButton
                color="white"
                icon="i-heroicons-solid-dots-vertical"
                variant="ghost"
              />

              <template #panel>
                <div class="p-4">
                  <button
                    class="flex items-center gap-x-2 px-6 py-2.5 bg-red-500/80 hover:bg-red-500 duration-300 text-white rounded-xl text-sm"
                    @click="handleSignOut"
                  >
                    <UIcon name="i-solar-logout-linear" class="size-5" />
                    <span>خروج</span>
                  </button>
                </div>
              </template>
            </UPopover>
          </div>
          <button class="border dark:border-zinc-800 p-2 rounded-2xl">
            <div class="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0069cc"
                  d="M14.356 2.595a.25.25 0 0 1 .361-.032l.922.812L12.739 7h1.92l2.106-2.632l1.652 1.457a.25.25 0 0 1 .026.348l-.69.827h1.944a1.75 1.75 0 0 0-.288-2.3l-3.7-3.263a1.75 1.75 0 0 0-2.531.23L8.976 7h1.91zM16.25 14a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zM4.5 7.25a.75.75 0 0 1 .75-.75h3.128L9.57 5H5.25A2.25 2.25 0 0 0 3 7.25v10.5A3.25 3.25 0 0 0 6.25 21h12a3.25 3.25 0 0 0 3.25-3.25v-6.5A3.25 3.25 0 0 0 18.25 8h-13a.75.75 0 0 1-.75-.75m0 10.5V9.372q.354.126.75.128h13c.966 0 1.75.784 1.75 1.75v6.5a1.75 1.75 0 0 1-1.75 1.75h-12a1.75 1.75 0 0 1-1.75-1.75"
                />
              </svg>
              <div class="flex flex-col items-start gap-y-2 text-sx">
                <div class="text-xs">کیف پول و پرداخت</div>
                <div class="flex items-center gap-x-2">
                  <p class="text-zinc-600 dark:text-zinc-300">موجودی :</p>
                  <p>100,000</p>
                  <p class="text-zinc-600 dark:text-zinc-300 text-xs">تومان</p>
                </div>
              </div>
            </div>
            <p class="text-xs py-2 text-right text-zinc-600 dark:text-zinc-300">
              امکان افزایش موجودی , درخواست برگشت وجه و ...
            </p>
          </button>
          <button class="border dark:border-zinc-800 p-2 rounded-2xl">
            <div class="flex items-center gap-x-2">
              <IconSvg icon-id="i-mobit-score" class="size-10" />
              <div class="flex flex-col justify-between gap-y-2 text-sx">
                <p>باشگاه مشتریان</p>
                <div class="flex items-center gap-x-2">
                  <p class="text-zinc-600 dark:text-zinc-300">امتیاز :</p>
                  <p>50</p>
                </div>
              </div>
            </div>
            <p
              class="text-xs text-right py-2 leading-6 text-zinc-600 dark:text-zinc-300"
            >
              با معرفی کردن مبیت به دوستانتان، 100 امتیاز به آن ها هدیه داده و
              بعد از خرید اولشان خودتان 100 امتیاز هدیه بگیرید.
            </p>
          </button>
          <button
            class="hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full text-xs flex items-center gap-x-3 rounded-2xl duration-300"
          >
            <div class="bg-main/20 p-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="#0069cc" strokeWidth="2">
                  <path
                    d="M11.008 5.758L6.933 8.02a2.04 2.04 0 0 0-1.046 1.786v4.388a2.04 2.04 0 0 0 1.046 1.786l4.075 2.262a2.04 2.04 0 0 0 1.984 0l4.075-2.262a2.04 2.04 0 0 0 1.046-1.786V9.806a2.04 2.04 0 0 0-1.046-1.786l-4.075-2.262a2.04 2.04 0 0 0-1.984 0Z"
                  />
                  <path d="M17.699 8.577L12 12L6.301 8.577M12 18.494V12" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.25 7.889V5.833a3.083 3.083 0 0 0-3.083-3.083h-3.084m0 18.5h3.084a3.083 3.083 0 0 0 3.083-3.083V16.11m-18.5.001v2.056a3.083 3.083 0 0 0 3.083 3.083h3.084m0-18.5H5.833A3.083 3.083 0 0 0 2.75 5.833V7.89"
                  />
                </g>
              </svg>
            </div>
            <span>سفارشات</span>
          </button>
          <button
            class="hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full text-xs flex items-center gap-x-3 rounded-2xl duration-300"
          >
            <div class="bg-main/20 p-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.9em"
                height="1.9em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0069cc"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.18C9.6 1.84 10.7 1 12 1s2.4.84 2.82 2zm-7 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M7 7V5H5v14h14V5h-2v2zm5 11l-5-5h3V9h4v4h3z"
                />
              </svg>
            </div>
            <span>درخواست های مرجوعی</span>
          </button>
          <button
            class="hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full text-xs flex items-center gap-x-3 rounded-2xl duration-300"
          >
            <div class="bg-main/20 p-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0069cc"
                  d="M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6zm-.95-6h13.9zm0 0h13.9l-.6-3H5.65z"
                />
              </svg>
            </div>
            <span>رزرو حضوری</span>
          </button>
          <button
            class="bg-orange-400 w-full rounded-xl flex items-center justify-center h-14"
          >
            <IconSvg icon-id="i-invitetext" class="w-32" />
          </button>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="flex flex-col lg:flex-row gap-8">
        <div class="w-full lg:w-1/2 px-4 lg:p-0">
          <div class="flex flex-col gap-y-4">
            <p class="text-sm">مشخصات شما</p>

            <div>
              <p class="opacity-80 text-sx mb-2">نام کاربری</p>
              <UInput
                v-model="userData.user_name!"
                size="xl"
                :ui="{
                  rounded: 'rounded-xl',
                }"
                color="cyan"
              />
            </div>

            <div>
              <p class="opacity-80 text-sx mb-2">نام</p>
              <UInput
                v-model="userData.first_name!"
                size="xl"
                :ui="{
                  rounded: 'rounded-xl',
                }"
                color="cyan"
              />
            </div>

            <div>
              <p class="opacity-80 text-sx mb-2">نام خانوادگی</p>
              <UInput
                v-model="userData.last_name!"
                size="xl"
                :ui="{
                  rounded: 'rounded-xl',
                }"
                color="cyan"
              />
            </div>

            <div>
              <p class="opacity-80 text-sx mb-2">ایمیل</p>
              <UInput
                v-model="userData.email!"
                size="xl"
                :ui="{
                  rounded: 'rounded-xl',
                }"
                color="cyan"
              />
            </div>

            <div class="flex items-center gap-x-2">
              <p class="opacity-80 text-sx">شماره تلفن :</p>
              <p class="text-sm">{{ userData.phone }}</p>
            </div>

            <UButton
              color="cyan"
              variant="soft"
              class="px-10 py-3 rounded-xl flex items-center justify-center text-sx text-cyan-600"
              @click="updateUser"
              >ذخیره</UButton
            >
          </div>
        </div>
        <div class="w-full lg:w-1/2 px-4 lg:p-0">
          <div v-if="!data?.length" class="my-10 lg:my-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8em"
              height="8em"
              viewBox="0 0 24 24"
              class="flex items-center justify-center w-full"
            >
              <path
                fill="#8f8f8f"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 0 0 9.5 3C6.08 3 3.28 5.64 3.03 9h2.02C5.3 6.75 7.18 5 9.5 5C11.99 5 14 7.01 14 9.5S11.99 14 9.5 14c-.17 0-.33-.03-.5-.05v2.02c.17.02.33.03.5.03c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19z"
              />
              <path
                fill="#8f8f8f"
                d="M6.47 10.82L4 13.29l-2.47-2.47l-.71.71L3.29 14L.82 16.47l.71.71L4 14.71l2.47 2.47l.71-.71L4.71 14l2.47-2.47z"
              />
            </svg>
            <p class="text-center mb-4 text-sm">لیست سفارشات شما خالی است.</p>
            <p class="text-center opacity-80 text-sx">
              مبیت دسته‌ بندی و کالاهای زیادی دارد که شما دوست خواهید داشت !!
            </p>
            <div class="flex items-center justify-center">
              <NuxtLink
                to="/"
                class="bg-main py-3 px-10 text-center mt-6 inline-block text-white rounded-xl text-sx"
              >
                شروع خرید
              </NuxtLink>
            </div>
          </div>
          <div v-else class="flex flex-col gap-y-4">
            <p class="text-sm">سفارشات شما</p>

            <ul>
              <li v-for="order in data" :key="order.id">
                <!-- :to="`/profile/orders/${order.id}`" -->
                <NuxtLink
                  class="flex flex-col gap-y-8 gap-x-32 border dark:border-zinc-800 rounded-xl px-3 py-6 mb-4"
                >
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center justify-center gap-x-1">
                      <span>
                        {{ order.total_price.toLocaleString() }}
                      </span>
                      <span class="opacity-80 text-xs">تومان</span>
                    </div>
                    <p>{{ order.status }}</p>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <div
                        v-for="product in order.products"
                        :key="product.id"
                        class="size-20 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg relative"
                      >
                        <NuxtImg
                          :src="product.image"
                          :alt="product.product.title"
                        />
                        <div
                          class="bg-main text-white p-2.5 size-2 text-xs rounded-full flex items-center justify-center absolute bottom-1 right-1"
                        >
                          {{ product.quantity }}
                        </div>

                        <div class="flex items-center gap-x-1.5 mt-3 -mr-2">
                          <div
                            :style="{ backgroundColor: product.hex_code }"
                            class="min-w-4 min-h-4 rounded-md ring-1 ring-main/50"
                          />
                          <p class="text-xs text-nowrap">
                            {{ product.color_name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between w-full">
                    <div class="flex items-center justify-center gap-x-1">
                      <span class="opacity-80 text-xs">شماره سفارش :</span>
                      <span>{{ order.id }}</span>
                    </div>
                    <span class="opacity-80 text-sx">
                      {{ formatJalali(order.created_at) }}
                    </span>
                  </div>

                  <UButton
                    v-if="order.status !== 'CANCELED'"
                    icon="i-heroicons-trash-solid"
                    label="لغو سفارش"
                    color="red"
                    variant="soft"
                    class="py-3 text-sx flex items-center justify-center text-red-500 rounded-xl"
                    @click="cancelOrder(order.id)"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
