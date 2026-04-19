<template>
  <div
    class="panel h-64 relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.5s"
  >
    <div class="mb-4">
      <svg class="w-[200px] h-[40px]" viewBox="0 0 200 40">
        <path
          d="M10,20 L20,10 L180,10 L190,20 L180,30 L20,30 Z"
          fill="none"
          stroke="#00ffff"
          stroke-width="1.5"
        />
        <text x="100" y="25" text-anchor="middle" fill="#00ffff" font-size="16">
          {{ t('logistics.waybillStatistics') }}
        </text>
      </svg>
    </div>
    <div class="relative z-10 h-[calc(100%-60px)]" v-loading="isLoading">
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import * as echarts from 'echarts/core';
import { getWaybillStatistic } from '@/api/logistics';

import Charts from '@/components/Charts.vue';

const { t } = useI18n();

const { isLoading, data } = useQuery({
  queryKey: ['getWaybillStatistic'],
  queryFn: getWaybillStatistic,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    color: ['#00ff88'],
    grid: {
      top: 5,
      left: 15,
      right: 10,
      bottom: 50,
    },
    legend: {
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 14,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
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
        name: t('logistics.average'),
        smooth: true,
        encode: {
          x: 'time',
          y: 'waybillQuantity',
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            { offset: 1, color: '#00ff88' },
            { offset: 0, color: '#00ff8833' },
          ]),
        },
      },
    ],
  };
});
</script>

<style lang="scss" scoped></style>
