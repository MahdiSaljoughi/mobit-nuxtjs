<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";

const summary = ref({
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
  pendingOrders: 0,
});

const salesTrend = ref({
  series: [{ name: "فروش", data: [1500000, 1800000, 2100000, 1950000] }],
  chartOptions: {
    chart: { type: "area" },
    colors: ["#377DFF"],
    stroke: { width: 2, curve: "smooth" },
    markers: { size: 4, colors: ["#FF5722"] },
    toolbar: { show: false },
    xaxis: {
      categories: [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ],
      labels: { style: { colors: "#377DFF", fontSize: "12.8px" } },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: { style: { colors: "#377DFF", fontSize: "12.8px" } },
    },
    grid: { borderColor: "" },
  },
});

onMounted(() => {
  summary.value = {
    totalUsers: 1245,
    totalOrders: 320,
    totalRevenue: 12850000,
    pendingOrders: 15,
  };
});
</script>

<template>
  <div class="">
    <div class="">
      <h3 class="mb-4">نمودار فروش</h3>
      <ClientOnly>
        <VueApexCharts
          :options="salesTrend.chartOptions"
          :series="salesTrend.series"
          type="area"
          height="400"
        />
      </ClientOnly>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      <div class="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-around">
        <h3 class="text-center mb-4">کاربران</h3>
        <p class="opacity-80 text-center">{{ summary.totalUsers }}</p>
      </div>
      <div class="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-around">
        <h3 class="text-center mb-4">سفارشات</h3>
        <p class="opacity-80 text-center">{{ summary.totalOrders }}</p>
      </div>
      <div class="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-around">
        <h3 class="text-center mb-4">درآمد</h3>
        <p class="opacity-80 text-center">{{ summary.totalRevenue }} تومان</p>
      </div>
      <div class="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl shadow-around">
        <h3 class="text-center mb-4">سفارشات معلق</h3>
        <p class="opacity-80 text-center">{{ summary.pendingOrders }}</p>
      </div>
    </div>
  </div>
</template>
