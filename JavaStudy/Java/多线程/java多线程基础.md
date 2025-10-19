#  线程相关概念

- 程序
  为了完成某种任务， 


- 进程
  一次程序执行的过程

![[Pasted image 20251001155952.png]]


- 其他相关概念
1. 单线程:同一个时刻， 只允许执行一个线程
2. 多线程:同一个时刻， 可以执行多个线程，比如:一个QQ进程可以打开多个聊天窗口，一个迅雷进程，可以同时下载多个文件

3. 并发:同一个时刻，多个任务交替执行,造成一种"貌似同时"的错觉，简单说，单核cpu实现的多任务就是并发
4. 同一个时刻，多个任务同时执行。多核cpu可以实现并行。并发和并行

# 案例

```java
public class Thread01 {  
    public static void main(String[] args) {  
        //创建Cat对象， 可以当作线程使用  
        Cat cat = new Cat();  
        cat.start();//启动线程  
  
    }  
}  
  
  
class Cat extends Thread {  
    int times = 0;  
    @Override  
    public void run() {// 重写run方法  
        while (true) {  
            System.out.println("测试线程" + (++times));  
            try {  
                Thread.sleep(1000);  
            } catch (InterruptedException e) {  
                throw new RuntimeException(e);  
            }            if (times == 8) {  
                break;  
            }        }  
    }  
}

```




# 多线程机制

## 演示代码

```java
public class Thread01 {
    public static void main(String[] args) throws InterruptedException {
        //创建Cat对象， 可以当作线程使用
        Cat cat = new Cat();
        cat.start();//启动线程
        //当main线程启动一个子线程Thread-0后 , 主线程不会阻塞. 会继续执行

        System.out.println("主线程继续执行"  + Thread.currentThread().getName());//名字main
        for (int i = 0; i < 60; i ++) {
            System.out.println("主线程i =" + i);
            //让主线程休眠
            Thread.sleep(1000);
        }

    }
}


class Cat extends Thread {
    int times = 0;
    @Override
    public void run() {// 重写run方法
        while (true) {
            System.out.println("测试线程" + (++times));
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            if (times == 80) {
                break;
            }
        }
    }
}
```



- 我们会发现Cat里面的`Thread01` 线程，比main函数里面的`main` 线程进行得久
- 当所有线程结束，这个程序的进程才会消失

## 为什么是start

```java

public synchronized void start() {
	start0();
}
(2)

```


- start0() 是本地方法， 是jvm 调用， 底层是c/c++实现
 - 真正实现多线程的效果， 是start0 , 而不是run


# 线程基本使用


1. java是单继承的，当一个类继承了另外一个类的时候,这时Thread类方法来创建方法就不可取了
2. 引入了Runnable方法


## 案例

- 下面有一个`Dog`  类，它还有继承别的类，那么它就不能继承`Thread` 类， 所以我们通过实现`Runnable` 接口来实现多线程

- 这是Dog类
```java
class Dog implements Runnable {//通过实现Runnable接口， 开发线程

    int count = 0;
    @Override
    public void run() {
        while (true) {
            System.out.println("小狗汪汪叫....hi" + (++count) + Thread.currentThread().getName());
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            if (count == 10) {
                break;
            }
        }
    }
}

```

- 我们实现了接口，然后重写了`Run` 方法，最后在主程序调用


```java
public class Thread02 {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Thread thread = new Thread(dog);
        thread.start();
    }
}
```



## 简单模拟底层


- 我们创建一个`ThreadProxy` 类来模拟，为什么传入`dog` 对象可以实现多线程

 - ThreadProxy类
```java
class ThreadProxy implements Runnable {

    private Runnable target = null;
    @Override
    public void run() {

        if (target != null) {
            target.run();//动态绑定
        }
    }
    public ThreadProxy(Runnable target) {
        this.target = target;
    }
    public void start () {
        start0();//这个方法是真正实现多线程的方法
    }

    public void start0() {
        run();
    }
}

```

- 我们先重写一下`Run` 方法
- 并且设置一个target属性

- 为了测试方便，我们再创建一个`Tiger` 类

```java
class Animal {}
class Tiger extends Animal implements Runnable {

    @Override
    public void run() {
        System.out.println("测试Tiger方法");
    }
}

```

-  进行测试

```java
public class Thread02 {
    public static void main(String[] args) {
        Dog dog = new Dog();
        //dog.start();//这里不能调用start
        //创建了一个Thread对象， 把dog 对象(实现Runnable),放入Thread

        //这里底层使用了设计模式[代理模式]
        //
        //Thread thread = new Thread(dog);
        //thread.start();

        Tiger tiger = new Tiger();//实现了Runnable
        ThreadProxy threadProxy = new ThreadProxy(tiger);
        threadProxy.start();

    }
}

```
## 分析
1. 当我们传入dog对象的时候，会调用`start` 方法，然后调用`start0` 方法，进行`动态绑定` 执行`Tiger` 类里面重写的方法
```java
//线程代理类， 模拟了一个极简的thread
//把ThreadProxy 当作Thread类
class ThreadProxy implements Runnable {

    private Runnable target = null;
    @Override
    public void run() {

        if (target != null) {
            target.run();//动态绑定
        }
    }
    public ThreadProxy(Runnable target) {
        this.target = target;
    }
    public void start () {
        start0();//这个方法是真正实现多线程的方法
    }

    public void start0() {
        run();
    }
}

```


# 多个子线程案例


- 线程使用应用案例-多线程执行
编写一个程序，创建两个线程，一个线程每隔1秒输出"hello world", 输出10次，退出， 一个线程每隔1秒输出"hi", 输出5次退出


```java



```


# 通知线程退出


```java
public class ThreadExit_ {
    public static void main(String[] args) {
        T t = new T();
        t.start();

        //如果希望main线程去控制t1 线程的终止,必须可以修改 loop
        //修改loop可以让t1退出run方法从而终止t1线程->通知方式

        //让主线程休眠 10 s ，再通知 t1线程退出
        System.out.println("主线程休眠10s");
        try {
            Thread.sleep(10 * 1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        t.setLoop(false);


    }

}


class T extends Thread {
    private int count = 0;
    private boolean loop = true;


    @Override
    public void run() {
        while (loop) {
            try {
                Thread.sleep(50);

            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("T运行中......." + (++count));
        }
    }

    public void setLoop(boolean loop) {
        this.loop = loop;
    }
}

```


- 通过设置loop变量是线程退出


# 线程中断

```java
public class ThreadMethod01 {
    public static void main(String[] args) {
        T t = new T();

        t.setName("lfm");
        t.setPriority(Thread.MIN_PRIORITY);
        t.start();//启动子线程
        //主线程打印5 hi， 然后中断子线程的休眠

        for (int i = 0; i < 5; i ++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("hi" + i);
        }

        System.out.println(t.getName() + "线程的优先级 =" + t.getPriority());
        t.interrupt();//当执行到这里， t线程被终止
        

    }
}




class T extends Thread{
    @Override
    public void run() {
        while (true) {
            for (int i = 0; i < 100; i ++) {                System.out.println(Thread.currentThread().getName() + "吃包子" + i);
            }
            try {
                System.out.println(Thread.currentThread().getName() + "休眠中" );
                Thread.sleep(20000);
            } catch (InterruptedException e) {
                System.out.println(Thread.currentThread().getName() + "被 interrupt了");
            }
        }
    }
}

```

# 线程插队


# 守护线程
```java
public class ThreadMethod03 {
    public static void main(String[] args) throws InterruptedException {
        T4 t4 = new T4();
        Thread thread = new Thread(t4);
        //子线程是一个死循环，要想让它在主线程退出的时候也退出
        //就要把它设置为守护线程
        thread.setDaemon(true);
        thread.start();
        for (int i = 1; i <= 10; i ++) {
            System.out.println("主线程在运行");
            Thread.sleep(1000);
        }

    }
}


class T4 implements Runnable{

    @Override
    public void run() {
        for (;;) {
            try {
                System.out.println("子线程在运行");
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }
}

```


# 线程7大状态
```java
public class ThreadState_ {
    public static void main(String[] args) throws InterruptedException {
        T t = new T();
        System.out.println(t.getName() + " 状态 " + t.getState());
        t.start();

        while (Thread.State.TERMINATED != t.getState()) {
            System.out.println(t.getName() + " 状态 " + t.getState());
            Thread.sleep(1000);
        }

        System.out.println(t.getName() + " 状态 " + t.getState());
    }
}


class T extends Thread {
    @Override
    public void run() {
        while (true) {
            for (int i = 0; i < 10; i ++) {
                System.out.println("hi " + i);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
            break;
        }
    }
}

```

# 线程同步机制
```java
public class SellTicket {
    public static void main(String[] args) {
        //SellTicket01 sellTicket01 = new SellTicket01();
        //SellTicket01 sellTicket2 = new SellTicket01();
        //SellTicket01 sellTicket3 = new SellTicket01();
        //sellTicket01.start();
        //sellTicket2.start();
        //sellTicket3.start();
        //
        //System.out.println("====Runnable===");
        //SellTicket02 sellTicket02 = new SellTicket02();
        //new Thread(sellTicket02).start();
        //new Thread(sellTicket02).start();
        //new Thread(sellTicket02).start();

        //用syn
        System.out.println("======利用synchronized======");
        SellTicket03 sellTicket03 = new SellTicket03();
        new Thread(sellTicket03).start();
        new Thread(sellTicket03).start();
        new Thread(sellTicket03).start();



    }
}



//用synchronized实现线程同步
class SellTicket03 implements Runnable {


    private int ticketNum = 100;//余票 , 让多个线程共享
    private boolean loop = true;//控制run方法的
    public synchronized void sell() {// 同步方法，在同一时刻，只能有一个线程来调用
        if (ticketNum <= 0) {
            System.out.println("售票结束");
            loop = false;
            return;
        }
        try {
            Thread.sleep(50);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("窗口" + Thread.currentThread().getName() + "售出一张票" + "剩余票数" + (--ticketNum));
    }
    @Override
    public void run() {//同步方法 ,
        System.out.println("开始售票");
        while (loop) {
            sell();
        }
    }
}


//继承Thread类的方法
class SellTicket01 extends Thread{
    private static int ticketNum = 100;//余票 , 让多个线程共享

    @Override
    public void run() {
        System.out.println("开始售票");
        while (true) {
            if (ticketNum <= 0) {
                System.out.println("售票结束");
                break;
            }
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("窗口" + Thread.currentThread().getName() + "售出一张票" + "剩余票数" + (--ticketNum));
        }
    }
}
class SellTicket02 implements Runnable {


    private int ticketNum = 100;//余票 , 让多个线程共享

    @Override
    public void run() {
        System.out.println("开始售票");
        while (true) {
            if (ticketNum <= 0) {
                System.out.println("售票结束");
                break;
            }
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            System.out.println("窗口" + Thread.currentThread().getName() + "售出一张票" + "剩余票数" + (--ticketNum));
        }
    }
}

```


# 互斥锁
```java
```

# 死锁
```java
public class DeadLock_ {
    public static void main(String[] args) {
        DeadLockDemo A = new DeadLockDemo(true);
        DeadLockDemo B = new DeadLockDemo(false);

        A.setName("A");
        B.setName("B");
        A.start();
        B.start();
    }
}

class DeadLockDemo extends Thread{
    static Object o1 = new Object();
    static Object o2 = new Object();
    private boolean flag;

    public DeadLockDemo(boolean flag) {
        this.flag = flag;
    }

    @Override
    public void run() {
        if (flag) {
            synchronized (o1) {
                System.out.println(Thread.currentThread().getName() + "进入1");
                synchronized (o2) {
                    System.out.println(Thread.currentThread().getName() + "进入2");
                }
            }
        } else {
            synchronized (o2) {
                System.out.println(Thread.currentThread().getName() + "进入3");
                synchronized (o1) {
                    System.out.println(Thread.currentThread().getName() + "进入4");
                }
            }
        }
    }
}

```



# 释放锁

1. `Thread.sleep()`  和 `Thread.yield()` 方法暂停当前线程的执行，不会释放锁



# 线程退出



