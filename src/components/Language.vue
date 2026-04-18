<template>
  <div class="language-switcher">
    <select
      v-model="currentLocale"
      @change="changeLanguage"
      class="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="zh-CN">中文</option>
      <option value="en-US">English</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLocale } from '@/hooks/useLocale';

const { switchLanguage, currentLocale: locale } = useLocale();
const currentLocale = ref(locale.value);

watch(locale, (newLocale) => {
  currentLocale.value = newLocale;
});

const changeLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  switchLanguage(target.value);
};
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}
</style>
