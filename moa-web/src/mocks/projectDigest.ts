// src/mocks/projectDigest.ts
// 프로젝트 전체 요약 Mock 데이터
// API 연결 전 개발용 - 실제 API 연결 시 이 파일의 함수들을 api/digests.ts로 교체

import type { ProjectDigest } from "@/domain/digest";

// ============================================
// Mock 데이터: 요약이 존재하는 경우 (DEFAULT)
// ============================================
export const mockProjectDigestWithContent: ProjectDigest = {
  projectId: 10,
  projectName: "moa",
  kind: "DEFAULT",
  digest: `## 프로젝트 개요
MOA는 웹 스크래핑 기반의 프로젝트 관리 도구입니다. 사용자가 다양한 웹 페이지에서 정보를 수집하고, 프로젝트 단계별로 정리할 수 있습니다.

## 주요 기능
- **스크랩 수집**: 크롬 익스텐션을 통해 웹 페이지 스크랩
- **단계별 분류**: 기획, 조사&분석, 설계, 구현, 테스트, 기타로 자동 분류
- **AI 요약**: 각 단계별 스크랩을 AI가 자동 요약

## 기술 스택
- Frontend: Next.js 14, TypeScript, CSS Modules
- Backend: Spring Boot, PostgreSQL
- AI: OpenAI GPT-4

## 진행 상황
현재 기획 단계 80%, 조사&분석 단계 60% 완료되었습니다.`,
  meta: {
    exists: true,
    outdated: false,
    sourceLastCapturedAt: "2026-01-26T09:12:00+09:00",
    latestScrapCapturedAt: "2026-01-26T09:12:00+09:00",
    updatedAt: "2026-01-26T09:20:10+09:00",
    version: 1,
    refresh: null,
  },
};

// ============================================
// Mock 데이터: 요약이 존재하는 경우 (CUSTOM - 프롬프트 적용)
// ============================================
export const mockProjectDigestCustom: ProjectDigest = {
  projectId: 10,
  projectName: "MOA",
  kind: "CUSTOM",
  digest: `## 면접용 프로젝트 요약

### 프로젝트 소개
MOA는 개발자의 학습 및 프로젝트 관리를 위한 웹 스크래핑 기반 정보 수집 도구입니다.

### 핵심 성과
1. **크롬 익스텐션 개발**: Manifest V3 기반 익스텐션 구현
2. **AI 요약 시스템**: GPT-4를 활용한 단계별 자동 요약 기능 구현
3. **반응형 대시보드**: Next.js 14와 CSS Modules를 활용한 모던 UI 구현

### 기술적 도전
- LLM Rate Limiting 대응을 위한 요청 큐 시스템 구현
- 대용량 스크랩 데이터의 효율적인 렌더링을 위한 가상 스크롤 적용

### 팀 기여도
프론트엔드 전체 개발 담당 (4인 팀)`,
  meta: {
    exists: true,
    outdated: false,
    sourceLastCapturedAt: "2026-01-26T09:12:00+09:00",
    latestScrapCapturedAt: "2026-01-26T09:12:00+09:00",
    updatedAt: "2026-01-26T09:25:00+09:00",
    version: 1,
    refresh: {
      status: "SUCCESS",
      errorCode: null,
      message: null,
      retryAfterSeconds: null,
      attemptedAt: "2026-01-26T09:25:00+09:00",
    },
  },
};

// ============================================
// Mock 데이터: 요약이 없고, 스크랩은 있는 경우 (outdated=true)
// ============================================
export const mockProjectDigestEmpty: ProjectDigest = {
  projectId: 10,
  projectName: "MOA",
  kind: "DEFAULT",
  digest: null,
  meta: {
    exists: false,
    outdated: true,
    sourceLastCapturedAt: null,
    latestScrapCapturedAt: "2026-01-26T09:12:00+09:00",
    updatedAt: null,
    version: 1,
    refresh: null,
  },
};

// ============================================
// Mock 데이터: 요약도 없고, 스크랩도 없는 경우
// ============================================
export const mockProjectDigestNoScraps: ProjectDigest = {
  projectId: 10,
  projectName: "MOA",
  kind: "DEFAULT",
  digest: null,
  meta: {
    exists: false,
    outdated: false,
    sourceLastCapturedAt: null,
    latestScrapCapturedAt: null,
    updatedAt: null,
    version: 1,
    refresh: null,
  },
};

// ============================================
// Mock 데이터: 요약이 outdated된 경우
// ============================================
export const mockProjectDigestOutdated: ProjectDigest = {
  projectId: 10,
  projectName: "MOA",
  kind: "DEFAULT",
  digest: `## 이전 요약 내용
이 요약은 새 스크랩이 추가되어 갱신이 필요합니다.`,
  meta: {
    exists: true,
    outdated: true,
    sourceLastCapturedAt: "2026-01-25T22:10:00+09:00",
    latestScrapCapturedAt: "2026-01-26T09:12:00+09:00",
    updatedAt: "2026-01-25T22:10:03+09:00",
    version: 1,
    refresh: null,
  },
};

// ============================================
// Mock 데이터: Refresh 실패 케이스 (RATE_LIMITED)
// ============================================
export const mockProjectDigestRefreshFailed: ProjectDigest = {
  projectId: 10,
  projectName: "MOA",
  kind: "DEFAULT",
  digest: `## 기존 요약 내용 (갱신 실패로 유지됨)
이전에 생성된 요약 내용입니다.`,
  meta: {
    exists: true,
    outdated: true,
    sourceLastCapturedAt: "2026-01-25T22:10:00+09:00",
    latestScrapCapturedAt: "2026-01-26T09:12:00+09:00",
    updatedAt: "2026-01-25T22:10:03+09:00",
    version: 1,
    refresh: {
      status: "FAILED",
      errorCode: "RATE_LIMITED",
      message: "LLM rate limited (429).",
      retryAfterSeconds: 60,
      attemptedAt: "2026-01-26T09:30:00+09:00",
    },
  },
};

// ============================================
// Mock 데이터: Refresh 스킵 케이스 (이미 최신)
// ============================================
export const mockProjectDigestRefreshSkipped: ProjectDigest = {
  projectId: 10,
  projectName: "MOA",
  kind: "DEFAULT",
  digest: `## 최신 요약 내용
이 요약은 이미 최신 상태입니다.`,
  meta: {
    exists: true,
    outdated: false,
    sourceLastCapturedAt: "2026-01-26T09:12:00+09:00",
    latestScrapCapturedAt: "2026-01-26T09:12:00+09:00",
    updatedAt: "2026-01-26T09:20:10+09:00",
    version: 1,
    refresh: {
      status: "SKIPPED",
      errorCode: "NOT_OUTDATED",
      message: "Digest is up to date.",
      retryAfterSeconds: null,
      attemptedAt: "2026-01-26T09:25:00+09:00",
    },
  },
};

// ============================================
// Mock API 함수들 (개발용)
// 실제 API 연결 시 api/digests.ts의 함수로 교체
// ============================================

let currentMockDigest = mockProjectDigestWithContent;
let savedPrompt: string | null = null;

export async function mockGetProjectDigest(
  projectId: number
): Promise<ProjectDigest> {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    ...currentMockDigest,
    projectId,
  };
}

export async function mockRefreshProjectDigest(
  projectId: number,
  params?: { prompt?: string | null }
): Promise<ProjectDigest> {
  // 네트워크 지연 시뮬레이션 (LLM 호출이라 더 길게)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  savedPrompt = params?.prompt ?? null;

  // 프롬프트가 있으면 CUSTOM, 없으면 DEFAULT
  if (params?.prompt) {
    currentMockDigest = {
      ...mockProjectDigestCustom,
      projectId,
      digest: `## 커스텀 요약 (프롬프트: "${params.prompt}")

이 요약은 사용자가 입력한 프롬프트를 기반으로 생성되었습니다.

### 요약 내용
프롬프트에 맞춰 프로젝트 전체 스크랩을 분석하여 요약한 결과입니다.

- 기획 단계: 주요 기능 정의 완료
- 조사&분석 단계: 경쟁사 분석 및 기술 스택 조사 진행 중
- 설계 단계: UI/UX 디자인 시안 작업 중
- 구현 단계: 핵심 기능 개발 진행 중`,
      meta: {
        ...mockProjectDigestCustom.meta,
        updatedAt: new Date().toISOString(),
        refresh: {
          status: "SUCCESS",
          errorCode: null,
          message: null,
          retryAfterSeconds: null,
          attemptedAt: new Date().toISOString(),
        },
      },
    };
  } else {
    currentMockDigest = {
      ...mockProjectDigestWithContent,
      projectId,
      meta: {
        ...mockProjectDigestWithContent.meta,
        updatedAt: new Date().toISOString(),
        refresh: {
          status: "SUCCESS",
          errorCode: null,
          message: null,
          retryAfterSeconds: null,
          attemptedAt: new Date().toISOString(),
        },
      },
    };
  }

  return currentMockDigest;
}

// 저장된 프롬프트 조회 (UI 표시용)
export function getSavedPrompt(): string | null {
  return savedPrompt;
}

// Mock 상태 리셋 (테스트용)
export function resetMockState(): void {
  currentMockDigest = mockProjectDigestWithContent;
  savedPrompt = null;
}
