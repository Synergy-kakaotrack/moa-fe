console.log("🔥 RUNNING contentScript VERSION = final-safe");

(function () {
  // ✅ iframe 차단
  if (window.top !== window.self) {
    console.log("⛔ iframe detected, skip");
    return;
  }

  let lastText = "";

  document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const text = selection.toString().trim();
    if (!text || text.length < 3) return;

    if (text === lastText) return;
    lastText = text;

    // ✅ 최종 안전 전송
    try {
      chrome?.runtime?.sendMessage?.({
        type: "SCRAP_TEXT",
        payload: {
          text,
          url: location.href,
          createdAt: Date.now(),
        },
      });
    } catch (e) {
      // 아무 것도 하지 않음 (웹 / iframe 보호)
    }
  });
})();
