# Visão Geral do Projeto

Este repositório é um sandbox para experimentar a integração entre:

- Contentful CMS
- Next.js (App Router)
- React
- Tailwind CSS

O objetivo principal é explorar uma arquitetura de **Page Builder** baseada em Contentful, onde páginas são compostas por blocos reutilizáveis (sections).

# Comunicação

O agente (Copilot ou outros assistentes) deve **comunicar sempre em português** ao interagir com o utilizador.

O código deve ser escrito em **inglês**, seguindo as convenções normais de desenvolvimento.

O agente deve **perguntar antes de mudar ficheiros** a menos que o utilizador dê ordens claras como "faz" ou "põe".

# Stack Técnica

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Contentful CMS

# Arquitetura

A aplicação segue uma arquitetura simples:

- **Next.js App Router**
- Conteúdo obtido a partir do **Contentful**
- Páginas montadas através de um **Page Builder**

# Convenções de Código

- Usar **TypeScript**
- Preferir **Server Components** quando possível
- Manter componentes **pequenos e reutilizáveis**
- Evitar lógica complexa em componentes de UI
