<script setup lang="ts">
const router = useRouter();

const { status, data, error, refresh } = useProduct().getAll();

const productData = reactive({
  id: 0,
  title: "",
  slug: "",
  is_show: "",
});

const search = ref("");
const page = ref(1);
const pageCount = ref(20);
const isOpenDeleteModal = ref(false);
const isOpenEditIsShowModal = ref(false);

const formatJalali = (isoDate: Date) => {
  if (!isoDate) return "نامشخص";

  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const columns = [
  {
    key: "id",
    label: "آیدی",
    sortable: true,
  },
  {
    key: "images",
    label: "تصویر",
    sortable: false,
  },
  {
    key: "title",
    label: "نام کالا",
    sortable: false,
  },
  {
    key: "is_show",
    label: "نمایش",
  },
  {
    key: "actions",
    label: "عملیات",
  },
];

const sort = ref({
  column: "id",
  direction: "asc" as const,
});

const items = (row: TProduct) => [
  [
    {
      label: "مشاهده",
      icon: "i-heroicons-eye-20-solid",
      click: () => router.push(`/products/${row.slug}`),
    },
    {
      label: "تغیر نمایش",
      icon: "i-heroicons-eye",
      click: () => {
        Object.assign(productData, row);
        isOpenEditIsShowModal.value = true;
      },
    },
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => router.push(`/dashboard/products/${row.slug}`),
    },
  ],
  [
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        Object.assign(productData, row);
        isOpenDeleteModal.value = true;
      },
    },
  ],
];

const pageTotal = computed(() => data.value?.length || 0);

const filteredRows = computed(() => {
  if (!search.value) {
    return data?.value;
  }

  return data.value?.filter((person: TProduct) => {
    return Object.values(person).some((value: unknown) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase());
    });
  });
});

const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value!)
);

const rows = computed(() => {
  return filteredRows.value?.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value
  );
});

const expand = ref({
  openedRows: [],
  row: {},
});

const removeProduct = async () => {
  await useProduct().remove(Number(productData.id));

  isOpenDeleteModal.value = false;

  await refresh?.();
};

const updateProduct = async () => {
  await useProduct().update(productData.slug, {
    is_show: productData.is_show === "true" ? true : false,
  });

  isOpenEditIsShowModal.value = false;

  await refresh?.();
};
</script>

<template>
  <div>
    <div v-if="error" class="my-6">
      <UAlert
        color="red"
        variant="subtle"
        title="خطایی رخ داده است"
        :description="error.message"
      />
    </div>

    <div class="flex flex-col gap-y-6 lg:gap-y-8">
      <div class="flex justify-between gap-x-8">
        <UInput
          v-model="search"
          placeholder="جستجو ..."
          variant="none"
          class="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 w-full lg:w-1/2 xl:w-1/3"
          icon="i-heroicons-magnifying-glass-20-solid"
        />

        <div class="flex items-center gap-x-2">
          <UButton
            class="rounded-xl px-4 py-3"
            :loading="status === 'pending'"
            icon="i-heroicons-arrow-path-20-solid"
            @click="refresh"
          >
            <span class="text-sm hidden sm:block">تازه سازی</span>
          </UButton>
          <UButton
            color="primary"
            variant="solid"
            class="rounded-xl px-4 py-3"
            to="/dashboard/products/create"
          >
            <UIcon name="i-heroicons-plus-20-solid" size="20" />
            <span class="text-sm hidden sm:block">افزودن محصول</span>
          </UButton>
        </div>
      </div>

      <div v-if="status === 'pending'" class="my-6">
        <Loadings />
      </div>

      <UTable
        v-model:expand="expand"
        :rows="rows"
        :columns="columns"
        :sort="sort"
        :loading="status === 'pending'"
        :loading-state="{
          icon: 'i-heroicons-arrow-path-20-solid',
          label: 'در حال دریافت اطلاعات...',
        }"
        :progress="{ color: 'primary', animation: 'carousel' }"
        :empty-state="{
          icon: 'i-heroicons-circle-stack-20-solid',
          label: 'چیزی یافت نشد',
        }"
        :ui="{
          td: { size: 'text-xs', padding: 'p-2' },
          th: { size: 'text-xs' },
        }"
      >
        <template #images-data="{ row }">
          <div
            class="p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 inline-block w-16"
          >
            <NuxtImg
              :src="row.images[0]?.url"
              :alt="row.title"
              class="w-full"
            />
          </div>
        </template>

        <template #title-data="{ row }">
          <p class="lg:text-wrap line-clamp-2 leading-6">
            {{ row.title.slice(0, 60) + "..." }}
          </p>
        </template>

        <template #expand="{ row }: { row: TProduct }">
          <div
            class="flex flex-col gap-y-6 px-2 py-4 text-xs text-zinc-500 dark:text-zinc-400 border-x dark:border-gray-800"
          >
            <div class="flex items-center gap-x-2">
              <span class="opacity-80">عنوان :</span>
              <span class="text-main">{{ row.title }}</span>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">عنوان انگلیسی :</span>
              <span>{{ row.title_eng }}</span>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">اسلاگ :</span>
              <span class="text-orange-400">{{ row.slug }}</span>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">تصاویر :</span>
              <div
                v-for="image in row.images"
                :key="image.id"
                class="p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 w-20 mx-1"
              >
                <NuxtImg :src="image?.url" :alt="row.title" class="w-full" />
              </div>
            </div>

            <div>
              <p class="opacity-80 my-4">ویژگی ها :</p>
              <ul
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <li
                  v-for="variant in row.variants"
                  :key="variant.id"
                  class="border dark:border-slate-800 rounded-xl p-3 flex flex-col gap-y-2 w-max xl:w-full max-w-72"
                >
                  <div class="flex items-center gap-x-2">
                    <p class="opacity-70">رنگ :</p>
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
                    <p class="opacity-70">تعداد :</p>
                    <p>{{ variant.quantity + " عدد " }}</p>
                  </div>
                  <div class="flex items-center gap-x-2">
                    <p class="opacity-70">قیمت :</p>
                    <p>{{ variant.price.toLocaleString() }}</p>
                  </div>
                  <div v-if="variant.discount" class="flex flex-col gap-y-2">
                    <div class="flex items-center gap-x-2 text-red-400">
                      <p class="opacity-70">تخفیف :</p>
                      <p>{{ variant.discount + " ٪ " }}</p>
                    </div>
                    <div class="flex items-center gap-x-2 text-emerald-400">
                      <p class="opacity-70">قیمت با تخفیف :</p>
                      <p>
                        {{ variant.price_after_discount?.toLocaleString() }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">ایجاد شده توسط :</span>
              <span class="text-indigo-500">{{ row.author.user_name }}</span>
            </div>

            <p class="leading-6">
              <span class="opacity-80 inline-block ml-2">توضیحات :</span>
              <span
                class="font-IRANr text-black dark:text-zinc-300 line-clamp-6"
              >
                {{ row.description }}
              </span>
            </p>

            <!-- Date -->
            <div
              class="flex flex-col gap-y-4 lg:flex-row lg:items-center justify-between"
            >
              <div class="flex items-center gap-x-2 text-emerald-400">
                <span class="opacity-80">تاریخ ایجاد:</span>
                <span>
                  {{ formatJalali(row.created_at) }}
                </span>
              </div>
              <div class="flex items-center gap-x-2 text-orange-400">
                <span class="opacity-80">تاریخ ویرایش:</span>
                <span>
                  {{ formatJalali(row.updated_at) }}
                </span>
              </div>
            </div>
          </div>
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="primary"
              variant="soft"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <div class="flex flex-wrap justify-between items-center">
        <p class="flex items-center gap-x-1 text-sx opacity-80 font-IRANr">
          نمایش
          <span>{{ pageFrom }}</span>
          تا
          <span>{{ pageTo }}</span>
          از
          <span>{{ pageTotal }}</span>
          نتیجه
        </p>

        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="pageTotal!"
          :ui="{
            wrapper: 'flex items-center gap-1',
            rounded: '!rounded-xl justify-center',
          }"
        />
      </div>
    </div>
  </div>

  <!-- Modal -->
  <UModal v-model="isOpenDeleteModal">
    <div class="p-4 flex flex-col gap-y-8">
      <p class="text-sm leading-7">
        آیا از حذف
        <span>{{ productData.title }}</span>
        مطمئن هستید؟
      </p>
      <div class="flex items-center justify-end gap-x-3">
        <UButton
          label="انصراف"
          variant="soft"
          class="px-6 py-3 rounded-xl"
          @click="isOpenDeleteModal = false"
        />
        <UButton
          label="حذف"
          color="red"
          variant="soft"
          class="px-10 py-3 rounded-xl"
          @click="removeProduct"
        />
      </div>
    </div>
  </UModal>

  <UModal v-model="isOpenEditIsShowModal">
    <div class="p-4 flex flex-col gap-y-8">
      <p class="text-sm leading-7">
        آیا از تغیر نمایش
        <span>{{ productData.title }}</span>
        مطمئن هستید؟
      </p>

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

      <div class="flex items-center justify-end gap-x-3">
        <UButton
          label="انصراف"
          variant="soft"
          class="px-6 py-3 rounded-xl"
          @click="isOpenEditIsShowModal = false"
        />
        <UButton
          label="تایید"
          color="green"
          variant="soft"
          class="px-10 py-3 rounded-xl"
          @click="updateProduct"
        />
      </div>
    </div>
  </UModal>
</template>
