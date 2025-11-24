<template>
  <div class="layout">
    <router-view />
    <div class="fab">
      <Menu tabindex="0" />
      <ul class="menu bg-base-200 rounded-box w-56">
        <li v-for="menu in routes" :key="menu.path">
          <a>{{ menu.meta.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import autofit from "autofit.js";
import Menu from "@/assets/svg/menu.svg?component";

const router = useRouter();
const routes = router.getRoutes().filter((o) => o.meta?.title);

console.log("routes", routes);

onMounted(() => {
  autofit.init({
    el: ".layout",
  });
});

onBeforeUnmount(() => {
  autofit.off();
});
</script>

<style lang="scss" scoped>
.fab {
  .icon {
    width: 30px;
    height: 30px;
    fill: #fff;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
