
- 与这题同一思路，方法，模板
[[Leetcode2342数位和相等数对的最大和]]


```cpp
class Solution  
{  
public:  
    int Solve(int n)  
    {  
        int max_num = 0;  
        while (n)  
        {  
            int tmp = n % 10;  
            max_num = max(max_num, tmp);  
            n /= 10;  
        }  
        return max_num;  
    }  
    int maxSum(vector&lt;int&gt;& nums)  
    {  
        int ans = 0;  
        unordered_map<int, int> mp;  
        for (auto & num : nums)  
        {  
            int tmp = Solve(num);  
            if (mp.find(tmp) != mp.end())  
            {  
                ans = max(ans, num + mp[tmp]);  
            }  
            mp[tmp] = max(mp[tmp], num);  
        }  
        return ans == 0 ? -1 : ans;  
    }  
};
```


