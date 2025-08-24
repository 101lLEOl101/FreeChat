FROM node:20-alpine AS build
WORKDIR /app

COPY Frontend/package.json Frontend/package-lock.json* ./
RUN npm ci --no-audit --no-fund

COPY Frontend/ ./
RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]