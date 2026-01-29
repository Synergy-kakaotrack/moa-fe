// src/api/digests.ts
import { request } from "@/api/http";
import type { StageDigestResponse, ProjectDigestResponse } from "@/api/types/digest";
import { mapStageDigestFromApi } from "@/api/mappers/mapStageDigestFromApi";
import { mapProjectDigestFromApi } from "@/api/mappers/mapProjectDigestFromApi";
import type { StageDigest, ProjectDigest } from "@/domain/digest";

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

// ============================================
// Project Digest API (프로젝트 전체 요약)
// ============================================

export async function getProjectDigest(
  projectId: number
): Promise<ProjectDigest> {
  const res = await request<ProjectDigestResponse>(
    `/api/projects/${projectId}/digest`,
    "GET"
  );
  return mapProjectDigestFromApi(res);
}

export interface RefreshProjectDigestParams {
  prompt?: string | null;
}

export async function refreshProjectDigest(
  projectId: number,
  params?: RefreshProjectDigestParams
): Promise<ProjectDigest> {
  const body = params?.prompt ? { prompt: params.prompt } : undefined;
  const res = await request<ProjectDigestResponse>(
    `/api/projects/${projectId}/digest:refresh`,
    "POST",
    body ? { body } : undefined
  );
  return mapProjectDigestFromApi(res);
}
