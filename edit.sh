sh_cmd=$1
if [ -z "$sh_cmd" ]; then 
  sh_cmd="sh"
fi
echo "sh_cmd:$sh_cmd"
app_name=$2
if [ -z "$app_name" ]; then 
  app_name=`pwd`
fi
echo "app_name root path:$app_name"

docker_image_name="lqwangxg/vue-cli"
docker images | grep "$docker_image_name"
if [ $? = 1 ]; then 
  echo "[$docker_image_name] is not found. create a new image..."
  docker build -t $docker_image_name -f Dockerfile.builder .  
fi
echo "docker run $docker_image_name ... "
docker run -it --rm \
-v $app_name:/app \
-v ~/npm/:/root/.npm/ \
$docker_image_name \
$sh_cmd
