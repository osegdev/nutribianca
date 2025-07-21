# NutriBianca - Contexto del Proyecto

## Entregables Paso 1

### Visión & Misión
**Visión:** Clínica de nutrición de referencia en Honduras y Centroamérica
**Misión:** Servicios de nutrición clínica personalizados y accesibles con acompañamiento cercano

### Objetivos SMART (2025)
- 40+ pacientes nuevos
- 25+ pruebas epigenéticas/mes (oct+)
- 3%+ conversión CTA WhatsApp
- 1500+ sesiones mensuales (6 meses)
- 90+ Lighthouse score

### User Personas
1. **Adulto clínico** (35-55): sobrepeso, diabetes → WhatsApp
2. **Padre/madre** (28-45): hijos 4-12 años → Facebook, WhatsApp  
3. **Bio-hacker** (25-40): métricas, datos → Instagram, Blog

### Stack Seleccionado (Paso 2)
- **Frontend:** React + Vite + TypeScript + TailwindCSS
- **Backend:** Deno + Oak + Prisma
- **BD:** PostgreSQL 15
- **Deploy:** Vercel (web) + Fly.io (API)
- **Monorepo:** TurboRepo

### Funcionalidades MVP
**Must:** Landing nutrición + pruebas epigenéticas + blog + newsletter + políticas
**Should:** Panel admin + testimonios
**Could:** Calculadora calorías

### CTA Principal
Botón WhatsApp → https://wa.me/50432177256

### Requisitos NFR
- TTFB < 200ms, LCP < 2.5s
- WCAG 2.1 AA
- 90+ cobertura tests
- TLS 1.3, OWASP Top 10

### Brand Guide
- Verde: #5BBF7A, Naranja: #FFB36B
- Tipografía: Inter (16px base, escala 1.25)
- Bordes: 8px radius

## Entorno de Desarrollo (Paso 3)

### WSL 2 + Ubuntu 24.04
- ✅ WSL2 con kernel Linux 6.6.87.2-microsoft-standard-WSL2
- ✅ Ubuntu 24.04.2 LTS funcionando

### Herramientas Instaladas
- ✅ **Git:** Configurado con Omar Oseguera <osegdev@ejemplo.com>
- ✅ **Node.js:** v22.17.0 + npm 10.9.2 + pnpm 10.13.1
- ✅ **Deno:** v2.3.7 (stable) + TypeScript 5.8.3
- ✅ **Docker:** v28.0.4 con integración WSL2
- ✅ **Dev Tools:** ripgrep v14.1.1, fzf 0.44.1, batcat 0.24.0, direnv 2.32.1
- ✅ **mkcert:** v1.4.4 (TLS local)

### Setup Automatizado
```bash
# Ejecutar configuración completa
./scripts/dev-setup.sh

# Verificar entorno
docker run hello-world
deno --version && node --version
```

### Archivos Creados
- `scripts/dev-setup.sh` - Setup automatizado
- `docs/setup/wsl2-guide.md` - Guía detallada
- `docs/architecture/adr/0002-env-tooling.md` - Decisiones técnicas

## Bootstrap Monorepo (Paso 5)

### Estructura TurboRepo
- ✅ **Workspace:** pnpm + TurboRepo configurado
- ✅ **Apps:** React web + Deno API con health check
- ✅ **Packages:** UI (Button) + schemas (Zod)

### Aplicaciones
- ✅ **Web (localhost:5174):** React + Vite + TailwindCSS v3.4.15 + Landing completa
- ✅ **API (localhost:8000):** Deno + Oak + /health endpoint
- ✅ **Database:** PostgreSQL + Prisma (Patient/Appointment/EpigenTest)

### Desarrollo
- ✅ **Docker Compose:** db + api + web con hot-reload
- ✅ **Makefile:** `make dev`, `make db-up`, `make test`, etc.
- ✅ **Environment:** .env configurado con WhatsApp URL

### Tooling Completado
- ✅ **Testing:** Vitest (web) + Deno test (api) configurado
- ✅ **Linting:** ESLint/Prettier centralizados en packages/config
- ✅ **Storybook:** UI Button documentado en localhost:6006

### Comandos Rápidos
```bash
# Desarrollo
make dev              # Todo (db + web + api)
make dev-web          # Solo React (localhost:5174)
make dev-api          # Solo Deno API (localhost:8000)
make db-up            # Solo PostgreSQL

# Testing & Quality
pnpm test             # Tests (Vitest + Deno)
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm storybook        # Storybook (localhost:6006)

# Build
pnpm build            # Build todas las apps
```

## Estado Paso 5: ✅ COMPLETADO

**Bootstrap monorepo 100% funcional:**
- TurboRepo + workspaces + tooling completo
- Web app con TailwindCSS + "Hello NutriBianca 👋"
- API Deno con /health endpoint  
- UI components + Storybook
- Testing (Vitest + Deno test)
- Linting centralizados
- Docker + Makefile + .env

## Landing Nutrición Clínica (Paso 6): ✅ COMPLETADO

### Implementación Completa
- ✅ **React Router:** Configurado con página NutritionClinic como ruta principal
- ✅ **Componentes UI:** Hero, Benefits, Process, Testimonials en packages/ui
- ✅ **Contenido:** Copy con mensajes "Santa Rosa de Copán y online"
- ✅ **CTA WhatsApp:** Botón principal → https://wa.me/50432177256

### Secciones Landing
- ✅ **Hero:** "Tu salud, guiada por la evidencia" + CTA WhatsApp
- ✅ **Beneficios:** Planes clínicos, seguimiento WhatsApp, educación científica
- ✅ **Proceso:** 3 pasos (evaluación, plan, seguimiento)
- ✅ **Testimonios:** Placeholder con 3 testimonios de pacientes

### Calidad & Testing
- ✅ **SEO:** Meta tags, Open Graph, Twitter Cards configurados
- ✅ **Testing:** 8 tests unitarios pasando (Vitest + React Testing Library)
- ✅ **Storybook:** Stories para Hero y Benefits components
- ✅ **Responsive:** TailwindCSS grid system, mobile-first
- ✅ **A11y:** aria-labels, contraste verificado, navegación accesible

### Archivos Creados
```
apps/web/src/
├── pages/NutritionClinic.tsx        # Página principal
├── pages/NutritionClinic.test.tsx   # Tests unitarios
└── content/nutrition/home.md        # Contenido landing

packages/ui/src/
├── Hero.tsx + Hero.stories.tsx      # Componente hero
├── Benefits.tsx + Benefits.stories.tsx
├── Process.tsx
└── Testimonials.tsx
```