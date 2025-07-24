# ADR-0002: Environment & Tooling Selection

## Status

Accepted

## Context

Necesitamos herramientas de desarrollo que optimicen la productividad del equipo y sean compatibles con el stack React + Deno + PostgreSQL.

## Decision

### Node.js Management

- **Volta** en lugar de nvm: instalación automática por proyecto, más rápido
- **Node.js 18 LTS**: balance estabilidad/features modernas
- **pnpm**: workspace nativo, cache global, más rápido que npm

### Runtime API

- **Deno 2.3+**: seguridad by-default, TypeScript nativo, std library

### Contenedores

- **Docker Desktop**: integración WSL2, mejor experiencia Windows

### TLS Local

- **mkcert**: certificados confiables, elimina warnings HTTPS

### Productividad

- **direnv**: auto-carga .env por directorio
- **ripgrep**: búsqueda 10x más rápida que grep
- **fzf**: fuzzy finder interactivo
- **bat**: cat con syntax highlighting

## Consequences

- **Pros**: Entorno reproducible, onboarding rápido, DX optimizada
- **Cons**: Curva aprendizaje Deno para team acostumbrado a Node.js

## Alternatives Considered

- **nvm** vs Volta: Volta gana por automatización
- **npm/yarn** vs pnpm: pnpm gana por performance workspace
- **Node.js API** vs Deno: Deno gana por security-first y TS nativo
