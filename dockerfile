FROM node:14.16.1

ENV NODE_OPTIONS=--experimental-modules

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g typescript
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
