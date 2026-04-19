<template>
  <div
    class="panel relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.6s"
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
          {{ $t('logistics.totalWaybills') }}
        </text>
      </svg>
    </div>
    <div class="relative z-10" v-loading="isLoading">
      <div class="text-center my-5">
        <span
          class="inline-block text-4xl font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] mb-1 mr-3"
        >
          {{ data?.totalWaybill || 0 }}
        </span>
        <span class="text-lg text-cyan-400/80"> {{ $t('logistics.orders') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { getTotalWaybill } from '@/api/logistics';

const { isLoading, data } = useQuery({
  queryKey: ['getTotalWaybill'],
  queryFn: getTotalWaybill,
  refetchInterval: 5 * 60 * 1000,
});
</script>

<style lang="scss" scoped></style>
