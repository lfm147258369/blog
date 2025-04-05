# 题目链接

[Leetcode2342数位和相等数对的最大](https://leetcode.cn/problems/max-sum-of-a-pair-with-equal-sum-of-digits/)

```cpp
class Solution
{
public:
    int Solve(int n)
    {
        int sum = 0;
        while (n)
        {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }
    int maximumSum(vector<int>& nums)
    {
        int ans = 0;
        unordered_map<int, int> cnt;
        for (int i = 0 ; i < nums.size(); i++)
        {
            int tmp = Solve(nums[i]);
            if (cnt.find(tmp) != cnt.end())
            {
                ans = max(ans, cnt[tmp] + tmp);
            }
            cnt[tmp] = max(cnt[tmp], nums[i]);
        }
        return ans;
    }
};


```
- 细节
```cpp
cnt[tmp] = max(cnt[tmp], nums[i]);
```

这里是因为我们要始终拿左边做大的符合条件的来进行匹配，这样更新的答案才能保证最大
