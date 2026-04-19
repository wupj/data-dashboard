<template>
  <div
    class="panel relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.7s"
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
          {{ t('logistics.vehicleInformation') }}
        </text>
      </svg>
    </div>
    <div class="relative z-10" v-loading="isLoading">
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="item in indicator"
          :key="item.prop"
          class="flex items-center px-4 py-4 bg-cyan-400/10 rounded border-l-3 border-cyan-400"
        >
          <span class="text-base text-white mr-3 min-w-[60px]">{{ item.label }}</span>
          <span
            class="text-2xl font-bold mr-1 drop-shadow-[0_0_10px_currentColor]"
            :style="{ color: item.color }"
          >
            {{ infoData[item.prop] }}
          </span>
          <span class="text-sm text-white/80">{{ t('logistics.unit') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import { getVehicleInfo } from '@/api/logistics';

const { t } = useI18n();

const indicator = ref([
  {
    prop: 'transitVehicle',
    label: t('logistics.inTransit'),
    color: '#00ff88',
  },
  {
    prop: 'leisureVehicle',
    label: t('logistics.idle'),
    color: '#00aaff',
  },
  {
    prop: 'repairVehicle',
    label: t('logistics.repair'),
    color: '#ff8800',
  },
  {
    prop: 'scrapVehicle',
    label: t('logistics.scrap'),
    color: '#ff4444',
  },
]);

const { isLoading, data } = useQuery({
  queryKey: ['getVehicleInfo'],
  queryFn: getVehicleInfo,
  refetchInterval: 5 * 60 * 1000,
});

const infoData: any = computed(() => data.value || {});
</script>

<style lang="scss" scoped></style>
