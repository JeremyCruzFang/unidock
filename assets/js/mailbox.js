(function () {
  const STORAGE_KEY = "mailbox_read_ids";
  const mailboxData = [
    {
      id: "mb001",
      title: "UniDock 已上线 Better Service",
      content:
        "Better Service 已开放内部资源入口。\n\n你可以通过首页卡片、顶部导航栏 Better 入口或共享菜单进入对应页面。\n\n该模块会持续承载经过整理的内部资源方向与后续更新。",
      date: "2026-04-20",
      pinned: true
    },
    {
      id: "mb002",
      title: "新生必看模块更新",
      content:
        "我们优化了新生必看模块的结构。\n\n现在可以更快定位报道流程、行前准备、避坑提示与校内系统导航四类核心内容。",
      date: "2026-04-18",
      pinned: false
    },
    {
      id: "mb003",
      title: "联系方式页已完成整理",
      content:
        "联系方式页已统一整理为同一套结构。\n\n手机、微信与邮箱可以直接复制，减少重复确认与手动记录的成本。",
      date: "2026-04-16",
      pinned: false
    },
    {
      id: "mb004",
      title: "校内系统导航补充说明",
      content:
        "我们补充了校内常用系统与应用的入口说明。\n\n后续如果有新增站内指引，也会优先通过 Mailbox 进行提醒。",
      date: "2026-04-14",
      pinned: false
    }
  ];

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

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).replace(/\//g, "-");
  }

  function formatContent(content) {
    return content
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
            "<h3>" + escapeHtml(message.title) + "</h3>" +
            (message.pinned ? '<span class="mailbox-item__badge">置顶</span>' : "") +
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

    renderMailboxList(pinnedContainer, pinnedMessages, "暂无置顶消息。");
    renderMailboxList(regularContainer, regularMessages, "暂无消息。");
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
      titleElement.textContent = "消息不存在";
      dateElement.textContent = "请返回 Mailbox 查看其他消息";
      contentElement.innerHTML = "<p>当前消息不存在，或暂时无法读取。</p>";
      document.title = "UniDock | Mailbox";
      return;
    }

    markAsRead(message.id);
    titleElement.textContent = message.title;
    dateElement.textContent = formatDate(message.date);
    contentElement.innerHTML = formatContent(message.content);
    document.title = "UniDock | " + message.title;
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

  window.addEventListener("storage", function (event) {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    if (document.body.getAttribute("data-mailbox-view") === "list") {
      renderMailboxListPage();
    }

    dispatchMailboxStateChange();
  });

  document.addEventListener("DOMContentLoaded", function () {
    const view = document.body.getAttribute("data-mailbox-view");

    bindMailboxPageEvents();

    if (view === "list") {
      renderMailboxListPage();
    }

    if (view === "detail") {
      renderMailboxDetailPage();
    }

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
