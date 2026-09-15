<div align="center">

# YOLO MORTAL

**极简暗色科技风 · 高对比霓虹发光 · 沉浸式交互**

*You Only Live Once.*

🌐 体验链接：<https://zlion.pages.dev/>
✍️ 个人博客：<https://jsxy0.pages.dev/>
🛰️ 社区「预见未来 / See The Future」：<https://yjwl.netlify.app>

</div>

---

YOLO MORTAL 是一个极简暗色科技风、以高对比霓虹发光与沉浸式交互为核心的数字空间。网站用「单页分区滚动 + 转场动画」的方式组织内容，把「关于」「奋斗」「梦想」「作品」「想象」拆成五个可独立切换的章节；同时把 Canvas 粒子、WebGL 着色器、实时音频与 AI 对话揉进同一个页面，让浏览本身成为一种体验。

## 核心特性

### 沉浸式视觉特效

| 组件 | 技术 | 说明 |
| --- | --- | --- |
| `MatrixBackground` | Canvas 2D | 全屏数字雨，字符集由片假名 + 拉丁字母 + 数字混合，按列独立下落 |
| `DisplacementEffect` | three.js / GLSL | 全屏平面 + Simplex 噪声着色器，鼠标靠近处产生流体位移扭曲，带缓动跟随 |
| `EnergyTrail` | Canvas 2D | 光标移动时生成带速度与角度信息的粒子，形成不规则多边形的能量拖尾 |
| `VoidCrack` | SVG + motion | 标题悬停时在鼠标位置生成随机折线「虚空裂纹」，自动衰减消散（定义在 `src/App.tsx` 内，非独立文件） |

### 五大内容板块

- **ABOUT** — 头像区、由 `import.meta.glob` 自动扫描生成的照片墙、B 站灵感视频收藏（点击后才加载 iframe，避免首屏开销）
- **STRIVE** — 奋斗哲学独白、近期文章卡片、个人博客入口
- **DREAM** — VISION / FUTURE / IMPACT 三张愿景卡，以及生成式 AI、Web3、空间计算、神经接口等 8 个前沿科技方向
- **WORK** — 作品按 ALL / IMAGES / VIDEOS / WRITINGS 筛选，卡片带 3D 鼠标倾斜，点击进入详情页并可切换到「下一个作品」
- **IMAGINE** — 创意实验室卡片、seethefuture 社区入口、邮箱 / Instagram / Twitter / GitHub 联系渠道

### 交互组件

- **MusicPlayer** — 本地音轨播放器，支持播放/暂停、上一首/下一首、音量、随机、循环、播放列表展开，全局单例 `Audio` 实例避免重复播放。曲目清单写死在 `MusicPlayer.tsx` 的 `TRACK_LIST`（5 首）；**音频文件未包含在本仓库中**，需自行放入 `public/audio/` 才能出声（详见「说明」）
- **AIChatWidget** — 基于智谱 AI glm-4 的悬浮对话助手，内置 ZLION 人设提示词，可讨论前沿科技、创意设计与哲学话题；支持普通/放大两种尺寸
- **长按进入** — 首页指纹图标长按触发，配合页面四边霓虹进度条，完成后跳转到 STRIVE 章节
- **转场动画** — 每个章节拥有独立的进入/退出变体（模糊、倾斜、3D 翻转、裁剪揭示等），由 `AnimatePresence mode="wait"` 统一调度

## 技术栈

| 分类 | 选型 |
| --- | --- |
| 框架 | React 19 + TypeScript 5.8 |
| 构建 | Vite 6（`base: './'`，便于 GitHub Pages 部署） |
| 样式 | Tailwind CSS 4（`@tailwindcss/vite` 插件 + `@theme` 自定义主题变量） |
| 动画 | motion 12（`motion/react`） |
| 3D / 着色器 | three.js 0.183 |
| 图标 | lucide-react |
| AI 能力 | 智谱 AI glm-4（对话）/ cogview-3（文生图，已封装待用） |
| 部署 | gh-pages |

## 目录结构

```
iamzlion/
├── index.html                  # 入口 HTML
├── metadata.json               # 站点元信息
├── package.json
├── tsconfig.json
├── vite.config.ts              # Vite 配置（别名 @ → 根目录、注入环境变量）
├── public/
│   └── audio/                  # 音轨目录（仓库中为空，放入 mp3 后由 MusicPlayer 读取）
├── src/
│   ├── main.tsx                # React 挂载入口
│   ├── App.tsx                 # 主应用：导航、五大章节、作品卡片与详情页、VoidCrack 裂纹特效
│   ├── index.css               # 主题变量、字体、自定义动画与滚动条
│   ├── constants.ts            # PROJECTS（9 条作品）与 SKILLS（24 项技能）
│   ├── vite-env.d.ts
│   ├── assets/                 # 图片目录（仓库中为空，放入图片后自动收录进照片墙）
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

## 快速开始

环境要求：Node.js 18+（推荐 20 或 22）

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

## 环境变量

复制示例文件后按需填写：

```bash
cp .env.example .env
```

| 变量 | 用途 |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API 密钥（由 `vite.config.ts` 注入，供 `@google/genai` 使用） |
| `APP_URL` | 站点自身地址，用于自引用链接与回调 |

> **说明**：`src/utils/zhipuAI.ts` 中的智谱 AI 密钥目前以常量形式内联在源码里，以便在 AI Studio 等无法读取环境变量的环境中直接运行。若要将仓库公开，建议改为从 `import.meta.env.VITE_ZHIPU_API_KEY` 读取，并把 `.env` 保留在 `.gitignore` 中。

## 部署

项目已配置 `gh-pages`，推送后可一键发布：

```bash
npm run deploy
```

发布地址由 `package.json` 的 `homepage` 字段决定，当前为：

```
https://shycold7.github.io/iamzlion/
```

若使用 GitHub Actions 或其他平台（Vercel / Netlify / Cloudflare Pages），构建命令填 `npm run build`，输出目录填 `dist`。

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

设计基调：克制、简洁、富有氛围感。整体以纯黑为底，用霓虹蓝紫作为唯一的高饱和点缀；标题统一使用 Space Grotesk 加粗大写并收紧字距，正文使用 Inter；大量留白与细至 1px 的分隔线，营造数字化的冷静感。

## 内容自定义

| 想改什么 | 改哪里 |
| --- | --- |
| 作品列表 / 技能标签 | `src/constants.ts` 中的 `PROJECTS` 与 `SKILLS` |
| 联系方式、社交链接 | `src/App.tsx` 中 `activeSection === 'imagine'` 区块 |
| 灵感视频（B 站） | `src/App.tsx` 中 `activeSection === 'about'` 下的视频数组 |
| 照片墙 | 直接往 `src/assets/` 丢图片，会被 `import.meta.glob` 自动收录 |
| 头像 | `src/App.tsx` 中 ABOUT 板块的 1:1 头像区（当前为内置的 `Z` 字母渐变占位，替换回 `<img>` 即可） |
| 音乐 | 替换 `public/audio/` 下的文件，并同步 `MusicPlayer.tsx` 的 `TRACK_LIST` |
| 导航章节 | `src/App.tsx` 中 `Navbar` 的 `menuItems` 与 `sectionVariants` |
| AI 助手人设 | `src/utils/zhipuAI.ts` 中的 `system` 提示词 |

## 说明

- **仓库不包含任何图片与音频文件。** `src/assets/` 与 `public/audio/` 目前仅有 `.gitkeep` 占位，以便保留目录结构；请按「内容自定义」的指引放入自己的素材后使用。
- 头像原本引用 `src/assets/zlion.jpg`，随图片一并移除后，ABOUT 板块已改为内置的 `Z` 字母渐变占位（`src/App.tsx`），构建不受影响。
- 构建已通过验证：`npm run build` 可正常产出 `dist/`；`npm run lint` 目前会报出 1 处类型错误 —— `src/App.tsx:688` 向 `LazyVideo` 传入 `key`，但该组件的 props 类型未声明 `key`。为 `LazyVideo` 的 props 补上 `key?: React.Key` 即可消除（不影响运行时）。
- 项目依赖中保留了 `express`、`tsx`、`dotenv`、`yarn` 等早期开发阶段的包，当前构建流程并未使用，可按需清理。
- 照片墙依赖构建期的 `import.meta.glob` 扫描，新增图片后需重启开发服务器才能看到变化。
- 首屏 JS 体积约 900 KB（gzip 后 254 KB），主要来自 three.js 与 motion；如需优化可使用动态 `import()` 对 `DisplacementEffect` 等特效组件做代码分割。
- `package.json` 中原本重复声明了两次 `homepage` 字段（后者覆盖前者），已合并为一处。
