# 结论
`HashSet`的去重机制和TreeSet分别如何实现去重的
1. HashSet的去重机制： hashCode() + equals(), 底层先通过存入对象， 进行运算得到一个hash值， 通过hash值得到对应的索引， 如果发现table索引所在的位置没有数据， 就直接存放，如果有就进行equals比较(注意equals的比较规则由程序员设定)，如果比较后不相同就加入，相同就不加入
2.  TreeSet的去重机制： 如果传入一个Comparator匿名的对象 ，就使用实现的compare去重， 如果方法返回0，就认为是相同的元素/数据， 就不添加， 如果你没有传入一个匿名内部类Comparetor，则以你添加的对象实现的Comparetor接口的compareTo来去重

# 验证
## 测试代码

```java

@SuppressWarnings({"all"})
public class Homework04 {
    public static void main(String[] args) {
        TreeSet treeSet = new TreeSet();
        treeSet.add("lfm");
        treeSet.add("zsf");
        treeSet.add("xkl");
        treeSet.add("lfm");
        System.out.println(treeSet);
    }
}

```

- 然后我们进行调试,断点打在第二次添加字符串"lfm"的位置
```java
    public int compareTo(String anotherString) {
        int len1 = value.length;
        int len2 = anotherString.value.length;
        int lim = Math.min(len1, len2);
        char v1[] = value;
        char v2[] = anotherString.value;

        int k = 0;
        while (k < lim) {
            char c1 = v1[k];
            char c2 = v2[k];
            if (c1 != c2) {
                return c1 - c2;
            }
            k++;
        }
        return len1 - len2;
    }


```

- 我们发现它最终走到了String里面的compareTo， 证明了之前的结论，如果我们没有写比较器，没有传入匿名内部类， 那么就会调用该类的compareTo，我们传入的是String类，所以就调用了String类





# add方法
- 我们在用TreeSet或者HashSet等容器的add方法的时候


- 会走到put方法
```java
   else {
            if (key == null)
                throw new NullPointerException();
            @SuppressWarnings("unchecked")
                Comparable<? super K> k = (Comparable<? super K>) key;
            do {
                parent = t;
                cmp = k.compareTo(t.key);
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else
                    return t.setValue(value);
            } while (t != null);
        }
```

- 其中会对实现了Comparable的类，进行向下转型或者说是强制转换
- 这就意味着add方法不能随便接受对象，这个对象必须实现了Compareble类

```java
Comparable<? super K> k = (Comparable<? super K>) key;
```

## 题目
- 下面代码会抛出异常吗？
```java
TreeSet treeSet = new TreeSet();
treeSet.add(new Person());


Class Person{}

```

- 这个Person类没有实现Comparetor类，所以会抛出异常


# HashSet去重  (集合作业6 )

```java

import java.util.HashSet;
import java.util.Objects;

@SuppressWarnings({"all"})
public class Homework06 {

    public static void main(String[] args) {
        HashSet set = new HashSet();
        Person p1 = new Person(1001, "AA");
        Person p2 = new Person(1002, "BB");

        set.add(p1);
        set.add(p2);

        p1.name = "CC";
        set.remove(p1);

        System.out.println(set);
        set.add(new Person(1001, "CC"));
        System.out.println(set);
        set.add(new Person(1001, "AA"));
        System.out.println(set);
    }
}

class Person {
    private int id;
    public String name;

    public Person(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return id == person.id && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}



```


## 画图理解


![[Pasted image 20250921141251.png]]

- remove失败
```java

        p1.name = "CC";
        set.remove(p1);

```

原因是修改了p1的name，导致计算hash值无法找到原来的位置进行删除
所以p1位置的元素得以保留

- 挂CC
```java

        set.add(new Person(1001, "CC"));
```

这里计算出 1001 和 "CC" 的hash值，发现这个位置还是空的，所以可以加入

之前的1001-"CC" 的hash值计算的索引位置是在 1001-"AA" 的位置，所以不会进行去重



- 挂AA
```

        set.add(new Person(1001, "AA"));
```

这里1001 - "AA" 找到的就是之前的位置，那个位置的元素已经变成了 `1001-"CC"` 
然后进行去重判断发现没有重复，直接挂在链表下一个结点



#  Vector 和ArrayList的比较



|            | 底层结构 | 版本     | 线程安全(同步) 效率   | 扩容倍数                                                     |
| ---------- | ---- | ------ | ------------- | -------------------------------------------------------- |
| ArrayList  | 可变数组 | jdk1.2 | 线程不安全,效率高<br> | <br>如果使用的是有参构造器1.5倍，如果是无参构造器1. 第一次扩容10<br>2. 第二次开始按照1.5倍 |
| <br>Vector | 可变数组 | jdk1.0 | 线程安全，效率低      | 如果是无参默认10，满后，按照2倍扩容<br>如果是制定大小创建Vector，则每次按照2倍扩容         |




