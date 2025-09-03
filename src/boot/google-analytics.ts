import { defineBoot } from '#q-app/wrappers';
import { createGtag } from 'vue-gtag';

type GtagFunction = (command: 'event', action: string, params?: any) => void;

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $gtag: GtagFunction;
  }
}

const ANALYTICS_GTAG = `${process.env.ANALYTICS_GTAG}`;

export default defineBoot(({ app, router }) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (!ANALYTICS_GTAG || ANALYTICS_GTAG === 'undefined' || ANALYTICS_GTAG === '') {
    console.warn('Google Analytics GTAG ID não está definida no arquivo .env');
    return;
  }

  app.use(createGtag({
    tagId: ANALYTICS_GTAG,
  }));

  // CORREÇÃO ESLINT: Removido o "(router as Router)"
  router.afterEach((to) => {
    app.config.globalProperties.$gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_title: document.title,
      page_location: window.location.href,
    });
  });
});