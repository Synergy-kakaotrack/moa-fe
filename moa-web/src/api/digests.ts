// src/api/digests.ts
import { request } from "@/api/http";
import type { StageDigestResponse } from "@/api/types/digest";
import { mapStageDigestFromApi } from "@/api/mappers/mapStageDigestFromApi";
import type { StageDigest } from "@/domain/digest";

export async function getStageDigest(
  projectId: number,
  stageName: string
): Promise<StageDigest> {
  const encodedStage = encodeURIComponent(stageName);
  const res = await request<StageDigestResponse>(
    `/api/projects/${projectId}/stages/${encodedStage}/digest`,
    "GET"
  );
  return mapStageDigestFromApi(res);
}

export async function refreshStageDigest(
  projectId: number,
  stageName: string
): Promise<StageDigest> {
  const encodedStage = encodeURIComponent(stageName);
  const res = await request<StageDigestResponse>(
    `/api/projects/${projectId}/stages/${encodedStage}/digest:refresh`,
    "POST"
  );
  return mapStageDigestFromApi(res);
}
