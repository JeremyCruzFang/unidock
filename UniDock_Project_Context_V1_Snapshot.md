# UniDock Project Context (V1 Snapshot)

## 1. Product Definition

* **UniDock** is a static-first frontend project for **NUIST 新生**.
* Target users: incoming freshmen who need fast, trustworthy access to pre-arrival and arrival-stage information.
* Core purpose: **reduce information asymmetry and preparation cost** across报到流程、行前准备、校园资源、联系方式与站内更新提醒。

---

## 2. Current System Architecture (Frontend Stage)

* Current stage is **frontend-first**, built with **plain HTML + CSS + JavaScript**.
* No framework, no backend dependency yet, GitHub Pages compatible.
* Shared frontend assets:
  * `assets/css/base.css`
  * `assets/css/components.css`
  * `assets/css/pages.css`
  * `assets/css/animations.css`
  * `assets/css/nav.css`
  * `assets/js/main.js`
  * `assets/js/language.js`
  * `assets/js/nav.js`
  * `assets/js/mailbox.js`
* Existing key pages:
  * `index.html` — homepage / hub
  * `baodaoquanliucheng.html` — 报到全流程
  * `xingqianzhunbei.html` — 行前准备清单
  * `xinshengbikeng.html` — 新生避坑提示 + 学习生活须知
  * `xiaoyuanxitongdaohang.html` — 校内系统导航
  * `wechat-add.html` — 联系负责人
  * `mailbox.html` / `mailbox-detail.html` — 站内信箱列表与详情
  * redirect pages for官网 / 地图 / 生活资源 / 校内导航分发
  * `contact.html` — lightweight alias redirecting to `wechat-add.html`
* Design philosophy:
  * **Apple-style minimal**
  * soft gradient background
  * large rounded cards
  * light hover / press motion
  * restrained typography
  * mobile-first responsive
* Navigation system:
  * Shared sticky header
  * Back button on subpages
  * Brand + language switch
  * Shared global drawer via `nav.js` / `nav.css`
  * Drawer includes "新生必看" expandable menu + "联系负责人"

---

## 3. New Modules (V1 Scope)

### 3.1 Mailbox

* Purpose:
  * In-product message / announcement system for users.
* Requirements:
  * admin publish
  * unread state
  * pinned posts
  * scheduled publish
* Status:
  * **frontend implemented with local data; backend planned**

### 3.2 Chatbot Agent

* Purpose:
  * A future AI assistant inside UniDock.
* Capabilities:
  * LLM-based
  * both **support mode** and **chat mode**
* Data handling:
  * frontend does **not** persist chat locally as source of truth
  * server-side logs / session records will be used later
* Status:
  * **planned**

---

## 4. Server Strategy (V1 Plan)

* Decision: **server-first for V1 backend stage**, even though frontend pages are already being prepared.
* Identity model:
  * use **`device_id`**
  * no login/account system for now
* Planned backend modules:
  * device system
  * mailbox system
  * chat system
  * admin backend
* Tech direction:
  * **Node / NestJS**
  * **PostgreSQL**
  * **Nginx**

---

## 5. Data Model Overview (High Level)

Core conceptual entities:

* `devices`
* `mailbox_posts`
* `mailbox_reads`
* `chat_sessions`
* `chat_messages`
* `admin_users`

---

## 6. Design Constraints

* Apple-style minimal
* no visual noise
* no aggressive marketing UI
* mobile-first
* consistent typography and spacing

---

## 7. Development Roadmap

### Phase 0

* server setup

### Phase 1

* Mailbox

### Phase 2

* Chatbot Agent

---

## 8. Key Decisions (Critical)

* Use **`device_id` instead of login**
* Chatbot should support both **chat** and **support**
* Mailbox must support **unread state + scheduling + pinning**
* A backend/server **will be introduced**
* Frontend remains **framework-free, static-compatible, lightweight**
* Existing contact path currently resolves through:
  * `contact.html` → `wechat-add.html`

---

## 9. Next Step (Immediate)

* Start **Phase 0 backend bootstrap**:
  * scaffold server project
  * set up PostgreSQL
  * define `device_id` flow
  * establish initial entities for devices / mailbox / chat / admin
* Then wire the first minimal backend capability:
  * mailbox content delivery / config management
  * prepare future chatbot integration points
