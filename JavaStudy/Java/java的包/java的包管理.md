
- 这是文件的结构
```java
~/code/JavaStudy/chapter08 ❯ tree 
.
├── chapter08.iml
├── out
│   └── production
│       └── chapter08
│           └── com
│               ├── hspedu
│               │   └── pkg
│               │       └── Import01.class
│               ├── user
│               │   └── Test.class
│               ├── xiaoming
│               │   └── dog.class
│               └── xiaoqiang
│                   └── dog.class
└── src
    └── com：
        ├── hspedu
        │   └── pkg
        │       ├── Import01.java
        │       └── PkgDetail.java
        ├── user
        │   └── Test.java
        ├── xiaoming
        │   └── dog.java
        └── xiaoqiang
            └── dog.java



```


- 在Java中使用包要注意：
  1. 包的命名: com.公司名.项目名.业务模块名
  2. 使用的细节：
     import包，我们引入包里面的某个类或者某几个类，
  3. package的使用:
	  package的作用是声明当前类所在的包，需要放在类(或者文件的最上面)
	  一个类中最多只有一句package
  4. 常用的包：
     java.lang.*
     java.util.*
	 java.net.*
     java.awt.*
