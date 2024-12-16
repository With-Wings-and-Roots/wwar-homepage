FROM node:20-alpine
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
USER node
EXPOSE 3000
CMD [ "yarn", "start" ]