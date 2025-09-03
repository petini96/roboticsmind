import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { defineBoot } from '#q-app/wrappers'

export default defineBoot(({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'pt-BR', // Idioma padrão
    globalInjection: true,
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})