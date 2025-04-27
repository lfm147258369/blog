```cpp
class Solution
{
public:
    // int dfs(int target, vector<int> & nums, vector<int> &mem)
    // {
    //     if (target == 0)
    //     {
    //         return 1;
    //     }
    //     if (mem[target] != -1){
    //         return mem[target];
    //     }
    //     int ans = 0;
    //     for (int i = 0; i < nums.size(); i++)
    //     {
    //         if (target >= nums[i])
    //             ans += dfs(target - nums[i], nums, mem);
    //     }
    //     return mem[target]  = ans;
    // }
    int combinationSum4(vector<int>& nums, int target)
    {
        // vector<int> mem(target + 1, -1);
        vector<size_t> dp(target + 1, 0);
        dp[0]  = 1;
        for (int i = 1; i <= target; i++)
        { 
            for (int j = 0; j < nums.size(); j++)
            { 
                if (i >= nums[j])
                    dp[i] += dp[i - nums[j]];
            }
        }
        return dp[target];
    }
};
```

- 由上到下的思路：
  4 -> 由 1 2  3组成，那么我们知道一个合法的组合由1 2 3组成和为4,那么反过来思考由4 减去这个组合的元素是不是刚好为0？
  
  于是。我们就可以根据这个思路写出这样的递归：

```cpp
    int dfs(int target, vector<int> & nums, vector<int> &mem)
    {
        if (target == 0)
        {
            return 1;
        }
        if (mem[target] != -1){
            return mem[target];
        }
        int ans = 0;
        for (int i = 0; i < nums.size(); i++)
        {
            if (target >= nums[i])
                ans += dfs(target - nums[i], nums, mem);
        }
        return mem[target]  = ans;
    }
```

- 观察这个递归，将它转化为递推，就需要抓住这个关键：
```cpp
        for (int i = 0; i < nums.size(); i++)
        {
            if (target >= nums[i])
                ans += dfs(target - nums[i], nums, mem);
        }
        return mem[target]  = ans;
```

- mem数组记住了每个子问题的组合数，比如target是4, 那么他会不断分解为求`3 2 1`这些数字的组合，那么子问题的总和就是总问题的答案

为了节省开支，我们省去递归中的往下递的步骤，直接从归开始，从4慢慢分解为3，又由3分解直到0, 那我们干脆从底部开始往上面推就可以，我们用一个dp数组来代表子问题的状态，
- 那么我们就要从1推到target，用变量i来计数。每次加上 `dp[i - nums[j]]`

```cpp
        for (int i = 1; i <= target; i++)
        { 
            for (int j = 0; j < nums.size(); j++)
            { 
                if (i >= nums[j])
                    dp[i] += dp[i - nums[j]];
            }
        }
```

- 这里注意，在递归的时候，我们遇到0返回1,这个反映射到题目中就是target为0这个组合本身就有一种方法组成，就是什么都不拿，所以`dp[0]` 要初始化为1。


