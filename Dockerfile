FROM nginx:alpine
COPY ./_site /usr/share/nginx/html
COPY ./developers.deriv.com.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html