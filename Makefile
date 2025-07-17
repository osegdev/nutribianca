# NutriBianca - Development Shortcuts

.PHONY: help dev dev-web dev-api test lint db-up db-reset clean install

help: ## Show this help message
	@echo "NutriBianca Development Commands:"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install all dependencies
	@echo "📦 Installing dependencies..."
	@pnpm install

dev: ## Start all services (web + api + db)
	@echo "🚀 Starting all services..."
	@docker compose up -d db
	@sleep 3
	@pnpm dev

dev-web: ## Start only web development server
	@echo "🌐 Starting web server..."
	@cd apps/web && pnpm dev

dev-api: ## Start only API development server
	@echo "🔌 Starting API server..."
	@cd apps/api && deno task dev

test: ## Run all tests
	@echo "🧪 Running tests..."
	@pnpm test
	@cd apps/api && deno task test

lint: ## Run linting and formatting
	@echo "🔍 Running linters..."
	@pnpm lint
	@pnpm format

build: ## Build all applications
	@echo "🏗️ Building applications..."
	@pnpm build

db-up: ## Start database container
	@echo "🐘 Starting PostgreSQL database..."
	@docker compose up -d db

db-reset: ## Reset database with fresh migrations
	@echo "🔄 Resetting database..."
	@docker compose down db
	@docker volume rm nutribianca_postgres_data || true
	@docker compose up -d db
	@sleep 5
	@pnpm prisma migrate dev

db-migrate: ## Run database migrations
	@echo "📊 Running database migrations..."
	@pnpm prisma migrate dev

storybook: ## Start Storybook
	@echo "📚 Starting Storybook..."
	@pnpm storybook

clean: ## Clean all build artifacts and dependencies
	@echo "🧹 Cleaning..."
	@rm -rf node_modules apps/*/node_modules packages/*/node_modules
	@rm -rf apps/*/dist packages/*/dist
	@docker compose down
	@docker system prune -f

docker-dev: ## Start full development environment with Docker
	@echo "🐳 Starting Docker development environment..."
	@docker compose up -d