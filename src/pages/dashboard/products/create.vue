<script setup lang="ts">
import type { TCategory } from "~/types";

definePageMeta({
  middleware: ["dashboard"],
  layout: "dashboard",
});

interface IInputs {
  label: string;
  name: string;
}

const router = useRouter();

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
  category_id: null,
  description: "",
  is_fake: null,
  is_fast_delivery: null,
  is_offer: null,
  is_show: false,
});

const categories = ref<{ value: number; label: string }[]>([]);

onMounted(async () => {
  try {
    const categoriesFetch = await $fetch<TCategory[]>(
      `${useRuntimeConfig().public.apiBase}/categories`
    );
    categories.value = categoriesFetch.map((category) => ({
      value: category.id,
      label: category.title,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

const createProduct = async (data: any) => {
  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useAuths().accessToken}`,
      },
      body: data,
    });

    router.push("/dashboard/products");
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-10">
    <div>
      <p>ایجاد محصول</p>
    </div>

    <div class="flex flex-col gap-y-8 lg:px-4">
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

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <p class="opacity-80 text-sm mb-2">دسته بندی</p>
          <USelect
            v-model="productData.category_id"
            :options="categories"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
            @update:model-value="
              (val) => (productData.category_id = Number(val))
            "
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">اصل / فیک</p>
          <USelect
            v-model="productData.is_fake"
            :options="[
              { label: 'فیک', value: true },
              { label: 'اصل', value: false },
            ]"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
            @update:model-value="
              (val) => (productData.is_fake = val === 'true')
            "
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">سریع / معمولی</p>
          <USelect
            v-model="productData.is_fast_delivery"
            :options="[
              { label: 'سریع', value: true },
              { label: 'معمولی', value: false },
            ]"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
            @update:model-value="
              (val) => (productData.is_fast_delivery = val === 'true')
            "
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">پیشنهاد / معمولی</p>
          <USelect
            v-model="productData.is_offer"
            :options="[
              { label: 'پیشنهاد', value: true },
              { label: 'معمولی', value: false },
            ]"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
            @update:model-value="
              (val) => (productData.is_offer = val === 'true')
            "
          />
        </div>
      </div>
    </div>

    <div class="flex items-center justify-end gap-x-3">
      <UButton
        label="انصراف"
        variant="soft"
        class="px-6 py-3 rounded-xl"
        to="/dashboard/products"
      />
      <UButton
        label="تایید"
        color="green"
        variant="soft"
        class="px-16 py-3 rounded-xl"
        @click="createProduct(productData)"
      />
    </div>
  </div>
</template>
