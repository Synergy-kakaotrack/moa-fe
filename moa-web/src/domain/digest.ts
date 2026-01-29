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

export interface RefreshMeta {
  status: 'SUCCESS' | 'SKIPPED' | 'FAILED';
  errorCode: string | null;
  message: string | null;
  retryAfterSeconds: number | null;
  attemptedAt: string;
}

export interface ProjectDigestMeta extends DigestMeta {
  refresh: RefreshMeta | null;
}

export type ProjectDigestKind = 'DEFAULT' | 'CUSTOM';

export interface StageDigest {
  projectId: number;
  projectName: string;
  stageKey: StageKey;
  stageName: string;
  digest: string | null;
  meta: DigestMeta;
}

export interface ProjectDigest {
  projectId: number;
  projectName: string;
  kind: ProjectDigestKind;
  digest: string | null;
  meta: ProjectDigestMeta;
}
