// src/api/mappers/mapScrapDetailFromApi.ts

import type { ScrapDto } from "@/api/types/scrap";
import type { ScrapDetail, ScrapContentType } from "@/domain/scrap";
import { mapStageNameToKey } from "@/api/mappers/mapStage";

function resolveContentType(dto: ScrapDto): ScrapContentType {
  const rawType = (dto as any).contentType;
  if (rawType === "MARKDOWN" || rawType === "RAW_HTML") {
    return rawType;
  }

  const content = (dto as any).content ?? "";
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(String(content));
  return looksLikeHtml ? "RAW_HTML" : "MARKDOWN";
}

export function mapScrapDetailFromApi(dto: ScrapDto): ScrapDetail {
  const stageName =
    (dto as any).stageName ??
    (dto as any).stage ??
    (dto as any).stageLabel ??
    "기타";

  const stageKey = (dto as any).stageKey ?? mapStageNameToKey(stageName);

  const agentRaw =
    (dto as any).agent ??
    (dto as any).aiSource ??
    (dto as any).aiProvider ??
    "unknown";

  const capturedAt =
    (dto as any).capturedAt ??
    (dto as any).createdAt ??
    new Date(0).toISOString();

  const content =
    (dto as any).content ??
    (dto as any).rawHtml ??
    (dto as any).markdown ??
    "";

  const aiSourceUrl =
    (dto as any).aiSourceUrl ??
    (dto as any).sourceUrl ??
    "";

  return {
    scrapId: (dto as any).scrapId,
    projectId: (dto as any).projectId,

    stageKey,
    stageName,

    subtitle: (dto as any).subtitle ?? "",
    memo: (dto as any).memo ?? null,

    agent: String(agentRaw).toLowerCase(),
    capturedAt,

    contentType: resolveContentType(dto),
    content: String(content ?? ""),

    aiSourceUrl,
  };
}
