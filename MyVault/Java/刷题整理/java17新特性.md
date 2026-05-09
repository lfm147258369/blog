
# Java 17 核心特性面试笔记

## 回答重点
Java 17 的核心特性聚焦于代码设计安全性与 JDK 稳定性。

1) Sealed 密封类：打破"类要么完全开放继承、要么完全禁止继承"的限制，可精确指定允许继承的子类（通过 `permits` 关键字）。被允许的子类需显式声明继承策略（`final` / `sealed` / `non-sealed`），配合 switch 模式匹配可实现"类型穷举检查"，避免遗漏分支。

2) 增强的伪随机数生成器：新增 `RandomGenerator` 接口，支持多种随机数算法（如 `L32X64MixRandom`），性能优于传统 `Random`，算法选择更灵活。

3) 强封装 JDK 内部 API：彻底禁止通过反射访问 JDK 内部类（如 `sun.misc.Unsafe`、`jdk.internal.*`），提升 JDK 安全性与稳定性，但需迁移依赖内部 API 的老代码。

## 扩展知识
Java 17 是目前 Java 最主流的 LTS 版本，占比已经超越了 Java 8！现在很多新的 Java 开发框架和类库支持的最低 JDK 版本就是 17（比如 AI 开发框架 LangChain4j）。



---

## 【实用】Sealed 密封类
在很多 Java 开发者的印象中，一个类要么完全开放继承（任何类都能继承），要么完全禁止继承（final 类）。

```java
// 选择1：完全开放继承
public class Shape {
    // 问题：不知道会有哪些子类，难以进行穷举
}

// 选择2：完全禁止继承
public final class Circle {
    // 问题：即使在同一个模块内也无法继承
}
```

其实这样是没办法精确控制继承关系的，在设计 API 或领域模型时可能会遇到问题。

Java 17 将 Sealed 密封类转正，让类的继承关系变得更可控和安全。

比如我可以只允许某几个类继承：
```java
public sealed class Shape
    permits Circle, Rectangle, Triangle {
    // 只允许这三个类继承
}
```

但是，被允许继承的子类必须选择一种继承策略：

1) final：到我为止，不能再继承了
```java
public final class Circle extends Shape {
}
```

2) sealed：我也要控制谁能继承我
```java
public sealed class Triangle extends Shape
    permits RightTriangle {
}
```

3) non-sealed：我开放继承，任何人都可以继承我
```java
public non-sealed class Rectangle extends Shape {
}
```

![[{{fileName}}-{{date}}.png]]

强制声明继承策略是为了确保设计控制权的完整传递。如果不强制声明，sealed 类精确控制继承的价值就会被破坏，任何人都可以通过继承子类来绕过原始的限制。

注意，虽然看起来 non-sealed 打破了这个设计，但这也是设计者的主动选择。如果不需要强制声明，设计者可能会无意中失去控制权。

有了 Sealed 类后，某个接口可能的实现类型就尽在掌握了，可以让 switch 模式匹配变得更加安全：

### 使用场景
Sealed 类特别适合以下场景：
1) 领域建模：比如订单状态只有"待支付、已支付、已发货、已完成、已取消"这几种，用 sealed 类可以让编译器帮你检查是否处理了所有状态。
2) 框架设计：Spring、Jackson 这类框架在设计内部 API 时，可以用 sealed 限制继承范围，防止用户随意扩展导致兼容性问题。
3) 代数数据类型：函数式编程里常见的 Either、Option 这类类型，用 sealed 类配合 record 可以很优雅地实现。

---

## 【了解】新的随机数生成器
Java 17 引入了全新的随机数生成器 API，提供了更优的性能和更多的算法选择：

```java
// 传统的随机数
Random oldRandom = new Random();
int oldValue = oldRandom.nextInt(100);

// 新的随机数生成器
RandomGenerator generator = RandomGenerator.of("L32X64MixRandom");
int newValue = generator.nextInt(100);
```

新的 RandomGenerator 接口统一了所有随机数生成器的 API，可以根据需求选择不同的算法：
```java
// 查看所有可用的随机数算法
RandomGeneratorFactory.all()
    .map(RandomGeneratorFactory::name)
    .forEach(System.out::println);

// 选择适合并行计算的算法
RandomGenerator splittable = RandomGenerator.of("L64X128MixRandom");

// 选择可跳跃的算法，适合 Monte Carlo 模拟
RandomGenerator jumpable = RandomGenerator.of("Xoroshiro128PlusPlus");
```

不同算法有不同的特点：LXM 系列算法在多线程场景下性能更好，Xoroshiro 系列适合需要快速跳跃到远处状态的场景。传统的 Random 类在高并发下会有锁竞争问题，新的算法通过巧妙的数学设计避免了这个问题。

---

## 【了解】强封装 JDK 内部 API
Java 17 进一步强化了对 JDK 内部 API 的封装，一些之前可以通过反射访问的内部类现在完全不可访问，比如：
- `com.sun.*` 包下的类
- `jdk.internal.*` 包下的类

虽然这提高了 JDK 的安全性和稳定性，但可能需要迁移一些依赖内部 API 的老代码。

### 迁移建议
如果你的项目还在用这些内部 API，需要做迁移：
1) `sun.misc.Unsafe`：大部分功能已经有官方替代品了。CAS 操作可以用 `VarHandle`，内存操作可以用 `MethodHandles.Lookup.defineHiddenClass()`，堆外内存可以用 `ByteBuffer.allocateDirect()` 或者 Foreign Memory API。
2) `sun.reflect.Reflection.getCallerClass()`：用 `StackWalker` 替代。
3) `com.sun.net.httpserver`：这个其实在 Java 18 开始被正式公开了，不再是内部 API。

如果实在没法迁移，可以用 `--add-opens` 参数临时放开，但这只是权宜之计，长期还是要做迁移。

---

## 【了解】其他值得关注的特性
### switch 模式匹配预览
Java 17 引入了 switch 模式匹配的预览版（在 Java 21 正式转正），配合 sealed 类可以写出更简洁的代码：

```java
// 传统写法
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
} else if (obj instanceof Integer) {
    Integer i = (Integer) obj;
    System.out.println(i * 2);
}
```

```java
// 新写法
switch (obj) {
    case String s -> System.out.println(s.length());
    case Integer i -> System.out.println(i * 2);
    default -> System.out.println("unknown");
}
```

---

## 面试官追问
### 提问：Sealed 类和 final 类有什么区别？什么场景下用 Sealed 而不是 final？
回答：final 是完全禁止继承，一刀切。Sealed 是精确控制谁能继承，白名单机制。当你的设计意图是"只允许特定几个子类，但这几个子类是必要的"时候用 Sealed。典型场景是领域建模，比如支付结果只有"成功、失败、处理中"三种，用 sealed 可以让编译器帮你检查 switch 是否覆盖了所有情况。如果用 final，那就没法抽象出公共父类了。

### 提问：为什么 Sealed 类的子类必须声明 final、sealed 或 non-sealed？不声明会怎样？
回答：不声明会编译报错。强制声明是为了防止设计意图被无意破坏。你想想，如果子类默认可以被任意继承，那 sealed 父类的控制就形同虚设了，任何人都可以通过继承子类来绕过限制。non-sealed 看起来像是放弃控制，但这是设计者的主动选择，和无意中被绕过是两码事。这种强制声明让代码的意图更明确，读代码的人一眼就能看出继承策略。

### 提问：Java 17 强封装内部 API 后，一些老项目用了 Unsafe 怎么办？
回答：短期可以用 `--add-opens` 参数临时放开访问权限，比如 `--add-opens java.base/sun.misc=ALL-UNNAMED`。但这只是过渡方案，长期还是要迁移。Unsafe 的大部分功能都有官方替代品：CAS 用 VarHandle，堆外内存用 Foreign Memory API（Java 21 转正），内存屏障用 VarHandle 的 acquire/release 模式。真正难迁移的是那些直接操作对象内存布局的代码，这种可能要重新设计方案。

### 提问：新的 RandomGenerator 相比传统 Random 有什么优势？多线程场景下怎么选？

回答：传统 Random 内部用了一个 AtomicLong 做种子，多线程场景下会有 CAS 竞争，线程越多性能越差。新的 LXM 系列算法（比如 L64X128MixRandom）用了数学方法保证不同线程生成的序列不会重叠，压根不需要同步。如果你的场景是多线程并行生成随机数，直接用 SplittableRandom 或者 LXM 系列，每个线程 split 一个独立的生成器，性能可以提升好几倍。


---

## 【教材前五章】JDK 8→JDK 17 核心考点补充
以下内容完全匹配教材前五章目录，是考试与基础面试的高频重点：

---

### 【实用】第2章 Java编程基础：语法糖增强
这一章是JDK 17语法差异最大的部分，代码题、选择题必考。

#### 1. 局部变量类型推断（var，JDK 10）
**核心作用**：编译器根据初始化值自动推断局部变量类型，减少冗余代码。

```java
// ---------------- JDK 8旧写法 ----------------
String name = "Java17";
int age = 25;
List&lt;String&gt; list = new ArrayList<>();

// ---------------- JDK 17新写法 ----------------
var name = "Java17"; // 推断为String
var age = 25;        // 推断为int
var list = new ArrayList&lt;String&gt;(); // 推断为ArrayList&lt;String&gt;

// 循环中使用
for (var i = 0; i < 10; i++) { // i推断为int
    System.out.println(i);
}
```

**考点·使用限制**（选择题高频）：
- 只能用于**局部变量**（方法内、循环内），不能用于成员变量、方法参数、方法返回值；
- 必须**立即初始化**，不能赋值为`null`；
- 不支持多态赋值（如`var obj = new String(); obj = 123;`会报错）。

---

#### 2. Switch 表达式（JDK 14 正式）
**核心作用**：从“语句式”升级为“表达式”，自动防止 case 穿透，可直接返回值。

```java

// JDK 8 旧写法（需 break，易穿透）
String typeOld;
int day = 3;
switch (day) {
    case 1: case 2: case 3: case 4: case 5:
        typeOld = "工作日";
        break; // 必须写
    case 6: case 7:
        typeOld = "休息日";
        break;
    default:
        typeOld = "无效日期";
}

// JDK 14 正式写法（Switch 表达式）
// 写法1：箭头语法（无 break，自动防穿透）
String typeNew1 = switch (day) {
    case 1, 2, 3, 4, 5 -> "工作日"; // 多个 case 逗号分隔
    case 6, 7 -> "休息日";
    default -> "无效日期";
};

// 写法2：代码块 + yield 返回值（适合复杂逻辑）
String typeNew2 = switch (day) {
    case 1, 2, 3, 4, 5 -> {
        System.out.println("执行复杂逻辑...");
        yield "工作日"; // yield 用于返回值
    }
    case 6, 7 -> "休息日";
    default -> "无效日期";
};

```

---


#### 3. 文本块（Text Blocks，JDK 15正式）

**核心作用**：简化多行字符串编写，无需手动拼接`\n`和转义。



```java
// ---------------- JDK 8旧写法（手动拼接） ----------------
String sqlOld = "SELECT id, name, age\n" +
                "FROM user\n" +
                "WHERE age > 18\n" +
                "ORDER BY id DESC;";

// ---------------- JDK 17新写法（文本块） ----------------
String sqlNew = """
        SELECT id, name, age
        FROM user
        WHERE age > 18
        ORDER BY id DESC;
        """; // 自动保留换行和缩进
```

**考点**：文本块使用`"""`声明，缩进以最后一个`"""`的位置为基准。

---

### 【实用】第3章 面向对象（上）：Record记录类
**核心作用**：专门用于定义**不可变数据载体类**，自动生成私有final属性、全参构造、访问器、`equals()`、`hashCode()`、`toString()`，替代JDK 8繁琐的POJO模板代码。

```java
// ---------------- JDK 8旧写法（手动写POJO） ----------------
class UserOld {
    private final String name;
    private final int age;

    public UserOld(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter（无Setter，因为final）
    public String getName() { return name; }
    public int getAge() { return age; }

    // 手动重写equals、hashCode、toString
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserOld userOld = (UserOld) o;
        return age == userOld.age && Objects.equals(name, userOld.name);
    }
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
    @Override
    public String toString() {
        return "UserOld{name='" + name + "', age=" + age + "}";
    }
}

// ---------------- JDK 17新写法（Record类） ----------------
// 自动生成所有模板代码
record UserNew(String name, int age) {
    // 可选：紧凑构造方法（用于参数校验）
    public UserNew {
        if (age < 0) throw new IllegalArgumentException("年龄不能为负");
    }
}

// 使用
public class RecordExample {
    public static void main(String[] args) {
        UserNew user = new UserNew("张三", 25);
        System.out.println(user.name()); // 访问器直接用属性名（不是getName()）
        System.out.println(user.age());
        System.out.println(user); // 自动生成的toString
    }
}
```

**考点·使用限制**：
- Record类是`final`类，**不能继承其他类**，但可以实现接口；
- 属性默认`private final`，不能重新赋值；
- 访问器方法名直接用属性名（如`name()`），不是`getName()`。

---

### 【实用】第4章 面向对象（下）：instanceof模式匹配
**核心作用**：判断类型的同时自动完成强制类型转换，简化代码。

```java
// ---------------- JDK 8旧写法（判断+手动强转） ----------------
Object obj = "Hello Java17";
if (obj instanceof String) {
    String s = (String) obj; // 手动强转
    System.out.println(s.length());
}

// ---------------- JDK 17新写法（判断+自动绑定变量） ----------------
if (obj instanceof String s) { // 直接声明绑定变量s，自动强转
    System.out.println(s.length()); // 直接使用s
}

// 进阶：在表达式中使用
if (obj instanceof String s && s.length() > 5) { // &&后面可直接用s
    System.out.println("字符串长度大于5");
}
```

**考点**：绑定变量`s`的作用域**仅在if块内**，外部无法访问。

---

#### 补充：接口私有方法（JDK 9）
**核心作用**：给接口的`default`/`static`方法复用内部逻辑，提升封装性。

```java
interface MyInterface {
    // JDK 8已有的default方法
    default void publicMethod() {
        System.out.println("公共方法");
        privateMethod(); // 调用私有方法复用代码
    }

    // JDK 9新增：私有实例方法（仅接口内部可见）
    private void privateMethod() {
        System.out.println("接口内部的私有方法");
    }

    // JDK 9新增：私有静态方法
    private static void privateStaticMethod() {
        System.out.println("私有静态方法");
    }

    static void staticMethod() {
        privateStaticMethod(); // 调用私有静态方法
    }
}
```

**考点**：接口私有方法**只能在接口内部调用**，实现类不可见、不可重写。

---

### 【了解】第1章 Java开发入门：基础环境变化
#### 1. JDK 17目录结构
- JDK 8有独立的`jre`目录；
- JDK 17**默认无独立jre目录**，模块化重构了JDK结构，可通过`jlink`工具生成定制jre。

#### 2. 环境变量配置
- `CLASSPATH`：JDK 8必须手动配置，JDK 17**完全不需要**，默认加载当前目录类；
- 新增**模块路径（Module Path）** 概念，替代部分ClassPath作用。

#### 3. 模块化基础（Jigsaw）
- 模块描述文件：`module-info.java`；
- 核心指令：`exports`（导出包）、`requires`（依赖模块）。

---

### 【了解】第5章 异常：处理优化
#### 1. try-with-resources增强（JDK 9）
**核心作用**：支持引用try外已声明的`final`/等效`final`资源变量。

```java
import java.io.*;

// ---------------- JDK 8旧写法（必须在try()内声明资源） ----------------
try (FileInputStream fis = new FileInputStream("test.txt");
     InputStreamReader isr = new InputStreamReader(fis)) {
    // 使用资源
}

// ---------------- JDK 17新写法（引用外部final资源） ----------------
final FileInputStream fis = new FileInputStream("test.txt"); // 必须是final
InputStreamReader isr = new InputStreamReader(fis); // 等效final（未重新赋值）
try (fis; isr) { // 直接引用
    // 使用资源
}
```

---

#### 2. 增强的空指针异常（JDK 14）
**核心作用**：精准指出为`null`的引用变量名，快速定位问题。

```java
// 触发NPE的代码
User user = new User();
user.address = new Address();
user.address.city = null;
System.out.println(user.address.city.length());

// JDK 8异常信息：只说行号
// Exception in thread "main" java.lang.NullPointerException
//     at Test.main(Test.java:XX)

// JDK 17异常信息：精准指出null变量
// Exception in thread "main" java.lang.NullPointerException:
// Cannot invoke "String.length()" because "user.address.city" is null
```

---

### 面试官追问（前五章专属）
#### 提问：var关键字可以用于声明成员变量吗？为什么？
回答：不能。var只能用于局部变量（方法内、循环内），因为成员变量的类型需要明确声明以保证类的结构清晰，避免类型推断带来的可读性问题。此外，var必须立即初始化，而成员变量可能有默认初始化（如int默认0），无法满足立即初始化的要求。

#### 提问：Record类和普通POJO类有什么区别？什么时候用Record？
回答：Record类是专门为“不可变数据载体”设计的，自动生成所有模板代码（构造、访问器、equals、hashCode、toString），且是final类、属性默认final。普通POJO类更灵活，支持可变属性、继承等。当你需要一个只用来存数据、不需要修改的类时（比如API返回值、数据库查询结果），用Record；当需要可变属性或继承时，用普通POJO。

#### 提问：接口的default方法和private方法有什么区别？
回答：default方法是对外暴露的公共方法，实现类可以直接继承使用，也可以重写，核心是为接口升级提供默认实现（避免所有实现类报错）；private方法是接口内部方法，仅用于default/static方法复用逻辑，实现类不可见、不可重写。

#### 提问：JDK 17的switch表达式和JDK 8的switch语句有什么核心区别？
回答：JDK 8的switch是“语句”，不能返回值，需要手动break防止case穿透；JDK 17的switch是“表达式”，可以直接返回值并赋值给变量，支持箭头语法`case L ->`自动防止穿透，代码块中用yield返回值，且编译器会检查是否覆盖所有可能值（或加default）。

