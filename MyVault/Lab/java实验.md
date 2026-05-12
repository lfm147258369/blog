# Java 基础编程实验题集

## 第一部分：变量、运算符与注释补全

### 题目 1.1 计算圆的面积

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

### 题目 1.2 温度转换（华氏转摄氏）

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

## 第二部分：运算符与循环结构代码补全

### 题目 2.1 判断闰年并输出指定范围内的闰年

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

### 题目 2.2 累乘（阶乘）的部分和计算 (while 循环)

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

---

## 第三部分：方法设计

### 题目 3.1 设计方法判断素数并调用

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

### 题目 4.1 水仙花数（阿姆斯特朗数）及扩展功能

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

**额外**：推荐使用循环取模分离各位数字，幂运算利用循环算法。体现方法的复用性。

---

# Java 数组基础实验题集

## 第一部分：一维数组基础（代码补充题）

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

## 第二部分：学生成绩统计系统

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

## 第三部分：二维数组初步 —— 班级成绩统计

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

### 功能要求

1. 计算并输出每个班级的平均分（保留一位小数）
2. 计算并输出全校最高分（只输出分数值）
3. 输出平均分最高的班级

### 示例输出

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

### 方法封装建议

- `classAvg(int[][] data, int classIndex)`：计算指定班级的平均分
- `schoolMax(int[][] data)`：查找全校最高分
- `bestClass(int[][] data)`：找出平均分最高的班级

### 完成检查

- [ ] 班级平均分计算正确
- [ ] 全校最高分查找正确
- [ ] 最优班级判断正确

---

## 第四部分：AI 辅助编程体验

**任务说明**：使用 AI 工具辅助完成编程任务，体验真实 AI 辅助流程。请选择以下任务之一（二选一）

| 选项 | 任务描述 | 难度 |
| :--- | :--- | :--- |
| A | 实现方法 `public static int[] findAboveThreshold(int[] arr, int threshold)`，返回数组中所有大于阈值的元素组成的新数组。<br>例：`findAboveThreshold([10,25,30,15,40],20)` 返回 `[25,30,40]` | ⭐⭐ |
| B | 实现方法 `public static void printMatrix(int[][] matrix)`，以矩阵形式（每行每列对齐）输出二维数组。<br>例：输入 `int[][] matrix = { {1,2,3}, {4,5,6} }` → 输出：<br>`1 2 3`<br>`4 5 6` | ⭐⭐ |

### 操作步骤

1. **向 AI 提问（2 分钟）**：记录提问原文  
   - 示例（选项 A）："我有一个 Java 一维数组 int[]，请写一个方法，接收数组和一个阈值 threshold，返回一个新数组，包含所有大于阈值的元素。签名：public static int[] findAboveThreshold(int[] arr, int threshold)"

2. **获取 AI 代码（2 分钟）**：复制生成的代码

3. **测试 AI 代码（5 分钟）**：整合到 Java 程序中，运行测试，必要时修改

4. **记录与反思（6 分钟）**：按下文模板记录

### AI 使用记录模板

```
【AI 使用记录】
1. 使用的 AI 工具：___________
2. 我的提问原文：（粘贴）
3. AI 回复的代码：（粘贴）

【代码分析】
4. AI 代码是否正确运行？ □ 直接运行成功 □ 需要修改
5. 如有修改，修改了哪些地方？为什么修改？

【简短反思】
6. 使用 AI 辅助编程的一个优点：___________
7. 使用 AI 辅助编程的一个注意事项：___________
```

### 完成检查

- [ ] 成功向 AI 提问并获取代码
- [ ] 测试了 AI 代码的正确性
- [ ] 完成记录与反思

---

## 实验提交要求（课堂现场完成）

本次实验不要求撰写正式长篇报告，需提交：

- **源代码文件（.java）**：
  - `ArrayBasic.java`（第一部分）
  - `ScoreStatistics.java`（第二部分）
  - `ClassStatistics.java`（第三部分）
  - `AITask.java`（第四部分，含 AI 代码及测试）

- **AI 使用记录**：可写在 Java 注释或单独 `.txt` 文件

- **运行结果截图**：至少 2 张（第二部分和第三部分的运行结果）

---

# Java 构造方法与 this 关键字实验题集

## 第一部分：完善 Employee 类（构造方法重载 + this 调用）

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

## 第二部分：EmployeeTest 代码补全

```java
public class EmployeeTest {
    public static void main(String[] args) {
        // 使用无参构造
        // 【填空7：创建Employee对象，调用无参构造】
        Employee e1 = 

        // 使用姓名+工资构造
        // 【填空8：创建对象，姓名"张三"，工资6500.0】
        Employee e2 = 

        // 使用工号+姓名+工资构造
        // 【填空9：创建对象，工号"E101"，姓名"李四"，工资7200.0】
        Employee e3 = 

        // 使用全参数构造
        // 【填空10：创建对象，工号"E202"，姓名"王芳"，工资8900.0，部门"市场部"】
        Employee e4 = 

        System.out.println("员工信息：");
        e1.display();
        e2.display();
        e3.display();
        e4.display();

        // 比较工资
        // 【填空11：调用e3的hasHigherSalaryThan方法，比较e4】
        boolean result = 
        System.out.println("李四工资高于王芳吗？" + result);

        // 链式调用测试（setSalary返回当前对象）
        e2.setSalary(7000.0).display();
    }
}
```

---

## 第三部分：完善 Product 类（构造方法、this 的多种用法）

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

## 第四部分：ProductTest 代码补全

```java
public class ProductTest {
    public static void main(String[] args) {
        // 无参构造
        // 【填空18：创建Product对象，使用无参构造】
        Product p1 = 

        // 名称+价格构造
        // 【填空19：创建对象，名称"手机"，价格2999.0】
        Product p2 = 

        // ID、名称、价格构造
        // 【填空20：创建对象，ID"P001"，名称"平板"，价格3999.0】
        Product p3 = 

        // 全参数构造
        // 【填空21：创建对象，ID"G001"，名称"电脑"，价格5999.0，库存5】
        Product p4 = 

        System.out.println("商品列表：");
        p1.show();
        p2.show();
        p3.show();
        p4.show();

        // 比较价格
        p1.printCompared(p2);

        // 链式调用增加库存后展示
        p4.addStock(10).show();
    }
}
```

---

## 第五部分：this 关键字深度练习

- 在 Product 类中添加一个实例方法 `public void applyDiscount(double percent, Product thisProduct)`，演示 this 作为显式参数（虽然不常见，但帮助理解）。该方法调用 `thisProduct.price = thisProduct.price * (1 - percent/100);`，然后修改自身价格。
- 构造方法链中，如果出现循环调用（比如无参调用有参，有参又调用无参），会发生什么？编译会报错。让学生尝试并记录。

**思考**：为什么构造方法中 this() 调用必须出现在第一行？如果试图在第二行调用 this()，IDE 会报什么错误？

---

## 第六部分：AI 辅助编程环节

借助 AI 完成以下任务并记录过程。

### 任务 A：AI 生成构造方法重载示例

向 AI 提问："请用 Java 编写一个 Book 类，包含 title, author, price 属性，实现三个构造方法：无参、两个参数(title, author)、全参数，并在全参数构造中使用 this 关键字给属性赋值，同时演示 this() 调用。给出完整代码。"

### 任务 B：解释 this() 限制

提问："为什么在 Java 构造方法中，this()/super() 调用必须写在第一行？如果写在后面会有什么后果？请用简短例子说明。"

### 任务 C：代码审查

将自己填写的 Employee 或 Product 类提供给 AI，让 AI 检查构造方法链是否正确，并指出潜在错误。

---

## 第七部分：总结与思考

1. **构造方法重载的意义是什么？在什么场景下你会使用多个构造方法？**

2. **如果在一个构造方法中调用另一个构造方法（使用 this），需要注意哪些语法规范？**

3. **this 关键字除了调用构造方法和区分变量，还能用在哪些地方？请结合实验中提到的方法参数传递和返回值举例。**

4. **本次代码补全中，你遇到了哪些困难？哪个填空让你对 this 的理解更加深刻？**

---

## 五、实验报告要求

### 基本信息
- 姓名、学号、实验日期、JDK 版本截图。

### 填空答案表
按序号 1-22 列出完整代码填空答案（可直接写代码片段）。

### 最终代码
补全后的 `Employee.java`、`EmployeeTest.java`、`Product.java`、`ProductTest.java`，并标注关键行。

### 运行结果截图
- 至少两次提问与回复摘要（或截图）的运行输出，体现构造方法链的正确性以及 this 比较的结果。

### AI 辅助编程记录
- 至少两次提问与回复（或截图）。

### 思考题答案
每题不少于 3 行，结合代码分析。

---

## 六、评分标准（总分 100 分，内容扩充后合理分配）

| 考核项目 | 分值 |
| :--- | :--- |
| IDEA 项目创建及环境验证 | 5 |
| Employee 类填空（填空 1-6，每个 2 分） | 12 |
| EmployeeTest 填空（填空 7-11，每个 2 分） | 10 |
| Product 类填空（填空 12-18，每个 2 分） | 14 |
| ProductTest 填空（填空 19-22，每个 2 分） | 8 |
| 构造方法重载及 this 调用正确性（整体代码无逻辑错误） | 15 |
| 测试类功能完整、运行结果正确 | 10 |
| AI 辅助编程记录及反思 | 12 |
| 实验报告规范、思考题深度 | 14 |

---

## 附录 A：填空参考答案（教师/自查）

> 点击查看参考答案（完成实验后核对）

---

## 附录 B：IntelliJ IDEA 常用快捷键

| 功能 | Windows | Mac |
| :--- | :--- | :--- |
| 快速生成构造器 | Alt + Insert | Cmd + N |
| 代码补全 | Ctrl + Space | Ctrl + Space |
| 快速修复 | Alt + Enter | Option + Enter |
| 快速当前类 | Alt + Shift + F | Option + Enter |
| 运行当前类 | Ctrl + Shift + F10 | Ctrl + Shift + R |

---

## 附录 C：AI 提示词示例

- `"请解释 Java 中构造方法重载时，this() 调用必须放在第一行的底层原因。"`
- `"帮我检查下面这段代码中构造方法链是否存在循环调用。"`
- `"请我检查下面这段代码中 this 关键字可以作为方法的返回值，这种设计模式叫什么？有什么好处？"`
- `"在 Java 中，this 关键字可以作为方法的返回值，这种设计模式叫什么？有什么好处？"`

---

# 类的定义、对象创建、访问修饰符与封装综合实验

**建议时长**：90 分钟 | **代码补全挑战**：夯实 BankAccount 核心语法  
**环境**：JDK 17+ & IntelliJ IDEA

---

## 一、实验名称

Java 类的定义、对象创建、访问修饰符与封装综合应用 —— 银行账户系统（含代码补全）

---

## 二、实验目的

- 掌握 Java 中类的完整定义（属性、构造方法、成员方法）以及对象的创建（new 关键字）。
- 理解 private、public 及默认（无修饰符）访问修饰符的作用范围。
- 深刻体会封装思想，使用 private 修饰属性，并通过 getter 和业务方法操作数据。
- 通过针对 BankAccount 和 BankTest 的代码补全填空，精准检验类定义、构造方法、封装方法调用等基础语法掌握情况。
- 掌握利用 AI 辅助工具（通义灵码、ChatGPT 或 IDEA AI Assistant）进行代码生成与调试的技巧。
- 熟练使用 IntelliJ IDEA 创建项目、编写代码、运行测试，并验证 JDK 17+ 环境。

---

## 三、实验环境

- ✅ JDK 版本：JDK 17 或更高版本（LTS 推荐 17/21）
- ✅ IDE：IntelliJ IDEA（Ultimate 或 Community 版均可）
- ✅ AI 辅助工具：网络连接（推荐辅助 + ChatGPT）
- ✅ 已掌握知识：类与对象、main 方法、数据类型、流程控制，尚未学习继承。

---

## 四、实验内容与步骤

### 步骤 0：IDEA 项目创建

1. 打开 IntelliJ IDEA → New → Project。
2. 项目名：BankEncapsulation；语言：Java；构建系统：IntelliJ；JDK 选择 17+。
3. 在 src 目录右键 → New → Java Class 创建 BankAccount、BankTest。
4. 创建不同包用于访问修饰符测试：右键 src → New → Package，输入 `com.example.other`，在其中创建 TestDifferentPackage。

**IDEA 小贴士**：使用 `Alt+Insert`（Mac `Cmd+N`）可快速生成构造器/getter，但本次实验部分代码需要手动补全以加深理解。

### 步骤 1：代码补全挑战 —— 完善 BankAccount 类

以下 BankAccount.java 代码中预留了若干空缺（用【填空】标注）。请根据封装原则、构造方法、访问修饰符等知识将代码补充完整，使得该类能够正确编译并实现基本的银行账户功能。

**要求**：不得改变已有代码结构，只需在线处填入正确内容。

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

**补全要求**：将以上 15 个填空的完整答案按序号整理到实验报告中（例如：填空1: `private String accountNumber;`；填空4: `this.accountNumber = accountNumber;`……）。这是检验语法细节的关键。

### 步骤 2：代码补全挑战 —— 完善 BankTest 测试类

完成 BankAccount 补全后，请将以下 BankTest.java 中的空缺补充完整，实现对象的正确创建、方法调用及封装性验证。

```java
public class BankTest {
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

**完成补全后，程序运行结果应类似**：
```
账号：10086 | 户主：张三 | 余额：2000.0
账号：10010 | 户主：李四 | 余额：500.0
存款成功：+500.0，当前余额：2500.0
取款成功：-300.0，剩余余额：2200.0
取款成功：-600.0，剩余余额：2200.0
余额不足或金额无效
```

### 步骤 3：访问修饰符验证实验

1. **在同一包下创建 TestSamePackage 类**，尝试访问 BankAccount 的 private 字段及 public 方法，记录可访问性。
2. **在 com.example.other 包中创建 TestDifferentPackage 类**，尝试访问 BankAccount 的 private 字段及 public 方法，记录可访问性。
3. **在不同包（com.example.other）中创建 TestDefaultPackage 类**，尝试访问 BankAccount 的 public 方法以及默认访问权限的成员（如果添加的话），记录访问权限规则。

**填写下表（private/default/public）验证结论**：

| 访问修饰符 | 同类内 | 同包内（非子类） | 不同包（无关类） |
| :--- | :--- | :--- | :--- |
| private | ✅ 可访问 | ❌ | ❌ |
| default（无修饰符） | ✅ 可访问 | ✅ 可访问 | ❌ |
| public | ✅ 可访问 | ✅ 可访问 | ✅ 可访问 |

### 步骤 4：AI 辅助编程与调试验证

借助 AI 工具完成以下任务并记录交互过程。

#### 任务 A：AI 生成转账方法

向 AI 提问："请用 Java 为已经实现存款和取款的 BankAccount 类添加转账方法 `public void transfer(BankAccount target, double amount)`，处理余额不足，输出转账结果，要求兼容 JDK 17。" 将生成的代码整合到 BankAccount 中，并在 BankTest 中测试转账。

#### 任务 B：补全答案自查与纠错

将你在步骤 1 和步骤 2 中完成的代码补全答案提交给 AI，让 AI 帮助检查语法及封装合理性。提示示例："请帮我检查下列 BankAccount 类的补全答案是否正确，尤其是 this 的使用和访问修饰符。" 在报告中记录 AI 的反馈。

**实验报告需包含至少一次 AI 对话截图或摘要，展示如何解决补全过程中遇到的困难。**

### 步骤 5：总结与思考

1. **代码补全挑战中，哪个填空让你感到最困难？它考察了什么知识点（this、封装、引用等）？**

2. **如果不使用封装，直接将 balance 定义为 public，在 BankTest 中可能出现什么样的错误行为？请举例。**

3. **构造方法中参数和属性同名时，为什么要使用 this？如果你忘记写 this 会发生什么？**

4. **IntelliJ IDEA 在本次补全实验中提供了哪些辅助（高亮、代码提示、快速修复）？如何利用这些功能减少填空错误？**

---

## 五、实验报告详细要求

### 基本信息
- 姓名、学号、姓名、实验日期、JDK 版本截图及 IDEA 项目配置截图。

### 代码补全答案表
按顺序列出填空 1 至填空 22 的完整正确答案（可直接复制代码片段）。

### 最终源代码
补全后的 `BankAccount.java` 和 `BankTest.java`（含转账方法），需用注释标注补全位置。

### AI 辅助编程记录
- 至少两次提问与回复，包括转账代码生成、补全答案检查等，附上截图或对话摘要。

### 访问修饰符验证实验
- 同包测试截图、不同包测试截图。

### 运行结果截图
- 展示存款、取款及转账后的控制台输出，以及尝试破坏封装时的编译错误截图。

### 思考题答案
每题不少于 3 行，结合本次实验代码分析。

---

## 六、评分标准（总分 100 分，聚焦代码补全与实践）

| 考核项目 | 分值 |
| :--- | :--- |
| IDEA 项目创建及 JDK 17+ 验证 | 5 |
| BankAccount 代码补全填空（填空 1-15，每题 1 分） | 15 |
| BankTest 代码补全填空（填空 16-22，每题 1 分） | 7 |
| 封装实现正确性（属性 private、方法 public、转账逻辑合理） | 15 |
| 测试类功能完整（对象创建、存款、转账、访问尝试） | 10 |
| 访问修饰符对比实验及表格填写 | 8 |
| AI 辅助编程记录（提问深度 + 代码调试反思） | 15 |
| 运行截图 + 封装性编译错误截图 | 5 |
| 实验报告规范、思考题质量、补全总结 | 20 |

---

## 附录 A：代码补全参考答案（教师/实验后自查）

> 点击查看填空参考答案（完成实验后方可对照）

---

## 附录 B：IntelliJ IDEA 常用快捷键（Win / Mac）

| 功能 | Windows/Linux | macOS |
| :--- | :--- | :--- |
| 快速生成构造器 / getter/setter | Alt + Insert | Cmd + N |
| 代码补全 | Ctrl + Space | Ctrl + Space |
| 智能补全 | Ctrl + Shift + Space | Ctrl + Shift + Space |
| 快速修复 / 意图操作 | Alt + Enter | Option + Enter |
| 运行当前类 | Ctrl + Shift + F10 | Ctrl + Shift + R |

---

## 附录 C：AI 辅助编程提示词（针对本次补全实验）

- `"请帮我解释 Java 中使用 this 关键字为属性赋值的必要性，给出简单例子。"`
- `"帮我检查下面这段 BankAccount 类的代码填空是否正确：this.accountNumber = accountNumber; 为什么不能写成 accountNumber = accountNumber？"`
- `"请生成一个测试方法，验证银行账户的转账功能，确保不会破坏封装。"`

---

# static 关键字综合应用实验

**建议时长**：90 分钟 | **核心**：静态/非静态方法调用、静态变量与成员变量  
**环境**：JDK 17+ & IntelliJ IDEA

---

## 一、实验名称

Java static 关键字深入实验 —— 类成员与实例成员的交互、跨类调用、变量区别

---

## 二、实验目的

- 掌握 static 修饰方法和变量的语法规则。
- **同一类中**：理解静态方法能否直接调用非静态方法/成员变量，以及如何通过对象引用调用；理解非静态方法可以直接调用静态成员。
- **不同类之间**：掌握通过"类名.静态方法()"调用静态方法，以及通过对象调用实例方法；理解静态方法无法直接访问其他类的非静态成员（必须通过对象）。
- 深刻区分静态变量（类变量）与成员变量（实例变量）在内存存储、生命周期、访问方式上的区别。
- 通过代码补全挑战，强化 static 关键字的正确使用场景。

---

## 三、实验环境

- ✅ JDK 版本：JDK 17 或更高版本
- ✅ IDE：IntelliJ IDEA（Ultimate / Community）
- ✅ 辅助工具：AI 编程助手（通义灵码 / ChatGPT）
- ✅ 前置知识：类与对象、构造方法、this 关键字（但不涉及继承）

---

## 四、实验内容与步骤

### 步骤 0：IDEA 项目创建

- 新建项目：StaticKeywordLab，JDK 17+。
- 创建包结构：`com.staticdemo`，在其中创建四个类：
  - `CallerClass`（演示同一类中的调用）
  - `StaticVsInstance`（演示静态/实例变量）
  - `Helper`（辅助类，演示跨类调用）
  - `TestStatic`（主测试类）

### 第一部分：同一类中静态方法与非静态方法的相互调用（20 分钟）

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
        System.out.println("在实例方法中访问静态变量：" + 【填空2：访问静态变量 staticName】);
    }

    // 静态方法
    public static void staticMethod() {
        System.out.println("静态方法被调用");
        // 静态方法中 ❌ 不能直接调用实例方法（下面这行会编译错误）
        // instanceMethod(); // 错误：无法从静态上下文引用非静态方法

        // 静态方法中 ❌ 不能直接访问实例变量
        // System.out.println(instanceName); // 错误

        // 静态方法中 ✅ 可以访问静态变量
        System.out.println("静态方法中访问静态变量：" + 【填空3：访问静态变量 staticName】);

        // 静态方法中如何调用实例方法？必须创建对象
        CallerClass obj = 【填空4：创建 CallerClass 对象】;
        【填空5：通过对象调用实例方法 instanceMethod】;
    }

    // 另一个静态方法，演示调用静态方法
    public static void anotherStatic() {
        // 静态方法之间可以直接相互调用
        【填空6：直接调用本类的静态方法 staticMethod】;
    }
}
```

### 第二部分：静态变量 vs 成员变量（区别与验证）（20 分钟）

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
        【填空7：静态变量 staticCounter 自增1】;
    }
}
```

**测试代码填空（在 TestStatic 的 main 方法中完成）**：

```java
// 在 TestStatic.main 中添加：
StaticVsInstance obj1 = new StaticVsInstance();
StaticVsInstance obj2 = new StaticVsInstance();

obj1.display();
obj2.display();

// 通过类名修改静态变量
【填空8：使用类名将 staticCounter 增加5】;

obj1.display(); // 观察 obj1 和 obj2 的静态变量都会变化
```

**预期结果**：创建两个对象后，静态变量为2；通过类名修改后为7；而每个对象的实例变量始终保持1。深刻体会"一份共享、多份独立"。

### 第三部分：不同类间静态/非静态方法的相互调用（20 分钟）

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

在 `TestStatic` 中完成以下调用填空：

```java
public class TestStatic {
    public static void main(String[] args) {
        // 1. 调用 Helper 的静态方法 —— 直接通过类名调用
        // 【填空9：调用 Helper 类的静态方法 helperStatic】;

        // 2. 调用 Helper 的实例方法 —— 必须先创建对象
        Helper helper = 【填空10：创建 Helper 对象】;
        【填空11：通过对象调用实例方法 helperInstance】;

        // 3. 演示静态方法中如何调用另一个类的实例方法（通过对象）
        // 在 CallerClass 的静态方法中已经演示过类似情况，此处再强化
        CallerClass caller = new CallerClass();
        // 静态方法中调用实例方法：
        【填空12：通过 caller 对象调用实例方法 instanceMethod】;

        // 4. 演示跨类访问静态变量（StaticVsInstance 的 staticCounter 是 public）
        System.out.println("当前员工计数：" + 【填空13：通过类名访问 StaticVsInstance 的静态变量 staticCounter】);
    }
}
```

### 综合练习：代码补全挑战 —— 混合调用（12 分钟）

以下代码片段存在错误或空缺，需要修正/补全，以检验对 static 调用规则的理解。

```java
public class MixedDemo {
    private int a = 10;
    private static int b = 20;

    public void show() {
        System.out.println(a);   // 合法
        System.out.println(b);   // 合法，实例方法可访问静态变量
    }

    public static void test() {
        // 下面哪一行会编译错误？请用注释说明，并写出正确调用方式。
        // System.out.println(a);   // ①
        // System.out.println(b);   // ②
        // show();                  // ③
        
        // 正确的调用方式（如需调用 show，应该：）
        【填空14：写出在静态方法中正确调用 show() 的代码】
    }
}
```

### 步骤 5：AI 辅助编程环节

利用 AI 加深对 static 规则的理解，记录交互过程。

#### 任务 A：提问解释规则

向 AI 提问："在 Java 中，为什么静态方法不能直接调用非静态方法？请从内存加载顺序角度解释。" 将解答记录在报告中。

#### 任务 B：编写错误代码

故意编写错误代码（如静态方法中访问实例变量），让 AI 指出错误并给出修正方案。

#### 任务 C：跨类调用优化建议

让 AI 提供代码范例：一个工具类（全是静态方法）和一个实体类，展示如何相互调用。

### 步骤 6：总结与思考

1. **静态变量和成员变量在内存存储位置、初始化时机、访问方式上有哪些区别？**

2. **如果在静态方法中想要访问成员变量，正确的做法是什么？为什么必须这样做？**

3. **同一个类中，非静态方法调用静态方法和静态变量有无限制？为什么？**

4. **不同类之间，静态方法能否通过"类名.实例方法名"直接调用？请说明原因。**

5. **本次代码补全挑战中，你哪个填空出错最多？通过这次实验你总结出了什么记忆口诀？**

---

## 五、实验报告要求

### 基本信息
- 姓名、学号、实验日期、JDK 版本截图。

### 填空答案表
填空 1~14 的完整答案及必要说明。

### 最终源代码
补全后的 `CallerClass.java`、`StaticVsInstance.java`、`Helper.java`、`TestStatic.java` 以及 `MixedDemo.java`（如有）。

### 运行结果截图
- 分别展示 StaticVsInstance 变量区别输出、TestStatic 完整调用输出。

### AI 辅助编程记录
- 至少两次提问与回复摘要（截图或文本）。

### 思考题答案
每题不少于 3 行，结合代码分析。

---

## 六、评分标准（总分 100 分）

| 考核项目 | 分值 |
| :--- | :--- |
| 项目创建及环境验证 | 5 |
| 填空 1~14（每个 2 分，共 28 分） | 28 |
| 同一类中 static/非 static 调用逻辑正确 | 12 |
| 静态变量与成员变量区别实验正确（代码 + 输出） | 10 |
| 不同类间 static/非 static 调用实现完整 | 12 |
| MixedDemo 纠错与补全正确 | 8 |
| AI 辅助编程记录及反思 | 10 |
| 实验报告规范、思考题深度 | 15 |

---

## 附录 A：填空参考答案（教师/自查用）

> 点击查看参考答案（实验完成后核对）

---

## 附录 B：static 快速记忆表

| 调用场景 | 是否允许 | 正确方式 |
| :--- | :--- | :--- |
| 静态方法 → 静态变量 | ✅ 直接 | 变量名 或 类名.变量名 |
| 静态方法 → 实例变量 | ❌ 不允许直接 | 必须创建对象后访问 |
| 静态方法 → 实例方法 | ❌ 不允许直接 | 必须创建对象后调用 |
| 实例方法 → 静态变量 | ✅ 直接 | 变量名 或 类名.变量名 |
| 实例方法 → 静态方法 | ✅ 直接 | 方法名() 或 类名.方法名() |

---

## 附录 C：AI 提示词推荐

- `"举例说明 Java 中什么时候使用静态变量，什么时候使用成员变量。"`
- `"为什么 Java 的 main 方法是 static 的？如果去掉 static 会怎样？"`
- `"请帮我检查下面代码中静态方法调用的错误，并解释原因。"`

---

**实验总结**：本实验聚焦 static 关键字的三大核心：同类调用、跨类调用、变量区别。通过大量填空与案例，使学生牢固掌握 static 的使用边界。完成实验后，建议学生自己总结一张"static 调用规则表"，纳入实验报告。
