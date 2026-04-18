<template>
  <v-chart class="chart w-full h-full" :option="option" theme="dark" autoresize />
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts';
import { echarts } from '@/plugins/echarts';

import china from '@/assets/china.json';
echarts.registerMap('china', china as any);

defineProps({
  option: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
