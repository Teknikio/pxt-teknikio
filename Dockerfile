FROM node:10-stretch

ENV NODE_ENV production
ENV PORT 3232

# ~~~ Bundle app source
COPY . /
WORKDIR /
COPY package*.json ./
# ~~~

# ~~~ Install app dependencies
RUN apt-get update \
  && npm install -g pxt \
  && npm install \
  && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*
# ~~~


# ~~~ Run command
EXPOSE ${PORT}
ENTRYPOINT ["pxt", "serve", "-h", "0.0.0.0", "--noBrowser"]
# ~~~

