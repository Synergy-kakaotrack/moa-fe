//백엔드 API 명세 
import type { AISource, ISODateTime, Stage } from "./common";

//Draft

export interface DraftRecommendation {
  projectId: number;
  stage: Stage;
  subtitle: string;
}

export interface Draft {
  draftId: number;
  recommendation: DraftRecommendation;
  expiresAt: ISODateTime;
}

/* ===== API ===== */

export interface CreateDraftRequest {
  contentPlain: string;
  aiSource: AISource;
  aiSourceUrl: string;
}

export interface CreateDraftResponse {
  draftId: number;
  recommendation: DraftRecommendation;
  recMethod: "LLM" | "RULE";
}

export interface CommitDraftRequest {
  projectId: number;
  stage: string;
  subtitle: string;
  memo?: string;
  rawHtml: string;

  aiSource: string;
  aiSourceUrl: string;

  userRecProject: boolean;
  userRecStage: boolean;
  userRecSubtitle: boolean;
}

export interface CommitDraftResponse {
  scrapId: number;
}

export interface LatestDraftResponse {
  draftId: number;
  recProjectId: number;
  recStage: Stage;
  recSubtitle: string;
  expiresAt: ISODateTime;
}
