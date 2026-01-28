// src/api/mappers/mapRecentContextFromApi.ts
import type { RecentContextResponse } from "@/api/types/recentContext";
import type { RecentProject } from "@/domain/recentContext";

// NOTE: 최근 저장 컨텍스트 응답 -> 홈 카드용 모델로 변환
export function mapRecentContextFromApi(response: RecentContextResponse): RecentProject[] {
  return response.items.map((item) => {
    // NOTE: 백엔드에서 description 또는 projectDescription으로 올 수 있음
    const rawItem = item as unknown as Record<string, unknown>;
    const description =
      item.description ||
      (rawItem.projectDescription as string) ||
      "";

    return {
      projectId: item.projectId,
      name: item.projectName,
      description,
      lastCapturedAt: new Date(item.lastCapturedAt),
    };
  });
}
