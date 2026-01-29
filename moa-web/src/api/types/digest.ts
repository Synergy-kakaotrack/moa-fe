// src/api/types/digest.ts

export interface DigestMetaResponse {
  exists: boolean;
  outdated: boolean;
  sourceLastCapturedAt: string | null;
  latestScrapCapturedAt: string | null;
  updatedAt: string | null;
  version: number;
}

export interface RefreshMetaResponse {
  status: 'SUCCESS' | 'SKIPPED' | 'FAILED';
  errorCode: string | null;
  message: string | null;
  retryAfterSeconds: number | null;
  attemptedAt: string;
}

export interface ProjectDigestMetaResponse extends DigestMetaResponse {
  refresh: RefreshMetaResponse | null;
}

export interface StageDigestResponse {
  project: {
    projectId: number;
    projectName: string;
  };
  stage: string;
  digest: string | null;
  meta: DigestMetaResponse;
}

export interface ProjectDigestResponse {
  project: {
    projectId: number;
    projectName: string;
  };
  kind: 'DEFAULT' | 'CUSTOM';
  digest: string | null;
  meta: ProjectDigestMetaResponse;
}
