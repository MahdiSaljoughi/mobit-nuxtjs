<script setup lang="ts">
import { useCartStore } from "~/stores/cartStore";

definePageMeta({
  middleware: ["shipping"],
});

const { items, totalPrice, clearCart } = useCartStore();

const dataCreateOrder = reactive({
  total_price: totalPrice,
  payment_method: "ONLINE" as keyof TOrderPayMentMethod,
  delivery_address: "",
});

const orderId = ref<number>();

const submitOrder = async () => {
  const { data, error, status } = await useOrder().create(dataCreateOrder);

  if (error.value?.data) {
    useToast().add({
      title: `${error.value.data?.statusCode.toString()} - خطا در ثبت سفارش`,
      description: error.value.data?.message,
      color: "red",
    });

    return;
  }

  if (status.value === "success" && data.value?.id) {
    orderId.value = data.value?.id;
    useToast().add({
      title: "سفارش با موفقیت ثبت شد",
    });
  }

  if (status.value === "pending") {
    useToast().add({
      title: "در حال ثبت سفارش",
      icon: "i-line-md-loading-loop",
    });
  }
};

const onPaymentClick = () => {
  if (!orderId.value) {
    useToast().add({
      title: "خطا در ثبت شناسه سفارش",
      color: "red",
    });

    return;
  }

  const mapItems = items.map((item) => ({
    order_id: orderId.value,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
    color_name: item.variant.color_name,
    hex_code: item.variant.hex_code,
    image: item.image,
  }));

  const { error } = useOrder().createProduct(mapItems);

  if (error.value?.data) {
    useToast().add({
      title: `${error.value.data?.statusCode.toString()} - خطا در تکمیل سفارش`,
      description: error.value.data?.message,
      color: "red",
    });

    return;
  }

  setTimeout(() => {
    location.reload();
  }, 2000);

  clearCart();

  navigateTo("/profile");

  useToast().add({
    title: "سفارش با موفقیت تکمیل شد",
  });
};
</script>

<template>
  <NuxtLayout name="cart" @payment-clicked="onPaymentClick">
    <div class="my-4 lg:mb-20 flex flex-col gap-y-10">
      <div
        class="flex flex-col lg:flex-row gap-y-10 justify-between w-full gap-x-10"
      >
        <div class="flex flex-col gap-y-4 w-full">
          <div class="border dark:border-zinc-700 rounded-2xl">
            <div
              class="border-b dark:border-zinc-700 p-4 flex flex-col gap-y-4"
            >
              <p>نحوه ارسال توسط مبیت</p>
              <span
                class="block text-xs text-zinc-600 dark:text-zinc-300 leading-7"
              >
                سفارش شما تا ساعت 12 روزهای کاری تحویل پست میگردد، لازم به ذکر
                است سفارش بسته به مقصد مورد نظر از یک تا پنج روز کاری به دست شما
                میرسد.
              </span>
              <span class="text-sx text-zinc-600 dark:text-zinc-300"
                >هزینه ارسال : رایگان</span
              >
            </div>
            <div class="p-4">
              <div
                class="flex flex-col lg:flex-row gap-y-4 lg:items-center justify-between mb-4 text-zinc-600 dark:text-zinc-300 text-sx"
              >
                <div class="flex items-center gap-x-2">
                  <IconSvg icon-id="i-store-fill" class="size-6 text-main" />
                  <span> سفارش شما توسط مبیت ارسال خواهد شد </span>
                </div>
                <div class="flex items-center gap-x-2">
                  <UIcon
                    name="i-eva-car-fill"
                    size="20"
                    class="text-orange-400"
                  />
                  <span> ارسال عادی </span>
                </div>
                <div class="flex items-center gap-x-2">
                  <UIcon
                    name="i-eva-checkmark-circle-fill"
                    size="20"
                    class="text-emerald-500"
                  />
                  <span>آماده ارسال</span>
                </div>
              </div>
              <div class="flex flex-wrap items-center gap-4">
                <div v-for="item in items" :key="item.id" class="relative">
                  <NuxtLink
                    :to="`/products/${item.slug}`"
                    class="bg-zinc-100 dark:bg-zinc-800 p-3 lg:p-4 rounded-xl block"
                  >
                    <NuxtImg
                      :src="item.image"
                      :alt="item.title"
                      class="mx-auto w-20"
                      draggable="false"
                    />
                  </NuxtLink>
                  <div
                    class="bg-main text-white p-3 size-2 text-xs rounded-full flex items-center justify-center absolute bottom-0"
                  >
                    {{ item.quantity }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-y-4 mt-2 lg:mt-4">
            <p>آدرس تحویل سفارش</p>
            <UInput
              v-model="dataCreateOrder.delivery_address"
              size="xl"
              class="w-full"
              :ui="{
                rounded: 'rounded-xl',
              }"
            />
          </div>
        </div>
      </div>
      <div
        class="flex flex-col lg:flex-row gap-y-10 justify-between w-full gap-x-10"
      >
        <div class="flex flex-col gap-y-4 w-full">
          <div class="">
            <div>
              <p class="mb-4">انتخاب شیوه پرداخت</p>
              <p class="text-sx mb-6 text-zinc-600 dark:text-zinc-300">
                روش مناسب را جهت پرداخت مبلغ سفارش انتخاب کنید
              </p>

              <div role="group" aria-labelledby="my-radio-group">
                <div
                  class="flex flex-col sm:flex-row items-center gap-4 lg:gap-8 w-full"
                >
                  <button
                    class="flex items-center bg-blue-500/10 ring ring-blue-500/50 py-3 lg:py-4 pr-3 lg:pr-4 pl-10 rounded-xl w-full"
                    @click="dataCreateOrder.payment_method = 'ONLINE'"
                  >
                    <div
                      class="size-5 border-2 border-blue-500 rounded-full flex items-center justify-center ml-3"
                    >
                      <div
                        class="size-3 rounded-full"
                        :class="
                          dataCreateOrder.payment_method === 'ONLINE' &&
                          'bg-blue-500'
                        "
                      />
                    </div>
                    <p class="text-sm">پرداخت آنلاین</p>
                  </button>
                  <button
                    class="flex items-center bg-red-500/10 ring ring-red-500/50 py-3 lg:py-4 pr-3 lg:pr-4 pl-10 rounded-xl w-full"
                    @click="dataCreateOrder.payment_method = 'FACETOFACE'"
                  >
                    <div
                      class="size-5 border-2 border-red-500 rounded-full flex items-center justify-center ml-3"
                    >
                      <div
                        class="size-3 rounded-full"
                        :class="
                          dataCreateOrder.payment_method === 'FACETOFACE' &&
                          'bg-red-500'
                        "
                      />
                    </div>
                    <p class="text-sm">پرداخت درب منزل</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            class="bg-blue-500 rounded-xl py-3 text-white text-sm w-full my-2"
            @click="submitOrder"
          >
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
