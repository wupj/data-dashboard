<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-0 left-0 w-full h-full bg-[url('https://static.mastergo.com/ai/img_res/1776440274174a3K9mP2xQ7vN4rT8wY.jpg')] bg-cover"
      ></div>
    </div>
    <header
      class="flex items-center justify-between px-12 py-6 border-b border-gray-700/50 relative z-10"
    >
      <div
        class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mx-auto"
      >
        {{ $t('sales.title') }}
      </div>
      <div class="text-lg text-gray-300 absolute right-12">
        {{ currentTime }}
      </div>
    </header>
    <div class="grid grid-cols-12 gap-6 p-6 mt-4">
      <!-- Left Column -->
      <div class="col-span-3 space-y-6">
        <!-- 实时拜访 -->
        <RealTimeVisit />
        <!-- 批发商交易额排行 -->
        <TurnoverRank />
        <!-- 分时交易 -->
        <TimeSharingTrade />
      </div>
      <!-- Center Column -->
      <div class="col-span-6 space-y-6">
        <!-- 今日总览 -->
        <TodayOverview />
        <!-- 重点区域 -->
        <KeyAreas />
        <div class="grid grid-cols-2 gap-6">
          <!-- 品类销售排行  -->
          <CategorySalesRank />
          <!-- 销售人员业绩排行 -->
          <SalesPerformanceRank />
        </div>
      </div>
      <!-- Right Column -->
      <div class="col-span-3 space-y-6">
        <!-- 实时订单 -->
        <RealTimeOrders />
        <!-- 商品销售排行 -->
        <ProductSalesRank />
        <!-- 交易统计 -->
        <TransactionStatistics />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

import RealTimeVisit from './widgets/RealTimeVisit.vue';
import TurnoverRank from './widgets/TurnoverRank.vue';
import TimeSharingTrade from './widgets/TimeSharingTrade.vue';
import TodayOverview from './widgets/TodayOverview.vue';
import KeyAreas from './widgets/KeyAreas.vue';
import CategorySalesRank from './widgets/CategorySalesRank.vue';
import SalesPerformanceRank from './widgets/SalesPerformanceRank.vue';
import RealTimeOrders from './widgets/RealTimeOrders.vue';
import ProductSalesRank from './widgets/ProductSalesRank.vue';
import TransactionStatistics from './widgets/TransactionStatistics.vue';

const currentTime = ref('');

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

useIntervalFn(() => {
  updateTime();
}, 1000);
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
}
:deep(.backdrop-blur-md) {
  backdrop-filter: blur(12px);
}
:deep(.shadow-2xl) {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
.border-gray-700\/50 {
  border-color: rgba(55, 65, 81, 0.5);
}
:deep(.bg-black\/20) {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
