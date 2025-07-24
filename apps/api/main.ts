import { Application, Router } from '@oak/oak';

const router = new Router();

// Health check endpoint
router.get('/health', ctx => {
  ctx.response.body = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'nutribianca-api',
  };
});

const app = new Application();

// Logger middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;
console.log(`🚀 NutriBianca API running on http://localhost:${port}`);
await app.listen({ port });
