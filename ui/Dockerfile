FROM node:16 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS prod
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80;
ENTRYPOINT ["nginx", "-g", "daemon off;"]
