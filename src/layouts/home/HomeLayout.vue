<template>
  <div class="full-height full-width">
    <q-layout view="lHh Lpr lFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      <NavLayout />
      <q-page-container>
        <q-page ref="pageRef">
          <router-view />
          <q-scroll-observer @scroll="onScroll" />
          <DonutComponent />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import NavLayout from 'src/components/layouts/home/NavLayout.vue';
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { type ScrollDetails } from 'src/types/Scroll';
import { useScrollStore } from 'src/stores/scrollStore';

const scrollStore = useScrollStore();

const onScroll = (info: ScrollDetails) => {
  scrollStore.setScrollInfo(info);
};

const pageRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3.59/dist/web.js';
  script.onload = () => {
    window.Typebot.initStandard({
      typebot: 'my-typebot-dtt67xz',
      apiHost: 'https://vtypebot.roboticsmind.com.br',
    });
  };
  script.async = true;
  script.onerror = () => {
    console.error('Failed to load Typebot script');
  };
  document.head.appendChild(script);

  await nextTick();
 
});

onUnmounted(() => {
  const script = document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3.59/dist/web.js"]');
  if (script) script.remove();
});
</script>