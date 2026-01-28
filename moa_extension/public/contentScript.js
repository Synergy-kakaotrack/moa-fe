// NOTE: ChatGPT 코드블록 UI 제거(언어 라벨 + 코드 복사 버튼)
function removeChatGptCodeUi(root) {
  if (!root) return;

  // 1) "코드 복사" 버튼 (aria-label 기준)
  root.querySelectorAll('button[aria-label="복사"]').forEach((btn) => {
    btn.closest("div")?.remove();
  });

  // 2) 텍스트 기반 fallback
  root.querySelectorAll("button").forEach((btn) => {
    const t = (btn.textContent || "").replace(/\s+/g, " ").trim();
    if (t.includes("코드 복사") || t.toLowerCase().includes("copy code")) {
      btn.closest("div")?.remove();
    }
  });

  // 3) 언어 라벨 (select-none + text-xs + h-9)
  root
    .querySelectorAll("div.select-none.text-xs.h-9")
    .forEach((el) => el.remove());

  // 4) 짧은 언어 토큰 제거
  root.querySelectorAll("div.select-none").forEach((el) => {
    const t = (el.textContent || "").trim().toLowerCase();
    if (!t) return;

    const isLangToken =
      t.length <= 12 &&
      [
        "js","javascript","ts","typescript","python","java","c","c++","c#",
        "go","rust","kotlin","swift","php","ruby","bash","shell","sql",
        "json","yaml","yml","html","css",
      ].includes(t);

    if (isLangToken) el.remove();
  });
}

let lastSentText = "";
let isDragging = false;

document.addEventListener("mousedown", () => {
  isDragging = false;

  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
});

document.addEventListener("mousemove", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();
  if (!text) {
    selection.removeAllRanges();
    return;
  }

  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();

  const wrapper = document.createElement("div");
  wrapper.appendChild(fragment);

  //코드복사, js 등 제거 
  removeChatGptCodeUi(wrapper);

  const rawHtml = wrapper.innerHTML;

  chrome.runtime.sendMessage({
    type: "SCRAP_UPDATED",
    payload: {
      text,
      rawHtml,
      url: location.href,
      createdAt: Date.now(),
    },
  });
  selection.removeAllRanges();
});

