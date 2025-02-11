<script setup lang="ts">
import type { TCategory, TProductImage, TProductVariant } from "~/types";

definePageMeta({
  middleware: ["dashboard"],
  layout: "dashboard",
});

interface IInputs {
  label: string;
  name: string;
}

const inputs: IInputs[] = [
  {
    label: "عنوان",
    name: "title",
  },
  {
    label: "عنوان انگلیسی",
    name: "title_eng",
  },
  {
    label: "اسلاگ",
    name: "slug",
  },
  {
    label: "برند",
    name: "brand",
  },
  {
    label: "برند انگلیسی",
    name: "brand_eng",
  },
];

const productData = reactive<Record<string, any>>({
  title: "",
  title_eng: "",
  slug: "",
  brand: "",
  brand_eng: "",
  category_id: 0,
  description: "",
  is_fake: "false",
  is_fast_delivery: "false",
  is_offer: "false",
  is_show: "false",
  images: [] as TProductImage[],
  variants: [] as TProductVariant[],
});

const categories = ref<{ value: number; label: string }[]>([]);

onMounted(async () => {
  try {
    const categoriesFetch = await $fetch("/api/categories");
    categories.value = categoriesFetch.category.map((category: TCategory) => ({
      value: category.id,
      label: category.title,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div>
      <p>ایجاد محصول</p>
    </div>

    <div class="flex flex-col gap-y-4 lg:px-4">
      <div
        v-for="(input, index) in inputs"
        :key="index"
        class="flex flex-col gap-y-2"
      >
        <label class="opacity-80 text-sm">{{ input.label }}</label>
        <UInput
          v-model="productData[input.name]"
          required
          :ui="{ rounded: 'rounded-xl' }"
          size="xl"
        />
      </div>

      <div class="flex flex-col gap-y-2">
        <label class="opacity-80 text-sm">توضیحات</label>
        <UTextarea
          v-model="productData.description"
          autoresize
          :maxrows="15"
          :rows="12"
        />
      </div>

      <div>
        <p class="opacity-80 text-sm mb-2">دسته بندی</p>
        <USelect
          v-model="productData.category_id"
          :options="categories"
          size="xl"
          :ui="{
            rounded: 'rounded-xl',
          }"
        />
      </div>

      <div>
        <p class="opacity-80 text-sm mb-2">نمایش</p>
        <USelect
          v-model="productData.is_show"
          :options="[
            { value: 'true', label: 'نمایش' },
            { value: 'false', label: 'عدم نمایش' },
          ]"
          size="xl"
          :ui="{
            rounded: 'rounded-xl',
          }"
        />
      </div>
    </div>

    <div class="flex items-center justify-end gap-x-3">
      <UButton label="انصراف" variant="soft" class="px-6 py-3 rounded-xl" />
      <UButton
        label="تایید"
        color="green"
        variant="soft"
        class="px-10 py-3 rounded-xl"
      />
    </div>
    <!--  -->
  </div>
</template>
