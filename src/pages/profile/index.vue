<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "main-lg",
});

const { signOut } = useAuths();

const handleSignOut = async () => {
  await signOut();
  navigateTo("/");
};
</script>

<template>
  <Container>
    <div
      class="flex flex-col lg:flex-row justify-between gap-x-16 gap-y-4 py-10"
    >
      <div class="w-full lg:w-[500px]">
        <div class="rounded-2xl bg-white dark:bg-zinc-900 shadow-md">
          <div class="flex flex-col gap-y-4 p-4">
            <div class="w-full flex items-center justify-between">
              <div class="flex items-center gap-x-4">
                <div class="flex flex-col justify-between h-14">
                  <UserComponentsUserInfo />
                  <p class="text-blue-500 block text-xs cursor-pointer mr-12">
                    حساب کاربری
                  </p>
                </div>
              </div>
              <button
                class="flex items-center gap-x-2 px-6 py-2 bg-red-500 text-white rounded-xl"
                @click="handleSignOut"
              >
                <UIcon name="i-solar-logout-linear" class="size-5" />
                <span>خروج</span>
              </button>
            </div>
            <button class="border dark:border-zinc-800 p-2 rounded-2xl">
              <div class="flex items-center gap-x-4">
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
                <div class="flex flex-col items-center justify-between gap-y-3">
                  <div class="text-xs">کیف پول و پرداخت</div>
                  <div class="text-xs">موجودی : 0 تومان</div>
                </div>
              </div>
              <p class="text-xs py-4">
                امکان افزایش موجودی , درخواست برگشت وجه و ...
              </p>
            </button>
            <button class="border dark:border-zinc-800 p-2 rounded-2xl">
              <div class="flex items-center gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="#fb923c"
                    d="M19.307 3.21a2.91 2.91 0 1 0-.223 1.94a11.64 11.64 0 0 1 8.232 7.049l1.775-.698a13.58 13.58 0 0 0-9.784-8.291m-2.822 1.638a.97.97 0 1 1 0-1.939a.97.97 0 0 1 0 1.94m-4.267.805l-.717-1.774a13.58 13.58 0 0 0-8.291 9.784a2.91 2.91 0 1 0 1.94.223a11.64 11.64 0 0 1 7.068-8.233m-8.34 11.802a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94m12.607 8.727a2.91 2.91 0 0 0-2.599 1.62a11.64 11.64 0 0 1-8.233-7.05l-1.774.717a13.58 13.58 0 0 0 9.813 8.291a2.91 2.91 0 1 0 2.793-3.578m0 3.879a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94M32 16.485a2.91 2.91 0 1 0-4.199 2.599a11.64 11.64 0 0 1-7.05 8.232l.718 1.775a13.58 13.58 0 0 0 8.291-9.813A2.91 2.91 0 0 0 32 16.485m-2.91.97a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94"
                  />
                  <path
                    fill="#fb923c"
                    d="M19.19 16.35a3.879 3.879 0 1 0-5.42 0a4.85 4.85 0 0 0-2.134 4.014v1.939h9.697v-1.94a4.85 4.85 0 0 0-2.143-4.014m-4.645-2.774a1.94 1.94 0 1 1 3.88 0a1.94 1.94 0 0 1-3.88 0m-.97 6.788a2.91 2.91 0 1 1 5.819 0z"
                    class="ouiIcon__fillSecondary"
                  />
                </svg>
                <div class="flex flex-col items-center justify-between gap-y-3">
                  <div class="text-xs">باشگاه مشتریان</div>
                  <div class="text-xs">امتیاز : 50</div>
                </div>
              </div>
              <p class="text-xs py-4 leading-6">
                با معرفی کردن مبیت به دوستانتان، 100 امتیاز به آن ها هدیه داده و
                بعد از خرید اولشان خودتان 100 امتیاز هدیه بگیرید.
              </p>
            </button>
            <Link
              class="hover:bg-zinc-100 w-full text-xs flex items-center gap-x-3 rounded-2xl transition-colors cursor-pointer"
            >
              <div class="bg-blue-400/40 p-3 rounded-2xl">
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
            </Link>
            <div
              class="hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full text-xs flex items-center gap-x-3 rounded-2xl transition-colors cursor-pointer"
            >
              <div class="bg-blue-400/40 p-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#0069cc"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.18C9.6 1.84 10.7 1 12 1s2.4.84 2.82 2zm-7 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M7 7V5H5v14h14V5h-2v2zm5 11l-5-5h3V9h4v4h3z"
                  />
                </svg>
              </div>
              <span>درخواست های مرجوعی</span>
            </div>
            <div
              class="hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full text-xs flex items-center gap-x-3 rounded-2xl transition-colors cursor-pointer"
            >
              <div class="bg-blue-400/40 p-3 rounded-2xl">
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
            </div>
            <button
              class="bg-orange-400 text-white w-full p-4 rounded-xl transition-colors"
            >
              دعوت از دوستان
            </button>
          </div>
        </div>
      </div>
      <div
        class="w-full bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl mb-20 lg:mb-0"
      >
        <ProfileUser user="{findUser}" />
      </div>
    </div>
  </Container>
</template>
