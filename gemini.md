# Projeto: Plataforma Web com Landing Page e Painel Administrativo Multi-tenant

## 1. Sumário Executivo

Este projeto consiste no desenvolvimento de uma plataforma web composta por duas partes principais:

1.  **Landing Page Pública:** Uma página de apresentação (vitrine) de produtos e seus atributos, com seções de marketing e conteúdo informativo.
2.  **Painel Administrativo:** Uma área restrita (backoffice) para gerenciamento, onde o acesso é controlado e seguro. A principal funcionalidade do painel é permitir que administradores de uma loja específica (tenant) gerenciem as permissões de outros usuários dentro da mesma loja.

## 2. Arquitetura e Pilha Tecnológica (Tech Stack)

A arquitetura é baseada em um frontend desacoplado que consome uma API RESTful do backend.

### Frontend
- **Framework/Plataforma:** Node.js v18
- **UI Framework:** Quasar Framework
- **Linguagem:** TypeScript

### Backend
- **Linguagem:** Java 17
- **Framework:** Spring Boot
- **Arquitetura:** API RESTful

## 3. Arquitetura de Autenticação e Autorização

O sistema de segurança é centralizado no **Keycloak**, que atua como o provedor de identidade e autorização.

### Provedor de Identidade (Identity Provider)
- O login no painel administrativo é feito exclusivamente através de **Login Social com o Google**. O Keycloak é configurado para usar o Google como um *Identity Provider* externo.

### Clientes Keycloak (Clients)
- **`quasar-app` (Frontend):** Cliente público (`public`) configurado para o fluxo de autorização OAuth2/OIDC. É responsável por redirecionar o usuário para a página de login do Google (via Keycloak) e receber os tokens (Access Token, ID Token) após o sucesso da autenticação.
- **`spring-client` (Backend):** Cliente confidencial (`confidential` ou `bearer-only`). Sua função é validar os tokens JWT enviados pelo frontend a cada requisição à API, garantindo que as chamadas sejam seguras e autenticadas.

### Modelo de Autorização (ABAC - Attribute-Based Access Control)
- **Permissões Finas (Fine-grained Roles):** As permissões são atômicas e baseadas em ações, como:
  - `product:create`
  - `product:read`
  - `product:update`
  - `product:delete`
  - `user:manage_permissions`
- **Papéis Compostos (Composite Roles):** Para facilitar a atribuição, papéis de mais alto nível agrupam múltiplas permissões. Exemplo:
  - O papel **`ADMIN`** agrupa todas as permissões de `product:*` e `user:*`.
- **Multi-tenancy:** A separação por loja (tenant) é um atributo chave. Cada usuário no Keycloak terá um atributo personalizado (ex: `tenant_id`) que o associa a uma loja específica. As políticas de autorização no backend devem levar esse atributo em conta para garantir que um administrador só possa gerenciar recursos da sua própria loja.

## 4. Funcionalidades Chave

### Landing Page
- Exibição pública de produtos e detalhes.
- Seções de marketing e conteúdo.

### Painel Administrativo
- Login seguro via Google.
- Um usuário com papel `ADMIN` pode modificar os papéis e permissões de outros usuários, mas **apenas** daqueles que pertencem ao mesmo `tenant_id`.
- Gerenciamento de produtos (CRUD - Criar, Ler, Atualizar, Deletar) de acordo com as permissões do usuário.