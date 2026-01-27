// utils/text/textToRawHtml.tsx

export function textToRawHtml(text: string): string {
  if (!text) return "";

  const blocks = text.split("\n\n");

  return blocks
    .map(block => {
      const t = block.trim();
      if (!t) return "";

      if (isCodeLike(t)) {
        return `<pre><code>${escapeHtml(t)}</code></pre>`;
      }

      return `<p>${escapeHtml(t)}</p>`;
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
