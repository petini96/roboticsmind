// Importa o tipo 'Keycloak' para que o TypeScript saiba exatamente como é o objeto
import type Keycloak from 'keycloak-js';

// Importa 'vue' para estender seu módulo
import 'vue';

declare module 'vue' {
  // Aumenta a interface dos componentes Vue para incluir a nova propriedade
  interface ComponentCustomProperties {
    $keycloak: Keycloak;
  }
}