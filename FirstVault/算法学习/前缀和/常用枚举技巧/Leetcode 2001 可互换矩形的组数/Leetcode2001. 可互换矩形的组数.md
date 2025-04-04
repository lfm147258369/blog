# 题目链接

[Leetcode2001. 可互换矩形的组数](https://leetcode.cn/problems/number-of-pairs-of-interchangeable-rectangles/description/)


```cpp
class Solution 
{
public:
    unordered_map<double, int> mp;
    long long interchangeableRectangles(vector<vector<int>>& rectangles) 
    {
        long long ans = 0;
        for (auto & t: rectangles)
        {
            int first = t[0];
            int second = t[1];
            double tmp = (double)first / second;
            ans += mp[tmp]++;
        }
        return ans;
    }
};
```
- 精度不够导致答案错误

 - 如果两个1e5相加 ， 导致超出了int的范围， floatg精度表示不了