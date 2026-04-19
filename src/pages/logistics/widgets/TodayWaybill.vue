<template>
  <div
    class="panel relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.1s"
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
          {{ $t('logistics.todayWaybillQuantity') }}
        </text>
      </svg>
    </div>
    <div v-loading="isLoading" class="relative z-10">
      <div class="text-center my-5">
        <span
          class="block text-4xl font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] mb-1"
        >
          {{ indicatorData.totalWaybill }}
          <span class="text-lg text-cyan-400/80">{{ $t('logistics.orders') }}</span>
        </span>
      </div>
      <div class="flex justify-around items-center mt-5">
        <div v-for="item in indicator" :key="item.prop" class="flex flex-col items-center gap-2.5">
          <div class="circular-progress animate-pulse">
            <svg width="80" height="80">
              <circle cx="40" cy="40" r="35" fill="none" stroke="#1a3a3a" stroke-width="6" />
              <circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                :stroke="item.circleColor"
                stroke-width="6"
                stroke-dasharray="220"
                :stroke-dashoffset="
                  220 * (1 - indicatorData[item.prop] / indicatorData.totalWaybill)
                "
                transform="rotate(-90 40 40)"
                class="drop-shadow-[0_0_5px_currentColor]"
              />
              <text
                x="40"
                y="45"
                text-anchor="middle"
                :fill="item.circleColor"
                font-size="14"
                font-weight="bold"
              >
                {{ ((indicatorData[item.prop] / indicatorData.totalWaybill) * 100).toFixed(1) }}%
              </text>
            </svg>
          </div>
          <div class="text-center">
            <div class="text-xs text-white/80 mb-1">{{ item.label }}</div>
            <div class="text-sm font-bold" :class="item.textColor">
              {{ indicatorData[item.prop] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import { getTodayWaybillQuantity } from '@/api/logistics';

const { t } = useI18n();

const { isLoading, data } = useQuery({
  queryKey: ['getTodayWaybillQuantity'],
  queryFn: getTodayWaybillQuantity,
  refetchInterval: 5 * 60 * 1000,
});

const indicatorData: any = computed(() => data.value || {});

const indicator = ref([
  {
    prop: 'regularOrder',
    label: t('logistics.normalOrder'),
    circleColor: '#00ff88',
    textColor: 'text-green-400',
  },
  {
    prop: 'temporaryOrder',
    label: t('logistics.temporaryOrder'),
    circleColor: '#00aaff',
    textColor: 'text-blue-400',
  },
  {
    prop: 'abnormalOrder',
    label: t('logistics.abnormalOrder'),
    circleColor: '#ff8800',
    textColor: 'text-orange-500',
  },
]);
</script>

<style lang="scss" scoped></style>
