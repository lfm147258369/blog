import './crypto-polyfill.mjs'           // 必须在 markdownItMathjax3 之前加载
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import markdownItMathjax3 from 'markdown-it-mathjax3'
import { set_sidebar } from "./utils/auto-sidebar.mjs";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "学习笔记",
    description: "记录学习历程",
    ignoreDeadLinks: true,
    markdown: {
      config: (md) => {
        md.use(markdownItMathjax3, {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']]
          }
        })
      }
    },
    mermaid: {
      // mermaid 全局配置（可选）
    },
    themeConfig: {   // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { 
        text: '期末合集', 
        items: [
          { text: '专业课复习', link: '/MyVault/期末' },
          { text: '思政课复习', link: '/MyVault/期末/思政' },
        ]
      },
      {
        text: '实验合集',
        items: [
          { text: '程序设计实验', link: '/MyVault/Lab' },
        ],
      },
    ],
    outline: {
      level: [1, 2],
    },
    aside: "left",
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lfm147258369' },
      { icon: 'gitee', link: 'https://gitee.com/lfm147258369' },
    ],
    footer: {
      copyright: "Copyright © 2026 lfmBlogs",
    }
  }
})
)
