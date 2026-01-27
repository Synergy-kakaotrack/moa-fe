// src/api/scraps.ts
import { request } from "@/api/http";
import type { RecentContextResponse } from "@/api/types/recentContext";
import { mapRecentContextFromApi } from "@/api/mappers/mapRecentContextFromApi";
import type { RecentProject } from "@/domain/recentContext";

import type { Scrap, ScrapDetail } from "@/domain/scrap";
import type { ScrapDto } from "@/api/types/scrap";
import { mapScrapFromApi } from "@/api/mappers/mapScrapFromApi";
import { mapScrapDetailFromApi } from "@/api/mappers/mapScrapDetailFromApi";

// NOTE: GET /api/scraps 쿼리 파라미터(프로젝트 + 단계)
export interface GetScrapsRequest {
  projectId: number;
  stage: string;
  limit?: number;
  cursor?: string | null;
}

// NOTE: 쿼리스트링 생성
function buildQuery(params: Record<string, string | number | boolean | null | undefined>): string {
  const entries = Object.entries(params)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);

  if (entries.length === 0) return "";
  return `?${entries.join("&")}`;
}

/**
 * NOTE: 최근 저장 컨텍스트 조회 (홈)
 * - GET /api/scraps/recent-context
 * - 홈 컴포넌트가 배열을 기대하므로 RecentProject[] 반환으로 고정
 */
export async function getRecentContext(): Promise<RecentProject[]> {
  const response = await request<RecentContextResponse>("/api/scraps/recent-context", "GET");
  return mapRecentContextFromApi(response);
}

/**
 * NOTE: 스크랩 목록 (프로젝트 + 단계)
 * - GET /api/scraps?projectId=...&stageId=...
 * - 백엔드 응답이 배열인 경우가 많으므로 ScrapDto[]로 받고 { items }로 감쌉니다.
 */
export async function getScraps(
  req: GetScrapsRequest
): Promise<{ items: Scrap[]; nextCursor: string | null }> {
  const query = buildQuery({
    projectId: req.projectId,
    stage: req.stage,
    limit: req.limit,
    cursor: req.cursor ?? undefined,
  });

  try {
    const res = await request<{ items: ScrapDto[]; nextCursor: string | null }>(
      `/api/scraps${query}`,
      "GET"
    );
    return {
      items: res.items.map(mapScrapFromApi),
      nextCursor: res.nextCursor,
    };
  } catch (err) {
    if (err instanceof Error && err.message.includes("API Error 404")) {
      return { items: [], nextCursor: null };
    }
    throw err;
  }
}

/**
 * NOTE: 스크랩 상세
 * - GET /api/scraps/{scrapId}
 * - ScrapDetail 타입에 content가 있어야 합니다.
 */
export async function getScrapDetail(scrapId: number): Promise<ScrapDetail> {
  const dto = await request<ScrapDto>(`/api/scraps/${scrapId}`, "GET");
  return mapScrapDetailFromApi(dto);
}

// NOTE: 객체 형태로도 쓰는 코드가 있을 수 있어 함께 제공
export const scrapsApi = {
  getRecentContext,
  getScraps,
  getScrapDetail,
};
