<script setup lang="ts">
import type { TProductImage } from "~/types";

const props = defineProps<{
  productId: number;
  productImages?: TProductImage[];
}>();

const toast = useToast();

const images = ref<FileList | null>(null);
const selectedFileName = ref("");

const fileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    images.value = target.files;
    selectedFileName.value =
      target.files.length > 1
        ? `${target.files.length} فایل انتخاب شد`
        : target.files[0].name;
  } else {
    images.value = null;
    selectedFileName.value = "انتخاب فایل";
  }
};

const submit = async () => {
  if (!props.productId || !images.value) {
    return;
  }

  const formData = new FormData();
  Array.from(images.value).forEach((file) => {
    formData.append("image", file);
  });
  formData.append("product_id", props.productId.toString());

  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/products/images`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
      body: formData,
    });

    toast.add({
      title: "تصویر با موفقیت اضافه شد",
    });

    images.value = null;
    selectedFileName.value = "انتخاب فایل";
  } catch (error) {
    console.log("خطا در بارگذاری تصاویر:", error);
  }
};

const deleteImage = async (id: number) => {
  try {
    await $fetch(`${useRuntimeConfig().public.apiBase}/products/images/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${useAuths().data.value?.user.access_token}`,
      },
    });

    toast.add({
      title: "تصویر با موفقیت حذف شد",
    });
  } catch (error) {
    console.log("خطا در حذف تصویر:", error);
  }
};
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-4">
    <div>
      <div class="border dark:border-zinc-800 p-4 rounded-2xl w-full lg:w-80">
        <form @submit.prevent="submit">
          <div class="flex flex-col gap-y-4">
            <div>
              <label for="images" class="text-sm mb-4 block text-center"
                >انتخاب تصاویر</label
              >
              <label
                for="images"
                class="cursor-pointer text-main bg-main/10 hover:bg-main/30 py-3 rounded-xl text-center transition-all block text-sm"
              >
                {{ selectedFileName || "انتخاب" }}
              </label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                required
                @change="fileChange"
              />
            </div>
            <UButton
              type="submit"
              variant="soft"
              color="green"
              class="block w-full py-3 rounded-xl"
            >
              بارگذاری
            </UButton>
          </div>
        </form>
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
