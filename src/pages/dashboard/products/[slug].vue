<script setup lang="ts">
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

const { data, refresh } = await useProduct().getBySlug(String(slug));

const categories = ref<{ value: number; label: string }[]>([]);

const toast = useToast();

const productData = reactive<IProduct>({
  title: data.value?.title,
  title_eng: data.value?.title_eng,
  slug: data.value?.slug,
  brand: data.value?.brand,
  brand_eng: data.value?.brand_eng,
  category_id: data.value?.category_id,
  description: data.value?.description,
  is_fake: data.value?.is_fake,
  is_fast_delivery: data.value?.is_fast_delivery,
  is_offer: data.value?.is_offer,
  is_show: data.value?.is_show,
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

const { data: category } = await useCategory().getAll();

categories.value =
  category.value?.map((category: TCategory) => ({
    value: category.id,
    label: category.title,
  })) || [];

const updateProduct = (productData: IProduct) => {
  isLoading.value = true;

  const { error } = useProduct().update(String(productData.slug), productData);

  // @ts-expect-error
  if (error.value) {
    // @ts-expect-error
    console.log(error.value);
    toast.add({
      title: "خطا در ویرایش محصول",
      color: "red",
    });
    isLoading.value = false;
  }

  refresh?.();
  isLoading.value = false;
  toast.add({
    title: "محصول با موفقیت ویرایش شد",
  });
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
            <p class="text-center leading-6">{{ data?.title }}</p>
          </div>

          <DashboardComponentsManageProductImages
            :product-id="data?.id!"
            :product-images="data?.images"
            @refresh="refresh"
          />

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
            :product-id="data?.id!"
            :product-variants="data?.variants"
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
