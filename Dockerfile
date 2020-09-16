FROM lqwangxg/node:alpine AS builder
WORKDIR /app
RUN npm install -g @vue/cli @vue/cli-service-global 
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
#EXPOSE 80     #EXPOSED IN nginx image
