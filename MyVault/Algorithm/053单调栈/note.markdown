

# 单调栈笔记







# **Leetcode 84 - 柱状图中最大的矩形**

## 1. 题意 & 本质

给一个柱状图，每根柱子宽度都是 1。

要找：

> **能形成的最大矩形面积**

示例：

```
heights = [2,1,5,6,2,3]
最大面积 = 10
```

其实就是：

> 对于每根柱子 i，把它作为矩形高度，往左右扩展，找到它能延伸的最宽区间，然后更新面积。

关键：
**找每个柱子左边第一个更低的、右边第一个更低的。**
这正是单调栈最擅长的事情。

---

# 2. 单调栈的核心思想（为什么一定是递增栈？）

我们要找“左边第一个更低，右边第一个更低”，所以要维护：

> **单调递增栈（存下标，栈里高度严格递增）**

当我们遇到一个更矮的柱子时：

```
当前值 < 栈顶值 → 栈顶柱子右边第一个更小值出现
```

---

# 3. **单调栈 push/pop 动态过程图（超关键）**

以示例：`[2,1,5,6,2,3]` 为例
下图展示 **push 的过程** 和 **何时弹栈计算面积**：
我们维护一个严格大压小的单调栈，知道遇到更矮的柱子时弹栈。

```
i=0, h=2:
stack: [2]入栈

i=1, h=1:
1 < 2    → 弹 2并计算面积(1高的柱子的不能参与高为2的矩形计算)
stack: []
push 1
stack: [1]

i=2, h=5:
stack: [1,5]

i=3, h=6:
stack: [1,5,6]

i=4, h=2:
2 < 6 → 弹 6 并计算面积
2 < 5 → 弹 5 并计算面积
2 >= 1 → 停
stack: [1,2]

i=5, h=3:
push → [1,2,3]

最后统一弹栈处理
```

为什么遇到更矮的柱子要弹？

因为此时，这个柱子比当前我们选定的小，最多就扩大到这里了

于是我们可以弹出栈顶，直接计算它的最大矩形。
![alt text](image-![img](https://img2024.cnblogs.com/blog/3730964/202511/3730964-20251120205422428-1304021471.png)![img](https://img2024.cnblogs.com/blog/3730964/202511/3730964-20251120205439937-1720574930.png)1.png)

比如这里的五 ,要找高度为5的矩形的面积左边遇到一个1,往左边走不了了，右边遇到二走不了了，2不够高


---

当 cur 被弹出：

* **右边界 = 当前 i**（因为 h[i] < h[cur]）
* **左边界 = 弹出后栈顶**
* 如果栈空，则左边界为 `-1`

面积计算公式：

```
height = heights[cur]
width  = right - left - 1
```
![img](https://img2024.cnblogs.com/blog/3730964/202511/3730964-20251120205402549-1949252421.png)


---

- Java 代码

```java
class Solution {
    private static final int MAXN = 100009;
    private static int[] stack = new int[MAXN];
    private static int r;

    public int largestRectangleArea(int[] h) {
        int n = heights.length;
        r = 0;
        int ans = 0;

        for (int i = 0; i < n; i++) {
            while (r > 0 && h[stack[r - 1]] >= h[i]) {
                int cur = stack[--r];
                int left = r > 0 ? stack[r - 1] : -1;
                ans = Math.max(ans, (i - left - 1) * h[cur]);
            }
            stack[r++] = i;
        }

        while (r > 0) {
            int cur = stack[--r];
            int left = r > 0 ? stack[r - 1] : -1;
            ans = Math.max(ans, (n - left - 1) * heights[cur]);
        }

        return ans;
    }
}
```

---

># 7. 易错点总结
>
>###  为什么最后需要“扫尾”？
>
>此时栈中的元素右都没有出栈意味着右边没有比它们小的了，以他们为高的矩形可以从它们的左边界延续到数组的最右端 
>
>###  为什么 left 是弹栈后的栈顶？
>
>因为栈是严格大压小的 → 栈顶就是“左边第一个比当前小的”。
>
>### 为什么 width 要 `right - left - 1`？
>
>左右边界都不能包含自己（它们是“更小高度”的柱子）。
>
>### 为什么用 `>=` 而不是 `>`？
>这个问题就是数组有相同元素时候怎么办，答案是我们遇到相同的时候也弹出，为啥呢？
>第一个元素已经找到正确的左边界了，下次再遇到相同元素，由于单调栈严格打压小，还是能找到左边界，
>但是第一个可不能找到正确的右边界，所以我们以同个元素最后一次出现的那个时候找出的左右为准，答案也是对的
>
>
>### 为什么左边界可能是 -1？
>
>表示左边没有更小的柱子，可直接延伸到最左端。

---


# 最大矩形 

与 **Leetcode 84 - 柱状图中最大的矩形** 思路一致

多了一步对二维数组的处理：
```java
for (int i = 0 ; i < n; i ++) { 
    for (int j = 0; j < m; j ++) { 
        height[j] = grid[i][j] == '0' ? 0 : (height[j] + 1);
    } 
    ans = Math.max(ans, compute(height));
}
```
因为以不同行为底，是不同的矩形，都要算一遍，遇到0就要终止，因为这一列的1不连续了。


```java
class Solution {
    private static final int MAXN = 2000;
    private static int[] stack = new int[MAXN];
    private static int r;
    private static int n, m;
    public int maximalRectangle(char[][] grid) {
        n = grid.length;
        m = grid[0].length;

        int ans = Integer.MIN_VALUE;
        int[] height = new int[m];
        Arrays.fill(height, 0);

        for (int i = 0 ; i < n; i ++) { 
            for (int j = 0; j < m; j ++) { 
                height[j] = grid[i][j] == '0' ? 0 : (height[j] + 1);
            } 
            ans = Math.max(ans, compute(height));
        }
        return ans;
    }
    private static int compute(int[] height) { 
        r = 0;
        int ans = Integer.MIN_VALUE;
        for (int i = 0; i < m; i ++) { 
            while (r > 0 && height[stack[r - 1]] >= height[i]) { 
                int cur = stack[-- r];
                int left = r > 0 ? stack[r - 1] : -1;
                ans = Math.max(ans, (i - left - 1) * height[cur]);
            }
            stack[r ++] = i;
        }
        while (r > 0) { 
            int cur = stack[-- r];
            int left = r > 0 ? stack[r - 1] : -1;
            ans = Math.max(ans, (m - left - 1) * height[cur]);
        }
        return ans;
    }
}
```