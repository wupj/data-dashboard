<template>
  <div class="layout">
    <router-view />
    <div class="menu">
      <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger
          class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-grass11 bg-white cursor-pointer"
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="min-w-[220px] outline-none bg-white rounded-md p-[5px]"
            :side-offset="5"
          >
            <DropdownMenuItem
              v-for="route in routes"
              :key="route.path"
              :class="{
                'text-blue-400': route.path === currentPath,
              }"
              class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none cursor-pointer"
              @click="() => handleClick(route)"
            >
              {{ $t(route.meta?.title) }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import autofit from 'autofit.js';
import { Menu } from 'lucide-vue-next';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'radix-vue';

const router = useRouter();
const route = useRoute();
const routes = router.getRoutes().filter((o) => o.meta?.title);

const currentPath = computed(() => route.path);

console.log('route', routes, route);

const toggleState = ref<boolean>(false);

const handleClick = (route: any) => {
  router.push(route.path);
};

onMounted(() => {
  autofit.init({
    el: '.layout',
  });
});

onBeforeUnmount(() => {
  autofit.off();
});
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 50%;
  left: 10px;
  z-index: 1000;
}
</style>
