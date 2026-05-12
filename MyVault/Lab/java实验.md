# Java 基础编程实验

---

**实验一：变量、运算符与注释补全**

**题目 1.1 计算圆的面积**

```java
/**
 * 第一部分实验：计算圆的面积
 * @author 你的姓名
 */
public class CircleArea {
    public static void main(String[] args) {
        // 1. 定义半径变量，标识符命名为 radius，初始值为 5.2
        // >>> 请在此处补全变量定义语句 <<<

        // 2. 定义圆周率常量（使用 final 修饰），标识符命名为 PI，初始值为 3.14159
        // >>> 请在此处补全常量定义语句 <<<

        // 3. 计算面积：面积 = PI * radius * radius，定义变量 area 存储结果
        // >>> 请补全面积计算及赋值语句 <<<

        // 4. 输出结果，格式如下：
        // 半径：5.2
        // 面积：84.905
        // >>> 请补全输出语句 <<<
    }
}
```

**题目 1.2 温度转换（华氏转摄氏）**

```java
public class TemperatureConvert {
    public static void main(String[] args) {
        double fahrenheit = 100.0; // 华氏度

        // >>> 请补全：定义变量 celsius，并利用运算符计算对应的摄氏度 <<<

        System.out.println(fahrenheit + "华氏度 = " + celsius + "摄氏度");
    }
}
```

**公式**：摄氏度 = (华氏度 - 32) * 5 / 9，注意运算符优先级。

---

**实验二：运算符与循环结构代码补全**

**题目 2.1 判断闰年并输出指定范围内的闰年**

```java
public class LeapYear {
    public static void main(String[] args) {
        int startYear = 2000;
        int endYear = 2025;
        int count = 0;

        System.out.println(startYear + "年到" + endYear + "年之间的闰年有：");

        // >>> 请补全循环结构（使用 for 循环） <<<
        // 闰年判断条件：能被 4 整除但不能被 100 整除，或者能被 400 整除

        System.out.println("\n共计 " + count + " 个闰年。");
    }
}
```

**提示**：使用 `%` 取模运算符和逻辑 `&&`、`||`，统计闰年个数并输出年份。

**题目 2.2 累乘（阶乘）的部分和计算 (while 循环)**

```java
public class FactorialSum {
    public static void main(String[] args) {
        int n = 5; // 计算到 5 的阶乘之和
        int sum = 0;
        int i = 1;

        // >>> 请使用 while 循环实现，内层阶乘计算可使用 for 循环 <<<

        System.out.println("1! + 2! + ... + " + n + "! = " + sum);
    }
}
```

**提示**：外层 while 循环累加 `i!`，内层可利用 for 或 while 计算阶乘，使用复合赋值运算符 `sum += value`。

---

**实验三：方法设计**

**题目 3.1 设计方法判断素数并调用**

```java
/**
 * 独立完成 PrimeMethod 类
 * 要求：
 * 1. 定义方法 isPrime(int number) 返回 boolean，处理小于等于 1 的情况
 * 2. main 方法中调用判断 2~100 之间素数，每行输出 5 个数，统计总数
 */
public class PrimeMethod {
    // 请补充你的代码，包含适当文档注释

    // public static boolean isPrime(int number) { ... }

    public static void main(String[] args) {
        // 调用 isPrime，输出素数，格式化展示
    }
}
```

**期望输出格式**：每行 5 个素数右对齐，最后输出"2~100 之间共有 xx 个素数"。包含详细注释，方法定义规范。  
**提示**：判断素数优化至 `√number`，注意循环边界。

**题目 4.1 水仙花数（阿姆斯特朗数）及扩展功能**

```java
/**
 * 设计 NarcissisticNumber 类，实现：
 * 1. int countDigits(int num)      // 返回位数
 * 2. int power(int base, int exp)  // 手动实现幂运算（禁止 Math.pow）
 * 3. boolean isNarcissistic(int num) // 判断水仙花数
 * 4. main 方法先求 100~999 间的所有水仙花数，再扩展用户输入范围并分组输出
 */
public class NarcissisticNumber {
    // 补全以上三个方法，要求方法职责单一，注释完整

    public static void main(String[] args) {
        // 1. 输出三位水仙花数
        // 2. 使用 Scanner 获取范围，输出所有阿姆斯特朗数并按位数分组
    }
}
```

**运行示例**：
```
100~999 之间的水仙花数：153 370 371 407
请输入查找范围（起始 终止）：1 10000
1 位的水仙花数：1 2 3 4 5 6 7 8 9
3 位的水仙花数：153 370 371 407
4 位的水仙花数：1634 8208 9474
```

---

# Java 数组基础实验

---

**实验一：一维数组基础（代码补充题）**

**任务说明**：请将以下代码中请补充代码部分补充完整，使程序正确运行。

```java
/**
 * 任务 1: 数组声明、初始化、遍历、求和、求最值
 */
public class ArrayBasic {
    public static void main(String[] args) {
        // 1.1. 声明并初始化一个 int 数组，包含 5 个元素：10, 20, 30, 40, 50
        int[] numbers = _______________;

        // 1.2. 使用普通 for 循环遍历数组并输出所有元素
        System.out.print("数组元素：");
        for (int i = 0; i < _______________; i++) {
            System.out.print(_______________ + " ");
        }
        System.out.println();

        // 1.3. 使用增强 for 循环计算所有元素的和
        int sum = 0;
        for (_______________ : _______________) {
            sum += _______________;
        }
        System.out.println("数组元素和：" + sum);

        // 1.4. 查找最大值并输出
        int max = _______________; // 初始值应为数组第一个元素
        for (int i = 0; i < numbers.length; i++) {
            if (_______________ > max) {
                max = numbers[i];
            }
        }
        System.out.println("最大值：" + max);

        // 1.5. 查找最小值并输出（请自行完成）
        // 请补充代码...
    }
}
```

---

**实验二：学生成绩统计系统**

**功能要求**：

| 功能 | 要求 |
| :--- | :--- |
| 输入成绩 | 使用 Scanner，提示输入 5 个成绩 |
| 计算总分 | 遍历数组累加 |
| 平均分 | 总分/人数，保留一位小数 |
| 最高/最低分 | 遍历比较 |
| 降序排序 | Arrays.sort() 后逆序或手动冒泡 |

**示例输出**：
```
请输入 5 个学生的成绩（0-100）：
第 1 个学生成绩：78
第 2 个学生成绩：92
第 3 个学生成绩：65
第 4 个学生成绩：88
第 5 个学生成绩：70

========== 统计结果 ==========
总分：393
平均分：78.6
最高分：92
最低分：65

成绩排名（从高到低）：92 88 78 70 65
```

---

**实验三：二维数组初步 —— 班级成绩统计**

**任务说明**：使用二维数组存储班级成绩，完成统计任务。

```java
/**
 * 二维数组 scores：3 个班级，每班 4 名学生的 Java 成绩
 */
public class ClassStatistics {
    public static void main(String[] args) {
        int[][] scores = {
            {85, 90, 78, 92},  // 班级 1
            {72, 68, 80, 75},  // 班级 2
            {88, 85, 90, 87}   // 班级 3
        };

        // 请在此处编写代码完成以下功能
    }
}
```

**功能要求**：
1. 计算并输出每个班级的平均分（保留一位小数）
2. 计算并输出全校最高分（只输出分数值）
3. 输出平均分最高的班级

**示例输出**：
```
========== 班级平均分 ==========
班级 1 平均分：86.3
班级 2 平均分：73.8
班级 3 平均分：87.5

========== 全校最高分 ==========
92

========== 平均分最高的班级 ==========
班级 3
```

**方法封装建议**：
- `classAvg(int[][] data, int classIndex)`：计算指定班级的平均分
- `schoolMax(int[][] data)`：查找全校最高分
- `bestClass(int[][] data)`：找出平均分最高的班级

---

# Java 构造方法与 this 关键字实验

---

**实验一：完善 Employee 类（构造方法重载 + this 调用）**

以下 Employee 类代码包含多处填空，重点考察构造方法重载和 this 的用法。请补全代码，使类符合业务逻辑。

```java
public class Employee {
    private String empId;
    private String name;
    private double salary;
    private String department;

    // 构造方法1：无参构造，调用本类有参构造，提供默认值（工号"E000"，姓名"待定"，部门"未分配"，工资0.0）
    public Employee() {
        // 【填空1：使用this调用本类的四个参数构造方法，传入默认值："E000", "待定", 0.0, "未分配"】
    }

    // 构造方法2：只接收姓名和工资，部门默认"通用"，工号自动生成（简单拼接"E" + 系统时间毫秒数，这里写死"E999"）
    public Employee(String name, double salary) {
        // 【填空2：使用this调用本类的四个参数构造方法，工号设为"E999"，部门设为"通用"】
    }

    // 构造方法3：接收工号、姓名、工资，部门默认"研发部"
    public Employee(String empId, String name, double salary) {
        // 【填空3：使用this调用本类的四个参数构造方法，部门传入"研发部"】
    }

    // 构造方法4：全参数构造方法（这是最终目标构造器）
    public Employee(String empId, String name, double salary, String department) {
        // 【填空4：为四个实例变量赋值，使用this区分局部变量和成员变量】
    }

    // 实例方法：显示员工信息
    public void display() {
        System.out.println("工号:" + empId + " | 姓名: " + name + " | 工资: " + salary + " | 部门: " + department);
    }

    // 实例方法：比较两个员工的工资（演示this作为参数传递）
    public boolean hasHigherSalaryThan(Employee other) {
        // 【填空5：返回当前员工工资是否高于other员工工资】
    }

    // 实例方法：返回当前对象自身（演示this作为返回值，可用于链式调用）
    public Employee setSalary(double salary) {
        this.salary = salary;
        // 【填空6：返回当前对象】
    }
}
```

---

**实验二：EmployeeTest 代码补全**

```java
public class EmployeeTest {
    public static void main(String[] args) {
        // 创建两个银行账户对象，使用构造方法初始化
        // 【填空16：创建对象，账号"10086"，户主"张三"，余额2000.0】
        BankAccount acc1 = 

        // 【填空17：创建对象，账号"10010"，户主"李四"，余额500.0】
        BankAccount acc2 = 

        // 调用 showInfo 展示账户信息
        // 【填空18：让 acc1 显示账户信息】
        // 【填空19：让 acc2 显示账户信息】

        // 存款操作
        // 【填空20：调用 acc1 的存款方法，存入 500 元】

        // 取款操作
        // 【填空21：调用 acc1 的取款方法，取出 300 元】
        // 【填空22：调用 acc2 的取款方法，尝试取出 600 元（测试金额不足）】

        // 以下两行演示封装性——private 成员无法直接访问，取消注释会编译报错
        // acc1.balance = 9999;   // 编译错误，证明封装
        // acc1.validatePassword("123"); // 编译错误，private 方法不可见
    }
}
```

---

**实验三：完善 Product 类（构造方法、this 的多种用法）**

为了增加内容量并巩固知识，现定义商品类，要求实现构造方法重载、this调用构造器、以及this作为参数传递。

```java
public class Product {
    private String productId;
    private String name;
    private double price;
    private int stock;

    // 构造方法1：无参构造，委托给三参构造（默认库存10）
    public Product() {
        // 【填空12：调用本类三参构造方法，传入"P000", "无名商品", 0.0】
    }

    // 构造方法2：接收产品名称和价格，ID自动生成（"PID"随机数，此处写死"P999"），库存默认为0
    public Product(String name, double price) {
        // 【填空13：调用本类三参构造方法，传入"P999", name, price】
        // 库存待默认0
    }

    // 构造方法3：接收ID、名称、价格（库存默认0）
    public Product(String productId, String name, double price) {
        // 【填空14：调用本类全参数构造方法，库存传入0】
    }

    // 构造方法4：全参数构造方法（id, name, price, stock）
    public Product(String productId, String name, double price, int stock) {
        // 【填空15：为所有实例变量赋值，使用this区分】
    }

    // 实例方法：商品信息展示
    public void show() {
        System.out.println("ID:" + productId + " | 名称: " + name + " | 价格: " + price + " | 库存: " + stock);
    }

    // 实例方法：比较两个商品价格是否相等（this作为参数传递给工具方法）
    public boolean isSamePrice(Product other) {
        // 【填空16：返回当前商品价格是否等于other商品价格】
    }

    // 实例方法：增加库存，并返回当前对象（链式调用）
    public Product addStock(int amount) {
        this.stock += amount;
        // 【填空17：返回当前对象】
    }

    // 额外演示：this作为参数传递给普通方法
    public void printCompared(Product other) {
        if (this.isSamePrice(other)) {
            System.out.println(this.name + " 和 " + other.name + " 价格相同");
        } else {
            System.out.println(this.name + " 和 " + other.name + " 价格不同");
        }
    }
}
```

---

# 类的定义、对象创建、访问修饰符与封装综合实验

---

**实验名称**：Java 类的定义、对象创建、访问修饰符与封装综合应用 —— 银行账户系统（含代码补全）

**实验目的**：
- 掌握 Java 中类的完整定义（属性、构造方法、成员方法）以及对象的创建（new 关键字）。
- 理解 private、public 及默认（无修饰符）访问修饰符的作用范围。
- 深刻体会封装思想，使用 private 修饰属性，并通过 getter 和业务方法操作数据。

**实验环境**：
- ✅ JDK 版本：JDK 17 或更高版本（LTS 推荐 17/21）
- ✅ IDE：IntelliJ IDEA（Ultimate 或 Community 版均可）

**实验内容与步骤**：

**步骤 1：代码补全挑战 —— 完善 BankAccount 类**

以下 BankAccount.java 代码中预留了若干空缺（用【填空】标注）。请根据封装原则、构造方法、访问修饰符等知识将代码补充完整，使得该类能够正确编译并实现基本的银行账户功能。

```java
public class BankAccount {
    // 1. 属性定义（全部私有，体现封装）
    // 【填空1：定义账号 accountNumber，类型 String，private】
    // 【填空2：定义户主姓名 accountHolder，类型 String，private】
    // 【填空3：定义余额 balance，类型 double，private】

    // 2. 构造方法：初始化账号、户主姓名和余额
    public BankAccount(String accountNumber, String accountHolder, double balance) {
        // 【填空4：使用 this 关键字为 accountNumber 属性赋值】
        // 【填空5：使用 this 关键字为 accountHolder 属性赋值】
        // 【填空6：使用 this 关键字为 balance 属性赋值】
    }

    // 3. 公共 getter 方法（只提供读取，不提供修改，加强封装）
    public String getAccountNumber() {
        // 【填空7：返回账号】
    }

    public String getAccountHolder() {
        // 【填空8：返回户主姓名】
    }

    public double getBalance() {
        // 【填空9：返回余额】
    }

    // 4. 存款方法
    public void deposit(double amount) {
        if (【填空10：判断存款金额大于 0 的条件】) {
            // 【填空11：余额增加 amount】
            System.out.println("存款成功：+" + amount + "，当前余额：" + balance);
        } else {
            System.out.println("存款金额无效");
        }
    }

    // 5. 取款方法
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            // 【填空12：余额减少 amount】
            System.out.println("取款成功：-" + amount + "，剩余余额：" + balance);
        } else {
            System.out.println("余额不足或金额无效");
        }
    }

    // 6. 展示账户信息
    public void showInfo() {
        System.out.println("账号：" + 【填空13：获取账号属性】
            + " | 户主：" + 【填空14：获取户主姓名属性】
            + " | 余额：" + 【填空15：获取余额属性】);
    }

    // 7. 仅供内部使用的密码验证（private 方法）
    private boolean validatePassword(String input) {
        return "123456".equals(input);
    }
}
```

**步骤 2：代码补全挑战 —— 完善 BankTest 测试类**

完成 BankAccount 补全后，请将以下 BankTest.java 中的空缺补充完整，实现对象的正确创建、方法调用及封装性验证。

```java
public class BankTest {
    public static void main(String[] args) {
        // 创建两个银行账户对象，使用构造方法初始化
        BankAccount acc1 = new BankAccount("10086", "张三", 2000.0);
        BankAccount acc2 = new BankAccount("10010", "李四", 500.0);

        // 调用 showInfo 展示账户信息
        acc1.showInfo();
        acc2.showInfo();

        // 存款操作
        acc1.deposit(500);

        // 取款操作
        acc1.withdraw(300);
        acc2.withdraw(600); // 测试金额不足

        // 以下两行演示封装性——private 成员无法直接访问，取消注释会编译报错
        // acc1.balance = 9999;   // 编译错误，证明封装
        // acc1.validatePassword("123"); // 编译错误，private 方法不可见
    }
}
```

---

# static 关键字综合应用实验

---

**实验名称**：Java static 关键字深入实验 —— 类成员与实例成员的交互、跨类调用、变量区别

**实验目的**：
- 掌握 static 修饰方法和变量的语法规则。
- 理解同一类中静态方法能否直接调用非静态方法/成员变量。
- 掌握通过"类名.静态方法()"调用静态方法。
- 深刻区分静态变量（类变量）与成员变量（实例变量）的区别。

**实验环境**：
- ✅ JDK 版本：JDK 17 或更高版本
- ✅ IDE：IntelliJ IDEA（Ultimate / Community）

**实验内容与步骤**：

**第一部分：同一类中静态方法与非静态方法的相互调用**

完善 `CallerClass`，通过填空理解静态上下文无法直接访问非静态成员。

```java
public class CallerClass {
    // 成员变量（实例变量）
    private String instanceName = "实例成员";
    
    // 静态变量
    private static String staticName = "静态成员";

    // 非静态方法（实例方法）
    public void instanceMethod() {
        System.out.println("实例方法被调用");
        // 实例方法中可以直接调用静态方法
        // 【填空1：调用本类的静态方法 staticMethod】
        
        // 实例方法中可以访问静态变量
        System.out.println("在实例方法中访问静态变量：" + staticName);
    }

    // 静态方法
    public static void staticMethod() {
        System.out.println("静态方法被调用");
        // 静态方法中 ❌ 不能直接调用实例方法（下面这行会编译错误）
        // instanceMethod(); // 错误：无法从静态上下文引用非静态方法

        // 静态方法中 ❌ 不能直接访问实例变量
        // System.out.println(instanceName); // 错误

        // 静态方法中 ✅ 可以访问静态变量
        System.out.println("静态方法中访问静态变量：" + staticName);

        // 静态方法中如何调用实例方法？必须创建对象
        CallerClass obj = new CallerClass();
        obj.instanceMethod();
    }

    // 另一个静态方法，演示调用静态方法
    public static void anotherStatic() {
        // 静态方法之间可以直接相互调用
        staticMethod();
    }
}
```

**第二部分：静态变量 vs 成员变量（区别与验证）**

完善 `StaticVsInstance` 类，通过代码体会变量生命周期和共享性。

```java
public class StaticVsInstance {
    // 静态变量（类变量）—— 所有实例共享一份
    public static int staticCounter = 0;
    
    // 成员变量（实例变量）—— 每个对象独立拥有一份
    public int instanceCounter = 0;

    // 构造方法
    public StaticVsInstance() {
        staticCounter++;   // 每次创建对象，静态变量增加
        instanceCounter = 1; // 每个对象自己的计数器初始为1
    }

    public void display() {
        System.out.println("静态变量 staticCounter（共享）：" + staticCounter);
        System.out.println("实例变量 instanceCounter（独立）：" + instanceCounter);
    }

    // 静态方法修改静态变量
    public static void incrementStatic() {
        staticCounter++;
    }
}
```

**测试代码**：
```java
StaticVsInstance obj1 = new StaticVsInstance();
StaticVsInstance obj2 = new StaticVsInstance();

obj1.display();
obj2.display();

// 通过类名修改静态变量
StaticVsInstance.staticCounter += 5;

obj1.display(); // 观察 obj1 和 obj2 的静态变量都会变化
```

**第三部分：不同类间静态/非静态方法的相互调用**

创建 `Helper` 类和增强 `TestStatic`，演示跨类的调用规则。

```java
public class Helper {
    // 实例方法
    public void helperInstance() {
        System.out.println("Helper 的实例方法执行");
    }

    // 静态方法
    public static void helperStatic() {
        System.out.println("Helper 的静态方法执行");
    }
}
```

在 `TestStatic` 中完成以下调用：

```java
public class TestStatic {
    public static void main(String[] args) {
        // 1. 调用 Helper 的静态方法 —— 直接通过类名调用
        Helper.helperStatic();

        // 2. 调用 Helper 的实例方法 —— 必须先创建对象
        Helper helper = new Helper();
        helper.helperInstance();

        // 3. 演示静态方法中如何调用另一个类的实例方法（通过对象）
        CallerClass caller = new CallerClass();
        caller.instanceMethod();

        // 4. 演示跨类访问静态变量
        System.out.println("当前计数：" + StaticVsInstance.staticCounter);
    }
}
```