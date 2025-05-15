# 方法中对自定义类型的传递
```java
package MethodParameter.MethodParameter03;

public class MP03 {
    public static void main(String[] args) {
        Person p = new Person();
        p.m_Age = 100;
        p.m_Name = "John";

        B b = new B();
        b.test02(p);

        System.out.println(p.m_Age + p.m_Name);
    }
}
class B{
    void test02(Person p) {
        p = new Person();
        p.m_Name = "Lyly";
        p.m_Age = 200;
    }
}

class Person {
    int m_Age;
    String m_Name;
}

```

- 这里的题目是问此时打印的结果是什么，这里我没注意到，在test02中，传过来的地址p已经指向了另外一块空间，不会影响到原来的空间，相当于创建了一个没有用到的空间，最后是被当作垃圾回收了。

# 第二问：
```java
.......
class B{
    void test02(Person p) {
        p = null;
    }
}

.....
```

- 问这里的把p指向null还能正常打印吗？
- 答案是可以的。因为这里是拷贝了一份地址，现在这个拷贝过来的变量不再指向原来空间而已，所以，在原本的main函数中还是能找到那块空间的。
