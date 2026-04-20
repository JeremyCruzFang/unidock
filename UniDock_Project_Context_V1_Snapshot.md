# UniDock Project Context (V1 Snapshot)

## 1. Product Definition

* **UniDock** is a static-first frontend project for **NUIST 新生**.
* Target users: incoming freshmen who need fast, trustworthy access to pre-arrival and arrival-stage information.
* Core purpose: **reduce information asymmetry and preparation cost** across报到流程、行前准备、校园资源、联系方式、后续私域转化入口。

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
* Existing key pages:
  * `index.html` — homepage / hub
  * `baodaoquanliucheng.html` — 报道全流程
  * `xingqianzhunbei.html` — 行前准备清单
  * `xinshengbikeng.html` — 新生避坑提示 + 学习生活须知
  * `xiaoyuanxitongdaohang.html` — 校内系统导航
  * `wechat-add.html` — 联系负责人
  * redirect pages for官网 / 地图 / 生活资源 / 校内导航分发
  * `better-service.html` — Better Service list page
  * `better-service-detail.html` — Better Service detail page
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
  * Drawer includes “新生必看” expandable menu + “联系负责人”

---

## 3. New Modules (V1 Scope)

### 3.1 Better Service

* Purpose:
  * A **conversion-oriented module**, not a generic content page.
  * Publicly visible but designed to guide users into a **private/internal resource channel**.
* Current implementation approach:
  * **Frontend-only**
  * Static list page + static detail page
  * No backend, no auth, no data persistence yet
* Conversion goal:
  * **public page → structured persuasion → contact page / private domain**
* Entry strategy (A + B + C):
  * **A**: dedicated Better Service list entry page
  * **B**: structured detail page route (`better-service-detail.html?id=bs001`)
  * **C**: repeated CTA to contact/private channel (`contact.html` → `wechat-add.html`)
* Page structure:
  * `better-service.html`
    * page intro
    * list-style card entry
    * current item: `bs001`
  * `better-service-detail.html`
    * structured multi-section persuasion page
    * repeated CTA blocks
    * scroll-to-top on open
* CTA design:
  * full-width primary button
  * high visual weight, rounded
  * instant navigation to existing contact path
* Content strategy:
  * announcement-style / structured content
  * emphasizes verified directions, hidden internal information, timeliness, reduced trial-and-error cost
  * designed as a **private-domain funnel**, not a pure knowledge base

### 3.2 Mailbox

* Purpose:
  * A future in-product message / announcement system for users.
* Requirements:
  * admin publish
  * unread state
  * pinned posts
  * scheduled publish
* Status:
  * **planned, not yet implemented**

### 3.3 Chatbot Agent

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
  * better service content system
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
* `better_service_posts`
* `chat_sessions`
* `chat_messages`
* `admin_users`

---

## 6. Better Service (Current Focus)

### Positioning

* Better Service is a **conversion layer**, not a neutral content archive.

### UX Strategy

* Visibility should be **subtle but not hidden**
* Not aggressive marketing
* Multi-entry system is preferred over a single loud入口

### Content Strategy

* structured persuasion
* information asymmetry framing
* public-to-private funnel
* emphasizes timeliness,筛选过的信息、负责人直连

### Current Issues Fixed

* Entry was considered **too hidden**:
  * direction moved toward **A + B + C** multi-entry exposure
* Typography inconsistency:
  * normalized to existing UniDock system
  * Better Service pages reuse current spacing / card / button hierarchy

---

## 7. Design Constraints

* Apple-style minimal
* no visual noise
* no aggressive marketing UI
* mobile-first
* consistent typography and spacing

---

## 8. Development Roadmap

### Phase 0

* server setup

### Phase 1

* Better Service (done frontend)

### Phase 2

* Mailbox

### Phase 3

* Chatbot Agent

---

## 9. Key Decisions (Critical)

* Use **`device_id` instead of login**
* Better Service is **publicly visible but conversion-oriented**
* Better Service should guide users into **private/internal channel**
* Chatbot should support both **chat** and **support**
* Mailbox must support **unread state + scheduling + pinning**
* A backend/server **will be introduced**
* Frontend remains **framework-free, static-compatible, lightweight**
* Existing contact path for conversion currently resolves through:
  * `contact.html` → `wechat-add.html`

---

## 10. Next Step (Immediate)

* Start **Phase 0 backend bootstrap**:
  * scaffold server project
  * set up PostgreSQL
  * define `device_id` flow
  * establish initial entities for devices / mailbox / better service / chat / admin
* Then wire the first minimal backend capability:
  * Better Service content delivery/config management
  * prepare future mailbox and chatbot integration points
* On frontend side, if needed in the next chat:
  * add Better Service entry exposure into more site-level entry points to complete the intended **A + B + C** strategy
