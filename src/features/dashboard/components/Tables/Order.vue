<script setup lang="ts">
const { status, data, error, refresh } = useOrder().getAll();

const search = ref<string>("");
const page = ref<number>(1);
const pageCount = ref<number>(10);
const pageTotal = computed(() => data?.value?.length ?? 0);

const orderData = reactive({
  id: 0,
});
const orderDataUpdate = ref<Partial<TOrder>>({
  total_price: 0,
  status: "PENDING",
  payment_method: "ONLINE",
  delivery_address: "",
});

const modal = reactive({
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
    key: "customer.user_name",
    label: "کاربر",
  },
  {
    key: "status",
    label: "وضعیت",
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

const items = (row: TOrder) => [
  [
    {
      label: "ویرایش",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        modal.isOpenEdit = true;

        orderData.id = row.id;

        orderDataUpdate.value.total_price = row.total_price;
        orderDataUpdate.value.status = row.status;
        orderDataUpdate.value.payment_method = row.payment_method;
        orderDataUpdate.value.delivery_address = row.delivery_address;
      },
    },
    {
      label: "حذف",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        modal.isOpenDelete = true;
        orderData.id = row.id;
      },
    },
  ],
];

const filteredRows = ref<TOrder[]>([]);

watchEffect(() => {
  if (!data.value) return;
  let tempRows = [...data.value];

  if (search.value) {
    tempRows = tempRows.filter((order) =>
      Object.values(order).some((value) =>
        String(value).toLowerCase().includes(search.value.toLowerCase())
      )
    );
  }

  filteredRows.value = tempRows.slice(
    (page.value - 1) * pageCount.value,
    page.value * pageCount.value
  );
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

const removeCategory = async () => {
  await useOrder().remove(orderData.id);

  modal.isOpenDelete = false;

  await refresh?.();
};

const updateCategory = async () => {
  await useOrder().update(
    {
      ...orderDataUpdate.value,
      total_price: Number(orderDataUpdate.value.total_price),
    },
    orderData.id
  );

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
        :description="error.data?.message"
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

        <UButton
          class="rounded-xl px-4 py-3"
          :loading="status === 'pending'"
          icon="i-heroicons-arrow-path-20-solid"
          @click="refresh"
        >
          <span class="text-sm hidden sm:block">تازه سازی</span>
        </UButton>
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
        <template #status-data="{ row }">
          <p v-if="row.status === 'PENDING'" class="text-orange-400">
            در حال انتظار
          </p>
          <p v-else-if="row.status === 'SHIPPED'" class="text-green-500">
            ارسال شده
          </p>
          <p v-else-if="row.status === 'CANCELED'" class="text-red-500">
            لغو شده
          </p>
          <p v-else-if="row.status === 'DELIVERED'" class="text-green-500">
            تحویل داده شده
          </p>
          <p v-else class="text-main">در حال پردازش</p>
        </template>

        <template #created_at-data="{ row }">
          <p>
            {{ formatJalali(row.created_at) }}
          </p>
        </template>

        <template #expand="{ row }: { row: TOrder }">
          <div
            class="flex flex-col gap-y-6 px-2 py-4 text-xs text-zinc-500 dark:text-zinc-400 border-x dark:border-gray-800"
          >
            <div class="flex items-center gap-x-2">
              <span class="opacity-80">روش پرداخت :</span>
              <p v-if="row.payment_method === 'ONLINE'" class="text-main">
                آنلاین
              </p>
              <p v-else class="text-orange-400">حضوری</p>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">مبلغ کل :</span>
              <span>
                {{ row.total_price.toLocaleString() }}
              </span>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">وضعیت :</span>
              <p v-if="row.status === 'PENDING'" class="text-orange-400">
                در حال انتظار
              </p>
              <p v-else-if="row.status === 'SHIPPED'" class="text-green-500">
                ارسال شده
              </p>
              <p v-else-if="row.status === 'CANCELED'" class="text-red-500">
                لغو شده
              </p>
              <p v-else-if="row.status === 'DELIVERED'" class="text-green-500">
                تحویل داده شده
              </p>
              <p v-else class="text-main">در حال پردازش</p>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">آدرس :</span>
              <span>
                {{ row.delivery_address }}
              </span>
            </div>

            <div class="flex items-center gap-x-2">
              <span class="opacity-80">مشخصات کاربر :</span>
              <span class="text-indigo-500">{{ row.customer.user_name }}</span>
              <span class="text-indigo-500">{{ row.customer.first_name }}</span>
              <span class="text-indigo-500">{{ row.customer.last_name }}</span>
              <span class="text-indigo-500">{{ row.customer.phone }}</span>
              <span class="text-indigo-500">{{ row.customer.role }}</span>
            </div>

            <div class="flex items-center flex-wrap gap-4">
              <NuxtLink
                v-for="product in row.products"
                :key="product.id"
                :to="`/products/${product.product.slug}`"
                class="flex flex-col gap-y-4 shadow-around w-fit p-4 rounded-xl"
              >
                <div class="flex gap-x-2">
                  <div>
                    <div
                      class="flex items-center justify-center size-24 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
                    >
                      <NuxtImg :src="product.image" />
                    </div>
                  </div>
                  <div class="flex flex-col gap-y-4">
                    <p class="line-clamp-2 max-w-60 leading-5">
                      {{ product.product.title }}
                    </p>
                    <p>{{ product.quantity + " " + "عدد" }}</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <p>{{ product.price.toLocaleString() + " " + "تومان" }}</p>
                  <div class="flex items-center gap-x-2">
                    <p>{{ product.color_name }}</p>
                    <div
                      :style="{ backgroundColor: product.hex_code }"
                      class="size-5 rounded-md ring ring-main/20"
                    />
                  </div>
                </div>
              </NuxtLink>
            </div>

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

    <!-- Modal -->
    <UModal v-model="modal.isOpenDelete">
      <div class="p-4 flex flex-col gap-y-8">
        <p class="text-sm">
          آیا از حذف سفارش
          <span class="font-bold">{{ orderData.id }}</span>
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
        <p>ویرایش سفارش {{ orderData.id }}</p>

        <div>
          <p class="opacity-80 text-sm mb-2">مبلغ کل</p>
          <UInput
            v-model="orderDataUpdate.total_price"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>
        <div>
          <p class="opacity-80 text-sm mb-2">وضعیت</p>
          <USelect
            v-model="orderDataUpdate.status"
            :options="[
              {
                label: 'در حال انتظار',
                value: 'PENDING',
              },
              {
                label: 'در حال پردازش',
                value: 'PROCESSING',
              },
              {
                label: 'ارسال شده',
                value: 'SHIPPED',
              },
              {
                label: 'تحویل داده شده',
                value: 'DELIVERED',
              },
              {
                label: 'لغو شده',
                value: 'CANCELED',
              },
            ]"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>
        <div>
          <p class="opacity-80 text-sm mb-2">روش پرداخت</p>
          <USelect
            v-model="orderDataUpdate.payment_method"
            :options="[
              {
                label: 'آنلاین',
                value: 'ONLINE',
              },
              {
                label: 'حضوری',
                value: 'FACETOFACE',
              },
            ]"
            size="xl"
            :ui="{
              rounded: 'rounded-xl',
            }"
          />
        </div>
        <div>
          <p class="opacity-80 text-sm mb-2">آدرس</p>
          <UInput
            v-model="orderDataUpdate.delivery_address"
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
