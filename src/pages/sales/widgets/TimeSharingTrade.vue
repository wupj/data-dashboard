<template>
  <div class="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-2xl">
    <h3 class="text-lg font-semibold mb-4 text-green-400">
      {{ $t('sales.TimeSharingTrading') }}
    </h3>
    <div v-loading="isLoading" class="space-y-3 h-50">
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import * as echarts from 'echarts/core';
import { useQuery } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { getTimeSharingTrade } from '@/api/sales';

import Charts from '@/components/Charts.vue';

const { isLoading, data } = useQuery({
  queryKey: ['getTimeSharingTrade'],
  queryFn: getTimeSharingTrade,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    grid: {
      top: 10,
      left: 15,
      right: 5,
      bottom: 25,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
        formatter: (value: number) => {
          return dayjs(value).format('HH:mm');
        },
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLabel: {
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
        type: 'line',
        smooth: true,
        encode: {
          x: 'time',
          y: 'tradeAmount',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 0.5, color: '#00a2ff' },
            { offset: 0, color: '#00f0ff' },
          ]),
        },
      },
    ],
  };
});
</script>

<style lang="scss" scoped></style>
