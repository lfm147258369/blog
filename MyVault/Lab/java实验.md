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
        double radius = 5.2;

        // 2. 定义圆周率常量（使用 final 修饰），标识符命名为 PI，初始值为 3.14159
        final double PI = 3.14159;

        // 3. 计算面积：面积 = PI * radius * radius，定义变量 area 存储结果
        double area = PI * radius * radius;

        // 4. 输出结果，格式如下：
        // 半径：5.2
        // 面积：84.905
        System.out.println("半径：" + radius);
        System.out.println("面积：" + area);
    }
}
```

**题目 1.2 温度转换（华氏转摄氏）**

```java
public class TemperatureConvert {
    public static void main(String[] args) {
        double fahrenheit = 100.0; // 华氏度

        double celsius = (fahrenheit - 32) * 5 / 9;

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

        for (int year = startYear; year <= endYear; year++) {
            if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
                System.out.print(year + " ");
                count++;
            }
        }

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

        while (i <= n) {
            int factorial = 1;
            for (int j = 1; j <= i; j++) {
                factorial *= j;
            }
            sum += factorial;
            i++;
        }

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
    /**
     * 判断一个整数是否为素数
     * @param number 待判断的整数
     * @return 如果是素数返回 true，否则返回 false
     */
    public static boolean isPrime(int number) {
        if (number <= 1) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        int count = 0;
        System.out.println("2~100 之间的素数：");
        for (int num = 2; num <= 100; num++) {
            if (isPrime(num)) {
                System.out.printf("%4d", num);
                count++;
                if (count % 5 == 0) {
                    System.out.println();
                }
            }
        }
        if (count % 5 != 0) {
            System.out.println();
        }
        System.out.println("2~100 之间共有 " + count + " 个素数");
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
import java.util.Scanner;

public class NarcissisticNumber {
    /**
     * 返回整数的位数
     * @param num 待计算的整数
     * @return 位数
     */
    public static int countDigits(int num) {
        if (num == 0) {
            return 1;
        }
        int count = 0;
        int temp = Math.abs(num);
        while (temp > 0) {
            temp /= 10;
            count++;
        }
        return count;
    }

    /**
     * 手动实现幂运算 base^exp
     * @param base 底数
     * @param exp 指数
     * @return 幂运算结果
     */
    public static int power(int base, int exp) {
        int result = 1;
        for (int i = 0; i < exp; i++) {
            result *= base;
        }
        return result;
    }

    /**
     * 判断一个数是否为水仙花数（阿姆斯特朗数）
     * @param num 待判断的整数
     * @return 如果是水仙花数返回 true，否则返回 false
     */
    public static boolean isNarcissistic(int num) {
        int digits = countDigits(num);
        int sum = 0;
        int temp = num;
        while (temp > 0) {
            int digit = temp % 10;
            sum += power(digit, digits);
            temp /= 10;
        }
        return sum == num;
    }

    public static void main(String[] args) {
        // 1. 输出三位水仙花数
        System.out.print("100~999 之间的水仙花数：");
        for (int num = 100; num <= 999; num++) {
            if (isNarcissistic(num)) {
                System.out.print(num + " ");
            }
        }
        System.out.println();

        // 2. 使用 Scanner 获取范围，输出所有阿姆斯特朗数并按位数分组
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入查找范围（起始 终止）：");
        int start = scanner.nextInt();
        int end = scanner.nextInt();
        scanner.close();

        int maxDigits = countDigits(end);
        for (int d = 1; d <= maxDigits; d++) {
            boolean hasOutput = false;
            for (int num = start; num <= end; num++) {
                if (countDigits(num) == d && isNarcissistic(num)) {
                    if (!hasOutput) {
                        System.out.print(d + " 位的水仙花数：");
                        hasOutput = true;
                    }
                    System.out.print(num + " ");
                }
            }
            if (hasOutput) {
                System.out.println();
            }
        }
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
        int[] numbers = {10, 20, 30, 40, 50};

        // 1.2. 使用普通 for 循环遍历数组并输出所有元素
        System.out.print("数组元素：");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();

        // 1.3. 使用增强 for 循环计算所有元素的和
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("数组元素和：" + sum);

        // 1.4. 查找最大值并输出
        int max = numbers[0]; // 初始值应为数组第一个元素
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("最大值：" + max);

        // 1.5. 查找最小值并输出
        int min = numbers[0];
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] < min) {
                min = numbers[i];
            }
        }
        System.out.println("最小值：" + min);
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

**参考代码**：
```java
import java.util.Scanner;
import java.util.Arrays;

public class ScoreStatistics {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] scores = new int[5];

        System.out.println("请输入 5 个学生的成绩（0-100）：");
        for (int i = 0; i < scores.length; i++) {
            System.out.print("第 " + (i + 1) + " 个学生成绩：");
            scores[i] = scanner.nextInt();
        }
        scanner.close();

        int sum = 0;
        int max = scores[0];
        int min = scores[0];
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
            if (scores[i] > max) {
                max = scores[i];
            }
            if (scores[i] < min) {
                min = scores[i];
            }
        }
        double average = sum / (double) scores.length;

        int[] sorted = Arrays.copyOf(scores, scores.length);
        for (int i = 0; i < sorted.length - 1; i++) {
            for (int j = 0; j < sorted.length - 1 - i; j++) {
                if (sorted[j] < sorted[j + 1]) {
                    int temp = sorted[j];
                    sorted[j] = sorted[j + 1];
                    sorted[j + 1] = temp;
                }
            }
        }

        System.out.println("\n========== 统计结果 ==========");
        System.out.println("总分：" + sum);
        System.out.printf("平均分：%.1f\n", average);
        System.out.println("最高分：" + max);
        System.out.println("最低分：" + min);
        System.out.print("\n成绩排名（从高到低）：");
        for (int s : sorted) {
            System.out.print(s + " ");
        }
        System.out.println();
    }
}
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

        // 1. 计算并输出每个班级的平均分（保留一位小数）
        System.out.println("========== 班级平均分 ==========");
        double[] classAvgs = new double[scores.length];
        for (int i = 0; i < scores.length; i++) {
            classAvgs[i] = classAvg(scores, i);
            System.out.printf("班级 %d 平均分：%.1f\n", i + 1, classAvgs[i]);
        }

        // 2. 计算并输出全校最高分
        System.out.println("\n========== 全校最高分 ==========");
        System.out.println(schoolMax(scores));

        // 3. 输出平均分最高的班级
        System.out.println("\n========== 平均分最高的班级 ==========");
        int best = bestClass(scores);
        System.out.println("班级 " + (best + 1));
    }

    /** 计算指定班级的平均分 */
    public static double classAvg(int[][] data, int classIndex) {
        int sum = 0;
        for (int score : data[classIndex]) {
            sum += score;
        }
        return sum / (double) data[classIndex].length;
    }

    /** 查找全校最高分 */
    public static int schoolMax(int[][] data) {
        int max = data[0][0];
        for (int i = 0; i < data.length; i++) {
            for (int j = 0; j < data[i].length; j++) {
                if (data[i][j] > max) {
                    max = data[i][j];
                }
            }
        }
        return max;
    }

    /** 找出平均分最高的班级（返回班级索引） */
    public static int bestClass(int[][] data) {
        int bestIndex = 0;
        double bestAvg = classAvg(data, 0);
        for (int i = 1; i < data.length; i++) {
            double avg = classAvg(data, i);
            if (avg > bestAvg) {
                bestAvg = avg;
                bestIndex = i;
            }
        }
        return bestIndex;
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
        this("E000", "待定", 0.0, "未分配");
    }

    // 构造方法2：只接收姓名和工资，部门默认"通用"，工号自动生成（简单拼接"E" + 系统时间毫秒数，这里写死"E999"）
    public Employee(String name, double salary) {
        this("E999", name, salary, "通用");
    }

    // 构造方法3：接收工号、姓名、工资，部门默认"研发部"
    public Employee(String empId, String name, double salary) {
        this(empId, name, salary, "研发部");
    }

    // 构造方法4：全参数构造方法（这是最终目标构造器）
    public Employee(String empId, String name, double salary, String department) {
        this.empId = empId;
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    // 实例方法：显示员工信息
    public void display() {
        System.out.println("工号:" + empId + " | 姓名: " + name + " | 工资: " + salary + " | 部门: " + department);
    }

    // 实例方法：比较两个员工的工资（演示this作为参数传递）
    public boolean hasHigherSalaryThan(Employee other) {
        return this.salary > other.salary;
    }

    // 实例方法：返回当前对象自身（演示this作为返回值，可用于链式调用）
    public Employee setSalary(double salary) {
        this.salary = salary;
        return this;
    }
}
```

---

**实验二：EmployeeTest 代码补全**

```java
public class EmployeeTest {
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
        this("P000", "无名商品", 0.0);
    }

    // 构造方法2：接收产品名称和价格，ID自动生成（"PID"随机数，此处写死"P999"），库存默认为0
    public Product(String name, double price) {
        this("P999", name, price);
    }

    // 构造方法3：接收ID、名称、价格（库存默认0）
    public Product(String productId, String name, double price) {
        this(productId, name, price, 0);
    }

    // 构造方法4：全参数构造方法（id, name, price, stock）
    public Product(String productId, String name, double price, int stock) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // 实例方法：商品信息展示
    public void show() {
        System.out.println("ID:" + productId + " | 名称: " + name + " | 价格: " + price + " | 库存: " + stock);
    }

    // 实例方法：比较两个商品价格是否相等（this作为参数传递给工具方法）
    public boolean isSamePrice(Product other) {
        return this.price == other.price;
    }

    // 实例方法：增加库存，并返回当前对象（链式调用）
    public Product addStock(int amount) {
        this.stock += amount;
        return this;
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

**构造方法与 this 思考题**：

**题1. 构造方法重载的意义是什么？在什么场景下你会使用多个构造方法？**

构造方法重载允许同一个类提供多种不同的对象初始化方式，提高了类的易用性和灵活性。场景包括：(1) 提供无参构造以支持框架反射创建对象（如 Spring Bean、JPA Entity）；(2) 为常用参数组合提供快捷构造（如 Employee 的 `Employee(String name, double salary)` 自动填充默认部门和工号）；(3) 渐进式构造——从必填字段到可选字段逐级委托（`无参 → 姓名+工资 → 工号+姓名+工资+部门`）。重载遵循"最少参数调用更多参数"的委托链，最终收敛到全参构造方法，避免代码重复。

**题2. 如果在一个构造方法中调用另一个构造方法（使用this()），需要注意哪些语法规范？**

三条核心规范：(1) `this(...)` 必须是构造方法体中的第一条语句，不能在它之前有任何其他代码（包括变量声明、赋值、方法调用）；(2) 不能形成循环调用——如 A 构造调 B 构造，B 构造又调 A 构造，编译器会检测并报错；(3) `this(...)` 只能在构造方法中使用，不能在普通实例方法或静态方法中使用。此外，`this(...)` 和 `super(...)` 不能同时出现在同一个构造方法中——每个构造方法的第一条语句要么是 `this()` 要么是 `super()`，但不能两者同时出现。

**题3. this关键字除了调用构造方法和区分变量，还能用在哪些地方？请结合实验中提到的方法参数传递和返回值举例。**

(1) **作为方法参数传递**：`hasHigherSalaryThan(Employee other)` 方法内部使用 `this.salary > other.salary`，this 隐式代表当前对象，与传入的 other 对象形成对比；(2) **作为返回值实现链式调用**：`setSalary(double salary) { this.salary = salary; return this; }` 返回当前对象，实现 `emp.setSalary(5000).display()` 的流式操作；(3) **在方法中调用同类其他实例方法**：`isSamePrice(Product other)` 内部调用 `this.isSamePrice(other)` 或直接 `isSamePrice(other)`；(4) **在内部类中引用外部类实例**：`OuterClass.this` 语法。

**题4. 本次代码补全中，你遇到了哪些困难？哪个填空让你对this的理解更加深刻？**

（开放性回答示例）最深刻的填空是填空12~15（Product 类构造方法链），因为需要同时理解三参构造调用全参构造时库存参数的传递路径——三参构造 `this(productId, name, price, 0)` 传入库存0，而全参构造中 `this.stock = stock;` 接收这个0并赋值。这让我深刻理解了"最终目标构造器"模式：所有构造方法最终汇聚到一个全参构造方法，通过 params 正向传递默认值，保证实例变量初始化的唯一入口。

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
    private String accountNumber;
    private String accountHolder;
    private double balance;

    // 2. 构造方法：初始化账号、户主姓名和余额
    public BankAccount(String accountNumber, String accountHolder, double balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    // 3. 公共 getter 方法（只提供读取，不提供修改，加强封装）
    public String getAccountNumber() {
        return accountNumber;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public double getBalance() {
        return balance;
    }

    // 4. 存款方法
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("存款成功：+" + amount + "，当前余额：" + balance);
        } else {
            System.out.println("存款金额无效");
        }
    }

    // 5. 取款方法
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("取款成功：-" + amount + "，剩余余额：" + balance);
        } else {
            System.out.println("余额不足或金额无效");
        }
    }

    // 6. 展示账户信息
    public void showInfo() {
        System.out.println("账号：" + accountNumber
            + " | 户主：" + accountHolder
            + " | 余额：" + balance);
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

**类的定义、对象创建与封装思考题**：

**题1. 代码补全挑战中，哪个填空让你感到最困难？它考察了什么知识点（this、封装、引用等）？**

（开放性回答示例）填空10~12（deposit 和 withdraw 的业务逻辑）最具挑战性。填空10 `amount > 0` 考察了对边界条件的把控——存款金额必须为正数，0元存款无意义；填空11 `balance += amount` 和填空12 `balance -= amount` 考察了封装核心思想——外部不能直接 `acc1.balance = xxx`，只能通过业务方法操作。这组填空综合考察了**条件判断、算术赋值、以及封装保护数据的完整链路**，缺任何一环都会导致业务逻辑漏洞。

**题2. 如果不使用封装，直接将balance定义为public，在BankTest中可能出现什么样的错误行为？请举例。**

如果 `balance` 是 public：(1) 外部可随意赋值 `acc1.balance = -9999;`，余额变为负数，银行系统出现严重 bug；(2) 转账可绕过校验：`acc1.balance -= 100000; acc2.balance += 100000;`，即使 acc1 余额不足也能"无中生有"；(3) 多线程并发修改时无保护，导致数据不一致；(4) 后期若需要添加日志、权限校验、交易记录，需要修改所有直接访问 balance 的代码段（散落在各处），而非集中在 deposit/withdraw 方法一处。封装通过 private + 有限的 public 方法暴露操作接口，将状态修改收敛到可控范围内。

**题3. 构造方法中的参数名和属性名相同时，为什么要使用this？如果你忘记写this会发生什么？**

当参数名和属性名相同时，`this.属性 = 参数` 中的 this 明确指明左边是实例变量（成员变量），右边是局部变量（参数）。如果忘记写 this，即写成 `accountNumber = accountNumber;`，根据 Java 的"就近原则"，编译器会认为两边都是参数自己赋值给自己，实例变量保持默认值（null 或 0.0），造成**属性未被初始化**的隐蔽 bug。这种错误不会触发编译错误，但在运行时表现为 getter 返回 null/0.0，排查非常困难。IDEA 会对"自赋值"给出警告，但最好的习惯是始终使用 `this.` 前缀。

**题4. IntelliJ IDEA 在本次补全实验中提供了哪些辅助（高亮、代码提示、快速修复）？如何利用这些功能减少填空错误？**

IDEA 提供：(1) **语法高亮**——未补全的空白处显示红色波浪线或灰色占位提示；填空题中引用了未定义的变量时，变量名显示为红色；(2) **代码补全提示**——输入 `this.` 后自动弹出可用的成员变量列表，避免拼写错误；(3) **快速修复（Alt+Enter）**——如忘记写 return 语句时，IDEA 提示"Missing return statement"并提供"Add return"一键修复；(4) **构造方法生成器**——右键 → Generate → Constructor，可自动生成带 this 赋值的构造方法，反查自己的填空是否正确；(5) **编译实时检查**——在键入过程中即时标红编译错误，不用等到 javac 执行才发现。

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
        staticMethod();
        
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

**static 关键字综合实验思考题**：

**题1. 静态变量和成员变量在内存存储位置、初始化时机、访问方式上有哪些区别？**

| 维度 | 静态变量（类变量） | 成员变量（实例变量） |
|:---|:---|:---|
| 内存位置 | 方法区/元空间（Metaspace） | 堆内存（Heap），对象内部 |
| 初始化时机 | 类加载时（首次使用该类），只初始化一次 | 每次 new 创建对象时初始化 |
| 访问方式 | `类名.变量名` 或 对象.变量名（不推荐） | 必须通过 `对象.变量名` 访问 |
| 数据份数 | 整个JVM中只有一份，所有实例共享 | 每个对象独立拥有一份 |
| 生命周期 | 类卸载时销毁 | 对象被GC回收时销毁 |

在 StaticVsInstance 代码中：`staticCounter` 每创建一个对象就 +1，两个对象共享同一份，所以 obj2.display() 显示的也是累积后的值 2，不是各自的 1。而 `instanceCounter` 在每个对象的构造方法中被独立赋值为 1，互不影响。

**题2. 如果在静态方法中想要访问成员变量，正确的做法是什么？为什么必须这样做？**

正确做法：先在静态方法中创建该类的对象，再通过对象引用访问成员变量。例如在 `staticMethod()` 中：`CallerClass obj = new CallerClass(); System.out.println(obj.instanceName);`

必须这样做的原因：静态方法属于类层级，调用时没有 this 引用——JVM 无法确定"instanceName 是哪个对象的 instanceName"。成员变量依附于具体的对象实例，每个对象的 instanceName 可能不同。如果没有对象存在（极端情况：一次没 new 过），成员变量根本就不在内存中，访问无从谈起。创建对象后，引用变量 obj 指向堆中的具体实例，才可以定位到属于该实例的成员变量内存地址。

**题3. 同一个类中，非静态方法调用静态方法和静态变量时有无限制？为什么？**

没有限制。原因在于访问方向的"内存可见性"：非静态方法被调用时，一定已经存在一个具体的对象实例（因为必须通过对象或 this 调用），此时类已经被加载，静态变量和静态方法早已存在于方法区中。从实例方法"向上"访问类级别的静态成员是安全的——静态成员的生命周期包含并早于任何实例。反之（静态方法访问实例成员）则不安全，因为静态方法被调用时可能尚无任何实例存在。

**题4. 不同类之间，静态方法能否通过"类名.实例方法名"直接调用？请说明原因。**

不能。`Helper.helperInstance()` 会直接编译报错：`non-static method helperInstance() cannot be referenced from a static context`。实例方法必须有调用对象——JVM 需要解析该方法作用在哪个具体的 Helper 对象上。`类名.` 语法只能触发静态方法调用，不会自动生成任何对象。正确做法是先 new 一个 Helper 对象：`Helper h = new Helper(); h.helperInstance();`。本质上这和第2题的原因一样：实例方法调用需要 this 引用，而"类名.方法名"的调用形式不传递任何对象引用。

**题5. 本次代码补全挑战中，你哪个填空出错最多？通过这次实验你总结出了什么记忆口诀？**

（开放性回答示例）填空1 `staticMethod()` 调用看似简单，但容易写成 `this.staticMethod()` 或 `CallerClass.staticMethod()`，虽然也能通过编译但不够简洁。记忆口诀：**"静能见静，静不见实；实能见静，实能见实。跨类调静用类名，调实必须先 new。"** 解释——静态方法可以访问静态成员，不能直接访问实例成员；实例方法可以访问静态成员，也可以访问实例成员。跨类调用静态方法用 `类名.方法()`，调用实例方法必须先创建对象。

---