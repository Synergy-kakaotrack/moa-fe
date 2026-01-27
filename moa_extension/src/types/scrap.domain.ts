// src/types/scrap.domain.ts

export type ScrapStatus = "DRAFT" | "FINAL";

export interface Scrap {
  id: number;
  texts: string[];

  meta: {
    source: string;
    url?: string;
  };

  createdAt: number;
  status: ScrapStatus;

  rawHtmls?: string[];
  finalizedAt?: number;

  dragSessionId: number;
}
