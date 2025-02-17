<script setup lang="ts">
import { useCartStore } from "~/stores/cartStore";

definePageMeta({
  layout: "product",
});

const route = useRoute();

const slug = route.params.slug;

const { data, status, error } = await useProduct().getBySlug(String(slug));

const product = data.value;

const variantIndex = ref<number>(0);

const { items } = useCartStore();
const itemInCart = computed(() =>
  items.find((item) => item.id === product!.variants[variantIndex.value].id)
);
const itemQuantity = computed(() => itemInCart.value?.quantity ?? 0);

const isAvailableProduct = computed(() => {
  return (
    product?.variants[variantIndex.value]?.quantity != undefined &&
    product?.variants[variantIndex.value]?.quantity > 0
  );
});

const links = [
  {
    label: "",
    icon: "i-solar-home-smile-linear",
    to: "/",
  },
  {
    label: "کالای دیجیتال",
    to: "/products",
  },
  {
    label: "موبایل",
  },
];
</script>

<template>
  <div v-if="status == 'pending'">
    <Loadings />
  </div>

  <div v-else-if="error" class="bg-red-500 text-white p-10 rounded-3xl">
    {{ error }}
  </div>

  <div
    v-else-if="product?.is_show === false"
    class="flex flex-col gap-y-8 items-center justify-center p-20 fixed inset-0 lg:static"
  >
    <p class="text-sm">محصول یافت نشد!</p>

    <p class="text-sx opacity-70 text-center leading-6">
      مبیت کالاهای زیادی دارد که شما دوست خواهید داشت
    </p>

    <NuxtLink
      to="/"
      class="inline-block bg-main text-white px-12 py-3 text-sx rounded-xl"
    >
      شروع خرید
    </NuxtLink>
  </div>

  <div v-else class="py-6 px-3 sm:px-8 md:px-10 lg:px-16">
    <div class="flex items-center gap-x-4">
      <p class="text-xs text-zinc-600 dark:text-zinc-300">شما اینجا هستید :</p>
      <UBreadcrumb
        :links="links"
        :ui="{
          base: 'text-xs',
        }"
      />
    </div>

    <div class="lg:flex justify-between lg:gap-x-8 pt-4">
      <div class="w-full rounded-2xl">
        <div class="flex flex-col gap-y-4 lg:gap-8">
          <div class="flex gap-4 flex-wrap lg:flex-nowrap">
            <ProductComponentsImages
              :images="product?.images ?? []"
              :alt="product?.title ?? ''"
            />

            <div class="flex flex-col gap-y-4 lg:gap-y-6 w-full">
              <h1
                class="text-sm md:text-base lg:text-lg line-clamp-2 leading-7"
              >
                {{ product?.title }}
              </h1>

              <div
                class="flex flex-col lg:flex-row lg:items-center gap-y-4 gap-x-2"
              >
                <span
                  class="lg:text-nowrap text-left lg:text-right block text-xs text-zinc-400"
                >
                  {{ product?.title_eng }}
                </span>

                <p
                  class="hidden lg:block w-full h-0.5 bg-zinc-100 dark:bg-zinc-800"
                />

                <p class="hidden lg:block text-xs text-zinc-400 text-nowrap">
                  {{ `Mbt - ${product?.id}` }}
                </p>

                <div class="flex lg:hidden items-center gap-x-3">
                  <p class="w-full h-0.5 bg-zinc-100 dark:bg-zinc-800" />
                  <p class="text-xs text-zinc-400 text-nowrap">
                    {{ `Mbt - ${product?.id}` }}
                  </p>
                  <p class="w-full h-0.5 bg-zinc-100 dark:bg-zinc-800" />
                </div>
              </div>

              <div
                class="flex flex-col gap-y-6 lg:flex-row gap-x-4 pb-4 lg:pb-0 border-b-2 border-zinc-100 dark:border-zinc-800 lg:border-none"
              >
                <div
                  class="flex items-center justify-between lg:justify-normal gap-x-2 group w-full"
                >
                  <p class="text-xs text-zinc-600 dark:text-zinc-300">برند :</p>
                  <NuxtLink
                    :to="`https://www.mobit.ir/brand/${product?.brand_eng}`"
                    class="text-main lg:text-black lg:dark:text-white group-hover:text-main group-hover:mr-3 duration-200 text-sx"
                  >
                    {{ product?.brand }}
                  </NuxtLink>
                </div>
                <div
                  class="flex items-center justify-between lg:justify-normal gap-x-2 group w-full"
                >
                  <p class="text-xs text-zinc-600 dark:text-zinc-300">
                    دسته بندی :
                  </p>
                  <NuxtLink
                    :to="product?.category.url"
                    class="text-main lg:text-black lg:dark:text-white group-hover:text-main group-hover:mr-3 duration-200 text-sx"
                  >
                    {{ product?.category.title }}
                  </NuxtLink>
                </div>
              </div>

              <div class="mt-2 lg:mt-4">
                <div
                  v-if="isAvailableProduct"
                  class="flex items-center gap-x-2"
                >
                  <p class="text-xs text-zinc-600 dark:text-zinc-300">رنگ :</p>
                  <p class="text-sx">
                    {{ product?.variants[variantIndex]?.color_name }}
                  </p>
                  <div
                    v-for="(variant, index) in product?.variants"
                    :key="variant.id"
                    class="relative flex items-center justify-center"
                  >
                    <button
                      :style="{ backgroundColor: variant.hex_code }"
                      class="size-8 lg:size-12 rounded-full border-4 border-zinc-200 dark:border-zinc-600"
                      @click="variantIndex = index"
                    />
                    <UIcon
                      v-if="variantIndex === index"
                      name="i-solar-check-circle-line-duotone"
                      class="absolute inset-0 m-auto size-6 lg:size-9"
                      :class="
                        variant.hex_code === '#ffffff' ||
                        variant.hex_code === '#fff'
                          ? 'text-black'
                          : 'text-white'
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col lg:flex-row justify-between w-full gap-x-10"
          >
            <div
              class="lg:sticky top-10 flex items-center gap-x-2 mb-4 bg-gradient-to-r from-transparent to-green-500/40 py-2 pr-4 rounded-lg h-10 lg:w-72"
            >
              svg
              <span class="text-sm lg:text-base">معرفی کالا</span>
            </div>
            <div class="w-full">
              <p class="w-full leading-8 font-IRANr text-sm line-clamp-6">
                {{ product?.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-20 lg:pt-0">
        <div
          class="w-full lg:w-72 xl:w-96 shadow-lg shadow-black lg:shadow-none bg-white lg:bg-zinc-50 dark:bg-zinc-900 lg:rounded-2xl py-4 px-2 lg:p-4 fixed lg:sticky bottom-0 inset-x-0 lg:top-10 z-10"
        >
          <div
            v-if="isAvailableProduct"
            class="flex flex-row-reverse lg:flex-col gap-x-3 gap-y-4 items-center justify-between"
          >
            <div
              class="hidden lg:flex flex-col gap-y-4 border dark:border-zinc-800 w-full p-3 rounded-2xl"
            >
              <div class="flex items-center justify-between">
                <button class="flex items-center gap-x-2">
                  <UIcon
                    name="i-solar-shop-bold-duotone"
                    class="text-red-400"
                    size="36"
                  />
                  <p class="font-IRANr">عصر ارتباط</p>
                </button>
                <button
                  class="bg-main/20 dark:bg-main/10 py-2 px-4 rounded-full text-sx text-slate-700 dark:text-slate-300"
                >
                  خرید حضوری
                </button>
              </div>
              <div class="flex items-center gap-x-2 text-sx">
                <div class="flex items-center gap-x-2">
                  <p class="font-IRANr opacity-80">امتیاز :</p>
                  <div class="flex items-center gap-x-1 text-orange-400">
                    <p>3.43</p>
                    <IconSvg icon-id="i-star" class="size-6 mb-1" />
                  </div>
                </div>

                <div class="w-0.5 h-7 bg-zinc-200 dark:bg-zinc-800" />

                <div class="flex items-center gap-x-2">
                  <p class="font-IRANr opacity-80">عملکرد :</p>
                  <p>عالی</p>
                </div>
              </div>
            </div>

            <div class="hidden lg:flex flex-col gap-y-4 w-full">
              <div class="flex items-center gap-x-2">
                <IconSvg
                  icon-id="i-zemanat-product"
                  class="size-8 text-emerald-400"
                />
                <p class="font-IRANr text-sm">
                  گارانتی اصالت کالا و سلامت فیزیکی
                </p>
              </div>
            </div>

            <div class="flex flex-col items-end lg:w-full lg:h-16">
              <div
                v-if="
                  isAvailableProduct && product?.variants[variantIndex].discount
                "
                class="flex flex-col lg:gap-y-2 items-end lg:w-full"
              >
                <div
                  class="flex flex-row-reverse lg:flex-row items-center justify-end gap-x-3"
                >
                  <p class="line-through opacity-70 mt-1 text-xs lg:text-base">
                    {{
                      product?.variants[variantIndex]?.price.toLocaleString()
                    }}
                  </p>
                  <div
                    class="flex items-center gap-x-0.5 bg-red-400 dark:bg-red-500 rounded-lg pl-0.5 pr-1.5 py-0.5 lg:py-1 lg:pl-1 lg:pr-2 text-white text-xs"
                  >
                    <span>{{ product?.variants[variantIndex]?.discount }}</span>
                    <IconSvg icon-id="i-percent" class="size-4" />
                  </div>
                </div>
                <div class="flex items-center justify-end gap-x-2">
                  <p class="lg:text-xl">
                    {{
                      product?.variants[
                        variantIndex
                      ]?.price_after_discount?.toLocaleString()
                    }}
                  </p>
                  <p class="opacity-90 text-xs lg:text-sm font-IRANr">تومان</p>
                </div>
              </div>
              <div v-else class="flex items-center gap-x-1 mt-auto">
                <p class="lg:text-xl">
                  {{ product?.variants[variantIndex]?.price.toLocaleString() }}
                </p>
                <p class="opacity-90 text-xs lg:text-sm font-IRANr">تومان</p>
              </div>
            </div>

            <div
              class="lg:w-full"
              :class="
                itemQuantity > 0 && 'flex items-center justify-between gap-x-2'
              "
            >
              <CartComponentsItemCounter
                :id="product!.variants[variantIndex].id"
                :title="product!.title"
                :price="product!.variants[variantIndex].discount! ? product!.variants[variantIndex].price_after_discount! : product!.variants[variantIndex].price!"
                :slug="product?.slug!"
                :image="product?.images[variantIndex]?.url!"
                :variant="product?.variants[variantIndex]!"
              />
              <NuxtLink
                v-if="itemQuantity > 0"
                to="/cart"
                class="flex items-center gap-x-2 text-main"
              >
                <IconSvg icon-id="i-cart-fill-new" class="size-5 lg:size-4" />
                <span class="hidden sm:block text-xs">مشاهده سبد خرید</span>
              </NuxtLink>
            </div>
            <button
              class="hidden lg:block w-full border border-zinc-800 dark:border-zinc-600 p-2.5 text-sm rounded-xl font-IRANr"
            >
              رزور حضوری
            </button>
          </div>

          <div v-else class="flex items-center justify-center">
            <div
              class="text-red-500 text-sm bg-red-400/20 py-2 px-8 rounded-xl"
            >
              ناموجود
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
