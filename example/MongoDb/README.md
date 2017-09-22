### 使用场景
MongoDb是对传统关系型数据库的补充，但是MongoDb不支持事务；此外，MongoDb也不支持表联合查询；
#### 高伸缩性的场景
#### 日志系统场景
日志系统数据量特别大，如果用MongoDb数据库存储这些数据，利用分片集群支持海量数据，同时使用聚集分析和MapReduce的能力。
#### 分布式文件存储
### mongodb与mysql相比的优缺点
#### mongodb的优点
- 弱一致性（最终一致性），更能保证用户的访问速度
- 文档结构的存储方式，能够更便捷的获取数据
#### mongodb的缺点
- 不支持事务操作
- 占用空间大
### 查询数组不未空
```
ME.find({'pictures.0': {$exists: 1}});
```
### 倒排索引
key是网页地址，value是网页内容。网页内容是由许多关键词组成的，可以视为关键词数组。

用户是通过关键词进行搜索的，直接使用原始数据进行查询的话则需要遍历所有键值对中的关键词数组，效率非常低。

因此，用于搜索的数据结构应该以关键词为key，以网页地址为value。

简单地说，倒排索引就是把key与value对调之后的索引，构建倒排索引的目的是提升搜索性能。

关键词：MapReduce、Aggregation Pipeline（中文称作聚合管道）
### 新增索引
db.things.ensureIndex({j:1})
### 查看所有索引
db.things.getIndexes()
### explain() 输出参数解析
explain.queryPlanner.indexFilterSet:针对该query是否有indexfilter

explain.queryPlanner.winningPlan.direction：此query的查询顺序，此处是forward，如果用了.sort({modify_time:-1})将显示backward。

executionStats.executionTimeMillis: query的整体查询时间。

executionStats.executionStages.stage : query的整体查询时间。

COLLSCAN	全表扫描

IXSCAN	扫描索引

FETCH	根据索引去检索指定document

SHARD_MERGE	将各个分片返回数据进行merge

SORT	表明在内存中进行了排序

LIMIT	使用limit限制返回数

SKIP	使用skip进行跳过

IDHACK	针对_id进行查询

SHARDING_FILTER	通过mongos对分片数据进行查询

COUNT	利用db.coll.explain().count()之类进行count运算

COUNTSCAN	count不使用Index进行count时的stage返回

COUNT_SCAN	count使用了Index进行count时的stage返回

SUBPLA	未使用到索引的$or查询的stage返回

TEXT	使用全文索引进行查询时候的stage返回

PROJECTION	限定返回字段时候stage的返回