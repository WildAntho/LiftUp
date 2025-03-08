FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY public public
COPY components.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY src src

CMD ["npm", "run", "dev"]