<template>
  <DatavLoading v-if="loading" class="loading">{{ text }}</DatavLoading>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { Loading as DatavLoading } from '@kjgl77/datav-vue3'

  defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Loading...',
    },
  })
</script>

<style lang="scss" scoped></style>
