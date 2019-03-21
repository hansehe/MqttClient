FROM node

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN ["npm", "install"]

COPY . .

EXPOSE 4200/tcp

CMD ["npm", "run", "start-docker", "--", "--host", "0.0.0.0", "--poll", "500"]
