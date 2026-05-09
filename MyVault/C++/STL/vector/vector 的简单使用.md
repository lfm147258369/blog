---
date: 2025-04-16
tags:
  - STL
---
# vector容器构造函数

- 默认构造
- 拷贝构造
- n个元素

```cpp
#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

void printVector(vector&lt;int&gt; & v)
{
    for (vector&lt;int&gt;::iterator it = v.begin(); it != v.end(); it ++)
    {
        cout << *it  << " ";
    }
    cout << endl;
}
//vector容器构造
void tets01()
{
    vector&lt;int&gt; v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    printVector(v1);

    vector&lt;int&gt; v2(v1.begin(), v1.end());
    printVector(v2);

    //n个elem方式构造
    vector&lt;int&gt;v3(10, 100);
    printVector(v3);

    //拷贝
    vector&lt;int&gt;v4(v3);
    printVector(v4);
}

int main()
{
    tets01();
    return 0;
}
```

- 迭代器方法来遍历vector数组
```cpp
for (vector&lt;int&gt;::iterator it = v.begin(); it != v.end(); it ++)
{
    cout << *it  << " ";
}
```
# vector容器赋值操作
- 直接等号赋值
- assign进行范围赋值
- n个元素

```cpp

#include &lt;iostream&gt;
#include &lt;vector&gt;
using namespace std;

void PrintVector(vector&lt;int&gt; & v)
{
    for (vector&lt;int&gt;::iterator it = v.begin(); it != v.end(); it ++)
    {
        cout << *it << " ";
    }
    cout << endl;
}
void test01()
{
    vector&lt;int&gt; v1;
    for (int i = 0; i < 10; i++)
    {
        v1.push_back(i);
    }
    PrintVector(v1);
	
    //赋值
    vector&lt;int&gt; v2;
    v2 = v1;
    PrintVector(v2);

    //assign前闭后开
    vector&lt;int&gt; v3;
    v3.assign(v1.begin(), v1.end());
    PrintVector(v1);


    //n个elem
    vector&lt;int&gt; v4;
    v4.assign(10, 100);
    PrintVector(v4);
}

int main()
{
    test01();
    return 0;
}
```

# vector容器数据存取


# vector容器互换，用swap来收缩内存

# vectoro容器预留空间



