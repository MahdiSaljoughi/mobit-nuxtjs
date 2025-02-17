<script setup lang="ts">
const { status, data, error, refresh } = useCategory().getAll();

const search = ref<string>("");
const page = ref<number>(1);
const pageCount = ref<number>(20);
const pageTotal = computed(() =>
  status.value !== "pending" ? data?.value?.length ?? 0 : 0
);

const categoryData = ref({
  id: 0,
  url: "",
  title: "",
  title_eng: "",
});
const categoryDataCreate = ref({
  url: "",
  title: "",
  title_eng: "",
});
const categoryDataUpdate = ref({
  url: "",
  title: "",
  title_eng: "",
});

const modal = reactive({
  isOpenCreate: false,
  isOpenDelete: false,
  isOpenEdit: false,
});

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
    key: "title",
    label: "عنوان",
    sortable: false,
  },
  {
    key: "title_eng",
    label: "عنوان انگلیسی",
  },
  {
    key: "created_at",
    label: "تاریخ ایجاد",
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

const items = (row: TCategory) => [
  [
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        modal.isOpenEdit = true;

        categoryData.value.id = row.id;
        categoryData.value.title = row.title;

        categoryDataUpdate.value.title = row.title;
        categoryDataUpdate.value.title_eng = row.title_eng;
        categoryDataUpdate.value.url = row.url;
      },
    },
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        modal.isOpenDelete = true;
        categoryData.value.id = row.id;
        categoryData.value.title = row.title;
      },
    },
  ],
];

const filteredRows = computed(() => {
  if (!search.value) {
    return data?.value;
  }

  return data.value?.filter((person: TCategory) => {
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
  openedRows: [rows],
  row: {},
});

const createCategory = async () => {
  await useCategory().create(categoryDataCreate.value);

  modal.isOpenCreate = false;

  await refresh?.();
};

const removeCategory = async () => {
  await useCategory().remove(categoryData.value.id);

  modal.isOpenDelete = false;

  await refresh?.();
};

const updateCategory = async () => {
  await useCategory().update({
    ...categoryDataUpdate.value,
    id: categoryData.value.id,
  });

  modal.isOpenEdit = false;

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
            @click="modal.isOpenCreate = true"
          >
            <UIcon name="i-heroicons-plus-20-solid" size="20" />
            <span class="text-sm hidden sm:block">افزودن دسته بندی</span>
          </UButton>
        </div>
      </div>

      <div v-show="status === 'pending'" class="my-6">
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
        <template #created_at-data="{ row }">
          <div>
            {{ formatJalali(row.created_at) }}
          </div>
        </template>

        <template #expand="{ row }">
          <div
            class="flex flex-col gap-y-6 px-2 py-4 text-xs text-zinc-500 dark:text-zinc-400 border-x dark:border-gray-800"
          >
            <div class="flex items-center gap-x-2">
              <span class="opacity-80">آدرس :</span>
              <span>
                {{ row.url }}
              </span>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">ایجاد شده توسط :</span>
              <span class="text-indigo-500">{{ row.author.user_name }}</span>
            </div>

            <div
              class="flex flex-col gap-y-4 lg:flex-row lg:items-center justify-between"
            >
              <div class="flex items-center gap-x-2 text-emerald-400">
                <span class="opacity-80">تاریخ ثبت نام:</span>
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

    <!-- Modal -->
    <UModal v-model="modal.isOpenCreate">
      <div class="p-4 flex flex-col gap-y-4">
        <p>ایجاد دسته بندی</p>

        <div>
          <p class="opacity-80 text-sm mb-2">عنوان</p>
          <UInput
            v-model="categoryDataCreate.title"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>
        <div>
          <p class="opacity-80 text-sm mb-2">عنوان انگلیسی</p>
          <UInput
            v-model="categoryDataCreate.title_eng"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>
        <div>
          <p class="opacity-80 text-sm mb-2">آدرس</p>
          <UInput
            v-model="categoryDataCreate.url"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <div class="flex justify-end gap-2">
          <UButton
            variant="soft"
            class="px-6 py-3 rounded-xl"
            @click="modal.isOpenCreate = false"
            >انصراف</UButton
          >
          <UButton
            color="green"
            variant="soft"
            class="px-10 py-3 rounded-xl"
            :loading="status === 'pending'"
            :disabled="status === 'pending'"
            @click="createCategory"
            >ذخیره</UButton
          >
        </div>
      </div>
    </UModal>

    <UModal v-model="modal.isOpenDelete">
      <div class="p-4 flex flex-col gap-y-8">
        <p class="text-sm">
          آیا از حذف دسته بندی
          <span class="font-bold">{{ categoryData.title }}</span>
          مطمئن هستید؟
        </p>
        <div class="flex items-center justify-end gap-x-3">
          <UButton
            label="انصراف"
            variant="soft"
            class="px-6 py-3 rounded-xl"
            @click="modal.isOpenDelete = false"
          />
          <UButton
            label="حذف"
            color="red"
            variant="soft"
            class="px-6 py-3 rounded-xl"
            @click="removeCategory"
          />
        </div>
      </div>
    </UModal>

    <UModal v-model="modal.isOpenEdit">
      <div class="p-4 flex flex-col gap-y-4">
        <p>ویرایش دسته بندی {{ categoryData.title }}</p>

        <div>
          <p class="opacity-80 text-sm mb-2">عنوان</p>
          <UInput
            v-model="categoryDataUpdate.title"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>
        <div>
          <p class="opacity-80 text-sm mb-2">عنوان انگلیسی</p>
          <UInput
            v-model="categoryDataUpdate.title_eng"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>
        <div>
          <p class="opacity-80 text-sm mb-2">آدرس</p>
          <UInput
            v-model="categoryDataUpdate.url"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <div class="flex justify-end gap-2">
          <UButton
            variant="soft"
            class="px-6 py-3 rounded-xl"
            @click="modal.isOpenEdit = false"
            >انصراف</UButton
          >
          <UButton
            color="green"
            variant="soft"
            class="px-10 py-3 rounded-xl"
            @click="updateCategory"
            >ذخیره</UButton
          >
        </div>
      </div>
    </UModal>
  </div>
</template>
