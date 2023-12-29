FROM node:20-alpine AS development
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=development
EXPOSE 3000
CMD [ "yarn", "dev" ]

FROM node:20-alpine AS dependencies
ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
RUN yarn install

FROM node:20-alpine AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY . .
COPY .env .env
RUN yarn install && NODE_ENV=production yarn build

FROM node:20-alpine AS production
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
RUN apk add --no-cache tzdata
ENV TZ=Europe/Berlin
COPY --chown=node --from=builder /app/next.config.js ./
COPY --chown=node --from=builder /app/public ./public
COPY --chown=node --from=builder /app/.next ./.next
COPY --chown=node --from=builder /app/yarn.lock /app/package.json ./
COPY --chown=node --from=dependencies /app/node_modules ./node_modules
USER node
EXPOSE 3000
CMD [ "yarn", "start" ]