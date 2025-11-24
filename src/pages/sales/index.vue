<template>
  <div class="screen-container">
    <div class="content-wrapper"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
</script>

<style lang="scss" scoped>
.screen-container {
  width: 100%;
  height: 100%;
  padding: 26px 8px;
  background-image: url("@/assets/images/sales/full-bg.png");
  background-position: 100%;
  .content-wrapper {
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/sales/border-bg.png");
    background-position: center center;
    background-repeat: no-repeat;
  }
}
</style>
