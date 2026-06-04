const wsUrl = process.argv[2];

if (!wsUrl) {
  console.error("Missing WebSocket URL");
  process.exit(1);
}

const ws = new WebSocket(wsUrl);
let id = 0;

ws.onopen = () => {
  const expression = `JSON.stringify((() => {
    const iw = innerWidth;
    const de = document.documentElement;
    const offenders = [...document.querySelectorAll("*")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const className = element.className && typeof element.className === "string"
          ? "." + element.className.trim().replace(/\\s+/g, ".")
          : "";

        return {
          tag: element.tagName.toLowerCase(),
          className,
          id: element.id,
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          text: (element.innerText || "").trim().slice(0, 80)
        };
      })
      .filter((item) => item.right > iw + 1 || item.left < -1)
      .sort((left, right) => right.right - left.right)
      .slice(0, 30);

    return {
      innerWidth: iw,
      clientWidth: de.clientWidth,
      scrollWidth: de.scrollWidth,
      bodyScroll: document.body.scrollWidth,
      offenders
    };
  })())`;

  ws.send(JSON.stringify({
    id: ++id,
    method: "Runtime.evaluate",
    params: {
      expression,
      returnByValue: true
    }
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (!message.id) {
    return;
  }

  console.log(message.result.result.value);
  ws.close();
};

ws.onerror = (event) => {
  console.error(event.message || "WebSocket error");
  process.exit(1);
};
