<template>
  <div
    class="logistics-dashboard relative w-full h-full bg-gray-950 text-white font-sans overflow-hidden"
  >
    <div class="absolute inset-0 opacity-30 z-0">
      <div
        class="w-full h-full bg-gradient-to-br from-cyan-500/10 via-transparent to-cyan-500/10 custom-diagonal-pattern"
      ></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div
          class="absolute top-[20%] left-[20%] w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"
        ></div>
        <div
          class="absolute bottom-[20%] right-[20%] w-40 h-40 bg-cyan-400/20 rounded-full blur-xl"
        ></div>
      </div>
    </div>
    <div class="relative z-10 flex justify-between items-center px-10 py-5">
      <div class="text-cyan-400 text-lg font-medium drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
        {{ currentTime }}
      </div>
      <div class="absolute left-1/2 transform -translate-x-1/2">
        <svg
          class="w-[400px] h-[60px] drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]"
          viewBox="0 0 400 60"
        >
          <path
            d="M10,30 L30,10 L370,10 L390,30 L370,50 L30,50 Z"
            fill="none"
            stroke="#00ffff"
            stroke-width="2"
            filter="url(#glow)"
          />
          <text
            x="200"
            y="35"
            text-anchor="middle"
            fill="#00ffff"
            font-size="24"
            font-weight="bold"
          >
            {{ $t('logistics.title') }}
          </text>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="relative z-10 grid custom-grid-layout gap-5 px-10 pb-10 h-[calc(100%-60px)]">
      <!-- Left Column -->
      <div class="flex flex-col gap-5">
        <!-- 今日运单数量 -->
        <TodayWaybill />

        <!-- 各阶段即用时固 -->
        <StageDuration />

        <!-- 人员信息 -->
        <PersonnelInfo />
      </div>

      <!-- Center Column -->
      <div class="flex items-center justify-center">
        <div class="w-full h-full flex flex-col gap-5">
          <!-- China Map -->
          <LogisticsMap />

          <!-- 运单趋势 -->
          <WaybillTrend />
        </div>
      </div>

      <!-- Right Column -->
      <div class="flex flex-col gap-5">
        <!-- 运单总数 -->
        <TotalWaybills />

        <!-- 车辆信息 -->
        <VehicleInfo />

        <!-- 运单状态 -->
        <WaybillStatus />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';

import TodayWaybill from './widgets/TodayWaybill.vue';
import StageDuration from './widgets/StageDuration.vue';
import PersonnelInfo from './widgets/PersonnelInfo.vue';
import LogisticsMap from './widgets/LogisticsMap.vue';
import WaybillTrend from './widgets/WaybillTrend.vue';
import TotalWaybills from './widgets/TotalWaybills.vue';
import VehicleInfo from './widgets/VehicleInfo.vue';
import WaybillStatus from './widgets/WaybillStatus.vue';

const currentTime = ref('');

const updateTime = () => {
  const now = new Date();

  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekDay = weekDays[now.getDay()];

  currentTime.value = `${dayjs(now).format('HH:MM:ss YYYY年MM月DD')}日 ${weekDay}`;
};

useIntervalFn(() => {
  updateTime();
}, 1000);
</script>

<style lang="scss" scoped>
/* Panel border glow animation */
.panel::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(45deg, #00ffff, transparent, #00ffff);
  border-radius: 0.5rem;
  opacity: 0.5;
  z-index: -1;
  animation: borderGlow 3s ease-in-out infinite;
}

@keyframes borderGlow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

/* Pulse animation for circular progress */
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* Custom Tailwind animation utilities */
@keyframes borderGlow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure Tailwind classes are applied correctly */
.logistics-dashboard {
  font-family: 'Microsoft YaHei', ui-sans-serif, system-ui, sans-serif;
}

/* Custom grid layout for strict proportions */
.custom-grid-layout {
  grid-template-columns: 1fr 2fr 1fr;
}

/* Custom background pattern */
.custom-diagonal-pattern {
  background-image: linear-gradient(
    45deg,
    transparent 49%,
    rgba(0, 255, 255, 0.1) 49%,
    rgba(0, 255, 255, 0.1) 51%,
    transparent 51%
  );
  background-size: 20px 20px;
}
</style>
