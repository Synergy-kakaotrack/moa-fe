// src/api/types/digest.ts

export interface DigestMetaResponse {
  exists: boolean;
  outdated: boolean;
  sourceLastCapturedAt: string | null;
  latestScrapCapturedAt: string | null;
  updatedAt: string | null;
  version: number;
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
