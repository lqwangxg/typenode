# define variables
builder_name="lqwangxg/node" 
app_name=`pwd`  

echo "app_name root path:$app_name"

./install.sh 2>&1 | tee install.log | grep -i error
 
if [ $? = 1 ]; then 
  docker run -it --rm \
    -w /app \
    -v $app_name:/app \
    -v ~/.npm/:/root/.npm/ \
    $builder_name \
    npm run build 2>&1 | tee build.log | grep -i error
  
  if [ $? = 1 ]; then 
    echo "npm run build completed."
  else
    echo "npm run build error happened."
  fi
else
  echo "npm install error happened."
fi

if [ $? = 1 ]; then  
  echo "---deploy start...----"
  ./deploy.sh
fi
