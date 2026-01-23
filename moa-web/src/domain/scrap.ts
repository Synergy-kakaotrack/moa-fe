import { StageKey } from './stage';

export interface Scrap {
  scrapId: number;
  projectId: number;

  stageKey: StageKey;   // 로직용
  stageName: string;   // 표시용

  subtitle: string;
  memo?: string | null;

  agent: string;
  capturedAt: string;
}

export type ScrapContentType = 'markdown' | 'html';

export interface ScrapDetail extends Scrap {
  contentType: ScrapContentType;
  content: string;

  aiSourceUrl: string;
}
