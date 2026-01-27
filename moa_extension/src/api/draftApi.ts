
import { apiClient } from "./apiClient";
import type {
  ScrapSummary,
  ScrapDetail,
  GetScrapsParams,
  RecentScrapContextResponse,
  UpdateScrapRequest,
  UpdateScrapResponse,
} from "../types/scrap";

/* =========================
   Scraps
========================= */

/**
 * 스크랩 목록 조회 (무한 스크롤)
 * GET /api/scraps
 */
export function getScraps(params: GetScrapsParams) {
  const query = new URLSearchParams();

  query.set("projectId", String(params.projectId));
  query.set("stage", params.stage);

  if (params.cursor) query.set("cursor", params.cursor);
  if (params.limit) query.set("limit", String(params.limit));

  return apiClient<{
    items: ScrapSummary[];
    nextCursor?: string;
  }>(`/scraps?${query.toString()}`);
}

/**
 * 스크랩 단건 조회
 * GET /api/scraps/{scrapId}
 */
export function getScrap(scrapId: number) {
  return apiClient<ScrapDetail>(`/scraps/${scrapId}`);
}

/**
 * 최근 컨텍스트 조회 (LLM 추천용)
 * GET /api/scraps/recent-context
 */
export function getRecentScrapContext() {
  return apiClient<RecentScrapContextResponse>(
    `/scraps/recent-context`
  );
}

/**
 * 스크랩 메모 수정 (NOT MVP)
 * PATCH /api/scraps/{scrapId}
 */
export function updateScrapMemo(
  scrapId: number,
  body: UpdateScrapRequest
) {
  return apiClient<UpdateScrapResponse>(
    `/scraps/${scrapId}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
    }
  );
}

/**
 * 스크랩 삭제 (NOT MVP)
 * DELETE /api/scraps/{scrapId}
 */
export function deleteScrap(scrapId: number) {
  return apiClient<void>(`/scraps/${scrapId}`, {
    method: "DELETE",
  });
}
