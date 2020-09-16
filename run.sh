builder_name="lqwangxg/vue-cli"
builder_container_name=vue-dev
vuecli=`docker images | grep "$builder_name"`
if [ $? = 1 ]; then
  echo "docker image[$builder_name] is not found. start creating ..."
  docker build -t lqwangxg/vue-cli -f Dockerfile.builder .
else
  echo "found image [$builder_name]."
fi

cid=`docker ps -a | grep $builder_container_name | awk '{print $1}'`
if [ -z "$cid" ]; then 
  echo "docker ps [$builder_container_name] is not found, run...";
  #if node_modules not found, npm install first.
  ls | grep node_modules
  if [ $? = 1 ]; then 
    docker run -it --rm  --name $builder_container_name \
    -v ~/vuechat:/app \
    $builder_name \
    npm install 
  fi 

  #npm run serve
  docker run -it --rm --name $builder_container_name \
  -v ~/vuechat:/app \
  -p 8080:8080 \
  $builder_name \
  npm run serve

else 
  echo "docker ps [$builder_container_name] is found, start ";
  docker start [$builder_cotainer_name]
fi
