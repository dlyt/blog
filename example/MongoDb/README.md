### 使用场景
MongoDb是对传统关系型数据库的补充，但是MongoDb不支持事务；此外，MongoDb也不支持表联合查询；
#### 高伸缩性的场景
#### 日志系统场景
日志系统数据量特别大，如果用MongoDb数据库存储这些数据，利用分片集群支持海量数据，同时使用聚集分析和MapReduce的能力。
#### 分布式文件存储