FROM node
COPY ./build /app
WORKDIR /app
ENTRYPOINT node app.js
