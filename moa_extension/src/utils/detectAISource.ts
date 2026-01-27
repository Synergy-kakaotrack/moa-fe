export type AISource = "ChatGPT" | "Claude" | "Gemini" | "Unknown";

export function detectAISource(url?: string): AISource {
  if (!url) return "Unknown";

  const lower = url.toLowerCase();

  // ChatGPT
  if (
    lower.includes("chat.openai.com") ||
    lower.includes("chatgpt.com")
  ) {
    return "ChatGPT";
  }

  // Claude
  if (lower.includes("claude.ai")) {
    return "Claude";
  }

  // Gemini
  if (
    lower.includes("gemini.google.com") ||
    lower.includes("bard.google.com")
  ) {
    return "Gemini";
  }

  return "Unknown";
}
