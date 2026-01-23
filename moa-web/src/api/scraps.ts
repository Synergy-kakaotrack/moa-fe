// src/api/scraps.ts

import { RecentContextResponse } from '@/api/types/recentContext';
import { RecentProject } from '@/domain/recentContext';
import { mapRecentContextFromApi } from '@/api/mappers/mapRecentContextFromApi';
import { mockRecentContext } from '@/mocks/recentContext';

const USE_MOCK = true; // TODO: 환경변수로 전환

/**
 * 최근 저장 컨텍스트 조회
 * GET /api/scraps/recent-context
 */
export async function getRecentContext(): Promise<RecentProject[]> {
  if (USE_MOCK) {
    // Mock 데이터 반환 (개발용)
    return mapRecentContextFromApi(mockRecentContext as RecentContextResponse);
  }

  // 실제 API 호출
  const response = await fetch('/api/scraps/recent-context', {
    headers: {
      'X-User-Id': '1', // TODO: 인증 구현 후 동적으로 변경
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recent context: ${response.status}`);
  }

  const data: RecentContextResponse = await response.json();
  return mapRecentContextFromApi(data);
}
