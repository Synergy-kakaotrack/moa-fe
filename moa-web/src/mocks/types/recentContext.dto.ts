// src/mocks/types/recentContext.dto.ts

/**
 * /api/scraps/recent-context 응답 mock 타입
 * - 서버 응답 형태를 그대로 흉내냄
 * - UI에서는 직접 사용하지 않음
 */

export interface RecentContextItemMock {
  projectId: number;
  projectName: string;
  lastStage: string;
  lastCapturedAt: string; // ISO 8601
}

export interface RecentContextResponseMock {
  items: RecentContextItemMock[];
}
