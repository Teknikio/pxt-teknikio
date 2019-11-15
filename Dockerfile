FROM node:10-stretch

ENV NODE_ENV production
ENV PORT 3232

# ~~~ Bundle app source
WORKDIR /usr/src/app
COPY package*.json ./
# ~~~

# ~~~ Install app dependencies
RUN npm install
# ~~~

# ~~~ Copying source files
COPY . .
# ~~~

# ~~~ Run command
EXPOSE ${PORT}
CMD [ "npm", "run", "serve" ]
# ~~~

