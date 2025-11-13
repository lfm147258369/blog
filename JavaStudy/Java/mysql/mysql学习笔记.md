
# 流程控制语句

```sql
# 演示流程控制语句

#if语句
select if(true, '北京', '上海')
from dual;

select ifnull(null, 'lfm')
from dual;

#selct
select case
           when true then 'lfm'
           when false then 'tom'
           else 'mary' end;


#案例
# 1. 查询emp表，如果comm是null， 则显示0.0
# 强调 ： 判断是否为null 要使用is null ，判断不为空使用 is not
select ename, if(comm is null, 0.0, comm)
from emp;

select ename, IFNULL(comm, 0.0)
from emp;

#2. 如果emp表的job是clerk  则显示职员, 如果是manager 则显示经理
#如果是 salesman 则显示销售人员， 其他正常显示

select ename,
       (select case
                   when job = 'CLERK' then '职员'
                   when job = 'MANAGER' then '经理'
                   when job = 'SALESMAN' then '销售人员'
                   else job end) as 'job'

from emp;
```

- 拆解一下语句的作用:
- if 语句：判断条件是否成立，如果成立，则返回第一个参数，否则返回第二个参数。
```sql

# 强调 ： 判断是否为null 要使用is null ，判断不为空使用 is not

#if语句
select if(true, '北京', '上海')
from dual;

```
- case语句：根据条件选择不同的值。
```sql

#selct
select case
           when true then 'lfm'
           when false then 'tom'
           else 'mary' end;

```
- 含义是：如果条件为true，则返回'lfm'，如果条件为false，则返回'tom'，如果条件都不成立，则返回'mary'。


```sql

select ename,
       (select case
                   when job = 'CLERK' then '职员'
                   when job = 'MANAGER' then '经理'
                   when job = 'SALESMAN' then '销售人员'
                   else job end) as 'job'

from emp;
```



- 在开发中不是很常用





# 多表查询
```sql
-- # 查询加强
--
-- 使用where子句
--   如何查找1992.1.1后入职的员工
--   说明：在mysql中，日期类型可以直接比较大小，不需要进行函数转换。
select *
from emp
where hiredate > '1992-01-01';
-- 如何使用like操作符
--         %:表示0到多个字符 _:表示单个字符键
--         ?如何显示首字符为s的员工姓名和工资
select ename, sal
from emp
where ename like 'S%';
--         ?如何显示第三个字符为大写o的所有员工姓名和工资
select *
from emp
where mgr is null;

-- 如何显示没有上级的雇员的情况
-- 查询表结构
DESC emp;
--


# 使用order by子句
# ?如何按照工资的从低到高的顺序[升序]，显示雇员的信息
select *
from emp
order by sal;

# ?按照部门号升序而雇员的工资降序排列， 显示雇员信息
select *
from emp
order by deptno /*asc*/, sal desc ;#asc代表默认

```

# 分页查询


- 重要公式
```sql
推导一个公式
select * from emp
order by empno
limit 每页显示的记录数 * (第几页 - 1), 每页显示的记录数

```


```sql
#  分页查询
# 按雇员的id号升序取出， 每页显示3条记录，请分别显示 第1页， 第2页， 第3页

# 第1页
select * from emp
order by empno
limit 0, 3;

# 第2页
select * from emp
order by empno
limit 3, 3;


#第三页
select * from emp
order by empno
limit 6, 3;


```

# 增强group by子句
```sql
#增强group by的使用
# (1) 显示每种岗位的雇员总数、平均工资
select count(*), avg(sal), job
from emp
group by job;

# (2) 显示雇员总数，以及获得补助的雇员数
#思路：获得补助的雇员数 就是comm列 为非null，就是
#sql很灵活
select count(*), count(if(comm is null, 1, null))#为null不统计
from emp;

select count(*), count(*) - count(comm)
from emp;

# (3) 显示管理者的总人数
select count(distinct mgr)
from emp;
# (4) 显示雇员工资的最大差额
select max(sal) - min(sal)
from emp;

select * from emp;



```


- 第一问
  (1) 显示每种岗位的雇员总数、平均工资


```sql

select count(*), avg(sal), job
from emp
group by job;
```
这个语句解决问题的思路是：
- 先对emp表进行group by操作，group by后面的job字段，表示按照job字段进行分组。
- 然后使用聚合函数count(*)统计每组的记录数，avg(sal)计算每组的平均工资。
- 最后显示job、count(*)、avg(sal)这三个字段。

- 第二问
  (2) 显示雇员总数，以及获得补助的雇员数
    思路：获得补助的雇员数 就是comm列 为非null，就是

```sql
select count(*), count()#为null不统计
from emp;
```
- 这个语句解决问题的思路是：利用count不统计null的机制，直接可以统计到非null的记录数。也就是获得补助的雇员数。

- 另外考虑，如果有复杂情况，我们还有别的写法吗？ 扩展要求：统计不获得补助的雇员数
```sql

select count(*), count(if(comm is null, 1, null))#为null不统计
from emp;
```
这条语句的的思路是：利用if函数，判断comm是否为null，如果为null，则返回1,否则返回null，表示,然后count不为null的记录数。

---

```sql
select count(*), count(*) - count(comm)
from emp;
```
- 这个语句的思路是：用总数-补助数的形式，直接计算出不获得补助的雇员数。

## 分组统计语句

- 先看需求：
应用案例：请统计各个部门的平均工资 avg,并且是大于1000的，并且按照平均工资从高到低排序,取出前两行记录

```sql
select deptno, avg(sal) as avg_sal
from emp
group by deptno
having avg_sal > 1000
order by avg_sal desc
limit 0,2;
```

# 多表查询
```
多表查询
显示雇员名， 雇员工资及所在部门的名字 [笛卡尔集]
    分析:
    1.雇员名，雇员工资来自emp表
    2.部门名字 来自dept表
    3.需求对emp和dept查询

```

- 我们在进行多表查询的时候，如果没有加限制，会查出多表的笛卡尔积，也就是所有可能的组合。
- 所以，在进行多表查询的时候，一定要加上条件限制，否则会导致结果过多。


先看需求：

- 第一问：要求显示雇员名， 雇员工资及所在部门的名字

```sql

select ename,sal,dname,emp.deptno#显示雇员名， 雇员工资及所在部门的名字
from emp, dept
where emp.deptno = dept.deptno;
```
这里加上`where emp.deptno = dept.deptno ` 代表只显示雇员所在的部门的名字。 如果不加这个条件，会显示所有员工的名字。

- 第二问:如何显示部门为10的部门名、员工名和工 资
```sql
select ename, sal,dname
from emp, dept
where emp.deptno = 10;
```

- 第三问:显示各个员工的姓名， 工资，及其工资的级别
```sql

#思路 姓名 工资 来自 emp
select ename, sal,grade
from emp, salgrade
where sal between losal and hisal;
```


- 第四问:显示员工名，薪水，部门编号，部门名称并且按照部门编号降序排序
```sql

select ename, sal, deptno
from emp, dept
where emp.deptno = dept.deptno
order by deptno desc;
```





# 子查询

- 子查询的演示
- 请思考：如何显示与smith同一部门的所有员工？

1. 先查询到smith的部门号得到

```sql
```
2. 如何查询和部门10的工作相同的雇员的名字、岗位、工资、部门号，但是不含10自己的雇员
```sql

```
思路：
1. 查到10号部门有哪些岗位

```sql
select distinct emp.job
from emp
where deptno = 10;
```


2.完整写法 


- 错误写法，只是筛选了部门号，并没有显示岗位
```sql
select distinct emp.job
from emp
where deptno = 10;
```
- 正确写法:
```sql 
select ename, sal, job, deptno
from emp
where job in (select distinct emp.job
              from emp
              where deptno = 10)
  and deptno != 10;
```

# 子查询临时表
- 需求：查询商品表,查询ecshop 中各个类别中， 价格最高的商品
- 思路：
1. 先得到 各个类别中， 价格最高的商品 max + group by cat id, 当作临时表
2. 然后把子查询当作一张临时表可以解决很多复杂的查询


```sql
#查询 商品表
#先得到 各个类别中， 价格最高的商品 max + group by cat id, 当作临时表
#把子查询当作一张临时表可以解决很多复杂的查询
desc ecshop;

select ecshop.cat_id, max(ecshop.shop_price)
from ecshop
group by cat_id;

select goods_id, cat_id, goods_name, shop_price
from ecshop;



select goods_id, temp.cat_id, goods_name, ecs_goods.shop_price
from (select ecshop.cat_id, max(ecshop.shop_price) as max_price
      from ecshop
      group by cat_id) temp,
     ecs_goods
where temp.cat_id = ecs_goods.cat_id
  and temp.max_price = ecs_goods.shop_price;

```

总结：
子查询当作一张临时表可以解决很多复杂的查询


# all 和 any 关键字
- all 和 any 关键字的演示
- 请思考：显示工资比部门30的所有员工的工资高的员工的姓名、工资和部门号 -> all  
- 再思考：显示工资比部门30的最低工资员工高的员工的姓名、工资和部门号 -> any
```sql
# all 和 any的使用

# 请思考：显示工资比部门30的所有员工的工资高的员工的姓名、工资和部门号

#临时表
select sal
from emp
where deptno = 30;

select ename, sal, emp.deptno
from emp
where sal > all (select sal
                 from emp
                 where deptno = 30);

select ename, sal, emp.deptno
from emp
where sal > (select max(sal)
             from emp
             where deptno = 30);


select ename, sal, deptno
from emp
where sal > any (select sal
                 from emp
                 where deptno = 30);


select ename, sal, emp.deptno
from emp
where sal > (select min(sal)
             from emp
             where deptno = 30);

```


# 多列子查询
- 需求：查询emp表中，职位和部门与SMITH相同，但是不包括SMITH本人的员工
- 思路：
1. 先查询到SMITH的部门号和职位
2. 然后把这两个条件作为子查询条件，查询emp表中，部门号和职位与SMITH相同，但是不包括SMITH本人的员工


```sql
select deptno, job
from emp
where ename = 'SMITH';

select *
from emp
where (deptno,job) = (
    select deptno, job
    from emp
    where ename = 'SMITH'
    ) and ename != 'SMITH';

```


# 蠕虫复制
```sql
#蠕虫复制
create table my_table01(
    id int,
    `name` varchar(32),
    sal double,
    job varchar(32),
    dept int
);

select * from my_table01;

desc emp;
#演示如何自我复制
#1.先把emp表的记录复制到my_table01
insert into my_table01 (id, `name`, sal, job, dept)
select empno, ename, sal, job, deptno from emp;

insert into my_table01
select * from my_table01;

select count(*) from my_table01;

select * from my_table01;


# 如何去掉一张表的重复记录
# 1. 先创建一张临时表
# 2. 让这张表my_table02有重复的记录
create table my_tab02 LIKE emp;
desc my_tab02;

insert into my_tab02
select * from emp;


# 3. 考虑去重
/*
        思路
        (1) 先创建一张临时表 my_tmp , 该表的结构和my_tab02 一样
        (2) 把my_tmp的记录 通过了dinstinct 关键字 处理后 把记录复制到 my_tmp
        (3) 清除掉my_tab02 记录
        (4) 把my_tmp 表的记录复制到my_tab02
        (5) drop 掉临时表my_tmp
 */

# (1) 先创建一张临时表 my_tmp , 该表的结构和my_tab02 一样
create table my_tmp like my_tab02;
# (2) 把my_tmp的记录 通过了dinstinct 关键字 处理后 把记录复制到 my_tmp
insert into my_tmp
select distinct * from my_tab02;

desc my_tab02;
#(3) 清除掉my_tab02 记录
delete from my_tab02
where empno, ename, job, mgr, hiredate, sal, comm, deptno;

TRUNCATE TABLE my_tab02;  -- 直接清空表（不可回滚）


#(4) 把my_tmp 表的记录复制到my_tab02
insert into my_tab02
select * from my_tmp;

select * from my_tab02;
drop table my_tmp;

```

# 合并查询
```sql
# 合并查询
select ename, sal, job
from emp
where sal > 2500;

select ename, sal, job
from emp
where job = 'MANAGER';

# union all就是将两个查询结果合并， 不会去重
select ename, sal, job
from emp
where sal > 2500
union all
select ename, sal, job
from emp
where job = 'MANAGER';

# union 就是将两个查询结果合并， 会去重
select ename, sal, job
from emp
where sal > 2500
union
select ename, sal, job
from emp
where job = 'MANAGER';

```


# 主键使用
```sql
# 主键使用
create table t17
(
    id     int primary key,
    `name` varchar(32),
    email  varchar(32)
);

#主键列的值是不可以重复的
insert into t17
values (1, 'jack', 'jack@sohu.com');

insert into t17
values (2, 'tom', 'tom@sohu.com');

insert into t17
values (null, 'hsp', 'hsp@sohu.com');

select *
from t17;

#主键使用的细节讨论
#primary key 不能重复而且不能为null
#一张表最多只能有一个主键， 但可以是复合主键
create table t18
(
    id     int primary key,
    `name` varchar(32) primary key,
    email  varchar(32)
);
#演示复合主键 (id 和 name 做成复合主键)
create table t18
(
    id     int,
    `name` varchar(32),
    email  varchar(32),
    primary key (id, `name`) # 这就是复合组件
);
insert into t18
values (1, 'tom', 'tom@sohu.com');

insert into t18
values (1, 'jack', 'jack@sohu.com')

insert into t18
values (1, 'tom', 'jack@sohu.com');

select *
from t18;
#违反了复合主键

# 主键的指定方式有两种
# 直接在字段名后制定:字段名 primary key
# 在表定义最后写primary key(列名);
create table t19
(
    id     int,
    `name` varchar(32) primary key,
    email  varchar(32)
);


create table t20
(
    id     int,
    `name` varchar(32) ,
    email  varchar(32),
    primary key (`name`)
);


# 使用desc表名

desc t20;
desc t18;


```
# unique 约束
```sql
# 主键使用
create table t17
(
    id     int primary key,
    `name` varchar(32),
    email  varchar(32)
);

#主键列的值是不可以重复的
insert into t17
values (1, 'jack', 'jack@sohu.com');

insert into t17
values (2, 'tom', 'tom@sohu.com');

insert into t17
values (null, 'hsp', 'hsp@sohu.com');

select *
from t17;

#主键使用的细节讨论
#primary key 不能重复而且不能为null
#一张表最多只能有一个主键， 但可以是复合主键
create table t18
(
    id     int primary key,
    `name` varchar(32) primary key,
    email  varchar(32)
);
#演示复合主键 (id 和 name 做成复合主键)
create table t18
(
    id     int,
    `name` varchar(32),
    email  varchar(32),
    primary key (id, `name`) # 这就是复合组件
);
insert into t18
values (1, 'tom', 'tom@sohu.com');

insert into t18
values (1, 'jack', 'jack@sohu.com')

insert into t18
values (1, 'tom', 'jack@sohu.com');

select *
from t18;
#违反了复合主键

# 主键的指定方式有两种
# 直接在字段名后制定:字段名 primary key
# 在表定义最后写primary key(列名);
create table t19
(
    id     int,
    `name` varchar(32) primary key,
    email  varchar(32)
);


create table t20
(
    id     int,
    `name` varchar(32) ,
    email  varchar(32),
    primary key (`name`)
);


# 使用desc表名

desc t20;
desc t18;

```

# 外键使用
1. 外键指向表的字段，必须是主键(primary key)或者唯一索引(unique )
2. 表的类型是InnoDB，这样的表才能建立外键
3. 外键的字段的数据类型必须和引用的主键的数据类型一致
4. 外键的字段的值必须在主键表中存在或者为null前提是允许空值
5. 一旦建立了外键，不能随意删除主键，只能修改主键


```sql
# 外键演示


# 创建主表 myclass
create table myclass
(
    id     int primary key,
    `name` varchar(32) not null default ''
);

rename table myclass to my_class;

# 创建从表 my_stu
create table my_stu
(
    id       int primary key,#学生编号
    `name`   varchar(32) not null default '',
    class_id int,
    foreign key (class_id) references my_class (id)

);

# 测试数据
insert into my_class
values (100, 'java'),
       (200, 'web');

insert into my_class
values (300, 'php');

insert into my_stu
values (1, 'tom', 100);


insert into my_stu
values (2, 'jack', 200);


insert into  my_stu
values (3, 'lfm', 300);#

insert into  my_stu
values (4, 'mary', 400);# 会失败400 号班级还不存在

insert into  my_stu
values (4, 'mary', null);# null 可以, 没有写not null


select * from my_stu;


delete from my_class
where id = 100;


```

# check
```sql
# 演示check的使用
# mysql 5.7不支持check, 只做语法校验

create table t23
(
    id int primary key ,
    `name` varchar(32),
    sex varchar(6) check (sex in ('man', 'woman')),
    sal double check (sal > 1000 and sal < 2000)
);


# 添加数据
insert into t23
values (1, 'jack', 'mid', 1);

select * from t23;


```
# mysql 索引
1. 主键索引，主键自动的为主索引(类型Primary)
2. 唯一索引(UNIQUE)
3. 普通索引(INDEX)
4. 全文索引(FULLTEXT) 适用于MyISAM
```sql
# 演示mysql索引的使用
#创建索引

create table t25
(
    id     int,
    `name` varchar(32)
);

# 查询表是否有索引
show index from t25;

# 添加索引
# 添加唯一索引:唯一约束
create unique index id_index on t25 (id);
# 添加普通索引
create index id_index on t25 (id);

# 如何选择
# 如果某列的值是不会重复的，则优先考虑使用unique索引，否则使用普通索引
alter table t25 add index id_index (id);

#添加主键索引


create table t26
(
    id     int,
    `name` varchar(32)
);
alter table t26 add primary key (id);
show index from t26;

select * from t25;


```

-  如何选择

如果某列的值是不会重复的，则优先考虑使用unique索引，否则使用普通索引

## 删除索引


```sql
# 演示mysql索引的使用
#创建索引

create table t25
(
    id     int,
    `name` varchar(32)
);

# 查询表是否有索引
show index from t25;

# 添加索引
# 添加唯一索引:唯一约束
create unique index id_index on t25 (id);
# 添加普通索引
create index id_index on t25 (id);

# 如何选择
# 如果某列的值是不会重复的，则优先考虑使用unique索引，否则使用普通索引
alter table t25
    add index id_index (id);

#添加主键索引


create table t26
(
    id     int,
    `name` varchar(32)
);
alter table t26
    add primary key (id);
show index from t26;

# 删除索引
select *
from t25;

# 删除索引
drop index id_index on t25;

# 删除主键索引
alter table t26
    drop primary key;

# 修改索引 先删除， 再添加新的索引



# 查询索引
# 1. 方式
show index from t25;
# 2.方式
show indexes from t25;
# 3. 方式
show keys from t25;
# 4 方式
desc t25;

```

# 事务 

- 相当于给数据库提供了快照的功能，可以保证数据的一致性

# 隔离级别

- 四大隔离级别分别是:
- READ UNCOMMITTED(未提交读)
- READ COMMITTED(提交读)
- REPEATABLE READ(可重复读)
- SERIALIZABLE(可串行化)
```sql

#DROP TABLE lfm_db02.my_teachers;

#演示mysql的事务隔离级别
#1. 开了两个mysql的控制台
#2. 查看当前mysql的隔离级别

select @@tx_isolation;
# MariaDB [(none)]> select @@tx_isolation;
# +-----------------+
# | @@tx_isolation  |
# +-----------------+
# | REPEATABLE-READ |
# +-----------------+

# 把其中一个控制台的隔离几倍设置 Read uncommitted
set session transaction isolation level read uncommitted;
set session transaction isolation level read committed;

# 4. 创建表
create table `account`
(
    id     int,
    `name` varchar(32),
    money  int
);

drop table `account`;

select @@tx_isolation;

select @@global.tx_isolation;

set session transaction isolation level read uncommitted;

set global transaction isolation level read committed;

show engines;
```

# 存储引擎
常用存储引擎有：
- InnoDB:支持事务，支持外键，支持行级锁，支持MVCC(多版本并发控制)
- MyISAM:不支持事务，不支持外键，支持全文索引，支持表级锁
- Memory:支持内存表，数据保存在内存中，速度快，适合临时表或缓存数据
- CSV
- Archive
- Blackhole

# 视图
当我们想要更新表，但是又不能删掉原来的表，这时候就可以使用视图。

相当于我们在表的基础上创建了一个虚拟的表，可以对其进行查询、更新、删除等操作。

对视图的操作，实际上是对基础表的操作。

```sql
create view emp_view01
as
select empno, ename, job, deptno
from emp;

desc emp_view01;

select *
from emp_view01;
select empno, job
from emp_view01;

# 查看创建视图的指令
show create view emp_view01;

#删除视图
drop view emp_view01;

# 视图的细节
# 1.创建视图以后，到数据库去看，对应视图只有一个视图结构文件
# 2. 视图的数据变化会影响到基表，基表的数据变化也会影响到视图[insert update delete]

# 修改视图 会影响到基表

update emp_view01
set job = 'MANAGER'
where empno = 7369;

select * from emp;

select * from emp_view01;

# 修改基本表也会影响视图

#3. 视图中可以再使用视图，比如从emp_view01 视图中， 选出empno和ename做出新视图

desc emp_view01;


create view emp_view02
as
select empno, ename from emp_view01;

select * from emp_view02;


desc dept;
desc emp;
desc salgrade;
create view emp_view03
as
select empno, ename, dname,grade
from emp, dept, salgrade
where emp.deptno = dept.deptno and (sal between losal and hisal);
desc emp_view03;


```

# 用户管理

小练习

```sql
# 用户权限管理

create user 'lfm_01'@'localhost' identified by '123';


create database testdb;
create table news
(
    id      int,
    content varchar(32)
);

insert into news values(100, '北京新闻');

select * from news;
grant select , insert
on testdb.news
to 'lfm_01'@'localhost';

grant update
    on testdb.news
    to 'lfm_01'@'localhost';

set password for 'lfm_01'@'localhost' = password ('abc');

revoke select, update, insert on testdb.news from 'lfm_01'@'localhost';

revoke all on testdb.news from 'lfm_01'@'localhost';

drop user 'lfm'@'localhost';


```
- 细节

```sql
create user jack;

select `host`, `user`
from mysql.user;


create user 'smith'@'192.168.1.%';


drop user jack; #== drop user 'jack'@'%'
drop user 'smith'@'192.168.1.%';

create table actor
(
    id       int primary key auto_increment,
    `name`     varchar(32) not null default '',
    sex      char(1)     not null default '女',
    borndate datetime,
    phone    varchar(12)
);

select *
from actor;
select * from emp;

```
