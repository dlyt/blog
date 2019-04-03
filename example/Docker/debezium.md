docker run -it --name kafka -p 9092:9092 --link zookeeper:zookeeper debezium/kafka

docker run -it --rm --name zookeeper -p 2181:2181 -p 2888:2888 -p 3888:3888 debezium/zookeeper:0.9

docker run -it --rm --name kafka -p 9092:9092 --link zookeeper:zookeeper debezium/kafka:0.9

docker run -it --rm --name connect -p 8083:8083 -e GROUP_ID=1 -e CONFIG_STORAGE_TOPIC=my_connect_configs -e OFFSET_STORAGE_TOPIC=my_connect_offsets -e STATUS_STORAGE_TOPIC=my_connect_statuses -e BOOTSTRAP_SERVERS=kafka:9092 --link 9f448f0d4761:zookeeper --link 6de1e3495298:kafka --net unwrap-smt_default  debezium/connect-jdbc-es:0.8

docker run -it --rm --name connect -p 8083:8083 -e GROUP_ID=1 -e CONFIG_STORAGE_TOPIC=my_connect_configs -e OFFSET_STORAGE_TOPIC=0 -e STATUS_STORAGE_TOPIC=my_connect_statuses --link zookeeper --link kafka  debezium/connect-jdbc-es:0.8

docker run -it --rm  -p 9000:9000 -e ZK_HOSTS="192.168.22.203:2181" -e APPLICATION_SECRET=letmein sheepkiller/kafka-manager

docker-compose -f docker-compose-es.yaml exec kafka /kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka:9092 --from-beginning  --property print.key=true --topic yuwenyun.yuwenyun.estest

http://elastic:$Re12345678@es-cn-0pp116ay3000md3ux.public.elasticsearch.aliyuncs.com:9200

docker-compose -f docker-compose-es.yaml exec kafka /kafka/bin/kafka-console-producer.sh --topic dbserver1.inventory.test --broker-list kafka:9092

export DEBEZIUM_VERSION=0.8
docker-compose -f docker-compose-es.yaml up
docker-compose -f docker-compose-es.yaml down
