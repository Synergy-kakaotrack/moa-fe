// src/api/mappers/mapProjectDigestFromApi.ts

import type { ProjectDigestResponse } from "@/api/types/digest";
import type { ProjectDigest } from "@/domain/digest";

export function mapProjectDigestFromApi(res: ProjectDigestResponse): ProjectDigest {
  return {
    projectId: res.project.projectId,
    projectName: res.project.projectName,
    kind: res.kind,
    digest: res.digest ?? null,
    meta: {
      exists: res.meta.exists,
      outdated: res.meta.outdated,
      sourceLastCapturedAt: res.meta.sourceLastCapturedAt ?? null,
      latestScrapCapturedAt: res.meta.latestScrapCapturedAt ?? null,
      updatedAt: res.meta.updatedAt ?? null,
      version: res.meta.version,
      refresh: res.meta.refresh
        ? {
            status: res.meta.refresh.status,
            errorCode: res.meta.refresh.errorCode,
            message: res.meta.refresh.message,
            retryAfterSeconds: res.meta.refresh.retryAfterSeconds,
            attemptedAt: res.meta.refresh.attemptedAt,
          }
        : null,
    },
  };
}
