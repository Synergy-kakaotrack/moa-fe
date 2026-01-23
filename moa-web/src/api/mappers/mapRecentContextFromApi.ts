// src/api/mappers/mapRecentContextFromApi.ts

import { RecentContextItem, RecentContextResponse } from '@/api/types/recentContext';
import { RecentProject } from '@/domain/recentContext';

/**
 * API 응답 아이템 → 도메인 모델 변환
 */
export function mapRecentContextItem(item: RecentContextItem): RecentProject {
  return {
    projectId: item.projectId,
    name: item.projectName,
    description: item.description,
    lastCapturedAt: new Date(item.lastCapturedAt),
  };
}

/**
 * API 응답 전체 → 도메인 모델 배열 변환
 */
export function mapRecentContextFromApi(response: RecentContextResponse): RecentProject[] {
  return response.items.map(mapRecentContextItem);
}
