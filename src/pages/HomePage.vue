<template>
  <q-page :class="['page-container', `theme-${currentTheme}`]" class="column items-center q-pa-md">
    <div class="theme-selector">
      <q-btn-group flat>
        <q-btn v-for="theme in themes" :key="theme.name" :label="theme.label" @click="setTheme(theme.name)"
          :class="{ 'active-theme': currentTheme === theme.name }" size="sm" class="theme-button" />
      </q-btn-group>
    </div>

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
        <div v-for="project in projects" :key="project.title" class="project-card"
          :style="{ '--project-accent-color': project.accentColor[currentTheme] || project.accentColor.default }"
          @click="openLink(project.link)">
          <div class="card-content">
            <div class="terminal-header row items-center no-wrap">
              <div class="row q-gutter-xs">
                <div class="header-dot red-dot"></div>
                <div class="header-dot yellow-dot"></div>
                <div class="header-dot green-dot"></div>
              </div>
              <div class="header-title col text-center text-grey-7">
                -- {{ project.title }} --
              </div>
              <div :class="['status-badge', `status-${project.status.toLowerCase().replace(/ /g, '-')}`]">
                {{ project.status }}
              </div>
            </div>

            <div class="terminal-body column justify-center text-center">
              <q-icon :name="project.icon" class="text-project-accent" size="48px" />
              <div class="text-subtitle1 q-mt-md text-grey-4 card-description">
                {{ project.description }}
              </div>
              <div class="tech-badges-container q-mt-md">
                <span v-for="tech in project.technologies" :key="tech" class="tech-badge">
                  {{ tech }}
                </span>
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
        <q-btn flat round dense color="grey-7" icon="mdi-github" type="a" href="https://github.com/SeuUsuario"
          target="_blank" aria-label="GitHub" />
      </div>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// --- LÓGICA DE TEMA (NOVA ABORDAGEM) ---

type ThemeName = 'cyber_terminal' | 'retro_futurista' | 'bio_hacker';

// Mapeamento das variáveis CSS para cada tema
const themeVariables: Record<ThemeName, Record<string, string>> = {
  cyber_terminal: {
    '--accent-color': '#00f0ff',
    '--bg-color': '#010409',
    '--card-bg-color': '#0d1117',
    '--header-bg-color': '#161b22',
    '--header-bg-color-hover': '#1c222b',
    '--border-color': '#30363d',
    '--text-color': '#c9d1d9',
    '--text-grey-color': '#8b949e',
    '--text-shadow-color': 'rgba(0, 240, 255, 0.7)',
    '--scrollbar-border-radius': '20px',
  },
  retro_futurista: {
    '--accent-color': '#ff7e00',
    '--bg-color': '#1a0530',
    '--card-bg-color': '#2c0b4d',
    '--header-bg-color': '#3a1066',
    '--header-bg-color-hover': '#431275',
    '--border-color': '#5c2a9d',
    '--text-color': '#e6e6e6',
    '--text-grey-color': '#a9a9a9',
    '--text-shadow-color': 'rgba(255, 126, 0, 0.6)',
    '--scrollbar-border-radius': '0px',
  },
  bio_hacker: {
    '--accent-color': '#39ff14',
    '--bg-color': '#050a05',
    '--card-bg-color': '#0a140a',
    '--header-bg-color': '#0f1f0f',
    '--header-bg-color-hover': '#132813',
    '--border-color': '#1a3b1a',
    '--text-color': '#c0ffc0',
    '--text-grey-color': '#8fbc8f',
    '--text-shadow-color': 'rgba(57, 255, 20, 0.5)',
    '--scrollbar-border-radius': '2px',
  }
};

const currentTheme = ref<ThemeName>('cyber_terminal');

// Watcher que aplica as variáveis CSS na raiz (<html>) do documento
watch(currentTheme, (themeName) => {
  const variables = themeVariables[themeName];
  for (const key in variables) {
    document.documentElement.style.setProperty(key, variables[key] ?? '');
  }
  localStorage.setItem('portfolio-theme', themeName);
}, { immediate: true }); // `immediate: true` garante que rode na inicialização

const setTheme = (themeName: ThemeName) => {
  currentTheme.value = themeName;
};

// --- RESTANTE DO SCRIPT ---

interface Theme {
  name: ThemeName;
  label: string;
}

const themes = ref<Theme[]>([
  { name: 'cyber_terminal', label: 'Cyberpunk' },
  { name: 'retro_futurista', label: 'Retrô' },
  { name: 'bio_hacker', label: 'Hacker' },
]);

interface Project {
  icon: string;
  title: string;
  description: string;
  link: string;
  status: 'Online' | 'Em Desenvolvimento' | 'Em Breve';
  accentColor: { [key in ThemeName | 'default']: string };
  technologies: string[];
}

const typedTextEl = ref<HTMLElement | null>(null);

const typeWriter = (element: HTMLElement, text: string, speed: number) => {
  let i = 0;
  element.innerHTML = '';
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
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme && themes.value.some(t => t.name === savedTheme)) {
    currentTheme.value = savedTheme as ThemeName;
  }
  if (typedTextEl.value) {
    typeWriter(typedTextEl.value, 'Roboticsmind', 150);
  }
});

const openLink = (link: string) => {
  if (link && link !== '#') {
    window.open(link, '_blank');
  }
};

const projects = ref<Project[]>([
    {
    icon: 'mdi-vote-outline',
    title: 'Plataforma de Votação A/B',
    description: 'Plataforma interativa para criar enquetes A/B, coletar votos do público e visualizar estatísticas em tempo real.',
    link: 'https://choices.roboticsmind.com.br',
    status: 'Online',
    accentColor: { default: '#00f0ff', cyber_terminal: '#00f0ff', retro_futurista: '#ff7e00', bio_hacker: '#39ff14' },
    technologies: ['Vue.js', 'Quasar', 'Node.js', 'PostgreSQL'],
  },
  {
    icon: 'mdi-store-cog-outline',
    title: 'Doce Sabor Digital (SaaS)',
    description: 'Solução SaaS completa para confeitarias criarem e personalizarem suas lojas virtuais, com gestão de produtos e pedidos.',
    link: '#',
    status: 'Em Desenvolvimento',
    accentColor: { default: '#ffa500', cyber_terminal: '#ffa500', retro_futurista: '#f92a82', bio_hacker: '#4caf50' },
    technologies: ['Java 17', 'Spring Boot', 'Vue.js', 'Docker', 'AWS'],
  },
  {
    icon: 'mdi-youtube',
    title: 'YouTube Playlist Downloader',
    description: 'Ferramenta para converter playlists completas do YouTube para MP3 com um clique. Ideal para ouvir suas músicas offline.',
    link: '#',
    status: 'Em Breve',
    accentColor: { default: '#39ff14', cyber_terminal: '#39ff14', retro_futurista: '#ffd900', bio_hacker: '#8bc34a' },
    technologies: ['Python', 'FastAPI', 'Vue.js', 'yt-dlp'],
  },
  {
    icon: 'mdi-toolbox-outline',
    title: 'DevBox: Caixa de Ferramentas',
    description: 'Centralize credenciais, armazene comandos úteis e organize documentações. Uma maleta digital para otimizar seu workflow.',
    link: '#',
    status: 'Em Desenvolvimento',
    accentColor: { default: '#8a2be2', cyber_terminal: '#8a2be2', retro_futurista: '#00c2cb', bio_hacker: '#a1ff00' },
    technologies: ['Vue.js', 'TypeScript', 'Pinia', 'Electron'],
  },
]);
</script>

<style lang="scss">
/* ESTILOS GLOBAIS - AGORA FUNCIONAM COM AS VARIÁVEIS DO JS */
:root {
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) var(--bg-color);
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: var(--bg-color);
}
::-webkit-scrollbar-thumb {
  background-color: var(--accent-color);
  border-radius: var(--scrollbar-border-radius);
  border: 2px solid var(--bg-color);
}
</style>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Press+Start+2P&family=Courier+Prime:wght@400;700&display=swap');

/* ANIMAÇÕES */
@keyframes blink { 50% { opacity: 0; } }
@keyframes background-pan { 0% { background-position: 0% 0%; } 100% { background-position: 100% 100%; } }
@keyframes rotate-border { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes retro-glitch {
  0% { transform: translate(0, 0); } 25% { transform: translate(-2px, 2px); } 50% { transform: translate(2px, -2px); }
  75% { transform: translate(2px, 2px); } 100% { transform: translate(0, 0); }
}

/* ESTILOS DO COMPONENTE - Usam as variáveis globais */
.page-container {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.5s ease, color 0.5s ease;
  font-family: var(--font-family);
  animation: background-pan 30s linear infinite;

  // Propriedades específicas de cada tema que não são cores
  &.theme-cyber_terminal {
    --font-family: 'JetBrains Mono', monospace;
    --font-size-description: 1rem;
    --card-title-font-size: 0.8rem;
    background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    --card-border-radius: 9px;
  }

  &.theme-retro_futurista {
    --font-family: 'Press Start 2P', cursive;
    --font-size-description: 0.75rem;
    --card-title-font-size: 0.65rem;
    background-image: linear-gradient(rgba(0, 0, 0, 0.2) 50%, transparent 50%);
    background-size: 100% 4px;
    --card-border-radius: 4px;
  }

  &.theme-bio_hacker {
    --font-family: 'Courier Prime', monospace;
    --font-size-description: 1rem;
    --card-title-font-size: 0.8rem;
    background-image: none;
    --card-border-radius: 0px;
  }
}

.theme-selector {
  position: absolute; top: 1rem; right: 1.5rem; z-index: 1000;
}
.theme-selector .theme-button {
  color: var(--text-grey-color); text-transform: none; border: 1px solid var(--border-color); opacity: 0.7;
  &.active-theme { background-color: var(--accent-color); color: var(--bg-color); opacity: 1; font-weight: bold; }
}

.hero-section { padding-top: 12vh; padding-bottom: 5vh; }
.terminal-prompt-title { display: flex; align-items: baseline; justify-content: center; white-space: nowrap; }
.prompt-symbol { font-size: 2.5rem; margin-right: 1rem; }
.main-title {
  color: var(--accent-color); text-shadow: 0 0 10px var(--text-shadow-color), 0 0 20px rgba(var(--text-shadow-color), 0.7);
  font-size: 3rem; transition: font-size 0.3s ease;
}
.subtitle { color: var(--text-grey-color); }
.cursor {
  display: inline-block; background-color: var(--accent-color); width: 1rem; height: 2.8rem;
  margin-left: 0.5rem; animation: blink 1s step-end infinite; box-shadow: 0 0 10px var(--text-shadow-color);
}

.projects-section { max-width: 1400px; padding: 2rem 0; }
.project-card {
  position: relative; width: 100%; max-width: 380px; min-height: 320px;
  border-radius: var(--card-border-radius); background: transparent; padding: 2px;
  overflow: hidden; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;

  .theme-cyber_terminal &::before {
    content: ''; position: absolute; top: 50%; left: 50%; width: 200%; height: 200%;
    background: conic-gradient(transparent, var(--project-accent-color), transparent 30%);
    transform-origin: center center; animation: rotate-border 4s linear infinite;
    opacity: 0; transition: opacity 0.4s ease-in-out;
  }
  .theme-cyber_terminal &:hover::before { opacity: 1; }
  .theme-retro_futurista &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 0 3px var(--accent-color), 0 0 0 6px var(--card-bg-color), 0 0 0 8px var(--border-color);
    animation: retro-glitch 0.2s infinite;
  }
  .theme-bio_hacker &:hover {
    transform: translateY(-5px); box-shadow: 0 10px 20px rgba(57, 255, 20, 0.2);
  }
}

.card-content {
  background-color: var(--card-bg-color); width: 100%; height: 100%;
  border-radius: calc(var(--card-border-radius) - 1px); display: flex; flex-direction: column;
  position: relative; z-index: 2; overflow: hidden;
}
.terminal-header {
  background-color: var(--header-bg-color); padding: 8px 12px;
  border-bottom: 1px solid var(--border-color); justify-content: space-between;
}
.header-dot { width: 12px; height: 12px; border-radius: 50%; }
.red-dot { background-color: #ff605c; }
.yellow-dot { background-color: #ffbd44; }
.green-dot { background-color: #00ca4e; }
.header-title {
  font-size: var(--card-title-font-size); text-transform: uppercase;
  letter-spacing: 1px; line-height: 1.4;
}
.status-badge {
  font-size: 0.7rem; font-weight: bold; padding: 4px 8px; border-radius: 4px;
  margin-left: 10px; color: #000; text-transform: capitalize;
}
.status-online { background-color: #00ca4e; }
.status-em-desenvolvimento { background-color: #ffa500; }
.status-em-breve { background-color: #00f0ff; }
.terminal-body { padding: 24px; flex-grow: 1; }
.card-description { font-size: var(--font-size-description); line-height: 1.6; }
.tech-badges-container { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; }
.tech-badge {
  background-color: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color);
  color: var(--text-grey-color); padding: 2px 8px; border-radius: 12px;
  font-size: 0.75rem; font-weight: 500;
}
.text-project-accent { color: var(--project-accent-color); }
.terminal-footer {
  padding: 8px 12px; font-size: 0.9rem; border-top: 1px solid var(--border-color);
  background-color: var(--header-bg-color); display: flex; justify-content: space-between;
  align-items: center; transition: background-color 0.3s;
  .project-card:hover & { background-color: var(--header-bg-color-hover); }
}
.footer-command { font-weight: bold; }
.footer-arrow { transition: transform 0.3s; .project-card:hover & { transform: translateX(5px); } }
.footer-text { color: var(--text-grey-color); }

@media (max-width: 1024px) {
  .project-card { max-width: 340px; min-height: 300px; }
  .main-title { font-size: 2.5rem; }
  .cursor { height: 2.3rem; }
}
@media (max-width: 768px) { .project-card { max-width: 340px; } }
@media (max-width: 600px) {
  .page-container { padding: 12px; }
  .theme-selector { top: 8px; right: 8px; }
  .theme-button { font-size: 0.65rem !important; padding: 2px 6px !important; }
  .hero-section { padding-top: 15vh; }
  .main-title { font-size: 1.8rem; }
  .prompt-symbol { font-size: 1.8rem; }
  .cursor { height: 1.6rem; }
  .subtitle { font-size: 0.9rem; }
  .project-card { max-width: 100%; min-height: auto; }
  .card-description { font-size: calc(var(--font-size-description) * 0.9); line-height: 1.5; }
  .tech-badge { font-size: 0.7rem; }
}
</style>