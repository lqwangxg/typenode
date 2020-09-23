FROM lqwangxg/node AS vuecli
WORKDIR /app
VOLUME /app
RUN npm install -g typescript @types/node@12 ts-node ts-node-dev rimraf npm-run-all
