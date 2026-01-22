// api/types/scrap.ts

/**
 * 서버 응답 그대로의 Scrap DTO
 */
export interface Scrap {
  scrapId: number;
  projectId: number;
  stage: string;

  subtitle: string;
  memo?: string | null;

  aiSource: string;
  aiSourceUrl: string;

  capturedAt: string;

  rawHtml?: string;
  rawHtmlToMarkdown?: string;
}

export interface ScrapListResponse {
  items: Scrap[];
  nextCursor?: string;
}