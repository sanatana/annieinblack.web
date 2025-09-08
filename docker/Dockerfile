# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# If you use Yarn Berry (Yarn 4), keep these lines; otherwise remove corepack lines and use npm
RUN corepack enable
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY babel.config.cjs ./
COPY jsconfig.json ./
COPY vite.application_icons.mjs ./
COPY .yarnrc.yml ./
COPY index.html ./
COPY package.json ./
COPY .yarn/ public/ .vite/ src/ ./
COPY . .

RUN ls -la

RUN yarn install --immutable

ARG APP_ENV=production
ENV NODE_ENV=production
RUN yarn build

# ---- serve stage ----
FROM httpd:2.4-alpine
# enable .htaccess and mod_headers
RUN sed -i 's/#LoadModule headers_module/LoadModule headers_module/' /usr/local/apache2/conf/httpd.conf \
 && sed -i 's/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# copy your HTACCESS and build output
#COPY ./.htaccess /usr/local/apache2/htdocs/.htaccess
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
