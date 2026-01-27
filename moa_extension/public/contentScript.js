let lastSentText = "";

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();
  if (!text) return;

  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();

  const wrapper = document.createElement("div");
  wrapper.appendChild(fragment);

  const rawHtml = wrapper.innerHTML;

  chrome.runtime.sendMessage({
    type: "SCRAP_UPDATED",
    payload: {
      text,        // ✅ 기존 그대로
      rawHtml,     // ✅ 신규 추가
      url: location.href,
      createdAt: Date.now(),
    },
  });
});

