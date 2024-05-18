FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install nodemon --save-dev
EXPOSE 3001
CMD ["npm", "start"]