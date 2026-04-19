<template>
  <div
    class="panel relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.8s"
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
          {{ $t('logistics.shipmentStatus') }}
        </text>
      </svg>
    </div>
    <div class="relative h-115 overflow-y-auto">
      <!-- Table Header -->
      <div class="flex justify-between items-center px-3 py-2 bg-cyan-400/20 mb-2">
        <span class="text-sm text-cyan-400 font-bold min-w-[50px]">
          {{ $t('logistics.serialNo') }}
        </span>
        <span class="text-sm text-cyan-400 font-bold min-w-[100px]">
          {{ $t('logistics.orderNo') }}
        </span>
        <span class="text-sm text-cyan-400 font-bold min-w-[80px]">
          {{ $t('logistics.consumptionDuration') }}
        </span>
        <span class="text-sm text-cyan-400 font-bold min-w-[120px]">
          {{ $t('logistics.loadFactor') }}
        </span>
      </div>

      <!-- Table Rows -->
      <div class="flex flex-col gap-2.5" v-loading="isLoading">
        <div
          v-for="(item, index) in tableData"
          :key="item.orderNo"
          class="flex justify-between items-center px-3 py-2 bg-cyan-400/10 rounded border-l-3 border-cyan-400"
        >
          <span class="text-sm text-white font-bold min-w-[50px]">{{ index + 1 }}</span>
          <span class="text-xs text-white/80 min-w-[100px]">{{ item.orderNo }}</span>
          <span class="text-xs text-white/80 min-w-[80px]">{{ item.elapsedTime }} {{ $t('logistics.unit') }}</span>
          <div class="flex items-center gap-2 min-w-[120px]">
            <div class="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                :class="[
                  'h-full rounded-full transition-all duration-300',
                  item.loadFactor >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                  item.loadFactor >= 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                  item.loadFactor >= 40 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                  'bg-gradient-to-r from-red-400 to-red-600'
                ]"
                :style="`width: ${item.loadFactor}%`"
              ></div>
            </div>
            <span 
              :class="[
                'text-xs font-bold',
                item.loadFactor >= 80 ? 'text-green-400' : 
                item.loadFactor >= 60 ? 'text-blue-400' : 
                item.loadFactor >= 40 ? 'text-orange-400' : 
                'text-red-400'
              ]"
            >{{ item.loadFactor }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getWaybillState } from '@/api/logistics';

const { isLoading, data } = useQuery({
  queryKey: ['getWaybillState'],
  queryFn: getWaybillState,
  refetchInterval: 5 * 60 * 1000,
});

const tableData: any = computed(() => data.value || {});
</script>

<style lang="scss" scoped></style>
