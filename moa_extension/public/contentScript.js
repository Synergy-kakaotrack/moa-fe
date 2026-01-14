let lastText = "";

document.addEventListener("mouseup", () => {
  console.log("✅ MOA contentScript loaded");
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();

  // 공백 / 너무 짧은 텍스트 무시
  if (!text || text.length < 3) return;

  // 같은 텍스트 중복 방지
  if (text === lastText) return;
  lastText = text;

  chrome.runtime.sendMessage({
    type: "SCRAP_TEXT",
    payload: {
      text,
      url: location.href,
      source: detectAISource(),
      createdAt: Date.now(),
    },
  });
});

function detectAISource() {
  const host = location.hostname;
  if (host.includes("openai.com")) return "ChatGPT";
  if (host.includes("claude.ai")) return "Claude";
  if (host.includes("google.com")) return "Gemini";
  return "Unknown";
}
