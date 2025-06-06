<script setup lang="ts">
const props = defineProps<{
  productId: number;
  productVariants?: TProductVariant[];
}>();

const emit = defineEmits(["refresh"]);

const toast = useToast();

const variantData = reactive({
  product_id: Number(props.productId),
  quantity: undefined as number | undefined,
  hex_code: "",
  color_name: "",
  price: undefined as number | undefined,
  discount: undefined as number | undefined,
  price_after_discount: undefined as number | undefined,
});

const isLoading = ref<boolean>(false);

const addVariant = async () => {
  isLoading.value = true;

  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/variants`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
      body: variantData,
    });

    emit("refresh");

    Object.assign(variantData, {
      quantity: undefined as number | undefined,
      hex_code: "",
      color_name: "",
      price: undefined as number | undefined,
      discount: undefined as number | undefined,
      price_after_discount: undefined as number | undefined,
    });

    toast.add({
      title: "ویژگی با موفقیت اضافه شد",
    });

    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    toast.add({
      title: "خطا در افزودن ویژگی",
      color: "red",
    });
    console.log(err);
  }
};

const deleteVariant = async (id: number) => {
  isLoading.value = true;

  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/variants/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
    });

    emit("refresh");

    toast.add({
      title: "ویژگی با موفقیت حذف شد",
    });
    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    toast.add({
      title: "خطا در حذف ویژگی",
      color: "red",
    });
    console.log(err);
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <Loadings v-if="isLoading" class="m-2" />

    <p class="text-sm">ویژگی ها</p>
    <div class="flex flex-col gap-y-2">
      <p class="opacity-80 text-sm">انتخاب رنگ</p>
      <div class="flex items-center gap-x-3">
        <input
          v-model="variantData.hex_code"
          type="color"
          class="p-1 w-12 h-11 rounded-xl cursor-pointer"
        />
        <UInput
          v-model="variantData.hex_code"
          size="xl"
          class="w-full"
          :ui="{
            rounded: 'rounded-xl',
          }"
        />
      </div>
    </div>

    <div class="flex flex-col gap-y-2">
      <p class="opacity-80 text-sm">نام رنگ</p>
      <UInput
        v-model="variantData.color_name"
        placeholder="آبی"
        size="xl"
        :ui="{
          rounded: 'rounded-xl',
        }"
      />
    </div>

    <div class="flex flex-col gap-y-2">
      <p class="opacity-80 text-sm">تعداد</p>
      <UInput
        v-model="variantData.quantity"
        size="xl"
        :ui="{
          rounded: 'rounded-xl',
        }"
        @update:model-value="(val) => (variantData.quantity = Number(val))"
      />
    </div>

    <div class="flex flex-col gap-y-2">
      <p class="opacity-80 text-sm">قیمت</p>
      <UInput
        v-model="variantData.price"
        size="xl"
        :ui="{
          rounded: 'rounded-xl',
        }"
        @update:model-value="(val) => (variantData.price = Number(val))"
      />
    </div>

    <div class="flex flex-col gap-y-2">
      <p class="opacity-80 text-sm">درصد تخفیف</p>
      <UInput
        v-model="variantData.discount"
        size="xl"
        :ui="{
          rounded: 'rounded-xl',
        }"
        @update:model-value="(val) => (variantData.discount = Number(val))"
      />
    </div>

    <div class="flex flex-col gap-y-2">
      <p class="opacity-80 text-sm">قیمت بعد از تخفیف</p>
      <UInput
        v-model="variantData.price_after_discount"
        size="xl"
        :ui="{
          rounded: 'rounded-xl',
        }"
        @update:model-value="
          (val) => (variantData.price_after_discount = Number(val))
        "
      />
    </div>

    <UButton
      variant="soft"
      class="w-full flex items-center justify-center py-3 rounded-xl"
      :loading="isLoading"
      :disabled="isLoading"
      @click="addVariant"
    >
      افزودن
    </UButton>

    <ul v-if="productVariants?.length! > 0" class="text-sx space-y-4">
      <li
        v-for="variant in productVariants"
        :key="variant.id"
        class="border dark:border-zinc-800 rounded-xl p-3 flex flex-col gap-y-2 relative"
      >
        <div class="flex items-center gap-x-2">
          <p class="text-zinc-500 dark:text-zinc-400">رنگ :</p>
          <p>{{ variant.color_name }}</p>
          -
          <p>{{ variant.hex_code }}</p>
          -
          <p
            :style="{ backgroundColor: variant.hex_code }"
            class="size-4 rounded-full ring-2 ring-zinc-200 dark:ring-zinc-600"
          />
        </div>
        <div class="flex items-center gap-x-2">
          <p class="text-zinc-500 dark:text-zinc-400">تعداد :</p>
          <p>{{ variant.quantity + " عدد " }}</p>
        </div>
        <div class="flex items-center gap-x-2">
          <p class="text-zinc-500 dark:text-zinc-400">قیمت اصلی :</p>
          <p>{{ variant.price.toLocaleString() }}</p>
        </div>
        <div v-if="variant.discount" class="flex flex-col gap-y-2">
          <div class="flex items-center gap-x-2 text-red-400">
            <p class="opacity-70">درصد تخفیف :</p>
            <p>{{ variant.discount + " ٪ " }}</p>
          </div>
          <div class="flex items-center gap-x-2 text-emerald-400">
            <p class="opacity-70">قیمت با تخفیف :</p>
            <p>
              {{ variant.price_after_discount?.toLocaleString() }}
            </p>
          </div>
        </div>
        <button
          class="absolute bottom-2 left-2 text-rose-500 p-1 bg-white dark:bg-black rounded-lg flex items-center justify-center shadow-around"
          @click="deleteVariant(variant.id)"
        >
          <UIcon name="i-heroicons-trash-20-solid" size="20" />
        </button>
      </li>
    </ul>
  </div>
</template>
