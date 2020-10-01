# define variables
appname= `pwd` | awk -F / '{print $3 }'

echo "$appname NPM INSTALL ...----------------------"
./install.sh

echo "$appname NPM RUN BUILD ...--------------------"
./build.sh 

echo "$appname MAKE DOCKER IMAGE ...----------------"
./make_image.sh

echo "$appname TASK COMPLETED~~~~~~~~~~~~~~~~~~~~~~~"
