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

// src/api/types/recentContext.ts

// NOTE: GET /api/scraps/recent-context 응답 DTO
export interface RecentContextDto {
  // NOTE: 백엔드가 어떤 키로 주는지 확정되기 전까지 optional로 수용
  projectId?: number | null;
  stageId?: number | null;
  scrapId?: number | null;

  // NOTE: 최근 컨텍스트 표시에 필요한 텍스트들(있으면 사용)
  projectName?: string | null;
  stageName?: string | null;
  scrapSubtitle?: string | null;

  // NOTE: 서버가 임의로 더 줄 수 있으므로 확장 허용
  [key: string]: unknown;
}
