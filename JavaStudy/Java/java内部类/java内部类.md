

1. java中可以在一个外部类中再定义一个内部类。
2. 此时外部类相当于外部类的成员，可以加访问修饰符号
3. 可以访问外部类的成员。包括private


# java匿名内部类

1. 基本语法是：

```java
new AnonymousClass {

	@Override
	//对方法进行重写
};
```

2. 匿名内部类只创建一次，用完即销毁，不可重复用
3. 匿名内部类本质是被命名了的
4.  匿名内部类面对与外部类同名的成员时，遵循就近原则，如果要访问外部的，就这样写：
```java
外部类.this.成员
```

5. 匿名内部类在外部类中，属于是局部变量，所以不能被访问修饰符修饰，但是可以被final修饰
6. 匿名内部类要在方法中创建。


# java成员内部类和静态成员内部类


| 成员内部类             | 静态成员内部类    |
| ----------------- | ---------- |
| 作为成员              | 作为类本身      |
| 需要创建实例才可以调用       | 无需创建实例即可调用 |
| 可以用访问修饰符修饰        | 可以用访问修饰符修饰 |
| 作用域仅在定义它的方法或者代码块内 |            |



# Java 内部类

1. Java 中可以在一个外部类中再定义一个内部类。
2. 此时**内部类**相当于外部类的成员，可以加访问修饰符号
3. 内部类可以访问外部类的成员，包括 private

## Java 匿名内部类

### 基本语法
```java
new AnonymousClass {
    @Override
    // 对方法进行重写
};
```

### 特点
1. 匿名内部类只创建一次，用完即销毁，不可重复使用。
2. **从代码编写角度匿名内部类无显式名称，但编译器会为其生成内部名称**。
3. 匿名内部类面对与外部类同名的成员时，遵循就近原则，如果要访问外部的，使用如下语法：
```java
外部类.this.成员
```
4. 匿名内部类在外部类中，属于局部变量，所以不能被访问修饰符修饰，但是可以被 `final` 修饰。
5. 匿名内部类要在方法中创建。

### 使用场景
匿名内部类常用于只需要使用一次的类，特别是在实现接口或者继承抽象类时，能让代码更简洁。例如，在事件处理、线程创建等场景中经常会用到。示例代码如下：
```java
// 实现 Runnable 接口创建线程
Thread thread = new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("线程正在运行");
    }
});
thread.start();
```

### 访问外部局部变量规则
在 Java 8 之前，外部局部变量必须被声明为 `final` 才能在匿名内部类中访问；Java 8 及以后，只要局部变量实际上是 `final`（即赋值后不再改变），就可以在匿名内部类中访问。

## Java 成员内部类和静态成员内部类

| 成员内部类             | 静态成员内部类                                 |
| ----------------- | --------------------------------------- |
| 作为成员              | 作为类本身                                   |
| 需要创建实例才可以调用       | 无需创建实例即可调用                              |
| 可以用访问修饰符修饰        | 可以用访问修饰符修饰                              |
| 作用域仅在定义它的方法或者代码块内 | 作用域是整个外部类                               |
| 可以直接访问外部类的所有成员    | 只能直接访问外部类的静态成员，若要访问外部类的非静态成员，需要创建外部类的实例 |

### 静态成员内部类访问外部类成员示例
```java
class Outer {
    private int nonStaticField = 10;
    private static int staticField = 20;

    // 成员内部类
    class MemberInner {
        public void accessOuterMembers() {
            System.out.println(nonStaticField); // 可以直接访问外部类的非静态成员
            System.out.println(staticField);    // 可以直接访问外部类的静态成员
        }
    }

    // 静态成员内部类
    static class StaticMemberInner {
        public void accessOuterMembers() {
            // System.out.println(nonStaticField); // 错误，不能直接访问外部类的非静态成员
            System.out.println(staticField);    // 可以直接访问外部类的静态成员
            Outer outer = new Outer();
            System.out.println(outer.nonStaticField); // 需要创建外部类实例来访问非静态成员
        }
    }
}
``` 


