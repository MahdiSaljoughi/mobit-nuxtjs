<script setup lang="ts">
import type { TProductImage } from "~/types";

const props = defineProps<{
  productId: number;
  productImages?: TProductImage[];
}>();

const emit = defineEmits(["refresh"]);

const toast = useToast();

const images = ref<FileList | null>(null);
const loading = reactive({
  isUploading: false,
  isDeleting: false,
});

const fileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    images.value = target.files;
  }
};

const submit = async () => {
  if (!props.productId || !images.value) {
    return;
  }

  loading.isUploading = true;

  const formData = new FormData();
  Array.from(images.value).forEach((file) => {
    formData.append("files", file);
  });

  const { error } = await useFetch(
    `${useRuntimeConfig().public.apiBase}/upload/products/${props.productId}`,
    {
      method: "POST",
      key: "post-image-product",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
      body: formData,
    }
  );

  if (error.value) {
    toast.add({
      title: "خطا در بارگذاری تصاویر",
      color: "red",
    });
    loading.isUploading = false;
    throw new Error(error.value.message);
  }

  images.value = null;

  emit("refresh");

  toast.add({
    title: "تصویر با موفقیت اضافه شد",
  });
  loading.isUploading = false;
};

const deleteImage = async (id: number) => {
  loading.isDeleting = true;

  const { error } = await useFetch(
    `${useRuntimeConfig().public.apiBase}/upload/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
      key: "delete image product",
    }
  );

  if (error.value) {
    toast.add({
      title: "خطا در حذف تصویر!",
      color: "red",
    });
    loading.isDeleting = false;
    throw new Error(error.value.message);
  }

  emit("refresh");

  toast.add({
    title: "تصویر با موفقیت حذف شد",
  });
  loading.isDeleting = false;
};
</script>

<template>
  <Loadings v-if="loading.isUploading || loading.isDeleting" class="m-2" />

  <div class="flex flex-col lg:flex-row gap-4">
    <div>
      <div class="border dark:border-zinc-800 p-4 rounded-2xl w-full lg:w-80">
        <div class="flex flex-col gap-y-4">
          <div>
            <label for="images" class="text-sm mb-4 block text-center"
              >انتخاب تصاویر</label
            >
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              required
              @change="fileChange"
            />
          </div>
          <UButton
            variant="soft"
            color="green"
            class="flex items-center justify-center w-full py-3 rounded-xl"
            :loading="loading.isUploading"
            :disabled="loading.isUploading"
            @click="submit"
          >
            {{ loading.isUploading ? "در حال بارگذاری" : "بارگذاری" }}
          </UButton>
        </div>
      </div>
    </div>

    <div v-if="productImages?.length! > 0">
      <p class="text-sm mb-4">تصاویر بارگذاری شده :</p>
      <ul class="flex flex-wrap gap-4 items-center justify-center">
        <li
          v-for="image in productImages"
          :key="image.id"
          class="p-1 rounded-2xl size-24 bg-zinc-100 dark:bg-zinc-800 relative"
        >
          <NuxtImg
            :src="image.url"
            :alt="'Product Image ' + image.id"
            draggable="false"
            class="w-full h-full object-cover"
          />
          <button
            class="absolute bottom-2 right-2 text-rose-500 p-1 bg-white dark:bg-black rounded-lg flex items-center justify-center shadow-around"
            @click="deleteImage(image.id)"
          >
            <UIcon name="i-heroicons-trash-20-solid" size="20" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
