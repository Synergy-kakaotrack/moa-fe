// src/api/mappers/mapRecentContextFromApi.ts
import type { RecentContextResponse } from "@/api/types/recentContext";
import type { RecentProject } from "@/domain/recentContext";

// NOTE: 최근 저장 컨텍스트 응답 -> 홈 카드용 모델로 변환
export function mapRecentContextFromApi(response: RecentContextResponse): RecentProject[] {
  return response.items.map((item) => ({
    projectId: item.projectId,
    name: item.projectName,
    lastStage: item.lastStage,
    lastCapturedAt: new Date(item.lastCapturedAt),
  }));
}
