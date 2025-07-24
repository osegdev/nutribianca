# WSL2 Development Environment Setup

## Objetivo

Configurar WSL2 + Ubuntu para desarrollar el monorepo NutriBianca sin fricción.

## Requisitos Previos

- Windows 10/11 con WSL2 habilitado
- Docker Desktop instalado con integración WSL2

## Instalación Automática

```bash
# Clonar repositorio y ejecutar setup
git clone https://github.com/osegdev/nutribianca.git
cd nutribianca
./scripts/dev-setup.sh
```

## Verificación del Entorno

```bash
# Probar todas las herramientas
docker run hello-world
deno run https://deno.land/std/examples/welcome.ts
node --version && pnpm --version
rg --version && fzf --version && batcat --version
```

## Herramientas Instaladas

- **Node.js 18** + pnpm (vía Volta)
- **Deno 2.3+** (runtime para API)
- **Docker** (contenedores)
- **mkcert** (TLS local)
- **direnv** (variables de entorno)
- **ripgrep, fzf, bat** (productividad)

## Solución de Problemas

- Si `bat` no funciona, usar `batcat`
- Recargar shell: `source ~/.bashrc`
- Docker: verificar integración WSL2 en Docker Desktop
