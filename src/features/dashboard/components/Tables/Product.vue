<script setup lang="ts">
import useProduct from "~/features/product/composables/useProduct";

const { status, products, error } = await useProduct().getAll();

const formatJalali = (isoDate?: string) => {
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
    label: "نام کالا",
    sortable: false,
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

const items = (row: any) => [
  [
    {
      label: "مشاهده",
      icon: "i-heroicons-eye-20-solid",
      click: () => console.log("See", row.id),
    },
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => console.log("Delete", row.id),
    },
  ],
];

const search = ref("");

const filteredRows = computed(() => {
  if (!search.value) {
    return products;
  }

  return products!.filter((person: any) => {
    return Object.values(person).some((value: any) => {
      return String(value).toLowerCase().includes(search.value.toLowerCase());
    });
  });
});

const page = ref(1);
const pageCount = ref(20);
const pageTotal = ref(products?.length);
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
</script>

<template>
  <div>
    <div v-show="status === 'pending'" class="my-6">
      <Loadings />
    </div>

    <div v-if="error" class="my-6">
      <UAlert
        color="red"
        variant="subtle"
        title="خطایی رخ داده است"
        :description="error.message"
      />
    </div>

    <div v-else class="flex flex-col gap-y-6 lg:gap-y-8">
      <div class="flex justify-between gap-x-8">
        <UInput
          v-model="search"
          placeholder="جستجو ..."
          variant="none"
          class="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 w-full lg:w-1/3"
          icon="i-heroicons-magnifying-glass-20-solid"
        />

        <UButton color="primary" variant="solid" class="rounded-xl">
          <span class="text-sm">افزودن کاربر</span>
          <UIcon name="i-heroicons-plus-20-solid" size="20" />
        </UButton>
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
          base: 'min-w-full',
        }"
      >
        <template #expand="{ row }">
          <div class="p-4 flex flex-col gap-y-4">
            <div class="text-sm">
              <span class="opacity-80 text-sx">شماره تلفن:</span>
              <span class="mr-2 inline-block">
                {{ row.phone }}
              </span>
            </div>
            <div class="text-sm">
              <span class="opacity-80 text-sx">نام:</span>
              <span class="mr-2 inline-block">
                {{ row.first_name }}
              </span>
            </div>
            <div class="text-sm">
              <span class="opacity-80 text-sx">نام خانوادگی:</span>
              <span class="mr-2 inline-block">
                {{ row.last_name }}
              </span>
            </div>
            <div class="text-sm">
              <span class="opacity-80 text-sx">ایمیل:</span>
              <span class="mr-2 inline-block">
                {{ row.email_verified }}
              </span>
            </div>
            <div class="text-sm">
              <span class="opacity-80 text-sx">تاریخ ثبت نام:</span>
              <span class="mr-2 inline-block">
                {{ formatJalali(row.created_at) }}
              </span>
            </div>
            <div class="text-sm">
              <span class="opacity-80 text-sx">تاریخ ویرایش:</span>
              <span class="mr-2 inline-block">
                {{ formatJalali(row.updated_at) }}
              </span>
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
</template>
