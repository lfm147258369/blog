// Vercel Node 环境缺少浏览器 crypto.getRandomValues
// 此模块必须在所有依赖 mathjax-full 的 import 之前加载
import { webcrypto } from 'node:crypto'

if (!globalThis.crypto) {
  globalThis.crypto = webcrypto
}
