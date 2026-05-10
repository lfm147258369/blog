import { defineConfig } from 'vitepress'
import { set_sidebar } from "./utils/auto-sidebar.mjs";	// 改成自己的路径

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "学习笔记",
  description: "记录学习历程",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { 
        text: '期末合集', 
        items: [
          { text: '专业课复习', link: '/MyVault/期末' },
        ]
      }
    ],

    sidebar: {
      "/MyVault/期末": set_sidebar("/MyVault/期末"),
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
