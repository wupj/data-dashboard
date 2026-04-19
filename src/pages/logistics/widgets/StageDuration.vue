<template>
  <div
    class="panel relative bg-slate-900/80 border border-cyan-400 rounded-lg p-4 shadow-[0_0_20px_rgba(0,255,255,0.3),inset_0_0_20px_rgba(0,255,255,0.1)] backdrop-blur-sm animate-fadeIn"
    style="animation-delay: 0.2s"
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
          {{ $t('logistics.stageEvaluationTime') }}
        </text>
      </svg>
    </div>
    <div class="relative z-10">
      <div class="flex flex-col h-47 overflow-hidden" v-loading="isLoading">
        <Vue3SeamlessScroll :key="evaluateData.length" :list="evaluateData">
          <template v-slot="{ data, index }">
            <div
              class="flex justify-between items-center px-3 py-2 mb-3 bg-cyan-400/10 border-l-3 border-cyan-400 rounded"
            >
              <span class="text-sm text-cyan-400 font-bold min-w-[30px]">{{ index + 1 }}</span>
              <span class="text-sm text-white flex-1 mx-2.5">{{ data?.stage }}</span>
              <span class="text-sm">
                <span class="text-orange-500 font-bold">{{ data?.takeTime }}</span>
                {{ $t('logistics.minute') }}
              </span>
            </div>
          </template>
        </Vue3SeamlessScroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { getStageEvaluationTime } from '@/api/logistics';

const { isLoading, data } = useQuery({
  queryKey: ['getStageEvaluationTime'],
  queryFn: getStageEvaluationTime,
  refetchInterval: 5 * 60 * 1000,
});

const evaluateData = computed(() => data.value || []);
</script>

<style lang="scss" scoped></style>
