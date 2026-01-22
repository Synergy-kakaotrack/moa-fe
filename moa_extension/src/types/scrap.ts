
import type { AISource, ISODateTime, Stage } from "./common";

//Scrap (API Response)

//ScrapList 
export interface ScrapSummary {
  scrapId: number;
  projectId: number;
  stage: Stage;
  subtitle: string;
  memo: string | null;
  capturedAt: ISODateTime;
}

//Scrap 상세 전체 
export interface ScrapDetail {
  scrapId: number;
  projectId: number;
  stage: Stage;
  subtitle: string;
  memo: string | null;
  rawHtml: string;

  aiSource: AISource;
  aiSourceUrl: string;
  capturedAt: ISODateTime;
}

/* ===== API Params / Responses ===== */

export interface GetScrapsParams {
  projectId: number;
  stage: Stage;
  cursor?: string;
  limit?: number;
}

export interface RecentScrapContextItem {
  projectId: number;
  projectName: string;
  lastStage: Stage;
  lastCapturedAt: ISODateTime;
}

export interface RecentScrapContextResponse {
  items: RecentScrapContextItem[];
}

export interface UpdateScrapRequest {
  memo: string;
}

export interface UpdateScrapResponse {
  scrapId: number;
}
