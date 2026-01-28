// src/api/mappers/mapStageDigestFromApi.ts

import type { StageDigestResponse } from "@/api/types/digest";
import type { StageDigest } from "@/domain/digest";
import { mapStageNameToKey } from "@/api/mappers/mapStage";

export function mapStageDigestFromApi(res: StageDigestResponse): StageDigest {
  return {
    projectId: res.project.projectId,
    projectName: res.project.projectName,
    stageKey: mapStageNameToKey(res.stage),
    stageName: res.stage,
    digest: res.digest ?? null,
    meta: {
      exists: res.meta.exists,
      outdated: res.meta.outdated,
      sourceLastCapturedAt: res.meta.sourceLastCapturedAt ?? null,
      latestScrapCapturedAt: res.meta.latestScrapCapturedAt ?? null,
      updatedAt: res.meta.updatedAt ?? null,
      version: res.meta.version,
    },
  };
}
