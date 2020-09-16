from="/root/vuechat"
target="."
##=======================================
ln -f ${target}/build.sh ${from}/build.sh
ln -f ${target}/edit.sh ${from}/edit.sh
ln -f ${target}/run-serve.sh ${from}/run-serve.sh
ln -f ${target}/gitpush.sh ${from}/gitpush.sh
ln -f ${target}/ln.sh ${from}/ln.sh
ln -f ${target}/Dockerfile.builder ${from}/Dockerfile.builder
