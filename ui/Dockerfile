FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY server.conf /etc/nginx/conf.d/default.conf

EXPOSE 80;
ENTRYPOINT ["nginx", "-g", "daemon off;"]
