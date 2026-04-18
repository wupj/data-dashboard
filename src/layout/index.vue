<template>
  <div class="layout">
    <router-view />
    <div class="menu">
      <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger
          class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-grass11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black"
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            class="min-w-[220px] outline-none bg-white rounded-md p-[5px] cursor-pointer"
            :side-offset="5"
          >
            <DropdownMenuItem
              v-for="(route, index) in routes"
              :key="index"
              class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
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
const routes = router.getRoutes().filter((o) => o.meta?.title);

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
