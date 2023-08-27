FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY server.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
