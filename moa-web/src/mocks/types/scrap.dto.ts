// src/mocks/types/scrap.dto.ts

/**
 * /api/scraps/{scrapId} 응답 mock 타입
 * - 서버 응답 형태를 그대로 흉내냄
 * - UI에서는 절대 직접 사용하지 않음
 */

export interface ScrapDetailMockBase {
  scrapId: number;
  projectId: number;
  stage: string;
  subtitle: string;
  memo?: string | null;

  aiSource: string;
  aiSourceUrl: string;

  capturedAt: string; // ISO string
}

/**
 * rawHtml → Markdown 변환 실패 케이스
 */
export interface ScrapDetailHtmlMock
  extends ScrapDetailMockBase {
  rawHtml: string;
}

/**
 * rawHtml → Markdown 변환 성공 케이스
 */
export interface ScrapDetailMarkdownMock
  extends ScrapDetailMockBase {
  rawHtmlToMarkdown: string;
}

/**
 * 최종 mock 타입 (API 응답과 동일한 분기 구조)
 */
export type ScrapDetailMock =
  | ScrapDetailHtmlMock
  | ScrapDetailMarkdownMock;