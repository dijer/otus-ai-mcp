FROM node:24-bookworm-slim AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
COPY sample_docs ./sample_docs

RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start:http"]
