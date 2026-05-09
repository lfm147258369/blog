# 题目链接
[Leetcode121买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/)

- 本质就是找最大的差值， 那么要被减数尽可能的大减数尽可能小
- 被减数在右边，减数在 左边， 根据枚举右维护左的思想，我们不断枚举右边的数，左边用min来维护最小的减数，ans用max来维护即可

```cpp
class Solution 
{
public:
    int maxProfit(vector&lt;int&gt;& prices) 
    {
        int minP = prices[0];
        int ans = 0;
        for (auto & t : prices)
        { 
            ans = max(ans, t  - minP);
            minP = min(minP, t);
        }
        return ans;
    }
};
```


