```cpp
class Solution
{
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k)
    {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++)
        {
            if (mp.find(nums[i]) != mp.end())
            {
                if (abs(i - mp[nums[i]] )  <= k)
                {
                    return true;
                }
            }
            mp[nums[i]] = i;
        }
        return false;
    }
};

```

- 就是把左边出现过的数字的下标记下来，再次遇到直接从a哈希表里面掉出来进行相减取绝对值，查看是否符合条件即可。