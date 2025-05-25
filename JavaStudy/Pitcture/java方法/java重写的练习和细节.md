# 方法重写介绍
- 子类和父类有两个返回值，参数，名称都一样的方法， 子类的方法会覆盖父类的方法。

1. 调用
```java
public class Overide01 {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.cry();
    }
}

```

2. Animal类
```java
public class Animal {
    public void cry() {
        System.out.println("动物叫");
    }
}

```
3. Dog类
```java
public class Dog extends Animal{
//    public void cry() {
//        System.out.println("狗叫");
//    }
}

```

我们把Dog类的`cry`方法注释掉了，就会到父类里面去找。

# 方法重载三个细节
1. 子类方法，形参列表，方法名和父类完全一致
2. 子类的返回类型如果和父类不同，要保证子类返回的`类型`是**父类返回类型**的**子类**
3. 子类的方法**不能缩小**父类方法的访问权限范围



4. 调用
```java
public class Overide01 {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.cry();
    }
}
```

2. Animal类
```java
public class Animal {
    public void cry() {
        System.out.println("动物叫");
    }

    public Object getSth() {
        return null;
    }

    protected First getA() {
        return null;
    }
}


```
3. Dog类
```java
public class Dog extends Animal{
    public void cry() {
        System.out.println("狗叫");
    }
    //String正好是Object的子类,反过来就会报错
    public String getSth() {
        return null;
    }

    public Second getA() {
        return null;
    }
}

class First {

}


class Second extends First {

}


```


![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/3ee0bce0d23d42ee844b83ca8168a531.png)
# 重写的练习

![在这里插入图片描述](https://i-blog.csdnimg.cn/direct/c6c54ba8402947bc9dc82e80d9b4ce4e.png)
- 刚开始的误区
1. 每个`Say`方法写成`void`的返回类型，每个类型打印自己的属性，没有体现出来`继承`的优势，
- 改进
2. 父类的`Say`方法的返回类型写为`String`类型，返回父类自身的属性
3. 子类的`Say`方法的可以用``super``关键字直接调用父类的方法，在此基础上，再加上自身的属性。


代码如下：
Person类：
```java
public class Person {
    Person(String name, int age) {
        this.m_Name = name;
        this.m_Age = age;
    }
    String say () {
        return "name = " + m_Name +  "age = " + m_Age;
    }
    public String getName() {
        return m_Name;
    }
    public int getAge() {
        return m_Age;
    }
    private String m_Name;
    private int m_Age;
}

```

Student类
```java
public class Student extends Person {
    String Say () {
        return super.say()  +  "id = " + m_Id + "score = " + m_Id;
    }
    Student(String name, int age, String id, double score) {
        super(name, age);
        this.m_Id = id;
        this.m_Score = score;
    }
    private String m_Id;
    private double m_Score;
}
```

调用
```java
public class OverrideExercise {
    public static void main(String[] args) {
        Person lfm = new Person("lfm", 19);
        System.out.println(lfm.say());

        Student lfm314 = new Student("lfm", 19, "314", 88.5);
        System.out.println(lfm314.Say());
    }
}
```








