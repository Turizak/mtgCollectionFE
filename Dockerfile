FROM node:latest

WORKDIR /usr/src/app
COPY . .

RUN npm install
EXPOSE 4173
CMD ["npm", "run", "preview"]