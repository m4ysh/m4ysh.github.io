(() => {
  const formatGMT = (date) => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).formatToParts(date);
    const get = (t) => parts.find((p) => p.type === t).value;
    return `${get("hour")}:${get("minute")}:${get("second")}`;
  };

  const tickClock = () => {
    const nodes = document.querySelectorAll("[data-clock]");
    const now = new Date();
    const stamp = formatGMT(now);
    nodes.forEach((n) => {
      n.textContent = stamp;
    });
  };

  tickClock();
  setInterval(tickClock, 1000);

  const dialog = document.querySelector(".command-dialog");
  const opener = document.querySelector("[data-command]");
  const closeBtn = dialog && dialog.querySelector(".command-top button");

  const open = () => {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  };
  const close = () => {
    if (!dialog) return;
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  };

  if (opener) opener.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (dialog && dialog.open) close();
      else open();
    } else if (e.key === "Escape" && dialog && dialog.open) {
      close();
    }
  });

  document.querySelectorAll(".command-list a").forEach((a) => {
    a.addEventListener("click", () => close());
  });
})();
