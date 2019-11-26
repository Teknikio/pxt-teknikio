FROM node:10-stretch

ENV NODE_ENV production
ENV PORT 3232

# ~~~ Bundle app source
WORKDIR /usr/src/app/tmp
COPY . ./
# ~~~

# ~~~ Install app dependencies & create static build
RUN npm install -g pxt && npm install -g http-server \
  && npm install \

  && pxt staticpkg \
  && mv built/packaged/* /usr/src/app && rm -rf /usr/src/app/tmp
# ~~~

WORKDIR /usr/src/app

# ~~~ Load static package runninh web server
EXPOSE ${PORT}
ENTRYPOINT ["http-server", "-c-1", "."]
# ~~~
