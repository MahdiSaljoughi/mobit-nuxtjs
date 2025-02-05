<script setup lang="ts">
import useUsers from "~/features/user/composables/useUser";

const { status, users, error } = await useUsers().getAll();

const search = ref<string>("");
const page = ref<number>(1);
const pageCount = ref<number>(20);
const pageTotal = ref(users?.length);
const isOpenDeleteModal = ref<boolean>(false);
const isOpenEditModal = ref<boolean>(false);
const userInfo = reactive({
  id: "",
  user_name: "",
  role: "",
  email: "",
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

const items = (row: any) => [
  [
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        isOpenEditModal.value = true;
        userInfo.user_name = row.user_name;
        userInfo.id = row.id;
      },
    },
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        isOpenDeleteModal.value = true;
        userInfo.user_name = row.user_name;
        userInfo.id = row.id;
      },
    },
  ],
];

const filteredRows = computed(() => {
  if (!search.value) {
    return users;
  }

  return users?.filter((person: any) => {
    return Object.values(person).some((value: any) => {
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
  await useUsers().remove(Number(userInfo.id));
  isOpenDeleteModal.value = false;
};

const editUser = async () => {
  isOpenEditModal.value = false;
};
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

    <div class="flex flex-col gap-y-6 lg:gap-y-8">
      <UInput
        v-model="search"
        placeholder="جستجو ..."
        variant="none"
        class="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 w-full lg:w-1/2 xl:w-1/3"
        icon="i-heroicons-magnifying-glass-20-solid"
      />

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
              <div class="flex items-center gap-x-2">
                <span class="opacity-80">تاریخ ثبت نام:</span>
                <span>
                  {{ formatJalali(row.created_at) }}
                </span>
              </div>
              <div class="flex items-center gap-x-2">
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
          <span class="font-bold">{{ userInfo.user_name }}</span>
          مطمئن هستید؟
        </p>
        <div class="flex items-center justify-end gap-x-3">
          <UButton
            label="انصراف"
            variant="soft"
            class="px-6 py-2 rounded-xl"
            @click="isOpenDeleteModal = false"
          />
          <UButton
            label="حذف"
            color="red"
            variant="soft"
            class="px-6 py-2 rounded-xl"
            @click="removeUser"
          />
        </div>
      </div>
    </UModal>

    <UModal v-model="isOpenEditModal" fullscreen>
      <div class="p-4 flex flex-col gap-y-8">
        <p class="text-sm">
          آیا از ویرایش کاربر
          <span class="font-bold">{{ userInfo.user_name }}</span>
          مطمئن هستید؟
        </p>
        <div class="flex items-center justify-end gap-x-3">
          <UButton
            label="انصراف"
            color="red"
            variant="soft"
            class="px-6 py-2 rounded-xl"
            @click="isOpenEditModal = false"
          />
          <UButton
            label="ویرایش"
            color="primary"
            variant="soft"
            class="px-6 py-2 rounded-xl"
            @click="editUser"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>
