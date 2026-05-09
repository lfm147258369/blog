---
date: 2025-04-04
tags:
  - 枚举右维护左
  - 基础算法
---
# 题目链接、
好数对数目
[Leetcode1512](https://leetcode.cn/problems/number-of-good-pairs/)

- 双重循环暴力做法

```cpp
class Solution
{
public:
    int numIdenticalPairs(vector&lt;int&gt;& nums)
    {
         //暴力
        int ans = 0;
        int n = nums.size();
        for (int i  = 0; i < n; i++ )
        {
            for (int j = i + 1 ; j < n; j++)
            {
                if (nums[i] == nums[j] && j > i)
                {
                    ans++;
                }
            }
        }
        return ans;
    }
};
```

- 复杂度为O(N2)


- 那么我们利用枚举右维护左的思想。将左边出现的次数存入哈希表中。
-  当我们在右边遇到相同的数字时，看左边它出现的次数，那么这是它此时好数对的数量。

```cpp
class Solution
{
public:
    int numIdenticalPairs(vector&lt;int&gt;& nums)
    {
        int ans = 0;
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++)
        {
            ans += mp[nums[i]]++;
        }
        return ans;
    }
    
};
```




