(function () {
  const STORAGE_KEY = "mailbox_read_ids";
  const mailboxData = [
    {
      id: "mb001",
      title: {
        zh: "UniDock 已上线 Better Service",
        en: "Better Service is now live on UniDock"
      },
      content: {
        zh: "Better Service 已开放内部资源入口。\n\n你现在可以通过首页卡片、顶部导航栏 Better 入口或目录菜单进入对应页面。\n\n该模块会持续承载经过整理的内部资源方向与后续更新。",
        en: "Better Service is now available as an internal resource entry.\n\nYou can open it from the homepage card, the Better link in the top navbar, or the global drawer menu.\n\nThis module will continue to carry curated internal resource directions and follow-up updates."
      },
      date: "2026-04-20",
      pinned: true
    },
    {
      id: "mb002",
      title: {
        zh: "新生必看模块更新",
        en: "Freshman Must-Read module updated"
      },
      content: {
        zh: "我们优化了新生必看模块的结构。\n\n现在可以更快定位报到流程、行前准备、避坑提示与校内系统导航四类核心内容。",
        en: "We refined the structure of the Freshman Must-Read module.\n\nIt is now faster to reach the four core areas: arrival steps, pre-departure prep, pitfall notes, and campus systems guidance."
      },
      date: "2026-04-18",
      pinned: false
    },
    {
      id: "mb003",
      title: {
        zh: "联系方式页已完成整理",
        en: "The contact page has been cleaned up"
      },
      content: {
        zh: "联系方式页已统一整理为同一套结构。\n\n手机号、微信与邮箱可以直接复制，减少重复确认与手动记录的成本。",
        en: "The contact page now follows one consistent structure.\n\nPhone numbers, WeChat values, and email addresses can be copied directly to reduce repeated confirmation."
      },
      date: "2026-04-16",
      pinned: false
    },
    {
      id: "mb004",
      title: {
        zh: "校内系统导航补充说明",
        en: "Campus systems guide updated with extra notes"
      },
      content: {
        zh: "我们补充了校内常用系统与应用的入口说明。\n\n后续如果有新增站内指引，也会优先通过 Mailbox 进行提醒。",
        en: "We added more notes for commonly used campus systems and apps.\n\nIf more internal guidance is added later, Mailbox will remain the first place for reminders."
      },
      date: "2026-04-14",
      pinned: false
    }
  ];

  function t(key) {
    if (!window.UniDockI18n || typeof window.UniDockI18n.t !== "function") {
      return "";
    }

    return window.UniDockI18n.t(key);
  }

  function getLanguage() {
    if (!window.UniDockI18n || typeof window.UniDockI18n.getLanguage !== "function") {
      return "zh";
    }

    return window.UniDockI18n.getLanguage();
  }

  function normalizeReadIds(value) {
    if (!Array.isArray(value)) {
      return [];
    }

    return value.filter(function (id) {
      return typeof id === "string";
    });
  }

  function readStoredIds() {
    try {
      return normalizeReadIds(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch (error) {
      return [];
    }
  }

  function writeStoredIds(ids) {
    const uniqueIds = Array.from(new Set(normalizeReadIds(ids)));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueIds));
    } catch (error) {
      return uniqueIds;
    }

    dispatchMailboxStateChange();
    return uniqueIds;
  }

  function getReadIds() {
    return readStoredIds();
  }

  function markAsRead(id) {
    if (!id) {
      return getReadIds();
    }

    const readIds = getReadIds();

    if (readIds.indexOf(id) === -1) {
      readIds.push(id);
      return writeStoredIds(readIds);
    }

    return readIds;
  }

  function markAllAsRead() {
    return writeStoredIds(
      mailboxData.map(function (message) {
        return message.id;
      })
    );
  }

  function isUnread(id) {
    return getReadIds().indexOf(id) === -1;
  }

  function getUnreadCount() {
    return mailboxData.reduce(function (count, message) {
      return count + (isUnread(message.id) ? 1 : 0);
    }, 0);
  }

  function getDateValue(message) {
    const timestamp = new Date(message.date + "T00:00:00").getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
  }

  function sortMessages(messages) {
    return messages.slice().sort(function (left, right) {
      if (left.pinned !== right.pinned) {
        return left.pinned ? -1 : 1;
      }

      return getDateValue(right) - getDateValue(left);
    });
  }

  function getSortedMessages() {
    return sortMessages(mailboxData);
  }

  function getPinnedMessages() {
    return getSortedMessages().filter(function (message) {
      return message.pinned;
    });
  }

  function getRegularMessages() {
    return getSortedMessages().filter(function (message) {
      return !message.pinned;
    });
  }

  function getMessageById(id) {
    return mailboxData.find(function (message) {
      return message.id === id;
    }) || null;
  }

  function getLocalizedField(field) {
    const lang = getLanguage();

    if (typeof field === "string") {
      return field;
    }

    if (field && typeof field === "object") {
      return field[lang] || field.zh || field.en || "";
    }

    return "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");
    const lang = getLanguage();

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    if (lang === "en") {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }

    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\//g, "-");
  }

  function formatContent(content) {
    return getLocalizedField(content)
      .split(/\n{2,}/)
      .map(function (paragraph) {
        return paragraph.trim();
      })
      .filter(Boolean)
      .map(function (paragraph) {
        return "<p>" + escapeHtml(paragraph).replace(/\n/g, "<br>") + "</p>";
      })
      .join("");
  }

  function createMailboxItemMarkup(message) {
    return (
      '<a class="mailbox-item" href="./mailbox-detail.html?id=' + encodeURIComponent(message.id) + '">' +
        '<div class="mailbox-item__main">' +
          '<div class="mailbox-item__title-row">' +
            "<h3>" + escapeHtml(getLocalizedField(message.title)) + "</h3>" +
            (message.pinned ? '<span class="mailbox-item__badge">' + escapeHtml(t("mailbox.pinnedBadge")) + "</span>" : "") +
          "</div>" +
        "</div>" +
        '<div class="mailbox-item__meta">' +
          '<span class="mailbox-item__date">' + escapeHtml(formatDate(message.date)) + "</span>" +
          (isUnread(message.id) ? '<span class="mailbox-unread-dot" aria-hidden="true"></span>' : "") +
        "</div>" +
      "</a>"
    );
  }

  function renderMailboxList(container, messages, emptyText) {
    if (!container) {
      return;
    }

    if (!messages.length) {
      container.innerHTML = '<p class="mailbox-empty">' + escapeHtml(emptyText) + "</p>";
      return;
    }

    container.innerHTML = messages.map(createMailboxItemMarkup).join("");
  }

  function updateMarkAllButton(button) {
    if (!button) {
      return;
    }

    button.disabled = getUnreadCount() === 0;
  }

  function renderMailboxListPage() {
    const pinnedSection = document.querySelector('[data-mailbox-section="pinned"]');
    const pinnedContainer = document.querySelector('[data-mailbox-list="pinned"]');
    const regularContainer = document.querySelector('[data-mailbox-list="regular"]');
    const markAllButton = document.querySelector("[data-mailbox-mark-all]");
    const pinnedMessages = getPinnedMessages();
    const regularMessages = getRegularMessages();

    if (pinnedSection) {
      pinnedSection.hidden = pinnedMessages.length === 0;
    }

    renderMailboxList(pinnedContainer, pinnedMessages, t("mailbox.noPinned"));
    renderMailboxList(regularContainer, regularMessages, t("mailbox.noMessages"));
    updateMarkAllButton(markAllButton);
  }

  function renderMailboxDetailPage() {
    const params = new URLSearchParams(window.location.search);
    const message = getMessageById(params.get("id"));
    const titleElement = document.querySelector("[data-mailbox-detail-title]");
    const dateElement = document.querySelector("[data-mailbox-detail-date]");
    const contentElement = document.querySelector("[data-mailbox-detail-content]");

    if (!titleElement || !dateElement || !contentElement) {
      return;
    }

    if (!message) {
      titleElement.textContent = t("mailbox.notFoundTitle");
      dateElement.textContent = t("mailbox.notFoundDate");
      contentElement.innerHTML = "<p>" + escapeHtml(t("mailbox.notFoundBody")) + "</p>";
      document.title = "UniDock | " + t("mailbox.headerTitle");
      return;
    }

    markAsRead(message.id);
    titleElement.textContent = getLocalizedField(message.title);
    dateElement.textContent = formatDate(message.date);
    contentElement.innerHTML = formatContent(message.content);
    document.title = "UniDock | " + getLocalizedField(message.title);
  }

  function dispatchMailboxStateChange() {
    window.dispatchEvent(
      new CustomEvent("unidock:mailbox-state-change", {
        detail: {
          unreadCount: getUnreadCount()
        }
      })
    );
  }

  function bindMailboxPageEvents() {
    const markAllButton = document.querySelector("[data-mailbox-mark-all]");

    if (markAllButton) {
      markAllButton.addEventListener("click", function () {
        markAllAsRead();
        renderMailboxListPage();
      });
    }
  }

  function rerenderMailboxView() {
    const view = document.body.getAttribute("data-mailbox-view");

    if (view === "list") {
      renderMailboxListPage();
    }

    if (view === "detail") {
      renderMailboxDetailPage();
    }
  }

  window.addEventListener("storage", function (event) {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    rerenderMailboxView();
    dispatchMailboxStateChange();
  });

  window.addEventListener("unidock:language-change", function () {
    rerenderMailboxView();
  });

  document.addEventListener("DOMContentLoaded", function () {
    bindMailboxPageEvents();
    rerenderMailboxView();
    dispatchMailboxStateChange();
  });

  window.UniDockMailbox = {
    STORAGE_KEY: STORAGE_KEY,
    mailboxData: mailboxData.slice(),
    getReadIds: getReadIds,
    markAsRead: markAsRead,
    isUnread: isUnread,
    getUnreadCount: getUnreadCount,
    markAllAsRead: markAllAsRead,
    getSortedMessages: getSortedMessages,
    getPinnedMessages: getPinnedMessages,
    getRegularMessages: getRegularMessages,
    getMessageById: getMessageById
  };
})();
