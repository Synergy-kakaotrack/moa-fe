import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false,       // HTML 직접 입력 방지 (보안)
  breaks: true,      // 줄바꿈 → <br>
  linkify: true,     // URL 자동 링크
});

export function textToRawHtml(text: string): string {
  return md.render(text);
}
