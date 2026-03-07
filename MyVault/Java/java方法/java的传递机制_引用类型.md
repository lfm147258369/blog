
![[java中方法的传递机制]]


![[Pasted image 20250508162904.png]]


- 代码如下

```java
package MethodParameter.MethodParameter02;

import java.util.Arrays;

public class MethodParameter02 {
    public static void PrintArray(int[] arr){
        for (int j : arr) {
            System.out.print(j + " ");
        }
        System.out.println();
    }

    public static void PrintPerson(Person p){
        System.out.println("m_Age = " + p.m_Age);
        System.out.println("m_Age = " + p.m_sal);
    }

    public static void main(String[] args){
        int []arr = {1, 2, 3 ,4, 5};
        B bb = new B();
        PrintArray(arr);
        bb.test100(arr);
        PrintArray(arr);

        Person p = new Person();
        p.m_sal = 100;
        p.m_Age = 100;
        PrintPerson(p);
        bb.test200(p);

        PrintPerson(p);

    }
}

class Person{
    int m_Age;
    int m_sal;
}

class B{
    public void test100(int[] arr){
        Arrays.fill(arr, 5);
    }
    public void test200(Person p){
        p.m_Age = 200;
        p.m_sal = 200;
    }
}

```


- 内存图
