### MyISAM与InnoDB的区别
1、存储结构

MyISAM：每个MyISAM在磁盘上存储成三个文件。第一个文件的名字以表的名字开始，扩展名指出文件类型。.frm文件存储表定义。数据文件的扩展名为.MYD。索引文件的扩展名是.MYI。

InnoDB：所有的表都保存在同一个数据文件中（也可能是多个文件，或者是独立的表空间文件），InnoDB的表的大小只受限于操作系统文件的大小，一般为2GB.

2、存储空间

MyISAM：可被压缩，存储空间较小。支持三种不同的存储格式：静态表（默认，但是注意数据末尾不能有空格，会被去掉）、动态表、压缩表。

InnoDB：需要更多的内存和存储，它会在主内存中建立其专用的缓冲池用于高速缓冲数据和索引。

3、可移植、备份及恢复

MyISAM：数据是以文件的形式存储，所以在跨平台的数据转移中会很方便。在备份和恢复时可独立针对某个表进行操作。

InnoDB：免费的方案可以是拷贝数据文件、备份，或者用mysqldump，在数据量达到几十G的时候就相对痛苦了。

4、事务支持

MyISAM：强调的是性能，每次查询具有原子性，其执行速度比InnoDB类型更快，但是不提供事务支持。

InnoDB：提供事务支持，外部键等高级数据库功能。具有事务、回滚和崩溃修复能力的事务安全型表。

5、AUTO_INCREMENT

MyISAM：可以和其他字段一起建立联合索引。引擎的自动增长列必须是索引，如果是组合索引，自动增长可以不是第一列，它可以根据前面几列进行排序后递增。

InnoDB：InnoDB中必须包含只有该字段的索引。引擎的自动增长列必须是索引，如果是组合索引也必须是组合索引的第一列。

6、表锁差异

MyISAM：只支持表级锁，用户在操作MyISAM表时，select、update、delect、insert语句都会给表自动加锁，如果加锁以后的表满足insert并发的情况下，可以在表的尾部插入新的数据。

InnoDB：支持事务和行级锁，是InnoDB的最大特色。行级锁大幅度提高了多用户并发操作的新能。但是InnoDB的行锁，只是在where的主键是有效的，非主键的where都会锁全表的。

7、全文索引

MyISAM：支持FULLTEXT类型的全文索引

InnoDB：不支持FULLTEXT类型的全文索引，但是InnoDB可以使用sphinx插件支持全文索引，并且效果更好。

8、表主键

MyISAM：允许没有任何索引和主键的表存在，索引都是保存行的地址。

InnoDB：如果没有设定主键或者非空唯一索引，就会自动生成一个6字节的主键（用户不可见），数据是主索引的一部分，附加索引保存的是主索引的值。

9、表的具体行数

MyISAM：保存表的总行数，如果 select count(*) from table; 会直接取出该值。

InnoDB：没有保存表的总行数，如果使用 select count(*) from table; 就会遍历这个表，消耗相当大，但是在加了 where 条件后，MyISAM 和 InnoDB 处理的方式都一样。

10、CURD操作

MyISAM：如果执行大量的 select，MyISAM 是更好的选择。

InnoDB：如果你的数据执行大量的 insert 或 update，出于性能方面的考虑，应该使用 InnoDB 表。delete 从性能上 InnoDB 更优，但是 delete from table 时，InnoDB 不会重新建表，而是一行一行的删除，在 InnoDB 上如果要清空保存有大量数据的表，最好使用 truncate table 这个命令。

11、外键

MyISAM：不支持

InnoDB：支持

### 存储引擎选择的基本原则
采用 MyISAM 引擎
- R/W > 100 : 1且 update 相对较少
- 并发不高
- 表数据量小
- 硬件资源有限

采用 InnoDB 引擎
- R/W 比较小，频繁更新大字段
- 表数据量超过1000万，并发高
- 安全性和可用性要求高

采用 Memory 引擎
- 有足够的内存
- 对数据一致性要求不高，如在线人数和session等应用
- 需要定期归档数据
### sql语句优化
1、避免在 where 子句中使用 or 来连接
```sql
select id from t where num = 10
union all
select id from t where Name = 'admin'
```
2、应尽量避免在 where 子句中使用 != 或者 <> 操作符，否则将引擎放弃使用索引而进行全表扫描。

3、in 和 not in 也要慎用，否则会导致全表扫描

4、很多时候用 exists 代替 in 是一个好的选择
```sql
select num from a where num in(select num from b);
```
用下面的语句替换：
```sql
select num from a where exists(select 1 from b where num=a.num);
```
### InnoDB锁介绍-InnoDB中的死锁
#### 死锁
当两个以上的运算单元，双方都在等待对方停止运行，以获取系统资源，但是没有一方提前退出时，就称之为死锁。
#### 死锁的产生条件
死锁产生必须要满足以下四个条件：
    1.互斥条件：即为某个资源在同一时间只允许被一个单元占有。
    2.不可抢占条件：被单元占有的资源部可被其它单元抢占。
    3.占有且申请条件：单元当前至少占有个资源，且该单元同时向系统申请其它的资源。
    4.循环等待条件：单元之前存在一个资源的循环等待序列。
#### 三范式
一范式 表中字段不可分割
二范式 要有主键
三范式 消除冗余，就是各种信息只在一个地方存储，不出现在多张表中。
### 查看数据库存储引擎
```sql
show variables like '%storage_engine%';
```