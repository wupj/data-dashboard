<template>
  <div class="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-gray-700/50 shadow-2xl">
    <h3 class="text-lg font-semibold mb-4 text-cyan-400">
      {{ $t('sales.realTimeVisit') }}
    </h3>
    <div v-loading="isLoading" class="space-y-3 h-37 overflow-hidden">
      <Vue3SeamlessScroll :key="visitData.length" :list="visitData" :singleWaitTime="2000">
        <template v-slot="{ data }">
          <div class="flex justify-between items-center pb-2 border-b border-gray-700/30">
            <div class="flex items-center gap-12">
              <span class="text-sm">
                {{ data?.time && dayjs(data.time).format('HH:mm') }}
              </span>
              <span class="text-sm">
                {{ data?.city }}
              </span>
              <span class="text-sm">
                {{ data?.salesman }}
              </span>
            </div>
            <span class="text-sm max-w-43 text-nowrap text-ellipsis" :title="data?.customer">
              {{ data?.customer }}
            </span>
          </div>
        </template>
      </Vue3SeamlessScroll>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import dayjs from 'dayjs';
import { getRealTimeVisit } from '@/api/sales';

const { isLoading, data } = useQuery({
  queryKey: ['getRealTimeVisit'],
  queryFn: getRealTimeVisit,
  refetchInterval: 5 * 60 * 1000,
});

const visitData = computed(() => data.value || []);
</script>

<style lang="scss" scoped></style>
