<template>
  <div class="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-2xl">
    <h3 class="text-lg font-semibold mb-4 text-purple-400">
      {{ $t('sales.salesPersonnelPerformanceRanking') }}
    </h3>
    <div v-loading="isLoading" class="space-y-3 h-50">
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getSalesPerformanceRank } from '@/api/sales';

import Charts from '@/components/Charts.vue';

const { isLoading, data } = useQuery({
  queryKey: ['getSalesPerformanceRank'],
  queryFn: getSalesPerformanceRank,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    grid: {
      top: 5,
      left: 15,
      right: 10,
      bottom: 5,
    },
    xAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
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
    dataset: {
      source: data?.value || [],
    },
    series: [
      {
        type: 'bar',
        roundCap: true,
        barMaxWidth: 20,
        encode: {
          x: 'performance',
          y: 'sales',
        },
        label: {
          show: true,
          position: 'insideRight',
          color: '#141c2a',
          fontSize: 14,
          formatter: (params: any) => {
            return `￥${params.data.performance}`;
          },
        },
        itemStyle: {
          borderRadius: 10,
          color: {
            type: 'bar',
            colorStops: [
              {
                offset: 0,
                color: '#39A7FC',
              },
              {
                offset: 1,
                color: '#00FBFF',
              },
            ],
          },
        },
        backgroundStyle: {
          borderRadius: 10,
        },
      },
    ],
  };
});
</script>

<style lang="scss" scoped></style>
