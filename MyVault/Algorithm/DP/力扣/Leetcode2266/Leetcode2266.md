# [Leetcode2266](https://leetcode.cn/problems/count-number-of-texts/description/)


# 递归的思路
- 先看画图的思路：
  

- 我们要进行的组合，本质就是对字符串进行分割。
- 比如22233.我们先对`222`进行组合，再对`33`进行组合，最后两者想乘即可
- 这和一般的组合不同的是，我们要确定不能存在`23`这样`跨界`的组合。2只能在`222`中进行组合，同理3也是。
- 所以要加上判断条件。
```java
class Solution {
    static final int mod = 1_000_000_007; 
    int n;
    char[] p;
    //2 ~ 9
    int []res = {3, 3, 3, 3, 3, 4, 3, 4};
    int ans = 0;
    int [] mem;
    private int dfs(int step){ 
        if (step == n){ 
            return 1;
        }
        if (mem[step] != 0){ 
            return mem[step];
        }
        int index = p[step] - '2';

        for (int j = 0; j < res[index]; j++){ 
            if (step + j >= n || p[step + j] != p[step]){ 
                break;
            }
            ans = (ans + dfs(step + 1 + j) ) % mod;
        }
        return mem[step] = ans;
    }
    public int countTexts(String pressedKeys) {
        n = pressedKeys.length();
        p = pressedKeys.toCharArray();
        mem = new int[n + 1];
        return dfs(0);
    }
}
```

- 这里采用一个数组`res`来存每个号码能按的次数。


- 要注意
- 我们是要比较当前step，也就是当前走到的字符与跳过i步之后的字符是否相等，如果写成`p[step] != p[step + 1]` 就变成了当前与跳过1步的字符是否相等，因为我们做的是一个分割的过程，不可能每次只跳一步
```java
        for (int j = 0; j < res[index]; j++){ 
            if (step + j >= n || p[step + j] != p[step]){ 
                break;
            }
            ans = (ans + dfs(step + 1 + j) ) % mod;
        }
```

- 还有一个细节就是` ans = (ans + dfs(step + 1 + j) ) % mod;` 
- 比如`22233` ，我们切割了`22`, 然后下一次我们是从下标多少开始呢？
- 当然是下标为2的地方，所以当前`step`为0, 加了j = 1,拿了`22`做一个组合，还要再加1跳到下一位，进行下一次的分割。

观察我们画的递归图，每个分支的答案可以存在数组中，减少无效递归。

# 动态规划-递推的思路
- 参考的是灵神的题解。

- 这道题本质就是爬楼梯的变种，我们依旧拿`22233`来举例子。
- `22233`的长度是5,我们爬楼梯的方式有一次走`1 2 3`步，三种情况。
- 从上面的分析我们知道`222` 与`33` 是要分开做加法再做乘法的，所以我们就先给`222`进行分析，长度为3,每次可以走`1 2 3`步问有多少种组合可以走到第三层？这样问题就转化为了爬楼梯的样子。

- 那么我们就要先初始化递推的数组
一个按键可以选择按0 ~ 3/4次
那么就可以这样来初始化：

```java
    void init(){ 
        if (done){ 
            return ;
        }
        done = true;
        dp_3[0] = dp_4[0] = 1;//1个按键都不按就是按了0次，算一种情况
        dp_3[1] = dp_4[1] = 1;
        dp_3[2] = dp_4[2] = 2;
        dp_3[3] = dp_4[3] = 4;
        for (int i = 4; i < MX; i++){ 
            dp_3[i] = (dp_3[i - 1] + dp_3[i - 2] + dp_3[i - 3]) % mod;
            dp_4[i] = (dp_4[i - 1] + dp_4[i - 2] + dp_4[i - 3] + dp_4[i - 4]) % mod;

        }

    }
```
- 这里还涉及到java语言的一个知识点。如果没有
```java
        if (done){ 
            return ;
        }
```

的话，init函数会调用多次，init函数只需要在类创建的那次初始化就可以了，后面直接用就行，不需要多次的初始化。

- 再来看递推的部分

```java

    public int countTexts(String pressedKeys) {
        n = pressedKeys.length();
        s = pressedKeys.toCharArray();
        init();
        int cnt = 0;
        long ans = 1;
        for (int i = 0; i < s.length; i++){ 
            char c = s[i];
            cnt ++;
            if (i == s.length - 1 || c != s[i + 1]){ 
                ans = ans * (c != '7' && c != '9' ? dp_3[cnt] : dp_4[cnt]) % mod; 
                cnt = 0;
            }
        }
        return (int)ans;
    }

```
- 这里灵神用了一个优雅的写法解决了越界问题，和防止组合`“越界”` 的问题
```java
if (i == s.length - 1 || c != s[i + 1])
```
- 先判断当前是不是到了字符串的末尾，如果是末尾了，再往下递推会越界，然后再判断是不是同一组按键里面的。这样先判断越界再判断组合的合法性。只不过我很容易写反导致越界。
  
  