# define variables
builder_name="lqwangxg/vue-cli"
app_name=$1
if [ -z "$app_name" ]; then 
  app_name=`pwd`  
fi
echo "app_name root path:$app_name"

container_name=vue-build

#check build images. if not found, create a new images
echo "STEP1: CHECK BUILD IMAGE, IF NOT FOUND, CREATE A NEW ONE."
vuecli=`docker images | grep "$builder_name"`
if [ $? = 1 ]; then 
  echo "source builder image is not found. create a new image..."
  docker build -t $builder_name -f Dockerfile.builder .  
else
  echo "found build image,next. "
fi

echo "STEP2: CHECK BUILD CONTAINER, IF NOT FOUND, START A NEW ONE."
# check build container. if not found start a new
# cid=`docker ps -a | grep $builder_container_name | awk '{print $1}'`
# if [ -z "$cid" ]; then 
#  echo "docker container $builder_container_name is not found, start a new container.";
  
  ls | grep node_modules
  if [ $? = 1 ]; then  
    echo "not found node_modules, npm install first."
    docker run -it --rm --name $container_name\
    -w /app \
    -v $app_name:/app \
    $builder_name \
    npm install 
  fi
  echo "npm run build start..."
  docker run -it --rm --name $container_name \
    -w /app \
    -v $app_name:/app \
    -v ~/npm/:/root/.npm/ \
    $builder_name \
    npm run build
  echo "npm run build completed."
# else 
#   echo "docker container $builder_container_name is found, start it";
#   docker start $builder_container_name    
# fi

echo "STEP3: CHECK SOURCE BUILD RESULT, IF NO ERROR, BUILD DOCKER DEPLOY IMAGE."
#check build log. if succeed, docker build deploy images
docker logs $container_name |tail -n13 | grep error
if [ $? = 1 ]; then 
  echo "source build succeeded!"
  docker build -t $app_name -f Dockerfile.deploy .
else 
  echo "source build error, stoped. "
fi
