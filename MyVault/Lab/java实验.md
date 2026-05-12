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
