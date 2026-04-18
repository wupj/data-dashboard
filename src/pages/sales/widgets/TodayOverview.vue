<template>
  <div class="grid grid-cols-4 gap-4" v-loading="isLoading">
    <div
      v-for="(item, index) in indicatorList"
      :key="index"
      class="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-gray-700/50 shadow-2xl"
    >
      <div class="text-sm text-gray-400 mb-1">{{ item.label }}</div>
      <div class="text-xl font-bold text-cyan-400">
        {{ indicatorData[item.prop] }} {{ item.unit }}
      </div>
      <div class="mt-2 h-5">
        <canvas
          :ref="(el: any) => setChartRef(el, `sparkline-${index}`)"
          class="w-full h-full"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import { getTodayOverview } from '@/api/sales';

const { t } = useI18n();

const indicatorList = ref([
  {
    prop: 'customerNum',
    label: t('sales.totalCustomer'),
    unit: t('sales.family'),
  },
  {
    prop: 'tradeAreaNum',
    label: t('sales.totalBusinessDistrict'),
    unit: t('sales.orders'),
  },
  {
    prop: 'totalVolume',
    label: t('sales.totalTransactionVolume'),
    unit: t('sales.orders'),
  },
  {
    prop: 'todayVisit',
    label: t('sales.todayVisit'),
    unit: t('sales.orders'),
  },
  {
    prop: 'newCustomer',
    label: t('sales.newCustomersAddedToday'),
    unit: t('sales.orders'),
  },
  {
    prop: 'todayOrder',
    label: t('sales.orderToday'),
    unit: t('sales.orders'),
  },
  {
    prop: 'tradeAmount',
    label: t('sales.transactionAmount'),
    unit: t('sales.unit'),
  },
]);

const { isLoading, data } = useQuery({
  queryKey: ['getTodayOverview'],
  queryFn: getTodayOverview,
  refetchInterval: 5 * 60 * 1000,
});

const indicatorData: any = computed(() => {
  return data.value || {};
});

const chartRefs = ref<Record<string, HTMLCanvasElement>>({});

const setChartRef = (el: HTMLCanvasElement | null, key: string) => {
  if (el) {
    chartRefs.value[key] = el;
  }
};

const drawSparkline = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.beginPath();
  ctx.strokeStyle = '#00f0ff';
  ctx.lineWidth = 1;
  const points = [20, 30, 25, 35, 30, 40, 35];
  const xStep = ctx.canvas.width / (points.length - 1);
  points.forEach((point, i) => {
    const x = i * xStep;
    const y = ctx.canvas.height - (point / 40) * ctx.canvas.height;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();
};

const initCharts = () => {
  Object.keys(chartRefs.value).forEach((key) => {
    const ctx = chartRefs.value[key]?.getContext('2d');
    if (ctx) {
      drawSparkline(ctx);
    }
  });
};

onMounted(() => {
  nextTick(() => {
    initCharts();
  });
});
</script>

<style lang="scss" scoped></style>
