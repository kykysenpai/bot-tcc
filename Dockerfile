FROM node
COPY . /app
WORKDIR /app
ENTRYPOINT npm run start
