<script setup lang="ts">
import type { UserRole } from "@prisma/client";
import type { TUser } from "~/types";

const { status, data, error, refresh } = await useUser().getAll();

const search = ref<string>("");
const page = ref<number>(1);
const pageCount = ref<number>(20);
const pageTotal = computed(() => {
  if (status?.value != "pending") {
    return data?.value?.users.length;
  } else return 0;
});

const userData = reactive({
  id: "",
  user_name: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  role: "",
  email_verified: false,
});

const isOpenDeleteModal = ref<boolean>(false);
const isOpenEditModal = ref<boolean>(false);

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
    key: "user_name",
    label: "نام کاربری",
    sortable: false,
  },
  {
    key: "role",
    label: "نقش",
    sortable: true,
  },
  {
    key: "email",
    label: "ایمیل",
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

const items = (row: TUser) => [
  [
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        isOpenEditModal.value = true;
        Object.assign(userData, row);
      },
    },
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        isOpenDeleteModal.value = true;
        Object.assign(userData, row);
      },
    },
  ],
];

const filteredRows = computed(() => {
  if (!search.value) {
    return data?.value?.users;
  }

  return data?.value?.users?.filter((person: TUser) => {
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

const removeUser = async () => {
  await useUser().remove(Number(userData.id));

  isOpenDeleteModal.value = false;

  await refresh?.();
};

const updateUser = async () => {
  await useUser().update({
    ...userData,
    id: Number(userData.id),
    role: userData.role as UserRole,
  });

  isOpenEditModal.value = false;

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
        <template #expand="{ row }">
          <div
            class="flex flex-col gap-y-6 px-2 py-4 text-xs text-zinc-500 dark:text-zinc-400 border-x dark:border-gray-800"
          >
            <div class="flex items-center gap-x-2">
              <span class="opacity-80">شماره تلفن:</span>
              <span>
                {{ row.phone }}
              </span>
            </div>
            <div class="flex items-center gap-x-2">
              <span class="opacity-80">نام:</span>
              <span>
                {{ row.first_name }}
              </span>
            </div>
            <div class="flex items-center gap-x-2">
              <span class="opacity-80">نام خانوادگی:</span>
              <span>
                {{ row.last_name }}
              </span>
            </div>
            <div class="flex items-center gap-x-2">
              <span class="opacity-80">ایمیل:</span>
              <span>
                {{ row.email_verified }}
              </span>
            </div>

            <div class="flex items-center justify-between">
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
    <UModal v-model="isOpenDeleteModal">
      <div class="p-4 flex flex-col gap-y-8">
        <p class="text-sm">
          آیا از حذف کاربر
          <span class="font-bold">{{ userData.user_name }}</span>
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
            class="px-6 py-3 rounded-xl"
            @click="removeUser"
          />
        </div>
      </div>
    </UModal>

    <UModal v-model="isOpenEditModal">
      <div class="p-4 flex flex-col gap-y-4">
        <p>ویرایش کاربر {{ userData.user_name }}</p>

        <div>
          <p class="opacity-80 text-sm mb-2">نام کاربری</p>
          <UInput
            v-model="userData.user_name"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">نام</p>
          <UInput
            v-model="userData.first_name"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">نام خانوادگی</p>
          <UInput
            v-model="userData.last_name"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">ایمیل</p>
          <UInput
            v-model="userData.email"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">شماره تلفن</p>
          <UInput
            v-model="userData.phone"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <div>
          <p class="opacity-80 text-sm mb-2">نقش</p>
          <USelect
            v-model="userData.role"
            :options="['CUSTOMER', 'ADMIN']"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>

        <UCheckbox v-model="userData.email_verified" label="تایید ایمیل" />

        <div class="flex justify-end gap-2">
          <UButton
            variant="soft"
            class="px-6 py-3 rounded-xl"
            @click="isOpenEditModal = false"
            >انصراف</UButton
          >
          <UButton
            color="green"
            variant="soft"
            class="px-10 py-3 rounded-xl"
            @click="updateUser"
            >ذخیره</UButton
          >
        </div>
      </div>
    </UModal>
  </div>
</template>
