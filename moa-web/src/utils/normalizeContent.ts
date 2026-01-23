import DOMPurify from 'dompurify';
import { marked } from 'marked';

import type { ScrapContentType } from '@/domain/scrap';

/* ========================================
   Types
======================================== */

export interface NormalizeContentInput {
  contentType: ScrapContentType;
  content: string;
}

export interface NormalizeContentOutput {
  html: string;
}

/* ========================================
   Sanitize Config
======================================== */

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'strong', 'em', 'del', 's',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'img', 'figure', 'figcaption',
    'div', 'span',
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel',
    'src', 'alt', 'title', 'width', 'height',
    'class', 'id',
  ],
  ALLOW_DATA_ATTR: false,
};

/* ========================================
   Converters
======================================== */

function convertMarkdownToHtml(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // SSR 환경에서는 sanitize 생략 (클라이언트에서 처리)
    return html;
  }
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
}

/* ========================================
   Main Function
======================================== */

export function normalizeContent({
  contentType,
  content,
}: NormalizeContentInput): NormalizeContentOutput {
  let html: string;

  switch (contentType) {
    case 'MARKDOWN':
      html = convertMarkdownToHtml(content);
      break;

    case 'RAW_HTML':
      html = content;
      break;

    default:
      // 확장성: 새로운 contentType 추가 시 case 추가
      const _exhaustiveCheck: never = contentType;
      throw new Error(`Unknown contentType: ${_exhaustiveCheck}`);
  }

  return {
    html: sanitizeHtml(html),
  };
}
