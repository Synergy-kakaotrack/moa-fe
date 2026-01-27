// src/domain/digest.ts
import type { StageKey } from './stage';

export interface DigestMeta {
  exists: boolean;
  outdated: boolean;
  sourceLastCapturedAt: string | null;
  latestScrapCapturedAt: string | null;
  updatedAt: string | null;
  version: number;
}

export interface StageDigest {
  projectId: number;
  projectName: string;
  stageKey: StageKey;
  stageName: string;
  digest: string | null;
  meta: DigestMeta;
}
