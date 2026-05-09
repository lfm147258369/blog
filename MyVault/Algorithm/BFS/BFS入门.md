# 前置知识
## queue容器

## pair对



# [洛谷走出中山路](https://www.luogu.com.cn/problem/P1746)


## 代码梳理
1. **处理输入**
	```cpp
int main()
{
    ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        string s;
        cin >> s;
        for (int j = 1; j <= n; j++)
        {
            g[i][j] = s[j - 1] - '0';
        }
    }
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    cout << bfs(x1, y1, x2, y2);
    return 0;
}
```


2. **枚举四个方向**
	```cpp
while (q.size())
    {
        auto t = q.front();
        q.pop();
        for (int i = 0; i < 4; i++)
        {
            int a = t.first + dx[i];
            int b = t.second + dy[i];
            if (a < 1 || a > n || b < 1 || b > n)
                continue;
            if (g[a][b] != 0 || dist[a][b] != -1)
                continue;
            dist[a][b] = dist[t.first][t.second] + 1;
            if (a == x2 && b == y2)
                return dist[x2][y2];
            q.push({a, b});
        }
    }
    return dist[x2][y2];
```

3.**边界和预处理**
```cpp
if (g[x1][y1] != 0 || g[x2][y2] != 0)
        return -1;
    q.push({x1, y1});
    memset(dist, -1, sizeof (dist));
    dist[x1][y1] = 0;
```

**完整代码**
```cpp
#include <bits/stdc++.h>

using namespace std;

typedef pair<int, int> PII;
queue&lt;PII&gt; q;

const int N = 1001;
int n; // 迷宫的长和宽
int g[N][N];
int dist[N][N];

int dx[] = {-1, 0, 1, 0};
int dy[] = {0, 1, 0, -1};

int bfs(int x1, int y1, int x2, int y2)
{
    if (g[x1][y1] != 0 || g[x2][y2] != 0)//易错点
        return -1;
    q.push({x1, y1});
    memset(dist, -1, sizeof (dist));
    dist[x1][y1] = 0;

    while (q.size())
    {
        auto t = q.front();
        q.pop();
        for (int i = 0; i < 4; i++)
        {
            int a = t.first + dx[i];
            int b = t.second + dy[i];

            if (a < 1 || a > n || b < 1 || b > n)//易错点
                continue;
            if (g[a][b] != 0 || dist[a][b] != -1)
                continue;
            dist[a][b] = dist[t.first][t.second] + 1;

            if (a == x2 && b == y2)
                return dist[x2][y2];

            q.push({a, b});//易错点
        }
    }
    return dist[x2][y2];
}
int main()
{
    ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        string s;
        cin >> s;
        for (int j = 1; j <= n; j++)
        {
            g[i][j] = s[j - 1] - '0';
        }
    }
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    cout << bfs(x1, y1, x2, y2);
    return 0;
}
```
## 队列模拟
#### 输入数据
```
3
001
101
100
1 1 3 3
```

  

#### 步骤分析

##### 1. 初始化 

- 读取地图大小 n=3。
- 读取地图信息：

  



```
g[1][1] = 0, g[1][2] = 0, g[1][3] = 1
g[2][1] = 1, g[2][2] = 0, g[2][3] = 1
g[3][1] = 1, g[3][2] = 0, g[3][3] = 0
```

  

- 读取起点 (x1​,y1​)=(1,1) 和终点 (x2​,y2​)=(3,3)。
- 初始化距离数组 `dist` 为 -1，表示所有节点未被访问。
- 将起点 (1,1) 加入队列 `q`，并将 `dist[1][1]` 设为 0。

  

此时队列 `q` 为：`[(1, 1)]`

##### 2. 第一次 BFS 循环

  

- 取出队列头部元素 `(1, 1)`。
- 遍历其四个相邻节点：
    - 向上：`(0, 1)`，越界，跳过。
    - 向右：`(1, 2)`，在地图内且可通行（`g[1][2] = 0`）且未被访问（`dist[1][2] = -1`），更新 `dist[1][2] = dist[1][1] + 1 = 1`，将 `(1, 2)` 加入队列。
    - 向下：`(2, 1)`，`g[2][1] = 1` 为店铺，不可通行，跳过。
    - 向左：`(1, 0)`，越界，跳过。

  

此时队列 `q` 为：`[(1, 2)]`

##### 3. 第二次 BFS 循环

  

- 取出队列头部元素 `(1, 2)`。
- 遍历其四个相邻节点：
    - 向上：`(0, 2)`，越界，跳过。
    - 向右：`(1, 3)`，`g[1][3] = 1` 为店铺，不可通行，跳过。
    - 向下：`(2, 2)`，在地图内且可通行（`g[2][2] = 0`）且未被访问（`dist[2][2] = -1`），更新 `dist[2][2] = dist[1][2] + 1 = 2`，将 `(2, 2)` 加入队列。
    - 向左：`(1, 1)`，已被访问（`dist[1][1] != -1`），跳过。

  

此时队列 `q` 为：`[(2, 2)]`

##### 4. 第三次 BFS 循环

  

- 取出队列头部元素 `(2, 2)`。
- 遍历其四个相邻节点：
    - 向上：`(1, 2)`，已被访问（`dist[1][2] != -1`），跳过。
    - 向右：`(2, 3)`，`g[2][3] = 1` 为店铺，不可通行，跳过。
    - 向下：`(3, 2)`，在地图内且可通行（`g[3][2] = 0`）且未被访问（`dist[3][2] = -1`），更新 `dist[3][2] = dist[2][2] + 1 = 3`，将 `(3, 2)` 加入队列。
    - 向左：`(2, 1)`，`g[2][1] = 1` 为店铺，不可通行，跳过。

  

此时队列 `q` 为：`[(3, 2)]`

##### 5. 第四次 BFS 循环

  

- 取出队列头部元素 `(3, 2)`。
- 遍历其四个相邻节点：
    - 向上：`(2, 2)`，已被访问（`dist[2][2] != -1`），跳过。
    - 向右：`(3, 3)`，在地图内且可通行（`g[3][3] = 0`）且未被访问（`dist[3][3] = -1`），更新 `dist[3][3] = dist[3][2] + 1 = 4`，到达终点，返回 `dist[3][3] = 4`。

### 总结

  

使用队列是因为 BFS 算法需要按照层次顺序遍历节点，队列的先进先出特性保证了每次取出的节点都是距离起点最近的未访问节点，从而能够找到最短路径。在这个例子中，通过队列依次处理节点，最终找到了从起点 `(1, 1)` 到终点 `(3, 3)` 的最短路径长度为 4。


## 为什么用队列

广度优先搜索（BFS）是一种用于遍历或搜索树或图的算法。在 BFS 中，队列用于存储待访问的节点。它遵循先进先出（FIFO）的原则，保证了搜索是按照层次进行的，即先访问距离起点最近的节点，再依次访问距离更远的节点。这使得 BFS 能够在无权图中找到最短路径。