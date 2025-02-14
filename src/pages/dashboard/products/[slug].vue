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

interface IProduct {
  title?: string;
  title_eng?: string;
  slug?: string;
  brand?: string;
  brand_eng?: string;
  category_id?: number;
  description?: string;
  is_fake?: boolean;
  is_fast_delivery?: boolean;
  is_offer?: boolean;
  is_show?: boolean;
}

const route = useRoute();

const slug = route.params.slug;

const { data, refresh } = useProduct().getBySlug(String(slug));

const toast = useToast();

const productData = reactive<IProduct>({
  title: data.value?.product.title,
  title_eng: data.value?.product.title_eng,
  slug: data.value?.product.slug,
  brand: data.value?.product.brand,
  brand_eng: data.value?.product.brand_eng,
  category_id: data.value?.product.category_id,
  description: data.value?.product.description,
  is_fake: data.value?.product.is_fake,
  is_fast_delivery: data.value?.product.is_fast_delivery,
  is_offer: data.value?.product.is_offer,
  is_show: data.value?.product.is_show,
});
const isLoading = ref<boolean>(false);

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

const categories = ref<{ value: number; label: string }[]>([]);

onMounted(async () => {
  try {
    const categoriesFetch = await $fetch<{ category: TCategory[] }>(
      `${useRuntimeConfig().public.apiBase}/categories`
    );
    categories.value = categoriesFetch.category.map((category) => ({
      value: category.id,
      label: category.title,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

const updateProduct = async (productData: IProduct) => {
  isLoading.value = true;

  try {
    await $fetch(
      `${useRuntimeConfig().public.apiBase}/products/${
        data?.value?.product.slug
      }`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
        },
        body: productData,
      }
    );

    refresh?.();

    toast.add({
      title: "محصول با موفقیت ویرایش شد",
    });

    isLoading.value = false;
  } catch (err) {
    console.log(err);
    toast.add({
      title: "خطا در ویرایش محصول",
      color: "red",
    });
    isLoading.value = false;
  }
};
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col gap-y-10">
      <Loadings v-if="isLoading" class="m-2" />

      <div class="flex flex-col xl:flex-row gap-8">
        <div class="w-full flex flex-col gap-y-4 lg:gap-y-8">
          <div class="flex flex-col lg:flex-row gap-2 text-sm lg:text-base">
            <p class="text-zinc-500 dark:text-zinc-300 text-nowrap">
              ویرایش محصول :
            </p>
            <p class="text-center leading-6">{{ data?.product.title }}</p>
          </div>

          <DashboardComponentsManageProductImages
            :product-id="data?.product.id!"
            :product-images="data?.product.images"
            @refresh="refresh"
          />

          <div
            v-for="(input, index) in inputs"
            :key="index"
            class="flex flex-col gap-y-2"
          >
            <label class="opacity-80 text-sm">{{ input.label }}</label>
            <!-- @vue-expect-error -->
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

          <div class="flex items-center gap-x-8">
            <div class="flex flex-col gap-y-4">
              <UCheckbox v-model="productData.is_show" label="نمایش" />
              <UCheckbox v-model="productData.is_fast_delivery" label="سریع" />
              <UCheckbox v-model="productData.is_offer" label="پیشنهاد" />
              <UCheckbox v-model="productData.is_fake" label="غیر اصل" />
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
                @update:model-value="
                  (val) => (productData.category_id = Number(val))
                "
              />
            </div>
          </div>
        </div>

        <div class="w-full xl:w-96">
          <DashboardComponentsManageProductVariant
            :product-id="data?.product.id!"
            :product-variants="data?.product.variants"
            @refresh="refresh"
          />
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
          :loading="isLoading"
          :disabled="isLoading"
          :label="isLoading ? 'در حال ویرایش ...' : 'تایید'"
          color="green"
          variant="soft"
          class="px-16 py-3 rounded-xl"
          @click="() => updateProduct(productData)"
        />
      </div>
    </div>
  </ClientOnly>
</template>
