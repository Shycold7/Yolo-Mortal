<div align="center">

<img src="src/assets/zlion.jpg" width="128" alt="ZLION" style="border-radius:50%" />

# YOLO MORTAL

**展示创意、技术与未来的数字空间**

*You Only Live Once.*

[![在线预览](https://img.shields.io/badge/在线预览-iamzlion-00f2ff?style=flat-square)](https://35311908677.github.io/iamzlion/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![three.js](https://img.shields.io/badge/three.js-0.183-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)

</div>

---

## 简介

**iamzlion** 是 ZLION（周磊）的个人作品集网站 —— 一个极简暗色科技风、以高对比霓虹发光与沉浸式交互为核心的数字空间。

网站用单页分区滚动 + 转场动画的方式组织内容，把「关于」「奋斗」「梦想」「作品」「想象」拆成五个可独立切换的章节；同时把 Canvas 粒子、WebGL 着色器、实时音频与 AI 对话揉进同一个页面，让浏览本身成为一种体验。

- 🌐 在线站点：<https://35311908677.github.io/iamzlion/>
- ✍️ 个人博客：<https://jsxy0.pages.dev/>
- 🛰️ 社区「预见未来 / See The Future」：<https://yjwl.netlify.app>

> 关于作者：2006 年生于中国，Yolomortal 创始人，Seethefuture（预见未来社区）CEO。

---

## 核心特性

### 沉浸式视觉特效

| 组件 | 技术 | 说明 |
| --- | --- | --- |
| `MatrixBackground` | Canvas 2D | 全屏数字雨，字符集由片假名 + 拉丁字母 + 数字混合，按列独立下落 |
| `DisplacementEffect` | three.js / GLSL | 全屏平面 + Simplex 噪声着色器，鼠标靠近处产生流体位移扭曲，带缓动跟随 |
| `EnergyTrail` | Canvas 2D | 光标移动时生成带速度与角度信息的粒子，形成不规则多边形的能量拖尾 |
| `VoidCrack` | SVG + motion | 标题悬停时在鼠标位置生成随机折线「虚空裂纹」，自动衰减消散 |

### 五大内容板块

- **ABOUT** — 头像区、由 `import.meta.glob` 自动扫描生成的照片墙、B 站灵感视频收藏（点击后才加载 iframe，避免首屏开销）
- **STRIVE** — 奋斗哲学独白、近期文章卡片、个人博客入口
- **DREAM** — VISION / FUTURE / IMPACT 三张愿景卡，以及生成式 AI、Web3、空间计算、神经接口等 8 个前沿科技方向
- **WORK** — 作品按 `ALL / IMAGES / VIDEOS / WRITINGS` 筛选，卡片带 3D 鼠标倾斜，点击进入详情页并可切换到「下一个作品」
- **IMAGINE** — 创意实验室卡片、seethefuture 社区入口、邮箱 / Instagram / Twitter / GitHub 联系渠道

### 交互组件

- **MusicPlayer** — 内置 5 首本地音轨的播放器，支持播放/暂停、上一首/下一首、音量、随机、循环、播放列表展开，全局单例 `Audio` 实例避免重复播放
- **AIChatWidget** — 基于智谱 AI `glm-4` 的悬浮对话助手，内置 ZLION 人设提示词，可讨论前沿科技、创意设计与哲学话题；支持普通/放大两种尺寸
- **长按进入** — 首页指纹图标长按触发，配合页面四边霓虹进度条，完成后跳转到 STRIVE 章节
- **转场动画** — 每个章节拥有独立的进入/退出变体（模糊、倾斜、3D 翻转、裁剪揭示等），由 `AnimatePresence mode="wait"` 统一调度

---

## 技术栈

| 分类 | 选型 |
| --- | --- |
| 框架 | React 19 + TypeScript 5.8 |
| 构建 | Vite 6（`base: './'`，便于 GitHub Pages 部署） |
| 样式 | Tailwind CSS 4（`@tailwindcss/vite` 插件 + `@theme` 自定义主题变量） |
| 动画 | motion 12（`motion/react`） |
| 3D / 着色器 | three.js 0.183 |
| 图标 | lucide-react |
| AI 能力 | 智谱 AI `glm-4`（对话）/ `cogview-3`（文生图，已封装待用） |
| 部署 | gh-pages |

---

## 目录结构

```
iamzlion/
├── index.html                  # 入口 HTML
├── metadata.json               # 站点元信息
├── package.json
├── tsconfig.json
├── vite.config.ts              # Vite 配置（别名 @ → 根目录、注入环境变量）
├── public/
│   └── audio/                  # 5 首本地音轨（MusicPlayer 使用）
├── src/
│   ├── main.tsx                # React 挂载入口
│   ├── App.tsx                 # 主应用：导航、五大章节、作品卡片与详情页
│   ├── index.css               # 主题变量、字体、自定义动画与滚动条
│   ├── constants.ts            # PROJECTS（9 条作品）与 SKILLS（24 项技能）
│   ├── vite-env.d.ts
│   ├── assets/                 # 24 张照片素材 + 头像 zlion.jpg
│   ├── components/
│   │   ├── MatrixBackground.tsx    # 数字雨背景
│   │   ├── DisplacementEffect.tsx  # WebGL 位移着色器
│   │   ├── EnergyTrail.tsx         # 能量拖尾特效
│   │   ├── MusicPlayer.tsx         # 音乐播放器
│   │   └── AIChatWidget.tsx        # AI 对话悬浮窗
│   └── utils/
│       └── zhipuAI.ts          # 智谱 AI 接口封装（对话 / 文生图）
└── .env.example                # 环境变量示例
```

---

## 快速开始

**环境要求：** Node.js 18+（推荐 20 或 22）

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器（http://localhost:3000）
npm run dev
```

其他可用脚本：

```bash
npm run build     # 生产构建，产物输出到 dist/
npm run preview   # 本地预览构建产物
npm run lint      # 类型检查（tsc --noEmit）
npm run clean     # 清除 dist/
npm run deploy    # 构建并发布到 gh-pages 分支
```

---

## 环境变量

复制示例文件后按需填写：

```bash
cp .env.example .env
```

| 变量 | 用途 |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API 密钥（由 `vite.config.ts` 注入，供 `@google/genai` 使用） |
| `APP_URL` | 站点自身地址，用于自引用链接与回调 |

> **说明：** `src/utils/zhipuAI.ts` 中的智谱 AI 密钥目前以常量形式内联在源码里，以便在 AI Studio 等无法读取环境变量的环境中直接运行。若要将仓库公开，建议改为从 `import.meta.env.VITE_ZHIPU_API_KEY` 读取，并把 `.env` 保留在 `.gitignore` 中。

---

## 部署

项目已配置 `gh-pages`，推送后可一键发布：

```bash
npm run deploy
```

发布地址由 `package.json` 的 `homepage` 字段决定：

```
https://35311908677.github.io/iamzlion/
```

若使用 GitHub Actions 或其他平台（Vercel / Netlify / Cloudflare Pages），构建命令填 `npm run build`，输出目录填 `dist`。

---

## 设计系统

配色与字体集中定义在 `src/index.css` 的 `@theme` 块中，改这里即可全局换肤：

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Space Grotesk", sans-serif;

  --color-neon-blue: #00f2ff;   /* 主霓虹蓝 */
  --color-neon-purple: #bc13fe; /* 辅助霓虹紫 */
  --color-neon-ice: #e0ffff;    /* 冰蓝高亮 */
}
```

设计基调：**克制、简洁、富有氛围感**。整体以纯黑为底，用霓虹蓝紫作为唯一的高饱和点缀；标题统一使用 `Space Grotesk` 加粗大写并收紧字距，正文使用 `Inter`；大量留白与细至 1px 的分隔线，营造数字化的冷静感。

---

## 内容自定义

| 想改什么 | 改哪里 |
| --- | --- |
| 作品列表 / 技能标签 | `src/constants.ts` 中的 `PROJECTS` 与 `SKILLS` |
| 联系方式、社交链接 | `src/App.tsx` 中 `activeSection === 'imagine'` 区块 |
| 灵感视频（B 站） | `src/App.tsx` 中 `activeSection === 'about'` 下的视频数组 |
| 照片墙 | 直接往 `src/assets/` 丢图片，会被 `import.meta.glob` 自动收录 |
| 音乐 | 替换 `public/audio/` 下的文件，并同步 `MusicPlayer.tsx` 的 `TRACK_LIST` |
| 导航章节 | `src/App.tsx` 中 `Navbar` 的 `menuItems` 与 `sectionVariants` |
| AI 助手人设 | `src/utils/zhipuAI.ts` 中的 `system` 提示词 |

---

## 说明

- **构建已通过验证：** `npm run build` 可正常产出 `dist/`；`npm run lint` 目前会报出 1 处类型错误 —— `src/App.tsx:689` 向 `LazyVideo` 传入 `key`，但该组件的 props 类型未声明 `key`。为 `LazyVideo` 的 props 补上 `key?: React.Key` 即可消除（不影响运行时）。
- `public/audio/` 下的 5 首音乐均为第三方版权作品，仅作本地演示用途，请勿用于商业场景；正式发布建议替换为自有或已授权音频。
- 项目依赖中保留了 `express`、`tsx`、`dotenv`、`yarn` 等早期开发阶段的包，当前构建流程并未使用，可按需清理。
- 照片墙依赖构建期的 `import.meta.glob` 扫描，新增图片后需重启开发服务器才能看到变化。
- 首屏 JS 体积约 900 KB（gzip 后 254 KB），主要来自 three.js 与 motion；如需优化可使用动态 `import()` 对 `DisplacementEffect` 等特效组件做代码分割。

---

## 联系

- 📧 邮箱：<3531908677@qq.com>
- 💬 微信：`iamzlion`
- 📱 WhatsApp：+86 193 1302 3693
- 📷 Instagram：[@z3531908677](https://instagram.com/z3531908677)
- 🐦 Twitter / X：[@z3531908677](https://twitter.com/z3531908677)
- 🐙 GitHub：[@35311908677](https://github.com/35311908677)
- 🎮 Discord：<https://discord.gg/rhT5ReGrY>

---

<div align="center">

**© 2026 YOLO MORTAL** · Created with light & motion

*想象力是唯一的限制。*

</div>
