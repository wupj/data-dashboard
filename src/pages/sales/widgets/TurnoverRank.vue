<template>
  <div class="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-2xl">
    <h3 class="text-lg font-semibold mb-4 text-pink-400">
      {{ $t('sales.wholesaleTradingVolumeRanking') }}
    </h3>
    <div v-loading="isLoading" class="space-y-3 h-65">
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import * as echarts from 'echarts/core';
import { useQuery } from '@tanstack/vue-query';
import { getVolumeRank } from '@/api/sales';

import Charts from '@/components/Charts.vue';

const { isLoading, data } = useQuery({
  queryKey: ['getVolumeRank'],
  queryFn: getVolumeRank,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    grid: {
      top: 10,
      left: 5,
      right: 5,
      bottom: 15,
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
        show: false,
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
        barGap: '-100%',
        barWidth: 20,
        encode: {
          x: 'tradeAmount',
          y: 'wholesaler',
        },
        label: {
          show: true,
          position: [0, 25],
          fontSize: 14,
          formatter: (params: any) => {
            return params.name;
          },
        },
        itemStyle: {
          borderRadius: 10,
        },
      },
      {
        type: 'bar',
        roundCap: true,
        showBackground: true,
        barWidth: 20,
        encode: {
          x: 'tradeAmount',
          y: 'wholesaler',
        },
        label: {
          show: true,
          position: 'insideRight',
          color: '#141c2a',
          fontSize: 14,
          formatter: (params: any) => {
            return `￥${params.data.tradeAmount}`;
          },
        },
        itemStyle: {
          borderRadius: 10,
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#00f0ff' },
            { offset: 1, color: '#00a2ff' },
          ]),
        },
        backgroundStyle: {
          borderRadius: 10,
        },
      },
    ],
  };
});
</script>

<style lang="scss" scoped>
.turnover-rank {
  width: 100%;
  height: 252px;
}
</style>
