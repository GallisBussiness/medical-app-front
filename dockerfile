# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install -g npm
# Install app dependencies
RUN yarn

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 3000

# Start the server using the production build
CMD [ "npm","run","start" ]