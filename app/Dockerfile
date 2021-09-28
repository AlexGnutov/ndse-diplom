FROM node:alpine
WORKDIR /code

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY *.html ./

COPY models ./models
COPY modules ./modules
COPY routers ./routers
COPY passport ./passport
COPY middleware ./middleware
COPY io ./io
COPY public ./public

RUN mkdir ./filestorage

CMD ["npm", "run", "start"]