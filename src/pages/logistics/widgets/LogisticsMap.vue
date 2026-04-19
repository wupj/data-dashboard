<template>
  <div
    class="panel flex-1 relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.4s"
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
          {{ $t('logistics.logisticsMap') }}
        </text>
      </svg>
    </div>
    <div
      class="relative z-10 w-full h-[calc(100%-60px)] flex items-center justify-center"
      v-loading="isLoading"
    >
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import { getAreaStatistic } from '@/api/logistics';

import Charts from '@/components/Charts.vue';

const { t } = useI18n();

const { isLoading, data } = useQuery({
  queryKey: ['getAreaStatistic'],
  queryFn: getAreaStatistic,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  const list: any = data?.value || [];
  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { marker, name, value, data } = params;
        if (!isNaN(value)) {
          return `
            <div style="background: linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,100,255,0.1)); 
                        border: 1px solid rgba(0,255,255,0.3); 
                        border-radius: 8px; 
                        padding: 12px; 
                        backdrop-filter: blur(10px);
                        box-shadow: 0 4px 20px rgba(0,255,255,0.3);">
              <div style="color: #00ffff; font-weight: bold; font-size: 14px; margin-bottom: 4px;">${name}</div>
              <div style="color: #ffffff; font-size: 16px;">${marker} ${t('logistics.userCount')}: ${data.users.toLocaleString()}</div>
              <div style="color: #ffffff; font-size: 16px;">${marker} ${t('logistics.sales')}: ${value.toLocaleString()}</div>
            </div>
          `;
        }
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: '#00ffff',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
    },
    visualMap: {
      type: 'continuous',
      calculable: true,
      left: 15,
      bottom: 15,
      min: 0,
      max: Math.max(...list.map((item: any) => item.salesVolume), 1000),
      text: ['高', '低'],
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
      inRange: {
        color: [
          'rgba(0, 50, 100, 0.8)',
          'rgba(0, 100, 200, 0.8)',
          'rgba(0, 150, 255, 0.8)',
          'rgba(0, 200, 255, 0.8)',
          'rgba(0, 255, 255, 0.8)',
        ],
      },
    },
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.2,
      label: {
        emphasis: {
          show: true,
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
        },
      },
      itemStyle: {
        normal: {
          areaColor: 'rgba(0, 30, 60, 0.6)',
          borderColor: 'rgba(0, 255, 255, 0.8)',
          borderWidth: 1,
          shadowColor: 'rgba(0, 255, 255, 0.5)',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
        emphasis: {
          areaColor: 'rgba(0, 150, 255, 0.8)',
          borderColor: '#00ffff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 255, 255, 0.8)',
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        },
      },
      emphasis: {
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 'bold',
        },
        itemStyle: {
          areaColor: 'rgba(0, 200, 255, 0.9)',
          borderColor: '#ffffff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 255, 255, 1)',
          shadowBlur: 30,
        },
      },
    },
    series: [
      {
        type: 'map',
        map: 'china',
        geoIndex: 0,
        data: list.map((item: any) => ({
          ...item,
          name: item.area.replaceAll('省', ''),
          value: item.salesVolume,
          itemStyle: {
            normal: {
              areaColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 50, 100, 0.8)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0, 150, 200, 0.8)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 255, 0.8)',
                  },
                ],
              },
              borderColor: 'rgba(0, 255, 255, 0.8)',
              borderWidth: 1.5,
              shadowColor: 'rgba(0, 255, 255, 0.6)',
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
            emphasis: {
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 255, 0.9)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 100, 255, 0.7)',
                  },
                ],
              },
              borderColor: '#ffffff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 255, 255, 1)',
              shadowBlur: 25,
            },
          },
        })),
        animation: true,
        animationDuration: 2000,
        animationEasing: 'elasticOut',
        animationDelay: (idx: number) => idx * 50,
      },
    ],
    animation: true,
    animationDuration: 2000,
    animationEasing: 'cubicOut',
  };
});
</script>

<style lang="scss" scoped></style>
