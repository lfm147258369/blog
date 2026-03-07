# 题目链接
[Leetcode1679. K 和数对的最大数目](https://leetcode.cn/problems/max-number-of-k-sum-pairs/)


# 分析题目

- 由于每一次操作要把之前选中的组合排除。所以不能单纯匹配到合适组合就对答案++，这会导致答案多数了。
- 所以考虑到这点就要对map中的元素进行移除，如果已经存在，而且它的数量不为0,说明之前它要被拿出来进行匹配。
- 匹配完了，为了防止重复，就要对它进行--。

```cpp
class Solution
{
public:
    int maxOperations(vector<int>& nums, int k)
    {
        int ans = 0;
        int n = nums.size();
        unordered_map<int, int> mp;
        for (int i = 0; i < n; i++)
        {
            if (mp.find(k - nums[i]) != mp.end() &&
                mp[k - nums[i]] != 0)
            {
                mp[k - nums[i]]--;
                ans++;
            }
            else
            {
                mp[nums[i]]++;
            }
        }
        return ans;
    }
};

```


