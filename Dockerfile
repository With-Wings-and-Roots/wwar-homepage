FROM node:20-alpine
WORKDIR /app

# Declare build arguments
ARG NEXT_PUBLIC_CMS_URL
ARG PUBLIC_URL

# Set environment variables
ENV NEXT_PUBLIC_CMS_URL=${NEXT_PUBLIC_CMS_URL}
ENV PUBLIC_URL=${PUBLIC_URL}
ENV BREVO_API_KEY=${{ vars.BREVO_API_KEY }}

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
