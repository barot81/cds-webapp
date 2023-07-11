FROM nginx:alpine
ARG configUrl

ENV configUrl $configUrl

WORKDIR /usr/share/nginx/html
COPY ./dist/nginx.conf /etc/nginx/nginx.conf
COPY ./dist .
ADD ./dist/run.sh /usr/share/nginx/html/run.sh

RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN chmod +x /usr/share/nginx/html/run.sh

ENTRYPOINT ["/usr/share/nginx/html/run.sh"]
CMD ["nginx", "-g", "daemon off;"]