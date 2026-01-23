let dragSessionId = null;
let savedTextsInThisDrag = new Set(); //같은 드래그 동작 중 중복 방지 

const safeSendMessage = (message) => {
  try {
    if (chrome?.runtime?.id && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(message);
    }
  } catch {
    console.warn("Extension context invalidated, skip sendMessage");
  }
};

//드래그 시작 
document.addEventListener("mousedown", () => {
  dragSessionId = Date.now();
  savedTextsInThisDrag.clear();
});
//스크랩 저장 
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();
  if (!text || text.length < 3) return;

  if (savedTextsInThisDrag.has(text)) return; //같은 드래그 내 중복 방지

  savedTextsInThisDrag.add(text);

  safeSendMessage({
    type: "SCRAP_TEXT",
    payload: {
      text,
      url: location.href,
      source: detectAISource(),
      createdAt: Date.now(),
      dragSessionId,
    },
  });

  selection.removeAllRanges();
});

function detectAISource() {
  const host = location.hostname;
  if (host.includes("chatgpt.com")) return "ChatGPT";
  if (host.includes("claude.ai")) return "Claude";
  if (host.includes("google.com")) return "Gemini";
  return "Unknown";
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    dragSessionId = null;
    savedTextsInThisDrag.clear();
  }
});
