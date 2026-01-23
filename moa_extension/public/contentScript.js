let dragSessionId = null;
let lastText = ""; //같은 텍스트 중복 방지

let hasSavedInThisDrag = false; //같은 드래그 동작 중 중복 방지 

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
  lastText = "";
  hasSavedInThisDrag = false;
});
//스크랩 저장 
document.addEventListener("mouseup", () => {
  if(hasSavedInThisDrag) return; 

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const safeTrim = (v) => (typeof v === "string" ? v.trim() : "");
  const text = safeTrim(selection?.toString());
  
  if (!text || text.length < 3) return;
  if (text === lastText) return;

  lastText = text;

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

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    lastText = "";
  }
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
    lastText = "";
    dragSessionId = null;
  }
});
