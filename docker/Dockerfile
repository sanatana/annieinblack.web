FROM nginx:stable-alpine

# Copy static build
COPY ./build /usr/share/nginx/html

# Copy NGINX configs
COPY ./docker/conf.d /etc/nginx/conf.d
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

