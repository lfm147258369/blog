
# [316. 去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters/description/)


- 题意：给定一个字符串，删除其中重复的字母，使得剩下的字符串由最小的字典序排列。

要求：每种字母保留一个

- 思路：
如果我们维护一个严格大压小的单调栈,那么这个栈从栈底部到栈顶部构成的字符串一定是字典序最小的。

- 为什么？

因为我们每一次处理一个字母，都要看它是否大于栈顶的字母，如果大于，说明栈顶的字母可以被弹出，因为它后面都不可能再出现在栈顶的字母的右侧。




- 如何维护单调栈？
1. 先看这个字母是否入过栈，如果入过了，就跳过它 
怎么看它有没有过呢？用一个标记数组来解决
2. 如果当前字母的字典序是小于栈顶的字母，那么我们就把栈顶弹出

然后思考，就这样弹出会有问题吗？ 会！

题目要求我们每种字符保留一种，如果它恰好是这种字母的独苗呢？是不是就不能弹出了？

- 如何解决？
我们用一张表来记录每种字母出现的次数，每一次处理它，不管有没有弹出，我们都要把它的词频减一。

如果词频为0，说明这个字母已经被弹出了，我们就不能再弹出它。


- 代码
```java
class Solution {
    private static final int maxn = 26;// 26个字母，所以数组大小为26    
    private static char[] stack = new char[maxn];
    private static int[] cnts = new int[maxn];
    private static boolean[] enter = new boolean[maxn];
    private static int r;
    public String removeDuplicateLetters(String s) {
        char[] cha = s.toCharArray();// 字符串转字符数组，方便处理
        r = 0;
        Arrays.fill(cnts, 0);//初始化词频数组
        Arrays.fill(enter, false);
        for (char cur : cha) { 
            cnts[cur - 'a']++;//统计词频
        }
        for (char cur : cha) { 
            if (!enter[cur - 'a']) { 
                while (r > 0 && stack[r - 1] > cur && cnts[stack[r - 1] - 'a'] > 0) { 

                    enter[stack[r - 1] - 'a'] = false;// 这里它出栈了，就要改变标记，代表它没有入过栈
                    r--;// 弹出栈顶 
                }
                stack[r++] = cur;
                enter[cur - 'a'] = true;
            }
            cnts[cur - 'a']--;//不管是否弹出， 走过了它，它的词频减一

        }
        return String.valueOf(stack, 0, r);// char数组转字符串

    }
}
```





