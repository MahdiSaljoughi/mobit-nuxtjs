<script setup lang="ts"></script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex flex-col gap-y-2">
      <label for="phone" class="text-[15px] opacity-60">شماره موبایل *</label>
      <input
        name="phone"
        type="text"
        placeholder="شماره موبایل خود را وارد کنید"
        class="outline-none bg-zinc-100 focus:bg-white focus:ring-2 ring-blue-500 px-2 py-3 rounded-xl w-full placeholder:text-[12.8px]"
      />
    </div>
    <p class="text-xs text-zinc-600 dark:text-zinc-300">
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
    <button
      disabled
      class="w-full flex items-center justify-center p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
    >
      ورود به مبیت
    </button>
  </div>
</template>

<!-- <script setup lang="ts">
import type { InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { formAuthSchema } from "~/schema/yap";

type Schema = InferType<typeof formAuthSchema>;

const state = reactive<Schema>({
  phone: "",
});

const isValid = ref(false);

const validateForm = async () => {
  try {
    await formAuthSchema.validate(state);
    isValid.value = true;
  } catch (error) {
    console.log(error);
    isValid.value = false;
  }
};

watch(() => state.phone, validateForm);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data);
};
</script>

<template>
  <UForm
    :schema="formAuthSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="شماره موبایل *" name="phone" class="mb-6">
      <UInput
        v-model="state.phone"
        size="lg"
        required
        :ui="{ rounded: 'rounded-xl' }"
        class="mt-2.5"
      />
    </UFormGroup>

    <p class="text-xs text-zinc-600 dark:text-zinc-300">
      با ورود به مبیت،
      <NuxtLink to="https://mobit.ir/page/terms-of-use" class="text-blue-500"
        >شرایط مبیت</NuxtLink
      >
      و
      <NuxtLink to="https://mobit.ir/page/privacy-policy" class="text-blue-500"
        >قوانین حریم ‌خصوصی</NuxtLink
      >
      آن را می‌پذیرید.
    </p>

    <div class="w-full h-0.5 bg-zinc-200 dark:bg-zinc-700" />

    <UButton
      type="submit"
      :disabled="!isValid"
      class="w-full flex items-center justify-center p-3 rounded-xl"
      >ورود به مبیت</UButton
    >
  </UForm>
</template> -->
