# 获取数据库连接5种方式
1. 获得Driver对象
```java
Driver driver = new com.mysql.jdbc.Driver();

String url = "jdbc:mysql://localhost:3306/testdb";

Properties info = new Properties();
info.setProperty("user", "root");
info.setProperty("password", "lfm");
Connection conn = driver.connect(url, info);
System.out.println(conn);

```


2. 用反射机制 

```java
import org.junit.jupiter.api.Test;
import org.mariadb.jdbc.Connection;

import java.sql.Driver;
import java.sql.SQLException;
import java.util.Properties;

public class JdbcConn {
    //第一种方式
    @Test
    public void connect01() throws SQLException {
        org.mariadb.jdbc.Driver driver = new org.mariadb.jdbc.Driver();
        String url = "jdbc:mariadb://localhost:3306/lfm_db02";
        Properties properties = new Properties();
        properties.setProperty("user", "root");
        properties.setProperty("password", "lfm");
        Connection connect = driver.connect(url, properties);
        System.out.println(connect);
    }

    //方式2
    @Test
    public void connect02() throws ClassNotFoundException,  InstantiationException, IllegalAccessException, SQLException{

        //使用反射加载Driver类, 动态加载， 更加灵活，减少依赖性
        Class<?> aClass = Class.forName("org.mariadb.jdbc.Driver");
        org.mariadb.jdbc.Driver driver = (org.mariadb.jdbc.Driver)aClass.newInstance();


        String url = "jdbc:mariadb://localhost:3306/lfm_db02";
        Properties properties = new Properties();
        properties.setProperty("user", "root");
        properties.setProperty("password", "lfm");
        Connection connect = driver.connect(url, properties);
        System.out.println(connect);
    }

    public static void main(String[] args) {

    }

}

```

- 用反射的好处是可以动态加载，不依赖于具体的数据库驱动，适用于多种数据库的连接。

- 第五种方式的练习
```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class exerciseM5 {

    public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
        //1. 注册驱动-自动化

        //2. 获取连接
        Properties properties = new Properties();
        properties.load(new FileInputStream("mariadb.properties"));

        String url = properties.getProperty("url");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String user = properties.getProperty("user");
        Class.forName(driver);

        Connection connection = DriverManager.getConnection(url, user, password);

        //3. 执行sql
        String sql = "create table news(id int, newsreport varchar(32));";

        Statement statement = connection.createStatement();
        int rows = statement.executeUpdate(sql);

        sql = "insert into news values(1, '北京新闻');";
        rows = statement.executeUpdate(sql);
        sql = "insert into news values(2, '成都新闻');";
        rows = statement.executeUpdate(sql);
        sql = "insert into news values(3, '重庆新闻');";
        rows = statement.executeUpdate(sql);
        sql = "insert into news values(4, '南京新闻');";
        rows = statement.executeUpdate(sql);
        sql = "insert into news values(5, '上海新闻');";
        rows = statement.executeUpdate(sql);

        sql = "update news set newsreport = '南丹新闻' where id = 1;";
        rows = statement.executeUpdate(sql);
        sql = "delete from news where id = 3;";
        rows = statement.executeUpdate(sql);

        System.out.println(rows > 0 ? "成功" : "失败");
        //4. 关闭连接资源
        statement.close();
        connection.close();
    }
}

```
# ResultSet接口
我们select表的时候可以把它视为一个结果集，每一行数据都是一个对象，这个对象就是ResultSet。ResultSet接口提供了获取数据的方法，包括获取数据类型、获取数据值、移动到下一行、获取列名等。

我们准备了一个actor表，里面有id、name、sex、borndate、age字段。我们要查询这个表的所有数据，并打印出来。
如下：

```
1,周星驰,男,1970-11-11 00:00:00,110
2,刘德华,男,1970-12-12 00:00:00,110
3,jack,男,1990-11-11 00:00:00,112

```

如果我们想在java程序中读到数据库的内容，我们需要用ResultSet接口。
1. 首先，我们需要加载数据库驱动。
2. 然后，我们需要得到数据库连接。
3. 然后，我们需要组织sql语句。
4. 然后，我们需要执行sql语句，得到ResultSet。

5. 然后，我们需要使用ResultSet接口的相关方法，获取数据。


    1. 要得到ResultSet, 用到Statement的executeQuery方法。
    2. 要获取数据，用到ResultSet的相关方法。
    3. 比如next方法，是用来移动光标到下一行的。获取`int` 就是`getInt()`
    4. 要关闭ResultSet、Statement、Connection。



```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

/**
 * 演示select语句返回ResultSet 返回结果

 */
@SuppressWarnings({"all"})
public class ResultSet_ {
    public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {

        Properties properties = new Properties();
        properties.load(new FileInputStream("mariadb.properties"));

        String url = properties.getProperty("url");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String user = properties.getProperty("user");
        //1. 加载驱动
        Class.forName(driver);

        //2.得到连接
        Connection connection = DriverManager.getConnection(url, user, password);

        //3. 得到Statement
        Statement statement = connection.createStatement();
        //4. 组织Sql语句
        String sql = "select id, name, sex, borndate from actor;";

        //理解为返回一张表
        ResultSet resultSet = statement.executeQuery(sql);

        //5. 使用while循环取出数据
        while (resultSet.next()) {//让光标往后走, 如果没有行，返回false
            int id = resultSet.getInt(1);
            String name = resultSet.getString(2);
            String sex = resultSet.getString(3);
            Date date = resultSet.getDate(4);
            System.out.println(id + "\t" + name + "\t" + sex + "\t" + date);

        }


        //6. 关闭连接
        resultSet.close();
        statement.close();
        connection.close();


    }
}

```

# SQL注入
- 先创建一个表，方便我们测试
```sql
create table admin
(
    name varchar(32) not null unique,
    pwd  varchar(32) not null default ''
) character set utf8mb4;

insert into admin
values ('tom', '123');




```

- 正常查找某个管理是否存在

```sql

#查找某个管理员是否存在
select *
from admin
where name = 'tom'
  and '123';
```

-  sql注入写法：

```sql
# SQL注入
# 用户名: 1'or
#  密码: '1' = '1
# 永远为真
select *
from admin
where name = '1'
   or ' and pwd = '
   or '1' = '1';
```
这样写了一个永远为真的条件，导致查询结果永远为真，即使管理员不存在也会返回结果。导致了严重的安全问题。

- 解决办法：
用PreparedStatement来防止sql注入。Statement是不安全的。


- 在jdbc中演示
- 其中我犯的一个语法错误：
```java
String sql = "select name, pwd" +
             "from admin where name = '" + admin_name + "' and pwd ='" + admin_pwd + "'";

```
这里我的pwd后面没有加上空格所以语句就是
```sql
select name, pwdfrom admin where name = 'tom' and pwd = '123'
```
- 正确的写法应该是：
```java
        String sql = "select name, pwd " + "from admin where name = '" + admin_name + "' and pwd ='" + admin_pwd + "'";

```

- 代码如下：
```java
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;
import java.util.Properties;
import java.util.Scanner;

@SuppressWarnings({"all"})
public class Statement_ {
    public static void main(String[] args) throws Exception{

        String admin_name = "";
        String admin_pwd = "";

        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入管理员名字: ");
        admin_name = scanner.nextLine();
        System.out.print("请输入管理员密码: ");
        admin_pwd = scanner.nextLine();


        Properties properties = new Properties();
        properties.load(new FileInputStream("mariadb.properties"));

        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");

        Class.forName(driver);

        Connection connection = DriverManager.getConnection(url, user, password);
        Statement statement = connection.createStatement();

        String sql = "select name, pwd " + "from admin where name = '" + admin_name + "' and pwd ='" + admin_pwd + "'";
        ResultSet resultSet = statement.executeQuery(sql);

        if (resultSet.next()) {
            System.out.println("成功");
        } else {
            System.out.println("失败");
        }

        resultSet.close();
        connection.close();
        statement.close();

    }

}

```
- 这个代码会根据用户输入的用户名和密码来判断是否存在管理员，如果存在管理员，则返回成功，否则返回失败。

我们来模拟SQL注入：

这是现在admin表的数据:
```
+------+-----+
| name | pwd |
+------+-----+
| tom  | 123 |
+------+-----+

```
- 只有`tom` `123` 这个管理员

- 可是当我们输入
```
用户名: 1' or
密码: or '1'='1

```

- 我们会发现结果是:
```
请输入管理员名字: 1' or
请输入管理员密码: or '1'='1
成功

```

# PreparedStatement 防止SQL注入

- 使用PreparedStatement的优势：
1. 可以防止SQL注入
2. 让Sql语句不用实现复杂的字符串拼接，减少出错,增加可读性，提高代码的可维护性。

- 使用

1. 在sql语句中使用? 作为占位符
```java
//? 相当于占位符
String sql = "select name, pwd from admin where name = ? and pwd = ?";
```
2. 获取PreparedStatement对象, 注意在这里**已经**把sql语句处理好了
```java
java.sql.PreparedStatement preparedStatement = connection.prepareStatement(sql);
```

3. 设置占位符的值, 从1开始
```java
preparedStatement.setString(1, admin_name);//第n个占位符就填n， 是什么类型就是set某类型
preparedStatement.setString(2, admin_pwd);
```

4. 接收select的结果集, 注意这里和之前的Statement不同，这里不要再传入sql语句了，否则占位符部分读到的就是个问号会报错，而不是我们用户输入的字符串。
```java
ResultSet resultSet = preparedStatement.executeQuery();
```
- select 语句用的是executeQuery方法。


```java
import java.io.FileInputStream;
import java.sql.*;
import java.util.Properties;
import java.util.Scanner;

@SuppressWarnings({"all"})
public class PreparedStatement_ {
    public static void main(String[] args) throws Exception{


        String admin_name = "";
        String admin_pwd = "";

        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入管理员名字: ");
        admin_name = scanner.nextLine();
        System.out.print("请输入管理员密码: ");
        admin_pwd = scanner.nextLine();


        Properties properties = new Properties();
        properties.load(new FileInputStream("mariadb.properties"));

        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");

        //1. 加载驱动
        Class.forName(driver);

        //2. 获得连接
        Connection connection = DriverManager.getConnection(url, user, password);

        //Statement statement = connection.createStatement();

        //? 相当于占位符
        String sql = "select name, pwd from admin where name = ? and pwd = ?";

        //3. 获得PreparedStatement
        java.sql.PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, admin_name);//第n个占位符就填n， 是什么类型就是set某类型
        preparedStatement.setString(2, admin_pwd);


        // 这里能再加入sql，否则读到的是问号而不是占位的
        //ResultSet resultSet = preparedStatement.executeQuery(sql);

        ResultSet resultSet = preparedStatement.executeQuery();

        if (resultSet.next()) {
            System.out.println("成功");
        } else {
            System.out.println("失败");
        }

        resultSet.close();
        connection.close();
        preparedStatement.close();
    }
}

```
# 预处理DML
```java
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.Properties;
import java.util.Scanner;

@SuppressWarnings({"all"})
public class PreparedStatementDML_ {
    public static void main(String[] args) throws Exception{


        String admin_name = "";
        String admin_pwd = "";

        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入管理员名字: ");
        admin_name = scanner.nextLine();
        //System.out.print("请输入管理员密码: ");
        //admin_pwd = scanner.nextLine();


        Properties properties = new Properties();
        properties.load(new FileInputStream("mariadb.properties"));

        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");

        //1. 加载驱动
        Class.forName(driver);

        //2. 获得连接
        Connection connection = DriverManager.getConnection(url, user, password);

        //3. 获得PreparedStatement
        //3.1 组织sql ， Sql语句的? 相当于占位符
        //添加记录
        //String sql = "insert into admin values(?, ?)";

        //修改记录
        //String sql = "update admin set pwd = ? where name = ?";

        //删除记录
        String sql = "delete from admin where name = ?";
        java.sql.PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setString(1, admin_name);//第n个占位符就填n， 是什么类型就是set某类型
        //preparedStatement.setString(2, admin_pwd);

        //4. 执行DML语句 使用excuteUpdate
        int rows = preparedStatement.executeUpdate();
        System.out.println(rows > 0 ? "成功" : "失败");

        connection.close();
        preparedStatement.close();

    }
}


```

- 课堂练习
1. 创建admin表
2. 使用PreparedStatement添加5条记录
3. 修改tom的记录，将name改为king
4. 删除一条记录
5. 查询全部记录并显示在控制台
```java
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;
import java.util.Scanner;

@SuppressWarnings({"all"})
public class ExercisePreSta {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        String name = "";

        String pwd = "";


        Properties properties = new Properties();
        properties.load(new FileInputStream("mariadb.properties"));
        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        String driver = properties.getProperty("driver");


        Class.forName(driver);

        Connection connection = DriverManager.getConnection(url, user, password);

        String sql = "create table admin(name varchar(32), password varchar(32))";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        int i1 = preparedStatement.executeUpdate();
        System.out.println("创建成功");


        sql = "";
        PreparedStatement ps_insert = connection.prepareStatement(sql);
        for (int i = 0; i < 5; i ++) {
            sql = "insert into admin values(?, ?)";
            ps_insert = connection.prepareStatement(sql);
            System.out.print("请输入添加的管理员的姓名 ");
            name = scanner.nextLine();
            System.out.print("请输入添加的管理员的密码 ");
            pwd = scanner.nextLine();

            ps_insert.setString(1, name);
            ps_insert.setString(2, pwd);
            int rows = ps_insert.executeUpdate();
            System.out.println(rows > 0 ? "第" + (i + 1) + "条记录添加成功" : "添加失败");
        }

        //修改tom的密码
        sql = "update admin set name = ? where name = ?";
        PreparedStatement ps_update = connection.prepareStatement(sql);
        System.out.print("请输入修改的管理员的姓名 ");
        name = scanner.nextLine();
        ps_update.setString(2, name);
        System.out.print("请输入修改后的姓名: ");
        pwd  = scanner.nextLine();
        ps_update.setString(1, pwd);
        int rows = ps_update.executeUpdate();
        System.out.println(rows > 0 ? "修改成功" : "修改失败");

        //删除一条记录
        sql = "delete from admin where name = ?";
        System.out.print("请输入删除的管理员的姓名: ");
        name = scanner.nextLine();
        PreparedStatement ps_delete = connection.prepareStatement(sql);
        ps_delete.setString(1, name);

        //显示所有记录
        System.out.println("====admin的所有记录====");
        sql = "select * from admin";
        PreparedStatement ps_select = connection.prepareStatement(sql);
        ResultSet resultSet = ps_select.executeQuery();
        while (resultSet.next()) {
            String na = resultSet.getString(1);
            String pw = resultSet.getString(2);
            System.out.println(na + "\t" + pw + "\t");
        }
        resultSet.close();
        ps_select.close();
        ps_delete.close();
        ps_update.close();
        ps_insert.close();
        connection.close();



    }
}

```
- 作业改进


>代码整体逻辑是能跑的，也完成了老师要求的 5 个步骤。但如果从规范性、可维护性、健壮性、PreparedStatement 使用规范、资源管理、安全性、重复 SQL 的处理方式来看，还有不少可以改进的地方。
>
>
> ---
>
> # 当前代码的评价
>
> ### 优点
>
> * 基本完成任务：创建表、插入数据、修改、删除、查询。
> * 能够使用 PreparedStatement（这是重点）。
> * 流程结构清晰，易理解。
>
> ---
>
> # 需要改进的地方（重要）
>
> ### 1. 每次插入循环里重复写 SQL + prepare 不必要
>
> ```java
> sql = "insert into admin values(?, ?)";  
> ps_insert = connection.prepareStatement(sql);  
> ```
>
> 这会导致重复 prepare，性能差。
>
> 应该：提前 prepare 一次，然后循环 set 参数即可。
>
> ---
>
> ### 2. 未执行删除语句
>
> 我写了：
>
> ```java
> PreparedStatement ps_delete = connection.prepareStatement(sql);  
> ps_delete.setString(1, name);  
> ```
>
> 但是我没有写 `ps_delete.executeUpdate()`。
>
> ---
>
> ### 3. 修改时逻辑混乱
>
> 我写：
>
> ```java
> System.out.print("请输入修改的管理员的姓名 ");  
> name = scanner.nextLine();  
> ps_update.setString(2, name);  
>  
> System.out.print("请输入修改后的姓名 ");  
> pwd = scanner.nextLine();  
> ps_update.setString(1, pwd);  
> ```
>
> 变量命名不对应，`pwd` 变成 “新名字” 不合理，会让阅读者困惑。
>
> ---
>
> ### 4. 创建表语句不应该每次运行都执行（会报错）
>
> 重复运行程序会报：
>
> ```text
> Table 'admin' already exists  
> ```
>
> 应改为：
>
> ```sql
> create table if not exists admin(…)  
> ```
>
> ---
>
> ### 5. 资源释放更推荐 try-with-resources
>
> 我手动 close，可以但很繁琐，也容易忘记。
>
> ---
>
> # 优化后的版本代码
>
> ```java
> import java.io.FileInputStream;  
> import java.sql.*;  
> import java.util.Properties;  
> import java.util.Scanner;  
>  
> @SuppressWarnings("all")  
> public class ExercisePreSta {  
>     public static void main(String[] args) throws Exception {  
>  
>         Scanner scanner = new Scanner(System.in);  
>  
>         // 读取配置文件  
>         Properties properties = new Properties();  
>         properties.load(new FileInputStream("mariadb.properties"));  
>  
>         String url = properties.getProperty("url");  
>         String user = properties.getProperty("user");  
>         String password = properties.getProperty("password");  
>         String driver = properties.getProperty("driver");  
>  
>         Class.forName(driver);  
>  
>         // 建议使用 try-with-resources 自动关闭连接  
>         try (Connection conn = DriverManager.getConnection(url, user, password)) {  
>  
>             // --- 1. 创建 admin 表 ---  
>             String createSql =  
>                     "create table if not exists admin (" +  
>                     "username varchar(32), " +  
>                     "password varchar(32))";  
>             try (PreparedStatement ps = conn.prepareStatement(createSql)) {  
>                 ps.executeUpdate();  
>                 System.out.println("表 admin 创建成功");  
>             }  
>  
>             // --- 2. 插入 5 条数据 ---  
>             String insertSql = "insert into admin values (?, ?)";  
>             try (PreparedStatement ps = conn.prepareStatement(insertSql)) {  
>                 for (int i = 0; i < 5; i++) {  
>                     System.out.print("请输入姓名: ");  
>                     String name = scanner.nextLine();  
>  
>                     System.out.print("请输入密码: ");  
>                     String pwd = scanner.nextLine();  
>  
>                     ps.setString(1, name);  
>                     ps.setString(2, pwd);  
>  
>                     int rows = ps.executeUpdate();  
>                     System.out.println("第 " + (i + 1) + " 条记录添加 " + (rows > 0 ? "成功" : "失败"));  
>                 }  
>             }  
>  
>             // --- 3. 修改用户名 ---  
>             String updateSql = "update admin set username = ? where username = ?";  
>             try (PreparedStatement ps = conn.prepareStatement(updateSql)) {  
>                 System.out.print("请输入要修改的原用户名：");  
>                 String oldName = scanner.nextLine();  
>  
>                 System.out.print("请输入新的用户名：");  
>                 String newName = scanner.nextLine();  
>  
>                 ps.setString(1, newName);  
>                 ps.setString(2, oldName);  
>  
>                 int rows = ps.executeUpdate();  
>                 System.out.println(rows > 0 ? "修改成功" : "未找到该用户");  
>             }  
>  
>             // --- 4. 删除记录 ---  
>             String deleteSql = "delete from admin where username = ?";  
>             try (PreparedStatement ps = conn.prepareStatement(deleteSql)) {  
>                 System.out.print("请输入要删除的用户名：");  
>                 String delName = scanner.nextLine();  
>  
>                 ps.setString(1, delName);  
>  
>                 int rows = ps.executeUpdate();  
>                 System.out.println(rows > 0 ? "删除成功" : "未找到该用户");  
>             }  
>  
>             // --- 5. 查询所有记录 ---  
>             String querySql = "select * from admin";  
>             try (PreparedStatement ps = conn.prepareStatement(querySql);  
>                  ResultSet rs = ps.executeQuery()) {  
>  
>                 System.out.println("==== admin 表全部记录 ====");  
>                 while (rs.next()) {  
>                     System.out.println(rs.getString("username") + "\t" +  
>                                        rs.getString("password"));  
>                 }  
>             }  
>         }  
>     }  
> }  
> ```
>
> 如你愿意，我还能继续为你：
>
> * 对比你的代码与优化代码的一段段差异
> * 生成适合交给老师的注释版
> * 讲 JDBC 规范用法
>
> 需要继续吗？

---






# JDBC API

# JDBC Untils
```java
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

public class JDBCUtils {
    //定义相关四个属性(4个),因为只需要一份，因此我们做出static
    private static String user;// 用户名
    private static String password;// 密码
    private static String url;// url
    private static String driver;// 驱动名

    static {
        Properties properties = new Properties();
        try {
            properties.load(new FileInputStream("mariadb.properties"));
            String user = properties.getProperty("user");
            String url = properties.getProperty("url");
            String password = properties.getProperty("password");
            String driver = properties.getProperty("driver");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        //连接数据库，返回Connection
    }


    public static Connection getConnection() {

        try {
            return DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    //关闭相关资源
    /*
    1. ResultSet 结果集
    2. Statement 或者 PreparedStatement
    3. Connection
     */
    public static void close(ResultSet set, Statement statement, Connection connection) {
        try {
            if (set != null) {
                set.close();
            }

            if (statement != null) {
                statement.close();
            }

            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}


```

# 事务处理

1. 创建connection对象的时候，它默认是自动提交事务的，如果需要手动提交事务，则需要设置connection对象的autoCommit属性为false。

2. 当我们设置了之后，相当于开启了一个事务
3. 在最后执行commit()方法，提交事务，如果出现异常，则会进行回滚。



```java
import com.lfm.jdbc.utils.JDBCUtils;
import org.junit.jupiter.api.Test;

import java.sql.*;

/**
 * 演示jdbc如何使用事务
 */
public class Transaction_ {

    //
    @Test
    public void noTransaction() {

        //操作转账的业务
        //1. 得到连接
        Connection connection = null;// 在默认情况下connection对象是默认自动提交
        //2. 组织SQL
        String sql = "update account set balance = balance - 100 where id = 1";
        String sql2 = "update account set balance = balance + 100 where id = 2";
        PreparedStatement preparedStatement = null;
        //3. 创建PreparedStatement对象
        try {
            connection = JDBCUtils.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();

            int i = 1 / 0;//抛出异常
            preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            //关闭资源
            JDBCUtils.close(null, preparedStatement, connection);
        }
    }


    // 事务来解决
    @Test
    public void useTransaction() {
        //操作转账的业务
        //1. 得到连接
        Connection connection = null;// 在默认情况下connection对象是默认自动提交
        //2. 组织SQL
        String sql = "update account set balance = balance - 100 where id = 1";
        String sql2 = "update account set balance = balance + 100 where id = 2";
        PreparedStatement preparedStatement = null;
        //3. 创建PreparedStatement对象
        try {
            connection = JDBCUtils.getConnection();
            //将connection设置为不自动提交
            connection.setAutoCommit(false);//开启了事务
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();

            //int i = 1 / 0;//抛出异常
            preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.executeUpdate();

            //这里提交事务
            connection.commit();
        } catch (SQLException e) {
            //进行回滚，撤销执行的SQL
            //默认回滚到事务开始的状态
            System.out.println("执行发生了异常，撤销执行的SQL");
            try {
                connection.rollback();
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }
            throw new RuntimeException(e);
        } finally {
            //关闭资源
            JDBCUtils.close(null, preparedStatement, connection);
        }
    }


}

```
# 批处理
1.修改配置文件 ,在url的后面加上?rewriteBatchedStatements=true
```properties
user=root
password=lfm
url=jdbc:mariadb://localhost:3306/lfm_db02?rewriteBatchedStatements=true
driver=org.mariadb.jdbc.Driver

```
2. 在循环中添加数据的时候，设置每多少个进行一次提交，使用addBatch()方法，然后clear
```java
for (int i = 0; i < 5000; i ++) {
    preparedStatement.setString(1, "jack" + i);
    preparedStatement.setString(2, "666");
    //当有1000条的时候再批量执行
    if ((i + 1) % 1000 == 0) {
        preparedStatement.executeBatch();
        //清空一把
        preparedStatement.clearBatch();
    }

}

```

- 完整代码

```java

import com.lfm.jdbc.utils.JDBCUtils;
import org.junit.jupiter.api.Test;

import javax.swing.*;
import java.sql.Connection;
import java.sql.PreparedStatement;

public class Batch {
    public static void main(String[] args) throws Exception{
        Connection connection = JDBCUtils.getConnection();
        String sql = "insert into admin2 values (null, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);

        long start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i ++) {
            preparedStatement.setString(1, "jack" + i);
            preparedStatement.setString(2, "666");
            preparedStatement.executeUpdate();

        }
        long end = System.currentTimeMillis();
        System.out.println("传统方式时间为" + (end - start));
    }

    //批量
    @Test
    public void batch() throws Exception {
        Connection connection = JDBCUtils.getConnection();
        String sql = "insert into admin2 values (null, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);

        long start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i ++) {
            preparedStatement.setString(1, "jack" + i);
            preparedStatement.setString(2, "666");
            //当有1000条的时候再批量执行
            if ((i + 1) % 1000 == 0) {
                preparedStatement.executeBatch();
                //清空一把
                preparedStatement.clearBatch();
            }

        }
        long end = System.currentTimeMillis();
        System.out.println("批量处理方式时间为" + (end - start));

    }
}

---

```
# 传统连接方式弊端

![img](https://img2024.cnblogs.com/blog/3730964/202511/3730964-20251121173117294-2134658796.png)

1. **mysql 的连接数是有限制的**

2. **每次连接都需要进行三次握手和四次挥手，开销较大**

3. **每次查询都需要建立连接，开销较大**


- 数据库连接池原理
![img](https://img2024.cnblogs.com/blog/3730964/202511/3730964-20251121180002746-583040388.png)


---

# C3P0的两种连接方式
```java
import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class C3P0_ {
    //方式1:相关参数， 在程序指定user, url, password
    @Test
    public void testC3P0_01() throws Exception{
        //1. 创建一个数据源对象
        ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource();

        //2. 通过配置文件mysql/mariadb.properties 获取相关连接的信息
        Properties properties = new Properties();
        properties.load(new FileInputStream("mariadb.properties"));
        String user = properties.getProperty("user");
        String url = properties.getProperty("url");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");

        //给数据源设置相关参数
        //数据库驱动给进去，是驱动来管理连接

        comboPooledDataSource.setDriverClass(driver);
        comboPooledDataSource.setJdbcUrl(url);
        comboPooledDataSource.setUser(user);
        comboPooledDataSource.setPassword(password);


        //设置初始化连接数
        comboPooledDataSource.setInitialPoolSize(10);
        //最大连接数
        comboPooledDataSource.setMaxPoolSize(50);


        long start = System.currentTimeMillis();
        //测试连接池的效率， 5000次操作
        for (int i = 0; i < 5000; i ++) {
            Connection connection = comboPooledDataSource.getConnection();
            //System.out.println("连接成功");
            connection.close();
        }

        long end = System.currentTimeMillis();
        System.out.println("c3p0 5000次连接mysql耗时=" + (end - start));
    }

    //第二种方式 使用配置文件模板来完成
    @Test
    public void testC3P0_02()throws SQLException {

        //
        ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource("mariadb_pool");

        long start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i ++) {
            Connection connection = comboPooledDataSource.getConnection();
            connection.close();
        }

        long end = System.currentTimeMillis();

        System.out.println("耗时间为=" + (end - start));

    }

}

```

- c3p0的配置文件
命名为c3p0-config.xml, 放在src目录下
```xml
<c3p0-config>

    <!-- 数据源名称/命名连接池：mariadb_pool -->
    <named-config name="mariadb_pool">

        <!-- 1. 驱动类（MariaDB 使用新的驱动） -->
        <property name="driverClass">org.mariadb.jdbc.Driver</property>

        <!-- 2. MariaDB 连接 URL（建议加上 useSSL=false） -->
        <property name="jdbcUrl">jdbc:mariadb://127.0.0.1:3306/lfm_db02</property>

        <!-- 3. 用户名 -->
        <property name="user">root</property>

        <!-- 4. 密码 -->
        <property name="password">lfm</property>

        <!-- 5. 连接池动态参数 -->
        <!-- 每次增长多少连接 -->
        <property name="acquireIncrement">5</property>

        <!-- 初始连接数 -->
        <property name="initialPoolSize">10</property>

        <!-- 最小连接数 -->
        <property name="minPoolSize">5</property>

        <!-- 最大连接数 -->
        <property name="maxpoolsize">50</property>

        <!-- 可连接的最多的命令对象数 -->
        <property name="maxStatements">5</property>

        <!-- 可连接的最多的命令对象数 -->
        <property name="maxStatementsPerConnection">2</property>
    </named-config>
</c3p0-config>

```

---

# Druid连接池
```java
import com.alibaba.druid.pool.DruidDataSourceFactory;
import org.junit.jupiter.api.Test;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.util.Properties;

public class Druid_ {
    @Test
    public void testDruid() throws Exception {

        //1. 加入Druid的jar包
        //2. 加入配置文件,拷贝到项目文件
        //3. 创建Properties对象,读取配置文件
        Properties properties = new Properties();
        properties.load(new FileInputStream("src/druid.properties"));

        //4. 创建一个指定参数的数据库连接池, Druid连接池
        DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);

        long start = System.currentTimeMillis();
        for (int i = 0; i < 500000; i++) {
            Connection connection = dataSource.getConnection();
            connection.close();
        }

        long end = System.currentTimeMillis();
        System.out.println("druid连接池次耗时:" + (end - start));

    }
}

```

- druid的配置文件
命名为druid.properties, 放在src目录下
```properties
#key = value
driverClassName=org.mariadb.jdbc.Driver
url=jdbc:mariadb://localhost:3306/lfm_db02?rewriteBatchedStatements=true
username=root
password=lfm
initialSize=10
minIdle=5
maxActive=20
maxWait=5000

```

---

# 德鲁伊工具类
```java
import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class JDBCUtilsByDruid {
    //在静态代码块完成ds初始化
    private static DataSource ds;
    static {
        Properties properties = new Properties();

        try {
            properties.load(new FileInputStream("src/druid.properties"));
            ds = DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }
    //关闭连接:在数据库连接池技术中，不是真的断掉连接，而是把
    //使用的连接对象放回连接池
    public static void close(ResultSet resultSet, Statement statement, Connection connection) {
        try {
            if (resultSet != null) {
                resultSet.close();
            }
            if (statement != null) {
                statement.close();
            }
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


}

```

```java
import org.junit.jupiter.api.Test;

import java.sql.*;

public class JDBCUtilsByDruid_USE {
    @Test
    public void testSelect() {

        System.out.println("测试druid方式");
        //1. 得到连接
        Connection connection = null;
        //2. 组织SQL
        String sql = "select * from actor where id = ?";
        PreparedStatement preparedStatement = null;
        ResultSet set = null;
        //3. 创建
        try {
            connection = JDBCUtilsByDruid.getConnection();
            System.out.println(connection.getClass());
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, 5);
            //执行
            set = preparedStatement.executeQuery();
            //遍历
            while (set.next()) {
                String id = set.getString("id");
                String name = set.getString("name");
                String sex = set.getString("sex");
                Date date = set.getDate("borndate");
                String phone = set.getString("phone");
                System.out.println(id + "\t" + name + "\t" + sex + "\t" + date + "\t" + phone+ "\t");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            //关闭资源
            JDBCUtilsByDruid.close(null, preparedStatement, connection);
        }

    }
}

```

# ApDBUtils



## 土办法封装
```java
import com.lfm.jdbc.datasource.Actor;
import org.junit.jupiter.api.Test;

import java.sql.*;
import java.util.ArrayList;

public class JDBCUtilsByDruid_USE {
    @Test
    public void testSelect() {

        System.out.println("测试druid方式");
        //1. 得到连接
        Connection connection = null;
        //2. 组织SQL
        String sql = "select * from actor where id >= ?";
        PreparedStatement preparedStatement = null;
        ResultSet set = null;
        ArrayList&lt;Actor&gt; list = new ArrayList<>();
        //3. 创建
        try {
            connection = JDBCUtilsByDruid.getConnection();
            System.out.println(connection.getClass());
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setInt(1, 1);
            //执行
            set = preparedStatement.executeQuery();
            //遍历
            while (set.next()) {
                String id = set.getString("id");
                String name = set.getString("name");
                String sex = set.getString("sex");
                Date date = set.getDate("borndate");
                String phone = set.getString("phone");
                System.out.println(id + "\t" + name + "\t" + sex + "\t" + date + "\t" + phone+ "\t");
                //把得到的resultset的记录 封装到Actor对象,放入list集合
                list.add(new Actor(id, name, sex, date, phone));
            }
            System.out.println("list集合数据=" + list);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            //关闭资源
            JDBCUtilsByDruid.close(null, preparedStatement, connection);
        }

    }
}

```
---

## 简单使用
```java
import com.lfm.jdbc.utils.JDBCUtilsByDruid;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.junit.jupiter.api.Test;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DBUtils_USE {
    //使用apache-DBUtils 工具类 + druid 完成对表的crud操作
    @Test
    public void testQueryMany() throws Exception {//返回结果是多行的情况
        //1. 得到连接
        Connection connection = JDBCUtilsByDruid.getConnection();
        //2. 使用DBUtils 和 接口,先引入DBUtils 相关的jar文件, 加入到Project
        //3. 创建QueryRunner
        QueryRunner queryRunner = new QueryRunner();

        //4.  可以执行相关方法，返回ArrayList 结果集

        //(1) query 方法就是执行sql语句 得到resultset 封装到 ArrayList集合中
        //(2) 返回集合
        //(3) connection: 连接
        //(4) sql : 执行sql语句
        //(5) new BeanListHandler<>(Actor.class):在将resultset -> Actor对象  ->封装到ArrayList
        //底层使用反射机制去获取Actor类的属性，然后进行封装
        //(6) 1就是给sql语句中的? 赋值， 可变参数
        //(7) preparement 和 结果集(ResultSet)会在底层关闭
        String sql = "select * from actor where id >= ?";
        List&lt;Actor&gt; list =
                queryRunner.query(connection,sql ,new BeanListHandler<>(Actor.class), 1);

        for (Actor actor : list) {
            System.out.println(actor);
        }

        //释放资源
        JDBCUtilsByDruid.close(null, null, connection);


    }
}

```

---
## 追源码
```java
public &lt;T&gt; T query(Connection conn, String sql, ResultSetHandler&lt;T&gt; rsh, Object... params) throws SQLException {
    if (conn == null) {
        throw new SQLException("Null connection");
    } else if (sql == null) {
        throw new SQLException("Null SQL statement");
    } else if (rsh == null) {
        throw new SQLException("Null ResultSetHandler");
    } else {
        Statement stmt = null;
        ResultSet resultSet = null;
        T result = null;

        try {
            if (params != null && params.length > 0) {
                PreparedStatement ps = this.prepareStatement(conn, sql);
                stmt = ps;
                this.fillStatement(ps, params);
                resultSet = this.wrap(ps.executeQuery());
            } else {
                stmt = conn.createStatement();
                resultSet = this.wrap(stmt.executeQuery(sql));
            }

            result = (T)rsh.handle(resultSet);
        } catch (SQLException e) {
            this.rethrow(e, sql, params);
        } finally {
            this.closeQuietly(resultSet);
            this.closeQuietly(stmt);
        }

        return result;
    }
}
```


# BasicDAO 的封装

大致结构:
```
.
├── damain   
├── dao   
├── test
└── utils

```

```java
import com.lfm.jdbc.utils.JDBCUtilsByDruid;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * 开发BasicD A O
 */

public class BasicDao&lt;T&gt; {//泛型指定具体类型

    private QueryRunner qr = new QueryRunner();

    //开发通用dml方法，针对任意的表
    public int update(String sql, Object... parameters) {
        Connection connection = null;
        try {
            connection = JDBCUtilsByDruid.getConnection();
            int update = qr.update(connection, sql, parameters);
            return update;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JDBCUtilsByDruid.close(null, null, connection);
        }
    }
    //返回多个对象(即查询的对象结果是多行), 针对任意表

    /**
     * @param sql        就是sql语句
     * @param clazz      一个类的Class对象 比如Actor.class
     * @param parameters 传入 ? 的具体的值， 可以是多个
     * @return 根据Actor.class 对应的ArrayList集合
     */
    public List&lt;T&gt; queryMulti(String sql, Class&lt;T&gt; clazz, Object... parameters) {
        Connection connection = null;
        try {
            connection = JDBCUtilsByDruid.getConnection();
            return qr.query(connection, sql, new BeanListHandler&lt;T&gt;(clazz), parameters);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JDBCUtilsByDruid.close(null, null, connection);
        }
    }
    //查询单行结果通用方法
    public T querySingle(String sql, Class&lt;T&gt; clazz, Object... parameters) {

        Connection connection = null;
        try {
            connection = JDBCUtilsByDruid.getConnection();
            return qr.query(connection, sql, new BeanHandler&lt;T&gt;(clazz), parameters);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JDBCUtilsByDruid.close(null, null, connection);
        }
    }

    //查询单行单列的方法， 即返回单值的方法
    public Object queryScalar(String sql, Object... parameters) {
        Connection connection = null;
        try {
            connection = JDBCUtilsByDruid.getConnection();
            return qr.query(connection, sql, new ScalarHandler(), parameters);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JDBCUtilsByDruid.close(null, null, connection);
        }
    }
}





```