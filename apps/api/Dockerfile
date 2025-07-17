FROM denoland/deno:alpine

WORKDIR /app

# Copy deno config
COPY deno.json .

# Cache dependencies
RUN deno install --entrypoint main.ts

# Copy source code
COPY . .

EXPOSE 8000

CMD ["deno", "task", "start"]