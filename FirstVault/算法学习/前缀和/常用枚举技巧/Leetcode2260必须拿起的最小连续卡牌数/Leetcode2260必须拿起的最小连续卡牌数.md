# 题目链接
[Leetcode2260必须拿起的最小连续卡牌数](https://leetcode.cn/problems/minimum-consecutive-cards-to-pick-up/description/)

# 题目分析

- 要求的是符合条件的最短长度数组， 那么哈希表要记住的就是该数字第一次出现的下标
- 当再次遇到这个数字的时候，可以马上从哈希表中拿到它第一次出现的下标
- 由于索引从0开始，长度为当前下标 - 第一次下标 + 1, 这样一来每次遇到i匹配的，就更新一次长度，如果比上一次短，那么这次就是最优，否则保持上一次


```cpp
class Solution
{
public:
    int minimumCardPickup(vector<int>& cards)
    {
        unordered_map<int, int> mp;
        int n = cards.size();
        int ans = 1e9;
        for (int i = 0; i < n ; i++)
        {
            if (mp.find(cards[i]) != mp.end())
            {
                ans = min(ans, i - mp[cards[i]] + 1);
            }
            mp[cards[i]] = i;
        }
        return ans == 1e9 ? -1 : ans;
    }
};

```

