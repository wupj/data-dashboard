<template>
  <div class="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-2xl">
    <h3 class="text-lg font-semibold mb-4 text-green-400">
      {{ $t('sales.keyArea') }}
    </h3>
    <div
      v-loading="isLoading"
      class="relative h-65 bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-lg overflow-hidden flex items-center justify-center"
    >
      <Charts :option="option" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Charts from '@/components/Charts.vue';
import { useQuery } from '@tanstack/vue-query';
import { getKeyArea } from '@/api/sales';

const { isLoading, data } = useQuery({
  queryKey: ['getKeyArea'],
  queryFn: getKeyArea,
  refetchInterval: 5 * 60 * 1000,
});

const option = computed(() => {
  const list: any = data?.value || [];
  return {
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      formatter: (params: any) => {
        const { marker, name, value } = params;
        if (!isNaN(value)) {
          return `${marker}${name}: ${value}`;
        }
      },
    },
    visualMap: {
      type: 'continuous',
      calculable: true,
      left: 15,
      bottom: 15,
    },
    series: [
      {
        type: 'map',
        map: 'china',
        data: list.map((item: any) => {
          return {
            ...item,
            name: item.area.replaceAll('省', ''),
            value: item.salesVolume,
          };
        }),
      },
    ],
  };
});
</script>

<style lang="scss" scoped></style>
