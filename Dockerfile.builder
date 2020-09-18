FROM lqwangxg/node AS vuecli
WORKDIR /app
VOLUME /app
RUN npm install -g @vue/cli @vue/cli-service-global 
