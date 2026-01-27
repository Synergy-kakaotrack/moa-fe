// src/api/types/scrap.ts

// NOTE: /api/scraps 목록/상세 응답 DTO
export interface ScrapDto {
  scrapId: number;

  // NOTE: 소제목(리스트/상세 공통)
  subtitle: string;

  // NOTE: 본문(상세에서 사용)
  content?: string | null;

  // NOTE: 메모(상세에서 사용)
  memo?: string | null;

  // NOTE: 메타 정보(출처/저장시각/단계/프로젝트)
  aiProvider?: string | null;
  capturedAt?: string | null;

  projectId?: number | null;
  stageId?: number | null;

  // NOTE: 원문 링크(NICE지만 데이터 있으면 사용 가능)
  sourceUrl?: string | null;
}
