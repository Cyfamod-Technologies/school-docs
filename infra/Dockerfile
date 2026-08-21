# --- Build stage -----------------------------------------------------------
# Docusaurus builds a static site into build/ - no server runtime needed,
# same shape as the Next.js static-export sites in the other repos.
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime stage -----------------------------------------------------------
FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Cyfamod School Docs" \
      org.opencontainers.image.description="Documentation site for the Cyfamod School Management System"

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY infra/nginx.conf /etc/nginx/conf.d/default.conf

# Copy only the static build output - source/config never enters the
# runtime image.
COPY --from=builder /app/build/ ./

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
