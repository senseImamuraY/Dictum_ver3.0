FROM node:16-alpine as build
WORKDIR /home/node/app
COPY ./app /home/node/app
RUN yarn 
RUN yarn run build

FROM nginx:alpine
RUN rm -f /etc/nginx/conf.d/*
COPY --from=build /home/node/app/build /var/www
ADD ./nginx.conf /etc/nginx/conf.d/
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf