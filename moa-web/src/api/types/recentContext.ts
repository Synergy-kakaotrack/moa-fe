// src/api/types/recentContext.ts

/**
 * GET /api/scraps/recent-context 응답 타입
 * API 명세 기준 - 수정 금지
 */

export interface RecentContextItem {
  projectId: number;
  projectName: string;
  lastStage: string;
  lastCapturedAt: string; // ISO 8601
}

export interface RecentContextResponse {
  items: RecentContextItem[];
}
