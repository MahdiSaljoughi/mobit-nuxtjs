<script setup lang="ts">
import type { InferType } from "yup";
import { formAuthSchema } from "~/schema/yap";
import useAuths from "~/features/auth/composables/useAuths";

const { signIn } = useAuths();
const toast = useToast();

type Schema = InferType<typeof formAuthSchema>;
type OtpSchema = {
  otpCode: string[];
};

const isPhoneStep = ref<boolean>(true);
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
  } catch (err) {
    errors.phone = err.message;
    isValidPhone.value = false;
  }
};

const handlePhone = async () => {
  if (isValidPhone.value) {
    const sendOtp: { message: string; otp: string; expires_at: Date } =
      await $fetch(`${useRuntimeConfig().public.apiBase}/auth/otp`, {
        method: "POST",
        body: {
          phone: state.phone,
        },
      });

    toast.add({ id: "1", title: sendOtp.message, timeout: 3000 });

    isPhoneStep.value = false;

    toast.add({ id: "2", title: `کد تایید: ${sendOtp.otp}`, timeout: 12000 });
  } else {
    toast.add({
      id: "1",
      title: "لطفا شماره موبایل را به درستی وارد کنید",
      timeout: 3000,
    });
  }
};

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
    const signin = await signIn("credentials", {
      redirect: false,
      callbackUrl: "",
      phone: state.phone,
      code: state.otpCode.join(""),
    });

    if (signin?.error) {
      errors.otpCode = signin.error;
    } else {
      toast.add({
        id: "1",
        title: "با موفقیت وارد شدید",
        timeout: 3000,
      });
      navigateTo("/");
    }
  } else {
    toast.add({
      id: "1",
      title: "لطفا کد تایید را به درستی وارد کنید",
      timeout: 3000,
    });
  }
};
</script>

<template>
  <div>
    <div v-show="isPhoneStep" class="flex flex-col gap-y-4">
      <p class="text-xl pb-4 pt-2">ورود به مبیت</p>

      <div class="flex flex-col gap-y-2">
        <label for="phone" class="text-sm opacity-60">شماره موبایل *</label>
        <input
          v-model="state.phone"
          name="phone"
          type="text"
          placeholder="شماره موبایل خود را وارد کنید"
          class="outline-none bg-zinc-100 dark:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-900 duration-300 focus:ring-2 ring-blue-500 px-2 py-2.5 rounded-xl w-full placeholder:text-[12.8px]"
          :class="errors.phone && 'ring-red-500'"
        />
        <p v-if="errors.phone" class="text-red-500 text-xs">
          {{ errors.phone }}
        </p>
      </div>

      <p
        class="text-xs text-zinc-600 dark:text-zinc-300 text-center leading-6 lg:text-right"
      >
        با ورود به مبیت،
        <NuxtLink to="https://mobit.ir/page/terms-of-use" class="text-blue-600"
          >شرایط مبیت</NuxtLink
        >
        و
        <NuxtLink
          to="https://mobit.ir/page/privacy-policy"
          class="text-blue-600"
          >قوانین حریم ‌خصوصی</NuxtLink
        >
        آن را می‌پذیرید.
      </p>

      <div class="w-full h-0.5 bg-zinc-200 dark:bg-zinc-700" />

      <button
        :class="`${
          isValidPhone
            ? 'bg-blue-500 text-white'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
        } w-full flex items-center justify-center p-3 rounded-xl text-sm duration-300`"
        :disabled="isValidPhone === false"
        @click="handlePhone"
      >
        ورود به مبیت
      </button>
    </div>

    <div v-show="isPhoneStep === false" class="flex flex-col gap-y-6">
      <p class="text-xl pb-4 pt-2">ثبت نام در مبیت</p>

      <div class="flex items-center justify-between text-xs">
        <span>{{ state.phone }}</span>
        <button class="text-blue-500" @click="isPhoneStep = true">
          ویرایش شماره موبایل
        </button>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex flex-col gap-y-3 w-full">
          <label for="phone" class="text-sm opacity-60">کد تایید</label>
          <div dir="ltr" class="flex items-center justify-end gap-x-4">
            <input
              v-for="(digit, index) in state.otpCode"
              :id="`otpCode-${index}`"
              :key="index"
              v-model="state.otpCode[index]"
              maxlength="1"
              type="text"
              inputmode="numeric"
              class="w-14 h-11 text-center text-lg rounded-lg outline-none bg-zinc-100 dark:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 ring-blue-500 duration-300"
              placeholder="-"
              @input="(e) => handleOtpInput(index, e)"
              @keydown="(e) => handleBackspace(index, e)"
            />
          </div>
          <p v-if="errors.otpCode" class="text-red-500 text-xs">
            {{ errors.otpCode }}
          </p>
        </div>

        <div class="flex flex-col gap-y-3 items-center w-24">
          <p class="text-sm">1:57</p>
          <button class="text-blue-500 text-xs">ارسال مجدد</button>
        </div>
      </div>

      <button
        :disabled="isValidOtpCode === false"
        :class="`${
          isValidOtpCode
            ? 'bg-blue-500 text-white'
            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
        } w-full flex items-center justify-center p-3 rounded-xl text-sm duration-300`"
        @click="submitOtp"
      >
        ورود
      </button>
    </div>
  </div>
</template>
