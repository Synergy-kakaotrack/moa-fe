// src/api/mappers/mapScrapFromApi.ts

import type { ScrapDto } from "@/api/types/scrap";
import type { Scrap } from "@/domain/scrap";
import { mapStageNameToKey } from "@/api/mappers/mapStage";

// NOTE: ScrapDto -> Scrap 변환 (목록용)
// NOTE: Scrap(목록용)에는 aiProvider/content 같은 필드가 없고,
//       stageKey/stageName/agent/capturedAt 구조를 사용합니다.
export function mapScrapFromApi(dto: ScrapDto): Scrap {
  // NOTE: 백엔드가 단계 정보를 어떤 키로 주든 대응 (stageName / stage / stageLabel 등)
  const stageName =
    (dto as any).stageName ??
    (dto as any).stage ??
    (dto as any).stageLabel ??
    "기타";

  // NOTE: stageKey가 내려오면 사용, 아니면 stageName으로 변환
  const stageKey = (dto as any).stageKey ?? mapStageNameToKey(stageName);

  // NOTE: AI 출처 필드가 aiProvider/aiSource/agent 등으로 올 수 있어 대응
  const agentRaw =
    (dto as any).agent ??
    (dto as any).aiSource ??
    (dto as any).aiProvider ??
    "unknown";

  // NOTE: capturedAt이 없으면 createdAt 등을 대체로 사용(없으면 epoch)
  const capturedAt =
    (dto as any).capturedAt ??
    (dto as any).createdAt ??
    new Date(0).toISOString();

  return {
    scrapId: (dto as any).scrapId,
    projectId: (dto as any).projectId,

    stageKey,
    stageName,

    subtitle: (dto as any).subtitle,
    memo: (dto as any).memo ?? null,

    agent: String(agentRaw).toLowerCase(),
    capturedAt,
  };
}
