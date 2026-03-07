# 网络编程学习笔记
```java
import java.net.InetAddress;
import java.net.UnknownHostException;

public class API_ {
    public static void main(String[] args) throws UnknownHostException {
        //1. 获取本机的InetAddress对象
        InetAddress localHost = InetAddress.getLocalHost();
        System.out.println(localHost);

        //2. 根据指定主机名 获取 InteAddress 对象
        InetAddress byName = InetAddress.getByName("lfm-asus");
        System.out.println(byName);

        //3.根据域名返回 Inetaddress对象比如www.baidu.com
        InetAddress host2 = InetAddress.getByName("www.baidu.com");
        System.out.println("host2=" + host2);

        //4,. 通过Inetaddress对象获取相应的地址
        String hostAddress = host2.getHostAddress();
        System.out.println("host2对应 ip =" + hostAddress);

        //5. 通过InetAddress对象, 获取相对应的主机名/或者域名
        String hostName = host2.getHostName();
        System.out.println("host2对应的主机名/域名=" + hostName);//www.baidu.com
        


    }
}

```

## Socket
### Socket的理解
1. **TCP可靠**
2. **UDP不可靠**

![img](https://img2024.cnblogs.com/blog/3730964/202512/3730964-20251216091414520-1949464628.png)

---

### 应用案例1
1. 编写一个服务器端和一个客户端
2. 服务器端在9999端口监听
3. 客户端连接到服务器端,发送"hello,server", 然后退出
4. 服务器端接收到客户端发送的消息,打印出来

- TCP编程(字节读写)

思路:
- 服务器端:
1. 在本机的9999端口监听,等待连接
2. 当没有客户端连接9999端口时,程序会阻塞连接,等待连接
3. 通过socket.getInputStream()读取客户端发送的消息,然后打印出来

- 客户端:
1. 连接服务器端(ip, 端口)
2. 连接上后,生成Socket,通过socket.getOutputStream()
3. 通过输出流,写入数据到数据通道
![img](https://img2024.cnblogs.com/blog/3730964/202512/3730964-20251216092549450-1843992417.png)




- **服务器端**
```java

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketTCP01Server {
    public static void main(String[] args) throws IOException {
        //1. 在本机的9999端口监听,等待连接
        //细节 : 要求本机没有其他服务监听9999端口
        //这个ServerSocket可以通过accept()返回多个Socket[多个客户端连接服务器的并发]
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务器端, 在9999端口监听,等待连接.......");
        //2. 当没有客户端连接9999端口时,程序会阻塞连接,等待连接
        //如果有客户端连接则会返回一个Socket对象
        Socket socket = serverSocket.accept();
        System.out.println("服务器端socket=" + socket.getClass());
        //
        //3. 通过socket.getInputStream()读取客户端发送的消息,然后打印出来
        InputStream inputStream = socket.getInputStream();
        //4.IO读取
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            //根据读取到的实际长度,显示字符串
            System.out.println(new String(buf, 0, readLen));
        }
        //5. 关闭流和socket
        inputStream.close();
        socket.close();

    }
}


```

- **客户端**
```java
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * 发送"hello server给客户端"
 */
public class SocketTCP01Client {
    public static void main(String[] args) throws IOException {
        //1. 连接服务器端(ip, 端口)
        //解读:这行代码的意思是连接本机的9999端口,如果连接成功,返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("客户端 socket返回" + socket.getClass());
        //2. 连接上后,生成Socket,通过socket.getOutputStream()
        //得到和socket对象关联的输出流对象
        //
        OutputStream outputStream = socket.getOutputStream();
        //3. 通过输出流,写入数据到数据通道
        outputStream.write("hello, server".getBytes());
        outputStream.close();
        socket.close();
        System.out.println("客户端退出");

    }
}

```

### 应用案例2 SocketTCP02.java

1. 编写一个服务端和一个客户端
2. 服务器端在9999端口监听
3. 客户端连接到服务器端,发送"hello,server",并接收服务器端回发"hello,client",再退出
4. 服务器端接收到 客户端发送的信息输出,并发送"hello,client"  再退出


示意图:
![img](https://img2024.cnblogs.com/blog/3730964/202512/3730964-20251216102130168-1725619747.png)


- 思路:

**服务器端**
1. socket.getOutputStream()
2. 写入数据到数据通道
3. 关闭socket和io

**客户端** 
1. socket.getInputStream()
2. 读取数据通道的数据
3. 显示
4. 关闭socket和io

- **服务端代码**


```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketTCP02Server {
    public static void main(String[] args) throws IOException {
        //1. 在本机的9999端口监听,等待连接
        //细节 : 要求本机没有其他服务监听9999端口
        //这个ServerSocket可以通过accept()返回多个Socket[多个客户端连接服务器的并发]
        ServerSocket serverSocket = new ServerSocket(9999);
        System.out.println("服务器端, 在9999端口监听,等待连接.......");
        //2. 当没有客户端连接9999端口时,程序会阻塞连接,等待连接
        //如果有客户端连接则会返回一个Socket对象
        Socket socket = serverSocket.accept();
        System.out.println("服务器端socket=" + socket.getClass());
        //
        //3. 通过socket.getInputStream()读取客户端发送的消息,然后打印出来
        InputStream inputStream = socket.getInputStream();

        //4.IO读取
        byte[] buf = new byte[1024];
        int readLen = 0;
        while ((readLen = inputStream.read(buf)) != -1) {
            //根据读取到的实际长度,显示字符串
            System.out.println(new String(buf, 0, readLen));
        }
        //5.返回一个给客户端
        OutputStream outputStream = socket.getOutputStream();
        outputStream.write("hello,client".getBytes());
        socket.shutdownOutput();

        //6. 关闭流和socket
        inputStream.close();
        outputStream.close();
        serverSocket.close();
        socket.close();

    }
}

```

- **客户端代码**

```java
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;

/**
 * 发送"hello server给客户端"
 */
public class SocketTCP02Client {
    public static void main(String[] args) throws IOException {
        //1. 连接服务器端(ip, 端口)
        //解读:这行代码的意思是连接本机的9999端口,如果连接成功,返回Socket对象
        Socket socket = new Socket(InetAddress.getLocalHost(), 9999);
        System.out.println("客户端 socket返回" + socket.getClass());
        //2. 连接上后,生成Socket,通过socket.getOutputStream()
        //得到和socket对象关联的输出流对象
        //
        OutputStream outputStream = socket.getOutputStream();
        //3. 通过输出流,写入数据到数据通道
        outputStream.write("hello, server".getBytes());
        socket.shutdownOutput();

        //4. 接收服务端的"hello client"
        InputStream inputStream = socket.getInputStream();
        byte[] bytes = new byte[1024];
        int readLine = 0;
        while ((readLine = inputStream.read(bytes)) != -1) {
            System.out.println(new String(bytes, 0, readLine));
        }

        //5.
        inputStream.close();
        outputStream.close();
        socket.close();
        System.out.println("客户端退出");

    }
}


```

### 应用案例3(使用字符流) SocketTCP03.java
1. 编写一个服务端,和一个客户端
2. 服务端在9999端口监听
3. 客户端连接到服务器端,发送"hello,server",并接收服务器端回发"hello,client",再退出
4. 服务器端接收到 客户端发送的信息输出,并发送"hello,client"  再退出


