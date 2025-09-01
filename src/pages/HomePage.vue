<template>
  <q-page class="page-container column items-center q-pa-md">
    <header class="hero-section column items-center text-center">
      <div class="terminal-prompt-title">
        <span class="prompt-symbol text-accent">&gt;</span>
        <h1 class="text-weight-bold q-ma-none main-title">
          <span ref="typedTextEl"></span>
          <span class="cursor"></span>
        </h1>
      </div>
      <p class="text-subtitle1 text-grey-6 q-mt-md subtitle">
        // Explorando a Inovação, Um Projeto de Cada Vez.
      </p>
    </header>

    <main class="projects-section full-width">
      <div class="row items-stretch q-gutter-lg justify-center">
        <div
          v-for="project in projects"
          :key="project.title"
          class="project-card"
          :style="{ '--project-accent-color': project.accentColor }"
          @click="openLink(project.link)"
        >
          <div class="card-content bg-dark-alt">
            <div class="terminal-header row items-center no-wrap">
              <div class="row q-gutter-xs">
                <div class="header-dot red-dot"></div>
                <div class="header-dot yellow-dot"></div>
                <div class="header-dot green-dot"></div>
              </div>
              <div class="header-title col text-center text-grey-7">
                -- {{ project.title }} --
              </div>
              <div
                :class="['status-badge', `status-${project.status.toLowerCase().replace(' ', '-')}`]"
              >
                {{ project.status }}
              </div>
            </div>

            <div class="terminal-body column items-center justify-center text-center">
              <q-icon :name="project.icon" class="text-project-accent" size="48px" />
              <div class="text-subtitle1 q-mt-md text-grey-4">
                {{ project.description }}
              </div>
            </div>

            <div class="terminal-footer">
              <span class="footer-command text-project-accent">access_project</span>
              <q-icon name="arrow_forward" class="text-project-accent footer-arrow" size="20px" />
            </div>
          </div>
        </div>
      </div>
    </main>

    <q-footer class="bg-transparent text-center q-pa-md">
       <div class="text-grey-7 q-mt-md footer-text">
        System Status: <span class="text-green-4">Online</span> | © {{ new Date().getFullYear() }}
        <q-btn
          flat
          round
          dense
          color="grey-7"
          icon="mdi-github"
          type="a"
          href="https://github.com/SeuUsuario"
          target="_blank"
          aria-label="GitHub"
        />
      </div>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const typedTextEl = ref<HTMLElement | null>(null);

const typeWriter = (element: HTMLElement, text: string, speed: number) => {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
};

onMounted(() => {
  if (typedTextEl.value) {
    typeWriter(typedTextEl.value, 'Roboticsmind', 150);
  }
});

const openLink = (link: string) => {
  if (link && link !== '#') {
    window.open(link, '_blank');
  }
};

const projects = ref([
  {
    icon: 'mdi-robot-outline',
    title: 'Typebot Viewer',
    description: 'Plataforma para criação e gestão de chatbots inteligentes.',
    link: 'https://vtypebot.roboticsmind.com.br',
    status: 'Online',
    accentColor: '#00f0ff', // Ciano
  },
  {
    icon: 'mdi-code-braces',
    title: 'API Gateway',
    description: 'Serviço de backend para processamento e análise de dados.',
    link: '#',
    status: 'Em Desenvolvimento',
    accentColor: '#ffa500', // Laranja
  },
  {
    icon: 'mdi-chart-bar',
    title: 'Data Dashboard',
    description: 'Visualização de dados e insights em tempo real.',
    link: '#',
    status: 'Em Breve',
    accentColor: '#39ff14', // Verde Neon
  },
  {
    icon: 'mdi-post-outline',
    title: 'Dev Blog',
    description: 'Artigos, tutoriais e documentação sobre as tecnologias.',
    link: '#',
    status: 'Em Desenvolvimento',
    accentColor: '#ff6347', // Vermelho Tomate
  },
]);
</script>

<style scoped lang="scss">
@keyframes blink {
  50% { opacity: 0; }
}

@keyframes background-pan {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

@keyframes rotate-border {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

$accent: #00f0ff;
$border-color: #30363d;
$bg-color: #010409;
$terminal-header-bg: #161b22;
$dark-alt: #0d1117;

.page-container {
  background-color: $bg-color;
  color: #c9d1d9;
  font-family: 'JetBrains Mono', monospace;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: background-pan 30s linear infinite;
}

.hero-section {
  padding-top: 10vh;
  padding-bottom: 5vh;
}

.terminal-prompt-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.prompt-symbol {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.main-title {
  color: $accent;
  text-shadow: 0 0 10px rgba($accent, 0.7), 0 0 20px rgba($accent, 0.5);
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 3rem; // Tamanho base para desktop
}

.subtitle {
  font-family: 'JetBrains Mono', monospace;
}

.cursor {
  display: inline-block;
  background-color: $accent;
  width: 1rem;
  height: 2.8rem;
  margin-left: 0.5rem;
  animation: blink 1s step-end infinite;
  box-shadow: 0 0 10px rgba($accent, 0.7);
}

.projects-section {
  max-width: 1400px;
  padding: 2rem 0;
}

/* --- Hover Criativo e Card --- */
.project-card {
  position: relative;
  width: 100%;
  max-width: 380px;
  min-height: 260px;
  border-radius: 9px;
  background: transparent;
  padding: 2px; // Espaço para a borda
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      transparent,
      var(--project-accent-color),
      transparent 30%
    );
    transform-origin: center center;
    animation: rotate-border 4s linear infinite;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
  }

  &:hover::before {
    opacity: 1;
  }
}

.card-content {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

.terminal-header {
  background-color: $terminal-header-bg;
  padding: 8px 12px;
  border-bottom: 1px solid $border-color;
  justify-content: space-between;
}
.red-dot { background-color: #ff605c; }
.yellow-dot { background-color: #ffbd44; }
.green-dot { background-color: #00ca4e; }
.header-dot { width: 12px; height: 12px; border-radius: 50%; }
.header-title {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.status-badge {
  font-size: 0.7rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 10px;
  color: #000;
}
.status-online { background-color: #00ca4e; }
.status-em-desenvolvimento { background-color: #ffa500; }
.status-em-breve { background-color: #00f0ff; }

.terminal-body {
  padding: 32px 24px;
  flex-grow: 1;
}
.text-project-accent {
  color: var(--project-accent-color);
}
.terminal-footer {
  padding: 8px 12px;
  font-size: 0.9rem;
  border-top: 1px solid $border-color;
  background-color: $terminal-header-bg;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s;

  .project-card:hover & {
    background-color: lighten($terminal-header-bg, 5%);
  }
}
.footer-command {
  font-weight: bold;
}
.footer-arrow {
  transition: transform 0.3s;
  .project-card:hover & {
    transform: translateX(5px);
  }
}

.footer-text {
  font-family: 'JetBrains Mono', monospace;
}

/* --- Responsividade --- */
@media (max-width: $breakpoint-sm-max) {
  .main-title { font-size: 2.5rem; }
  .cursor { height: 2.3rem; }
  .projects-section { padding: 1rem 0; }
}

@media (max-width: $breakpoint-xs-max) {
  .page-container {
    padding: 8px;
  }
  .main-title { font-size: 2rem; }
  .prompt-symbol { font-size: 2rem; }
  .cursor { height: 1.8rem; }
  .subtitle { font-size: 0.9rem; }
  .project-card {
    max-width: 100%; // Ocupa a largura toda
  }
}
</style>