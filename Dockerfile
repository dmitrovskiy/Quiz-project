FROM node:6.10.1-alpine

MAINTAINER Vladimir Dmitrovskiy "dmitrovskiyvl@gmail.com"

WORKDIR /var/www/html
COPY . /var/www/html

RUN npm install \
    && npm run build \
    && npm prune --production

CMD ["npm", "start"]
