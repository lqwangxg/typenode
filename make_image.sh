app_name=`pwd`
tag_name=`echo "$app_name" | awk -F / '{print $3 }'`

echo "$app_name deploy start. tag_name=$tag_name"
docker build -t "lqwangxg/$tag_name" -f Dockerfile.deploy .
