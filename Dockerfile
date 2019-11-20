FROM node:10-stretch

ENV NODE_ENV production
ENV PORT 3232

# ~~~ Bundle app source
COPY . /
WORKDIR /
# ~~~

# ~~~ Install app dependencies & create static build
RUN apt-get update \
  && npm install -g pxt \
  && npm install -g http-server \
  && npm install \
  && rm -rf /node_modules/pxt-core/common-docs/* /node_modules/pxt-core/docfiles/* /node_modules/pxt-core/tests/* \
  && apt-get clean \
  && pxt staticpkg \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*
# ~~~

# ~~~ Load static package runninh web server
EXPOSE ${PORT}
ENTRYPOINT ["http-server", "-c-1", "/built/packaged"]
# ~~~

