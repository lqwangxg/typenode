# check pattern before run service.
stack_yml=docker-compose-mongo.yml
stack_name=mongo
if [ $1 = 'swarm' ]; then 
  # Method1: run docker service by docker-stack.yml
  docker stack ls | grep -i "$stack_name"
  if [ $? = 1 ]; then  
    docker swarm init --advertise-addr $(hostname -i)
  else
    docker stack rm $stack_name 
  fi
  # docker stack 
  docker stack deploy -c $stack_yml $stack_name 

elif [ $1 = 'compose' ]; then
 docker-compose -d -f $stack_yml up  

elif [ $1 = 'stop' ]; then
 docker-compose ps | grep -i "$stack_name"
 if [ $? = 0 ]; then 
   docker-compose down
 else
   docker stack ls | grep -i "$stack_name"
   if [ $? = 0 ]; then
     docker stack rm $stack_name
   fi
 fi

elif [ $1 = 'debug' ]; then
  # Method2: run docker service by docker-compose.yml
  docker-compose -f $stack_yml up
fi

function isRunning() {
  if [ $? =0 ]; then 
    echo "is running"
  fi
}
