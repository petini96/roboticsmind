import { defineBoot } from '#q-app/wrappers';
import { createGtag } from 'vue-gtag';

const ANALYTICS_GTAG = `${process.env.ANALYTICS_GTAG}`;
const ANALYTICS_APP_NAME = `${process.env.ANALYTICS_APP_NAME}`;

export default defineBoot(({ app }) => {
  console.log(`ANALYTICS_GTAG: ${ANALYTICS_GTAG}`);
  console.log(`ANALYTICS_APP_NAME: ${ANALYTICS_APP_NAME}`);
  const gtag = createGtag({
    tagId: ANALYTICS_GTAG,
    appName: ANALYTICS_APP_NAME,
  });
  
  app.config.globalProperties.$gtag = gtag;
});