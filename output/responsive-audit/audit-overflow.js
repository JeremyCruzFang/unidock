const wsUrl = process.argv[2];
const root = "file:///E:/unidock/";
const pages = [
  "index.html",
  "xinshengbikan.html",
  "campus-resources.html",
  "qa.html",
  "baodaoquanliucheng.html",
  "xingqianzhunbei.html",
  "xiaoyuanxitongdaohang.html",
  "xinshengbikeng.html",
  "wechat-add.html",
  "campus-map-redirect.html",
  "official-site-redirect.html",
  "campus-navigation-redirect.html",
  "life-resources-redirect.html"
];
const widths = [320, 375, 390, 430, 768, 1440];

if (!wsUrl) {
  console.error("Missing WebSocket URL");
  process.exit(1);
}

const ws = new WebSocket(wsUrl);
let id = 0;
const pending = new Map();

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const messageId = ++id;
    pending.set(messageId, { resolve, reject });
    ws.send(JSON.stringify({ id: messageId, method, params }));
  });
}

function waitForLoad() {
  return new Promise((resolve) => {
    const handler = (event) => {
      const message = JSON.parse(event.data);
      if (message.method === "Page.loadEventFired") {
        ws.removeEventListener("message", handler);
        resolve();
      }
    };
    ws.addEventListener("message", handler);
  });
}

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) {
    return;
  }
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) {
    reject(new Error(message.error.message));
    return;
  }
  resolve(message.result);
};

ws.onopen = async () => {
  try {
    await send("Page.enable");
    await send("Runtime.enable");
    const results = [];

    for (const page of pages) {
      for (const width of widths) {
        await send("Emulation.setDeviceMetricsOverride", {
          width,
          height: width >= 768 ? 1024 : 844,
          deviceScaleFactor: 1,
          mobile: width < 768
        });
        const loaded = waitForLoad();
        await send("Page.navigate", { url: root + page });
        await loaded;
        await new Promise((resolve) => setTimeout(resolve, 150));

        const expression = `(() => {
          const iw = innerWidth;
          const de = document.documentElement;
          const offenders = [...document.querySelectorAll("*")]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName.toLowerCase(),
                className: typeof element.className === "string" ? element.className : "",
                id: element.id,
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                text: (element.innerText || "").trim().slice(0, 50)
              };
            })
            .filter((item) => item.right > iw + 1 || item.left < -1)
            .slice(0, 8);
          return {
            page: ${JSON.stringify(page)},
            width: ${width},
            innerWidth: iw,
            scrollWidth: de.scrollWidth,
            bodyScroll: document.body.scrollWidth,
            overflow: Math.max(de.scrollWidth, document.body.scrollWidth) > iw + 1,
            offenders
          };
        })()`;

        const evaluated = await send("Runtime.evaluate", {
          expression,
          returnByValue: true
        });
        results.push(evaluated.result.value);
      }
    }

    const failures = results.filter((result) => result.overflow);
    console.log(JSON.stringify({ checked: results.length, failures }, null, 2));
    ws.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
