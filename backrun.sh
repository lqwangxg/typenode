app_name=$(pwd)
docker_image_name='lqwangxg/node'
echo "app_name:$app_name, dockerimage=$docker_image_name."

docker run -it --rm \
  -w /app \
  -dp 3000:3000 \
  -v $app_name:/app\
  $docker_image_name \
  sh -c "npm run dev"
