# UniDock Frontend Redesign — Handoff to Claude Code

> 本文档是 UniDock 前端重设计的最终交付说明。设计原型为 HTML 格式，供 Claude Code 在目标代码库中实现。

---

## About the Design Files

本包中的文件是**用 HTML/CSS/React(JSX) 制作的高保真设计参考原型**——展示目标外观与交互行为，**不是可直接部署的生产代码**。

实现任务是：**在 UniDock 现有代码库（静态 HTML + CSS + vanilla JS，托管于 GitHub Pages）中，按照本原型的视觉规范重建所有页面**。现有代码库位于 `github.com/JeremyCruzFang/unidock`，使用纯 HTML 多文件结构，无构建工具、无框架。实现时应保持该架构，或由产品方决定是否迁移至框架。

## Fidelity

**High-fidelity（高保真）**。所有颜色、字号、间距、圆角、阴影、交互状态均为最终规范值。开发者应像素级还原。

---

## 1. Design System

### 1.1 Design Tokens

```css
/* ── Color ── */
--bg:              #eef1f8                              /* 页面底色 */
--surface:         rgba(255,255,255,0.85)                /* 卡片/面板底色（毛玻璃） */
--surface-solid:   #ffffff                               /* 不透明表面 */
--surface-border:  rgba(255,255,255,0.55)                /* 卡片边框 */
--line:            rgba(15,23,42,0.07)                   /* 分割线/次级边框 */
--text:            #0f172a                               /* 主文字 */
--muted:           #475569                               /* 次级文字 */
--soft:            #94a3b8                               /* 弱文字/索引编号 */
--accent:          #0f0f0f                               /* 强调色（纯黑） */
--accent-soft:     rgba(15,15,15,0.06)                   /* Eyebrow 底色 */

/* ── Button Colors ── */
Primary button:    background #0f0f0f, text #fff, shadow 0 4px 16px rgba(0,0,0,0.14)
Primary hover:     background #1a1a1a, shadow 0 8px 24px rgba(0,0,0,0.18)
Secondary button:  background rgba(255,255,255,0.78), text #0f172a, border rgba(15,23,42,0.09)
Active lang pill:  background #0f0f0f, text #fff

/* ── Unread/Alert ── */
Unread dot:        #ef4444 (red)
Unread dot ring:   0 0 0 2.5px rgba(255,255,255,0.9)
Unread item bg:    rgba(37,99,235,0.03), border rgba(37,99,235,0.06)
Read dot:          transparent

/* ── Background Gradient (fixed, full page) ── */
radial-gradient(ellipse at 18% 0%, rgba(100,145,255,0.11), transparent 48%),
radial-gradient(ellipse at 82% 4%, rgba(255,190,140,0.09), transparent 38%),
radial-gradient(ellipse at 70% 80%, rgba(140,210,255,0.08), transparent 36%),
linear-gradient(180deg, #e8ecf5 0%, #eef1f8 32%, #f4f2ef 100%)
background-attachment: fixed

/* ── Radius ── */
--r-sm: 14px       /* 列表项、折叠面板、标签 */
--r-md: 22px       /* 导航栏、中等卡片、系统卡 */
--r-lg: 28px       /* 大卡片、内容面板 */
999px              /* 按钮、Eyebrow、Pill、语言胶囊 */

/* ── Shadow ── */
--shadow:       0 6px 24px rgba(15,23,42,0.045), 0 16px 40px rgba(15,23,42,0.03)
--shadow-hover: 0 10px 36px rgba(15,23,42,0.065)
--shadow-nav:   0 8px 28px rgba(15,23,42,0.055)

/* ── Spacing ── */
--container:    1060px (max-width)
--gap:          88px (section padding desktop)
Card padding:   28–30px (desktop), 20–22px (mobile)
Section tight:  ~53px (0.6 × gap)

/* ── Transition ── */
--t-fast: 200ms ease
--t-base: 340ms cubic-bezier(0.22, 1, 0.36, 1)
```

### 1.2 Typography

```
Font stack:     "SF Pro Display", "PingFang SC", "Segoe UI Variable", "Helvetica Neue", sans-serif
Mono stack:     "SF Mono", "JetBrains Mono", "Cascadia Code", monospace

Hero title:     clamp(2.2rem, 5.2vw, 3.6rem), weight 700, line-height 1.06, letter-spacing -0.05em
Section h2:     clamp(1.6rem, 3.2vw, 2.2rem), weight 700, line-height 1.12, letter-spacing -0.04em
Subpage h1:     clamp(1.8rem, 4vw, 2.6rem), weight 700, line-height 1.1, letter-spacing -0.04em
Panel h2:       clamp(1.3rem, 2.8vw, 1.7rem), weight 700, line-height 1.14, letter-spacing -0.03em
Card title:     1.18rem, weight 600, letter-spacing -0.02em
Body text:      0.9–0.95rem, color --muted, line-height 1.6
Eyebrow:        0.78rem, weight 650, letter-spacing 0.04em
Mono index:     0.74rem, weight 400, letter-spacing 0.06em, color --soft
Nav brand:      0.95rem weight 700 / subtitle 0.7rem color --muted
```

### 1.3 Card System

所有卡片共享 `.card` 基类：
- `backdrop-filter: blur(18px)` — 毛玻璃效果
- `::before` 伪元素提供左上到右下的白色高光渐变
- Hover: `translateY(-4px)` + shadow 升级 + border 加深
- 卡片内容通过 padding 控制，不使用内嵌容器

变体：
- `.cpanel` — 内容面板（子页面用），独立 padding 和 border
- `.cpanel--subtle` — 弱背景面板（`rgba(245,248,255,0.7)`）

---

## 2. 页面清单（12 页）

| # | 路由（原型中的 hash） | 对应生产文件 | 页面家族 | 备注 |
|---|---|---|---|---|
| 1 | `#/` | `index.html` | Hub 页 | 首页 |
| 2 | `#/arrival` | `baodaoquanliucheng.html` | Guide 详情页 | 报到全流程 |
| 3 | `#/checklist` | `xingqianzhunbei.html` | Guide 详情页 | 行前准备清单 |
| 4 | `#/pitfalls` | `xinshengbikeng.html` | Guide 详情页 | 新生避坑提示 |
| 5 | `#/systems` | `xiaoyuanxitongdaohang.html` | Guide 详情页 | 校内系统导航 |
| 6 | `#/contact` | `wechat-add.html` | Action 页 | 联系负责人 |
| 7 | `#/better` | `better-service.html` | Card Grid 页 | Better Service |
| 8 | `#/mailbox` | `mailbox.html` | Feed 页 | 站内信箱 |
| 9 | `#/redirect/campus-nav` | `campus-navigation-redirect.html` | Redirect 页 | 二选一中转 |
| 10 | `#/redirect/life` | `life-resources-redirect.html` | Redirect 页 | 二选一中转 |
| 11 | `#/redirect/map` | `campus-map-redirect.html` | Redirect 页 | 倒计时中转 |
| 12 | `#/redirect/official` | `official-site-redirect.html` | Redirect 页 | 倒计时中转 |

---

## 3. 组件清单

### 3.1 全局组件

| 组件 | 文件 | 描述 | 状态 |
|---|---|---|---|
| **Nav（首页）** | `components.jsx` → `Nav` | 品牌标识 + 汉堡菜单 + Mailbox 图标(红点) + Better Pill + 语言胶囊 | sticky, scroll 加深背景 |
| **SubNav（子页面）** | `subpage-shared.jsx` → `SubNav` | "← 返回首页" 按钮 + 品牌 + 页面标题 + 同右侧操作 | sticky |
| **Drawer（侧边抽屉）** | `components.jsx` → `Drawer` | overlay 遮罩 + 左滑面板, 含可展开"新生必看"子列表 | 汉堡按钮触发 |
| **Footer** | `components.jsx` → `Footer` | 品牌图标 + 描述 + 右侧注释，包裹于 `.card` | 所有页面统一 |
| **Eyebrow** | `.eyebrow` class | 胶囊标签，用于区块/面板顶部 | — |
| **Button** | `.btn--primary` / `.btn--secondary` | 圆角 999px 胶囊，高度 52px (desktop) / 48px (mobile) | hover 上浮 |
| **CopyBtn** | `subpage-shared.jsx` → `CopyBtn` | "复制" → "已复制" 状态切换，1.5s 自动恢复 | 中英双语 |

### 3.2 首页专属组件

| 组件 | 描述 |
|---|---|
| **Hero** | 居中大字标题 + 副标题 + 双按钮 + 3 个 Pill 标签 |
| **CoreEntries (Entry Grid)** | 2 列网格，7 张编号入口卡（含内部 badge） |
| **WhySection** | 3 列价值卡 |
| **GuideSection** | 容器卡内左右双栏：左文字说明 + 右 4 条可点击条目 |
| **CTASection** | 横向 banner：文字 + 按钮 |

### 3.3 子页面组件

| 组件 | Class / 元素 | 用于页面 |
|---|---|---|
| **SubHero** | `.sub-hero` | 所有子页面顶部 |
| **CPanel** | `.cpanel` / `.cpanel--subtle` | 所有子页面内容面板 |
| **StageCard** | `.stage-card` | 报到全流程（4 阶段概览） |
| **InfoItem** | `.info-item` | 报到全流程（出发前三件事） |
| **RouteCard** | `.route-card` + `.route-card__path` | 报到全流程（3 条路线） |
| **MappingCard** | `.mapping-card` | 报到全流程（4 个宿舍区映射） |
| **Accordion** | `.accord` (`<details>`) | 报到全流程（7 条自驾路线 A–G） |
| **TimelineStep** | `.timeline-step` | 报到全流程（到校后 4 步） |
| **SupportCard** | `.support-card` / `--accent` | 报到全流程（现场支持） |
| **AlertCard** | `.alert-card` | 报到全流程（安全提醒） |
| **DualGrid + Subcard** | `.dual-grid` + `.subcard` | 行前准备（必须/按情况、主设备/配件） |
| **LivingCard** | `.living-card` + `.living-meta` | 行前准备（4 类生活用品） |
| **NItem (Numbered List)** | `.nlist__item` | 新生避坑（12+5 条编号列表） |
| **SoftNote** | `.soft-note` / `--quiet` | 多页面底部提醒/建议 |
| **SysCard** | `.sys-card` / `--link` | 校内系统（8 张系统卡） |
| **ContactCard** | `.contact-card` + `.contact-methods` | 联系负责人（含复制按钮） |
| **MailboxItem** | `.mb-item` / `.is-unread` | 站内信箱（含已读/未读/置顶） |
| **ChoiceCard** | `.choice-card` / `--primary` | 二选一中转页 |
| **RedirectShell** | `.redirect-shell` | 倒计时中转页（居中全屏布局） |
| **TagChip** | `.tag-chip` | 行前准备（分类标签） |

---

## 4. 响应式规则

### 4.1 断点

| 断点 | 目标 | 关键变化 |
|---|---|---|
| **≥ 1060px** | Desktop | 完整布局，2 列入口、3 列价值卡、双栏 Guide |
| **≤ 900px** | Tablet/小桌面 | 入口网格 → 1 列，价值卡 → 1 列，Guide → 单栏，CTA → 纵向，Footer → 纵向，Nav 高度 52px |
| **≤ 640px** | Mobile | 卡片 padding 缩小，字号进一步缩小，Stage 网格 → 2 列 |

### 4.2 导航响应式

| 视口 | 导航栏高度 | 品牌副标题 | 图标尺寸 | 操作元素 |
|---|---|---|---|---|
| Desktop | 64px | 显示 | 30×30 | 全部显示 |
| ≤ 900px | 52px | 隐藏 | 26×26 | Pill 和 Icon 缩小至 34px |

### 4.3 Hero 响应式

- Desktop: `clamp(2.2rem, 5.2vw, 3.6rem)`, `max-width: 15ch`, 按钮横排
- Tablet/Mobile: `clamp(2rem, 7vw, 2.8rem)`, 按钮纵排全宽

### 4.4 卡片网格响应式

| 组件 | Desktop | ≤ 900px | ≤ 640px |
|---|---|---|---|
| Entry Grid | 2 列 | 1 列 | 1 列 |
| Why Grid | 3 列 | 1 列 | 1 列 |
| Guide Shell | 双栏 (0.85:1.15) | 单栏 | 单栏 |
| Route Grid | auto-fit 260px | 1 列 | 1 列 |
| System Grid | auto-fit 220px | 1 列 | 1 列 |
| Contact Grid | auto-fit 280px | 1 列 | 1 列 |

---

## 5. 中英双语规则

### 5.1 完整双语覆盖

所有用户可见文案均有中英文两个版本，包括：
- 导航栏所有元素（品牌副标题、按钮文字、页面标题标签）
- Hero 标题、副标题、按钮、Pill 标签
- 所有入口卡标题、描述、提示、Badge
- 所有内容面板的 Eyebrow、标题、描述
- 所有列表项内容
- 按钮文字（"复制"→"Copy"、"已复制"→"Copied"、"全部标为已读"→"Mark all as read"）
- 返回按钮（"← 返回首页"→"← Home"）
- 中转页所有文案
- Footer 描述与注释
- Drawer 所有菜单项

### 5.2 中英文内容对照表位置

完整的中英文对照数据定义在 `v2/components.jsx` 的 `T` 对象中（首页内容）和各 `page-*.jsx` 中（子页面内容，通过 `zh ? '中文' : 'English'` 三元表达式）。

### 5.3 语言切换机制

- 全局 `lang` state（`'zh'` | `'en'`），由导航栏语言胶囊中的 `中` / `EN` 按钮切换
- 当前激活语言按钮样式：`background: #0f0f0f; color: #fff`
- 切换即时生效，无刷新
- 语言状态在页面间通过 React state 传递（单页应用）；生产环境多页架构应使用 `localStorage` 持久化

### 5.4 英文适配注意事项

- Hero 标题使用 `max-width: 15ch` + `text-wrap: balance` 控制换行，中英文均有效
- `clamp()` 字号确保英文较长标题在小屏自动缩小
- 英文模式下 CTA 按钮、Pill 标签文字普遍更长，按钮使用 `padding: 0 28px` 而非固定宽度，自适应内容

---

## 6. 交互反馈规则

### 6.1 Hover 状态

| 元素 | Hover 行为 |
|---|---|
| 主按钮 | `translateY(-2px)`, 背景变亮至 `#1a1a1a`, shadow 加大 |
| 次按钮 | `translateY(-2px)`, border 加深, 浮起 shadow |
| 入口卡/价值卡/系统卡 | `translateY(-4px)`, shadow 升级, border 加深 |
| 入口卡箭头 | `translateX(3px)`, 颜色变为 `--accent` |
| Guide 条目箭头 | 同上 |
| 导航 Pill | `translateY(-1px)`, 颜色加深, border 加深 |
| 导航图标 | 颜色加深, border 加深 |
| Drawer 菜单项 | 颜色变为 `--accent` |
| 信箱条目 | 背景加深 `rgba(0,0,0,0.03)` |

### 6.2 Focus 状态

按钮和链接继承浏览器默认 focus ring。实现时应添加 `:focus-visible` 样式以满足可访问性。

### 6.3 复制成功反馈

- 点击"复制"按钮 → `navigator.clipboard.writeText()`
- 成功后按钮变为：`background: #0f0f0f; color: #fff; border-color: #0f0f0f`，文字变为"已复制"/"Copied"
- 1500ms 后自动恢复原状态
- 中英文按钮文字跟随当前语言

### 6.4 已读/未读状态（Mailbox）

- **未读**：蓝色圆点（`#3b82f6`, 8×8px），条目背景 `rgba(37,99,235,0.03)` + border `rgba(37,99,235,0.06)`
- **已读**：圆点透明，条目背景恢复默认
- 点击条目 → 标记为已读，状态持久化到 `localStorage('ud_read')`
- "全部标为已读"按钮 → 批量标记

### 6.5 置顶标签（Mailbox）

- 置顶消息显示"置顶"/"Pinned" Badge（`rgba(0,0,0,0.04)` 底色胶囊）
- 置顶消息在专用"置顶消息"面板中显示，同时也出现在"全部消息"面板中

### 6.6 Drawer 展开/收起

- 汉堡按钮点击 → Drawer 从左侧滑入（`translateX(-100%) → translateX(0)`）
- 动画：`0.28s cubic-bezier(0.22, 1, 0.36, 1)`
- 遮罩层：`rgba(15,23,42,0.18)` + `opacity 0.25s`
- 点击遮罩关闭
- "新生必看"条目可展开子菜单（chevron 旋转 180°）

### 6.7 导航栏滚动反馈

- `window.scrollY > 8` 时添加 `.is-scrolled`
- 背景从 `rgba(255,255,255,0.68)` → `rgba(255,255,255,0.82)`
- Shadow 从 `--shadow-nav` → 加大

### 6.8 Redirect 倒计时

- 3 秒倒计时，每秒递减显示
- 倒计时归零后不自动跳转（设计原型中未执行实际跳转，生产环境应执行 `window.location.href = targetUrl`）

### 6.9 Accordion 展开（报到全流程）

- 使用原生 `<details>` 元素
- 展开时显示步骤列表
- Summary 右侧 `+` 标记

---

## 7. 页面模板复用关系

### 7.1 五个页面家族

```
┌─────────────────┐
│   Hub 页 (1页)   │  首页 — 模块化纵向 section 组合
└─────────────────┘
         │
┌─────────────────┐
│ Guide 详情页(4页)│  报到全流程 / 行前准备 / 新生避坑 / 校内系统
│                 │  共享: SubNav + SubHero + CPanel 堆叠 + Footer
└─────────────────┘
         │
┌─────────────────┐
│  Action 页 (1页) │  联系负责人
│                 │  共享: SubNav + SubHero + CPanel + Footer
└─────────────────┘
         │
┌─────────────────┐
│ Card Grid 页(1页)│  Better Service
│                 │  共享: SubNav + SubHero + CPanel + Footer
└─────────────────┘
         │
┌─────────────────┐
│  Feed 页 (1页)   │  Mailbox
│                 │  共享: SubNav + SubHero + CPanel + Footer
└─────────────────┘
         │
┌─────────────────┐
│ Redirect 页(4页) │  2 个二选一中转 + 2 个倒计时中转
│                 │  独立布局: 全屏居中, 无 Nav/Footer
└─────────────────┘
```

### 7.2 模板复用规则

| 模板 | 共享组件 | 差异点 |
|---|---|---|
| **所有带导航页面 (8页)** | Nav/SubNav + Drawer + Footer + `.container` + `.eyebrow` + `.btn` | 首页用 `Nav`，子页面用 `SubNav`（含返回按钮和页面标题） |
| **Guide 详情页 (4页)** | `SubpageLayout` → `SubHero` + `CPanel` 堆叠 | 内容面板数量和内部组件不同 |
| **Redirect 中转页 (4页)** | `.redirect-shell`（全屏居中） + 品牌图标 + Eyebrow + 标题 + 操作按钮 | 二选一页有 `.choice-grid`，倒计时页有计数器 |

### 7.3 实现建议

生产代码应提取以下模板文件：
- `_nav.html` — 导航栏（首页版 + 子页面版通过 CSS class 区分）
- `_drawer.html` — 侧边抽屉
- `_footer.html` — 页脚
- `_subpage-layout.html` — 子页面 wrapper（SubNav + container + detail-shell + Footer）
- `_redirect-layout.html` — 中转页 wrapper

---

## 8. Claude Code 实现注意事项

### 8.1 架构约束

- 当前生产代码为**纯静态 HTML 多文件结构**，托管在 GitHub Pages，无构建工具
- 原型使用 React + hash router 实现单页应用效果，仅为设计展示目的
- **生产实现应保持多 HTML 文件结构**（除非产品方决定迁移框架），每个 `.html` 文件对应一个页面
- 语言切换应使用现有的 `js/language.js` i18n 系统（`localStorage('unidock-language')` + `window.UniDockI18n`）

### 8.2 内容约束（严格）

- **不得新增、删除、改写、合并或重新定义任何现有内容**
- **不得新增、删除、改变或扩展任何现有功能**
- **不得改变现有业务逻辑、数据结构、后端接口、页面跳转目标或用户流程**
- **不得设计或实现任何 Chatbot、Agent 或 AI 助手相关元素**
- 所有文案以原型中的 `T` 对象和 page 组件内的三元表达式为准
- Better Service 与 Mailbox 仅做视觉重设计，不添加新功能

### 8.3 品牌资产

- **UniDock 图标**：使用 `icon/` 目录中的 PNG 文件（32/64/144/256px），黑色 U 形标记，透明背景
- 图标用于：导航栏（30×30 desktop / 26×26 mobile）、页脚（36×36）、中转页（80×80）、favicon（64px）、apple-touch-icon（256px）
- 文字标识："UniDock" + 副标题 "NUIST Freshman Hub"
- **不使用旧的蓝色六角形图标**

### 8.4 毛玻璃效果实现

- 导航栏：`backdrop-filter: blur(22px)` + 半透明白底
- 卡片：`backdrop-filter: blur(18px)` + `rgba(255,255,255,0.85)` 底色
- `::before` 伪元素提供白色高光渐变（`linear-gradient(135deg, rgba(255,255,255,0.36), transparent 52%)`）
- 侧边抽屉：`backdrop-filter: blur(22px)` + `rgba(255,255,255,0.88)`

### 8.5 背景渐变

- 全页 `background-attachment: fixed`，使用 3 层 `radial-gradient` + 1 层 `linear-gradient`
- 渐变在滚动时保持固定，卡片在其上浮动

### 8.6 现有 URL 保留

- **不得修改任何现有 HTML 文件名或 URL 路径**（如 `baodaoquanliucheng.html` 保持不变）
- 原型中的 hash 路由（`#/arrival` 等）仅为原型内导航，生产环境应使用相对链接（`href="baodaoquanliucheng.html"`）

### 8.7 已知需在代码阶段修复的问题

以下问题在设计原型中已修正呈现，但需要在生产代码中同步修复：
1. "报道" → "报到" 错字（不改文件名）
2. 报到全流程页缺失的英文 i18n 字段
3. "复制"按钮在 EN 模式下的英文文案
4. 首页入口卡 02 "寝室用具" 的 `href="#"` 死链
5. HTML `<title>` 标签的英文翻译

### 8.8 性能注意

- `backdrop-filter: blur()` 在低端设备上可能有性能问题，应提供 `@supports` 回退
- `background-attachment: fixed` 在 iOS Safari 上不生效，需用 `position: fixed` 的独立背景层替代
- 字体使用系统字体栈，无需加载外部字体

### 8.9 可访问性（代码阶段）

- 所有交互元素需有 `:focus-visible` 样式
- 图标按钮需有 `aria-label`
- Drawer 需有 `aria-expanded`、`aria-hidden` 和焦点陷阱
- 颜色对比度需满足 WCAG AA（当前设计的 `--muted` `#475569` on white 已满足 4.5:1）

---

## 9. 最终合规确认

### ✅ 内容完整性
- [x] 所有 12 个页面均有明确设计覆盖
- [x] 所有内容严格来自现有生产网站，未新增/删改/合并
- [x] 所有功能保留原有行为，未新增/删除/扩展
- [x] 首页 01–07 编号入口顺序未改变
- [x] 页面跳转关系与原站一致

### ✅ 禁止项
- [x] 不包含任何 Chatbot、Agent 或 AI 助手相关元素
- [x] 不包含任何营销组件（轮播、视频背景、社交分享、订阅弹窗）
- [x] 不包含任何未确认的新功能
- [x] 未改变产品定位

### ✅ 设计系统完整性
- [x] 统一 Design Token 覆盖颜色、间距、圆角、阴影、字号
- [x] 统一导航栏（首页版 + 子页面版，规则明确）
- [x] 统一 Footer
- [x] 统一卡片系统
- [x] 统一按钮系统（纯黑主按钮 + 白色次按钮）

### ✅ 响应式
- [x] 桌面端（≥1060px）完整布局
- [x] 平板端（≤900px）单栏适配
- [x] 移动端（≤640px）进一步缩小
- [x] 导航栏三档适配

### ✅ 中英双语
- [x] 所有页面所有可见文案均有中英文版本
- [x] 语言切换即时生效
- [x] 英文模式下按钮/标签/状态文案正确翻译
- [x] Hero 字号使用 clamp() 适配英文长文字

### ✅ 交互反馈
- [x] 复制按钮有"已复制"视觉反馈
- [x] Mailbox 已读/未读状态有视觉区分
- [x] Mailbox 置顶消息有 Badge
- [x] 全部标为已读功能
- [x] 卡片 hover 上浮
- [x] 按钮 hover 上浮
- [x] 导航栏滚动加深
- [x] Drawer 滑入/滑出动画
- [x] Redirect 倒计时

### ✅ 品牌图标
- [x] 使用用户提供的自定义黑色 U 形图标
- [x] 透明背景 PNG，多尺寸（32/64/144/256px）
- [x] 在导航栏、页脚、中转页正确应用
- [x] 与"UniDock"文字标识组合使用

### ✅ 模板复用
- [x] 5 个页面家族有明确的模板规则
- [x] 共享组件边界清晰
- [x] 实现时可提取为独立模板文件

### ✅ 实现稳定性
- [x] 所有布局使用标准 CSS Grid / Flexbox，无特殊 hack
- [x] `clamp()` 字号有足够的浏览器支持
- [x] `backdrop-filter` 有明确的降级策略
- [x] 无 JavaScript 重依赖（生产版本可纯 CSS + 少量 vanilla JS）

---

## 10. 文件清单

```
design_handoff_unidock/
├── README.md                          ← 本文档
├── UNIDOCK_FRONTEND_REDESIGN_BRIEF.md ← 原始设计 Brief（约束文档）
├── UniDock Full Prototype.html        ← 可交互全站原型入口
├── icon/
│   ├── icon-32.png                    ← favicon
│   ├── icon-64.png                    ← favicon @2x
│   ├── icon-144.png                   ← 导航栏/页脚/中转页
│   └── icon-256.png                   ← apple-touch-icon
└── v2/
    ├── styles.css                     ← 全局样式 + Design Tokens + 首页组件样式 + 响应式
    ├── subpage.css                    ← 子页面组件样式 + 响应式
    ├── components.jsx                 ← 首页组件 + 中英文完整内容 (T 对象) + Nav/Drawer/Footer
    ├── subpage-shared.jsx             ← 子页面共享组件 (SubNav/SubHero/CPanel/CopyBtn/SoftNote)
    ├── page-arrival.jsx               ← 报到全流程页面
    ├── page-guides.jsx                ← 行前准备 + 新生避坑 + 校内系统 页面
    ├── page-misc.jsx                  ← 联系负责人 + Better Service + Mailbox + Redirect 页面
    └── app-full.jsx                   ← 路由 + 页面组装
```

---

**文档结束。**
