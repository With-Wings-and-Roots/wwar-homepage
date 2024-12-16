FROM node:20-alpine
WORKDIR /app

# Declare build arguments
ARG NEXT_PUBLIC_CMS_URL
ARG PUBLIC_URL

# Set environment variables
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}
ENV PUBLIC_URL=${PUBLIC_URL}

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