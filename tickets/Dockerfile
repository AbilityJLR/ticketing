FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev && npm install -D typescript ts-node-dev
COPY . .

CMD ["npm", "start"]
