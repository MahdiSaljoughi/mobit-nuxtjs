<script setup lang="ts">
import type { InferType } from "yup";
import { formAuthSchema } from "~/schema/yap";

const { signIn } = useAuths();
const toast = useToast();

type Schema = InferType<typeof formAuthSchema>;
type OtpSchema = {
  otpCode: string[];
};

const isPhoneStep = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const isValidPhone = ref<boolean>(false);
const isValidOtpCode = ref<boolean>(false);
const state = reactive<Schema & OtpSchema>({
  phone: "",
  otpCode: ["", "", "", ""],
});

const errors = reactive({
  phone: "",
  otpCode: "",
});

const validatePhone = async () => {
  try {
    await formAuthSchema.validate(state);
    isValidPhone.value = true;
    errors.phone = "";
  } catch (err: unknown | Error) {
    errors.phone = (err as Error).message;
    isValidPhone.value = false;
  }
};

const handlePhone = async () => {
  const expireTime = parseInt(localStorage.getItem("resendExpireTime") || "0");
  const remaining = Math.floor((expireTime - Date.now()) / 1000);

  if (remaining > 0) {
    toast.add({
      id: "1",
      title: `لطفا ${remaining} ثانیه دیگر صبر کنید`,
      timeout: 3000,
    });
    return;
  }

  if (isValidPhone.value) {
    isLoading.value = true;

    const sendOtp: { message: string; otp: string } = await $fetch(
      // `${useRuntimeConfig().public.apiBase}/auth/otp`,
      "https://api-moobit.vercel.app/auth/otp",
      {
        method: "POST",
        body: {
          phone: state.phone,
        },
      }
    );

    isLoading.value = false;
    toast.add({ id: "1", title: sendOtp.message, timeout: 3000 });

    isPhoneStep.value = false;

    startResendTimer();

    nextTick(() => {
      const firstOtpInput = document.getElementById(
        "otpCode-0"
      ) as HTMLInputElement;
      firstOtpInput?.focus();
    });

    toast.add({
      id: "5",
      title: `کد تایید: ${sendOtp.otp}`,
      timeout: 120000,
    });
  } else {
    toast.add({
      id: "1",
      title: "لطفا شماره موبایل را به درستی وارد کنید",
      timeout: 3000,
    });
  }
};

// Otp
const resendTimer = ref<number | null>(null);
let timerInterval: NodeJS.Timeout | null = null;
const startResendTimer = (remainingTime: number | null = null) => {
  let expireTime = parseInt(localStorage.getItem("resendExpireTime") || "0");

  if (!remainingTime && expireTime > Date.now()) return;

  expireTime = Date.now() + (remainingTime ?? 120) * 1000;
  localStorage.setItem("resendExpireTime", expireTime.toString());

  updateResendTimer();
};
const updateResendTimer = () => {
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const expireTime = parseInt(
      localStorage.getItem("resendExpireTime") || "0"
    );

    const remaining = Math.floor((expireTime - Date.now()) / 1000);
    resendTimer.value = remaining > 0 ? remaining : null;

    if (remaining <= 0) {
      clearInterval(timerInterval as NodeJS.Timeout);
      localStorage.removeItem("resendExpireTime");
    }
  }, 1000);
};
onMounted(() => {
  const expireTime = parseInt(localStorage.getItem("resendExpireTime") || "0");
  const remainingTime = Math.floor((expireTime - Date.now()) / 1000);

  if (remainingTime > 0) {
    startResendTimer(remainingTime);
  } else {
    localStorage.removeItem("resendExpireTime");
  }
});

const handleOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  if (/^\d$/.test(value)) {
    state.otpCode[index] = value;

    if (index < state.otpCode.length - 1) {
      const nextInput = document.getElementById(`otpCode-${index + 1}`);
      nextInput?.focus();
    }
  } else {
    state.otpCode[index] = "";
  }
};

const checkOtpValidity = () => {
  isValidOtpCode.value = state.otpCode.every((digit: string) => digit !== "");
  if (isValidOtpCode.value) {
    submitOtp();
  }
};

const handleBackspace = (index: number, event: KeyboardEvent) => {
  if (event.key === "Backspace") {
    if (state.otpCode[index]) {
      state.otpCode[index] = "";
    } else if (index > 0) {
      const prevInput = document.getElementById(
        `otpCode-${index - 1}`
      ) as HTMLInputElement;
      state.otpCode[index - 1] = "";
      prevInput?.focus();
    }
  }
};

watch(() => state.phone, validatePhone);
watch(
  () => state.otpCode,
  () => checkOtpValidity(),
  { deep: true }
);

const submitOtp = async () => {
  if (isValidOtpCode.value) {
    isLoading.value = true;

    const signin = await signIn("credentials", {
      redirect: false,
      callbackUrl: "",
      phone: state.phone,
      otp: state.otpCode.join(""),
    });

    if (signin?.error) {
      isLoading.value = false;
      errors.otpCode = signin.error;
    } else {
      errors.otpCode = "";

      toast.add({
        id: "1",
        title: "با موفقیت وارد شدید",
        timeout: 3000,
      });

      toast.remove("5");

      isLoading.value = false;

      navigateTo("/");
    }
  } else {
    isLoading.value = false;

    toast.add({
      id: "1",
      title: "لطفا کد تایید را به درستی وارد کنید",
      timeout: 3000,
    });
  }
};
</script>

<template>
  <div v-show="isPhoneStep" class="flex flex-col gap-y-4">
    <p class="text-xl pb-4 pt-2">ورود به مبیت</p>

    <div class="flex flex-col gap-y-2">
      <label for="phone" class="text-sm opacity-60">شماره موبایل *</label>
      <input
        v-model="state.phone"
        name="phone"
        type="text"
        inputmode="numeric"
        placeholder="شماره موبایل خود را وارد کنید"
        class="outline-none bg-zinc-100 dark:bg-zinc-900 focus:bg-white dark:focus:bg-zinc-900 duration-300 focus:ring-2 ring-blue-500 px-2 py-2.5 rounded-xl w-full placeholder:text-sx"
        :class="errors.phone && 'ring-red-500'"
      />
      <p v-if="errors.phone" class="text-red-500 text-xs">
        {{ errors.phone }}
      </p>
    </div>

    <p class="text-xs text-zinc-600 dark:text-zinc-300 leading-6">
      با ورود به مبیت،
      <NuxtLink to="https://mobit.ir/page/terms-of-use" class="text-blue-600"
        >شرایط مبیت</NuxtLink
      >
      و
      <NuxtLink to="https://mobit.ir/page/privacy-policy" class="text-blue-600"
        >قوانین حریم ‌خصوصی</NuxtLink
      >
      آن را می‌پذیرید.
    </p>

    <div class="w-full h-0.5 bg-zinc-200 dark:bg-zinc-800" />

    <button
      :class="`${
        isValidPhone
          ? 'bg-main text-white'
          : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400'
      } w-full h-11 flex items-center justify-center ${
        isLoading ? 'p-1' : 'p-3'
      } rounded-xl text-sm duration-300`"
      :disabled="isValidPhone === false"
      @click="handlePhone"
    >
      <NuxtImg
        v-show="isLoading"
        src="/svg/loading-dot.svg"
        class="size-10"
        alt="loading"
        loading="eager"
      />
      <span v-show="isLoading === false">ورود به مبیت</span>
    </button>
  </div>

  <div v-show="isPhoneStep === false" class="flex flex-col gap-y-4">
    <p class="text-xl pb-4 pt-2">ورود به مبیت</p>

    <div class="flex items-center justify-between text-sx mb-4">
      <span>{{ state.phone }}</span>
      <button class="text-main" @click="isPhoneStep = true">
        ویرایش شماره موبایل
      </button>
    </div>

    <div class="flex flex-wrap gap-y-3 items-end justify-between gap-x-2">
      <div class="flex flex-col gap-y-3">
        <label for="phone" class="text-sx opacity-60">کد تایید</label>
        <div dir="ltr" class="flex items-center justify-end gap-x-2 sm:gap-x-4">
          <input
            v-for="(digit, index) in state.otpCode"
            :id="`otpCode-${index}`"
            :key="index"
            v-model="state.otpCode[index]"
            maxlength="1"
            type="text"
            inputmode="numeric"
            class="w-14 h-11 text-center text-sm rounded-xl outline-none bg-zinc-100 dark:bg-zinc-900 focus:bg-white dark:focus:bg-zinc-950 focus:ring-2 ring-blue-500 duration-300"
            placeholder="-"
            @input="(e) => handleOtpInput(index, e)"
            @keydown="(e) => handleBackspace(index, e)"
          />
        </div>
        <p v-if="errors.otpCode" class="text-red-500 text-xs">
          {{ errors.otpCode }}
        </p>
      </div>

      <div class="flex flex-col gap-y-2 text-sx">
        <p v-if="resendTimer !== null" class="font-IRANr">
          {{ Math.floor(resendTimer / 60) }}:{{
            (resendTimer % 60).toString().padStart(2, "0")
          }}
        </p>
        <button
          class="duration-300"
          :class="resendTimer !== null ? 'opacity-40' : 'text-main'"
          :disabled="resendTimer !== null"
          @click="handlePhone"
        >
          ارسال مجدد
        </button>
      </div>
    </div>

    <button
      :disabled="isValidOtpCode === false"
      :class="`${
        isValidOtpCode
          ? 'bg-main text-white'
          : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400'
      } w-full h-11 flex items-center justify-center ${
        isLoading ? 'p-1' : 'p-3'
      } rounded-xl text-sm duration-300`"
      @click="submitOtp"
    >
      <NuxtImg
        v-show="isLoading"
        src="/svg/loading-dot.svg"
        class="size-10"
        alt="loading"
        loading="eager"
      />
      <span v-show="isLoading === false">ورود</span>
    </button>
  </div>
</template>
