// api/types/scrap.ts
export interface Scrap {
  scrapId: number;
  projectId: number;
  stage: string;
  subtitle: string;
  memo?: string | null;
  capturedAt: string;
  agent: string;
}

export interface ScrapListResponse {
  items: Scrap[];
  nextCursor?: string;
}