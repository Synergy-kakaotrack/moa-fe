import { apiClient } from "./apiClient";
import type {
  ScrapSummary,
  ScrapDetail,
  GetScrapsParams,
  RecentScrapContextResponse,
  UpdateScrapRequest,
  UpdateScrapResponse,
} from "../types/scrap";

/**
 * GET /api/scraps
 * (무한 스크롤)
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
 * GET /api/scraps/{scrapId}
 */
export function getScrap(scrapId: number) {
  return apiClient<ScrapDetail>(`/scraps/${scrapId}`);
}

/**
 * GET /api/scraps/recent-context
 */
export function getRecentScrapContext() {
  return apiClient<RecentScrapContextResponse>(
    "/scraps/recent-context"
  );
}

/**
 * PATCH /api/scraps/{scrapId}
 * (NOT MVP)
 */
export function updateScrapMemo(
  scrapId: number,
  body: UpdateScrapRequest
) {
  return apiClient<UpdateScrapResponse>(`/scraps/${scrapId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

/**
 * DELETE /api/scraps/{scrapId}
 * (NOT MVP)
 */
export function deleteScrap(scrapId: number) {
  return apiClient<void>(`/scraps/${scrapId}`, {
    method: "DELETE",
  });
}
