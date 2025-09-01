<template>
  <div class="container q-my-md" id="about-me" :class="{'about-me-in-animation': isAboutMeVisible }">
    <div class="row items-center justify-center">
      <div class="col-10 col-md-3">
        <div class="q-pa-md row items-center">
          <q-img src="../../../assets/images/woaman_about_me.jpg" :ratio="1" class="border-1" />
          <p class="text-h5 col-grow q-ma-none text-primary">Marília Gabriela</p>
          <div class="col-3">
            <q-img src="../../../assets/images/cookie_unbrella.png" :ratio="1" :class="{'cookie-unbrella-animation': isAboutMeVisible }" />
          </div>
        </div>
      </div>
      <div class="col-10 col-md-8 self-start">
        <div class="q-pa-md q-ml-md row">
          <h3 class="font-primoto-pro text-primary">Sobre</h3>
          <p class="text-body1">
            Olá, sou Marília Gabriela, confeiteira experiente em Campo Grande - MS. Desde pequena, sempre estive envolvida no
            mundo da confeitaria, aprendendo com minha mãe e desenvolvendo minha paixão por doces.
          </p>
          <p class="text-body1">
            Hoje, sou especialista em bolos personalizados e doces finos, com um toque especial que encanta a todos.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useScrollStore } from 'src/stores/scrollStore';

const isAboutMeVisible = ref(false);
const scrollStore = useScrollStore();

const hasAppeared = ref(false);

watch(
  () => scrollStore.scrollInfo,
  () => {
    if (hasAppeared.value) return;

    const aboutMeSection = document.querySelector('#about-me') as HTMLElement;
    if (!aboutMeSection) return;

    const rect = aboutMeSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      isAboutMeVisible.value = true;
      hasAppeared.value = true;
    }
  },
  { deep: true }
);
</script>

<style>
.about-me-in-animation {
  animation: fadeIn 1.5s ease-in-out;
}

.cookie-unbrella-animation {
  animation: gentleBounce 6s ease-in-out infinite;
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

@keyframes gentleBounce {
  0%, 25%, 50%, 75%, 100% {
    transform: translateY(0); /* Posição inicial e pausas */
  }
  10% {
    transform: translateY(-12px); /* Primeiro pulo */
  }
  35% {
    transform: translateY(-8px); /* Segundo pulo, menor */
  }
}
</style>