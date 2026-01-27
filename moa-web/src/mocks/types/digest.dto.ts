// src/mocks/types/digest.dto.ts
export interface DigestMetaMock {
  exists: boolean;
  outdated: boolean;
  sourceLastCapturedAt: string | null;
  latestScrapCapturedAt: string | null;
  updatedAt: string | null;
  version: number;
}

export interface StageDigestResponseMock {
  project: {
    projectId: number;
    projectName: string;
  };
  stage: string;
  digest: string | null;
  meta: DigestMetaMock;
}
