<template>
  <div class="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-2xl">
    <h3 class="text-lg font-semibold mb-6 text-teal-400">
      {{ $t('sales.transactionStatistics') }}
    </h3>
    <div v-loading="isLoading" class="space-y-3 h-50">
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getTradeStatistic } from '@/api/sales';

import Charts from '@/components/Charts.vue';

const { isLoading, data } = useQuery({
  queryKey: ['getTradeStatistic'],
  queryFn: getTradeStatistic,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  const name = data?.value?.map((o: any) => o.categoryDesc) || [];
  const dataset: any = [{ source: data?.value || [] }];
  const series: any = [];
  name.forEach((key: string, index: number) => {
    dataset.push({
      transform: { type: 'filter', config: { dimension: 'categoryDesc', value: key } },
    });
    series.push({
      type: 'bar',
      name: key,
      datasetIndex: index + 1,
      roundCap: true,
      barWidth: 20,
      encode: {
        x: 'typeDesc',
        y: 'tradeAmount',
      },
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        fontSize: 14,
      },
    });
  });
  return {
    backgroundColor: 'transparent',
    color: ['#22d3ee', '#c084fc', '#4ade80'],
    grid: {
      top: 30,
      left: 15,
      right: 10,
      bottom: 50,
    },
    legend: {
      bottom: 5,
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
        fontSize: 14,
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
        fontSize: 14,
      },
    },
    tooltip: {
      show: true,
    },
    dataset,
    series,
  };
});
</script>

<style lang="scss" scoped></style>
