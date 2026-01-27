// src/utils/text/textToHtml.tsx

export function textToHtml(rawText: string): string {
  if (!rawText) return "";

  const blocks = rawText.split("\n\n");

  return blocks
    .map(block => {
      const text = block.trim();
      if (!text) return "";

      // 코드처럼 보이는 경우
      if (isCodeLike(text)) {
        return (
          `<pre><code>${escapeHtml(text)}</code></pre>`
        );
      }

      // 일반 문단
      return `<p>${escapeHtml(text)}</p>`;
    })
    .join("");
}

function isCodeLike(text: string): boolean {
  return (
    text.includes("=>") ||
    text.includes("();") ||
    text.includes("{") ||
    text.includes("}")
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
