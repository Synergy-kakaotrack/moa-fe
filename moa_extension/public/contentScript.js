let dragSessionId = null;
let lastText = "";

const safeSendMessage = (message) => {
  try {
    if (chrome?.runtime?.id && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(message);
    }
  } catch {
    console.warn("Extension context invalidated, skip sendMessage");
  }
};

document.addEventListener("mousedown", () => {
  dragSessionId = Date.now();
  lastText = "";
});

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();
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
