FROM nginx:alpine
COPY ./dist /usr/share/nginx/html

COPY project.conf /etc/nginx/conf.d/project.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
