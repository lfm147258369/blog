# 思路

- 考虑三个问题
-  当前操作是什么？
- 将数组中元素放入临时数组
- 怎么分支？有几个？
- 两个分枝，把当前元素改为相反数，另一种是不把当前元素改为相反数
- 当层数到了数组的长度的时候检查当前临时数组里面的组合的和，是否等于目标和，等于的话答案增加，不等于则不增加

- 写法一：超时未剪枝版本
```cpp
class Solution
{
public:
    int n;
    int ans = 0;
    vector<int> tmp;
    void dfs(int x, vector<int> & nums, int & target)
    {
        if (x == n)
        {
            // for (auto & s : tmp)
            // {
            //     cout << s << " " ;
            // }
            // cout << "\n";
            int sum = 0;
            for (auto & t : tmp)
            {
                sum += t;
            }
            if (sum == target)
            {
                ans++;
            }
            return;
        }

        //不改
        tmp[x] = nums[x];
        dfs(x + 1, nums, target);


        //改
        tmp[x] = -tmp[x];
        dfs(x + 1, nums, target);

    }
    int findTargetSumWays(vector<int>& nums, int target)
    {
        n = nums.size();
        tmp.resize(n);
        dfs(0, nums, target);
        return ans;
    }
};

```



- 这个暴力勉强能过
```cpp
class Solution

{

public:

	int n;

	int ans = 0;

	int t;

void dfs(int x, vector<int>& nums, int now_Sum)

{

	if (x == n)
	{
		if (now_Sum == t)
		{
			ans++;
		}
	}
	return ;
	dfs(x + 1, nums, now_Sum + nums[x] );
	dfs(x + 1, nums, now_Sum - nums[x] );

}

int findTargetSumWays(vector<int>& nums, int target)

{
	n = nums.size();
	
	t = target;
	
	dfs(0 , nums, 0);
	
	return ans;
}
```
- 如此一来，我们考虑剪枝
- 到底是哪里导致了重复计算呢？哪里可以优化？
- 拿第一个样例来看， 1 1 1 1 1来看，改和不改的话就有32种组合，其中只有五种是符合要求的，怎么剪枝才能让枚举的组合尽可能少呢？