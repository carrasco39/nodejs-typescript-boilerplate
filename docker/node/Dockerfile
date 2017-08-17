FROM node:8-alpine

RUN npm install -g nodemon

WORKDIR /var/www

EXPOSE 8080 9090

CMD ["nodemon", "-L", "/var/www/index.js"]
