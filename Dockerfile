FROM node:lts as builder

ARG GQL_HOST

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN npm run build

FROM node:lts

WORKDIR /app

COPY --from=builder /app/.output .

ENV HOST 0.0.0.0
EXPOSE 3000

ENTRYPOINT ["node", "server/index.mjs"]
