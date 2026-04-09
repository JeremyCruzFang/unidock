(function () {
  function createBrandMarkup() {
    return (
      '<a class="brand" href="./index.html" aria-label="UniDock">' +
        '<span class="brand__mark">U</span>' +
        '<span class="brand__text">' +
          "<strong>UniDock</strong>" +
          '<span data-i18n="header.subline">NUIST Freshman Hub</span>' +
        "</span>" +
      "</a>"
    );
  }

  function createLangSwitchMarkup() {
    return (
      '<div class="lang-switch" data-i18n-aria-label="header.languageLabel" aria-label="Language switch">' +
        '<svg class="lang-switch__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" />' +
          '<path d="M4.5 9H19.5" />' +
          '<path d="M4.5 15H19.5" />' +
          '<path d="M12 3C14.2386 5.18991 15.5 8.07785 15.5 12C15.5 15.9221 14.2386 18.8101 12 21C9.76142 18.8101 8.5 15.9221 8.5 12C8.5 8.07785 9.76142 5.18991 12 3Z" />' +
        "</svg>" +
        '<div class="lang-switch__buttons">' +
          '<button class="lang-switch__button is-active" type="button" data-lang-switch="zh">&#20013;</button>' +
          '<button class="lang-switch__button" type="button" data-lang-switch="en">EN</button>' +
        "</div>" +
      "</div>"
    );
  }

  function createMenuButton() {
    const button = document.createElement("button");

    button.id = "menu-toggle";
    button.className = "menu-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Open menu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      "</svg>";

    return button;
  }

  function ensureStandaloneHeader() {
    if (document.querySelector(".site-header")) {
      return;
    }

    const header = document.createElement("header");
    const inner = document.createElement("div");
    const left = document.createElement("div");
    const back = document.createElement("a");
    const background = document.querySelector(".site-background");
    const redirectBack = document.querySelector(".redirect-back");

    header.className = "site-header";
    inner.className = "container site-header__inner";
    left.className = "subpage-header__group";

    back.className = "subpage-back";
    back.href = "./index.html";
    back.innerHTML =
      '<span aria-hidden="true">&larr;</span>' +
      '<span data-i18n="subpage.back">&#36820;&#22238;&#39318;&#39029;</span>';

    left.appendChild(back);
    left.insertAdjacentHTML("beforeend", createBrandMarkup());
    inner.appendChild(left);
    inner.insertAdjacentHTML("beforeend", createLangSwitchMarkup());
    header.appendChild(inner);

    if (background && background.nextSibling) {
      background.parentNode.insertBefore(header, background.nextSibling);
    } else if (background) {
      background.parentNode.appendChild(header);
    } else {
      document.body.insertBefore(header, document.body.firstChild);
    }

    if (redirectBack) {
      redirectBack.remove();
    }
  }

  function ensureBrandMenuGroup(parent) {
    if (!parent) {
      return null;
    }

    let group = parent.querySelector(".header-brand-menu");

    if (group) {
      return group;
    }

    const brand = parent.querySelector(".brand");

    if (!brand) {
      return null;
    }

    group = document.createElement("div");
    group.className = "header-brand-menu";
    parent.insertBefore(group, brand);
    group.appendChild(brand);

    return group;
  }

  function ensureMenuButton() {
    if (document.getElementById("menu-toggle")) {
      return;
    }

    const headerInner = document.querySelector(".site-header__inner");
    const subpageGroup = headerInner ? headerInner.querySelector(".subpage-header__group") : null;
    const host = ensureBrandMenuGroup(subpageGroup || headerInner);

    if (!host) {
      return;
    }

    host.appendChild(createMenuButton());
  }

  function ensureDrawer() {
    if (document.getElementById("drawer")) {
      return;
    }

    const overlay = document.createElement("div");
    const drawer = document.createElement("aside");

    overlay.id = "drawer-overlay";
    drawer.id = "drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML =
      "<nav>" +
        '<ul class="drawer-list">' +
          '<li class="drawer-item expandable">' +
            '<button class="drawer-title" type="button">' +
              '<span>&#26032;&#29983;&#24517;&#30475;</span>' +
              '<span class="arrow">&#9662;</span>' +
            "</button>" +
            '<ul class="drawer-sub">' +
              '<li data-link="./baodaoquanliucheng.html" tabindex="0">&#25253;&#36947;&#20934;&#22791;</li>' +
              '<li data-link="./life-resources-redirect.html" tabindex="0">&#29983;&#27963;&#36164;&#28304;</li>' +
              '<li data-link="./xiaoyuanxitongdaohang.html" tabindex="0">&#26657;&#20869;&#23548;&#33322;</li>' +
            "</ul>" +
          "</li>" +
          '<li class="drawer-item" data-link="./wechat-add.html" tabindex="0">&#32852;&#31995;&#36127;&#36131;&#20154;</li>' +
        "</ul>" +
      "</nav>";

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }

  function bindDrawer() {
    const toggle = document.getElementById("menu-toggle");
    const drawer = document.getElementById("drawer");
    const overlay = document.getElementById("drawer-overlay");

    if (!toggle || !drawer || !overlay) {
      return;
    }

    const openDrawer = function () {
      drawer.classList.add("open");
      overlay.classList.add("show");
      drawer.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("drawer-open");
    };

    const closeDrawer = function () {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
      drawer.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("drawer-open");
    };

    toggle.addEventListener("click", function () {
      if (drawer.classList.contains("open")) {
        closeDrawer();
        return;
      }

      openDrawer();
    });

    overlay.addEventListener("click", closeDrawer);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && drawer.classList.contains("open")) {
        closeDrawer();
      }
    });

    drawer.querySelectorAll(".expandable").forEach(function (item) {
      const title = item.querySelector(".drawer-title");

      if (!title) {
        return;
      }

      title.addEventListener("click", function () {
        item.classList.toggle("expanded");
      });
    });

    drawer.querySelectorAll("[data-link]").forEach(function (element) {
      element.addEventListener("click", function () {
        const target = element.getAttribute("data-link");

        if (!target) {
          return;
        }

        closeDrawer();
        window.location.href = target;
      });

      element.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          element.click();
        }
      });
    });
  }

  function removeHomepageTopTag() {
    const heroTopTag = document.querySelector(".hero-floating--top");

    if (heroTopTag) {
      heroTopTag.remove();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    removeHomepageTopTag();
    ensureStandaloneHeader();
    ensureMenuButton();
    ensureDrawer();
    bindDrawer();
  });
})();
