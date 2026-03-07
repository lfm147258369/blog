# Class055 下

## [和至少为k的最短子数组]( https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/)


```java
class Solution {
    private static  int MAXN = 100009;
    private static long[] sum = new long[MAXN];
    private static int[] deque = new int[MAXN];
    private static int t, h;
    public int shortestSubarray(int[] arr, int k) {
        t = h = 0;
        int n  = arr.length;
        for (int i = 0; i < n; i ++) { 
            sum[i + 1] = sum[i] + arr[i];
        } 
        int ans = Integer.MAX_VALUE;
        for (int i = 0; i <= n; i++) { 
            while (h != t && sum[i] - sum[deque[h]] >= k) { 
                ans = Math.min(ans, i - deque[h++]);
            }

            while (h != t && sum[deque[t - 1]] >= sum[i]) { 
                t--;
            }
            deque[t ++] = i;
        } 
        return ans == Integer.MAX_VALUE ? -1 : ans;
    }
}
```

例子理解:
```
[5, 4, 3, -4, 6, 3, 7]
[0, 1, 2,  3, 4, 5, 6] -- 下标
k = 10
```
前缀和数组
```
[0, 5, 9, 12, 8, 14, 17, 24]
[0, 1, 2, 3, 4, 5, 6,  7]
```


队列: 小到大 ,存的是下标
```
0
-----
0  
-----
```
看是否满足 >= k
```
0 - 0 = 0
```
下一个进来
```
0 5
---
0 1
---
```
当满足条件时:
```
0 5 9 12
------------
0 1 2 3
------------
```


```
12 - 0 >= 10
```
把0下标出队,为什么出队,因为后面来的都是大的,肯定满足减去开头的0>=k,此时不会再出现以0为头,当前元素为尾的最短的子数组了
```
12 5 9
-------
12 1 2
-------
```





