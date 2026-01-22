// src/api/scraps.ts

import type { ScrapListResponse } from './types/ScrapDto';
import { mockScraps } from '@/mocks/scrapDetail';

/**
 * 스크랩 목록 조회 (API 레이어)
 * - mock / 실제 API 공통 인터페이스
 * - DTO 그대로 반환
 * - Domain 변환은 여기서 하지 않음
 */
export async function getScraps(): Promise<ScrapListResponse> {
  return {
    items: mockScraps,
    // nextCursor: undefined, // 필요해지면 추가
  };
}
