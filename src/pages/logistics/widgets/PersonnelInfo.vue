<template>
  <div
    class="panel relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.3s"
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
          {{ $t('logistics.personnelInformation') }}
        </text>
      </svg>
    </div>
    <div class="relative h-72" v-loading="isLoading">
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getPeopleInfo } from '@/api/logistics';

import Charts from '@/components/Charts.vue';

const { isLoading, data } = useQuery({
  queryKey: ['getPeopleInfo'],
  queryFn: getPeopleInfo,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  return {
    backgroundColor: 'transparent',
    color: ['#00ffff'],
    grid: {
      top: 15,
      left: 10,
      right: 10,
      bottom: 20,
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontSize: 14,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
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
        type: 'bar',
        barMaxWidth: 50,
        encode: {
          x: 'people',
          y: 'waybillQuantity',
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
          formatter: (params: any) => {
            return params.data.waybillQuantity;
          },
        },
      },
    ],
  };
});
</script>

<style lang="scss" scoped></style>
