(function () {
  function setRevealDelay(element) {
    const delay = element.getAttribute("data-delay");

    if (delay) {
      element.style.setProperty("--reveal-delay", delay + "ms");
    }
  }

  function initReveal() {
    const revealElements = document.querySelectorAll("[data-reveal]");

    revealElements.forEach(setRevealDelay);

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function syncHeaderOffset(header) {
    if (!header) {
      return;
    }

    const headerHeight = Math.ceil(header.getBoundingClientRect().height + 12);
    document.documentElement.style.setProperty("--header-offset", headerHeight + "px");
  }

  function initHeaderState() {
    const header = document.querySelector(".site-header");

    if (!header) {
      return;
    }

    const updateHeader = function () {
      header.classList.toggle("site-header--scrolled", window.scrollY > 8);
      syncHeaderOffset(header);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader, { passive: true });

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(function () {
        syncHeaderOffset(header);
      });

      resizeObserver.observe(header);
    }
  }

  function initRedirectPage() {
    const page = document.querySelector("[data-redirect-page]");

    if (!page) {
      return;
    }

    const target = page.getAttribute("data-redirect-target");
    const delay = Number(page.getAttribute("data-redirect-delay") || "3");
    const countElement = page.querySelector("[data-redirect-count]");
    const openButton = page.querySelector("[data-redirect-open]");
    const homeButton = page.querySelector("[data-redirect-home]");

    if (!target) {
      return;
    }

    let remaining = delay;
    let timerId = 0;

    if (countElement) {
      countElement.textContent = String(remaining);
    }

    const stopTimer = function () {
      if (timerId) {
        window.clearInterval(timerId);
        timerId = 0;
      }
    };

    const redirectNow = function () {
      stopTimer();
      window.location.href = target;
    };

    if (openButton) {
      openButton.addEventListener("click", function () {
        stopTimer();
      });
    }

    if (homeButton) {
      homeButton.addEventListener("click", function () {
        stopTimer();
      });
    }

    if (delay <= 0) {
      redirectNow();
      return;
    }

    timerId = window.setInterval(function () {
      remaining -= 1;

      if (remaining > 0) {
        if (countElement) {
          countElement.textContent = String(remaining);
        }
        return;
      }

      redirectNow();
    }, 1000);

    window.addEventListener("pagehide", stopTimer, { once: true });
  }

  function copyToClipboard(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise(function (resolve, reject) {
      const input = document.createElement("textarea");

      input.value = value;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.top = "0";
      input.style.left = "0";
      input.style.opacity = "0";

      document.body.appendChild(input);
      input.focus();
      input.select();

      try {
        const successful = document.execCommand("copy");
        document.body.removeChild(input);

        if (successful) {
          resolve();
          return;
        }
      } catch (error) {
        document.body.removeChild(input);
        reject(error);
        return;
      }

      reject(new Error("copy failed"));
    });
  }

  function initCopyButtons() {
    const copyButtons = document.querySelectorAll("[data-copy-value]");

    if (!copyButtons.length) {
      return;
    }

    copyButtons.forEach(function (button) {
      const defaultLabel = button.getAttribute("data-copy-default") || button.textContent.trim();
      const successLabel = button.getAttribute("data-copy-success") || defaultLabel;
      let resetTimer = 0;

      button.addEventListener("click", function () {
        const value = button.getAttribute("data-copy-value");

        if (!value) {
          return;
        }

        copyToClipboard(value)
          .then(function () {
            window.clearTimeout(resetTimer);
            button.textContent = successLabel;
            button.classList.add("is-copied");

            resetTimer = window.setTimeout(function () {
              button.textContent = defaultLabel;
              button.classList.remove("is-copied");
            }, 1600);
          })
          .catch(function () {
            window.clearTimeout(resetTimer);
            button.textContent = defaultLabel;
            button.classList.remove("is-copied");
          });
      });
    });
  }

  function markPageReady() {
    window.requestAnimationFrame(function () {
      document.body.classList.add("page-is-ready");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    markPageReady();
    initReveal();
    initHeaderState();
    initRedirectPage();
    initCopyButtons();
  });
})();
