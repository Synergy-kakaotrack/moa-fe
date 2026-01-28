// src/mocks/stageDigest.ts
import { StageDigestResponseMock } from './types/digest.dto';

export const mockStageDigests: Record<string, StageDigestResponseMock> = {
  PLAN: {
    project: {
      projectId: 1,
      projectName: 'kakao 현장실습',
    },
    stage: '기획',
    digest: `## 핵심 요약
MOA 서비스는 여러 AI 도구(ChatGPT, Claude, Gemini)를 사용하면서 발생하는 결과물 분산 문제를 해결하기 위한 통합 스크랩 관리 서비스입니다. 드래그 스크랩 UX를 통해 AI 결과물을 프로젝트 단위로 정리할 수 있습니다.

## 작업 흐름 타임라인
1. **문제 정의**: 대학생 일정 관리의 어려움, AI 결과물 관리의 분산 문제 파악
2. **아이디어 도출**: 여러 AI를 동시에 사용하는 사용자 흐름 분석
3. **가치 제안 정리**: 프로젝트 기준 정리가 핵심이라는 점 도출

## 결정 사항
- 핵심 기능: 드래그 스크랩, 프로젝트별 정리, 작업단계별 분류
- 대상 사용자: AI를 활발히 사용하는 대학생, 직장인

## 다음 액션
- [ ] 사용자 인터뷰를 통한 pain point 검증
- [ ] 경쟁 서비스 분석 및 차별화 포인트 정리`,
    meta: {
      exists: true,
      outdated: false,
      sourceLastCapturedAt: '2026-01-26T09:12:00+09:00',
      latestScrapCapturedAt: '2026-01-26T09:12:00+09:00',
      updatedAt: '2026-01-26T09:20:10+09:00',
      version: 1,
    },
  },

  RESEARCH: {
    project: {
      projectId: 1,
      projectName: 'kakao 현장실습',
    },
    stage: '조사&분석',
    digest: `## 핵심 요약
AI 도구 사용 패턴과 기존 스크랩 서비스들의 한계점을 분석했습니다. 복사-붙여넣기 방식의 한계와 캘린더 통합이 잘 안 되는 문제를 확인했습니다.

## 작업 흐름 타임라인
1. **경쟁사 분석**: 기존 노트 앱, 스크랩 서비스의 AI 결과물 관리 기능 조사
2. **사용자 리서치**: AI 활용 패턴 및 정리 방식 인터뷰
3. **기술 조사**: 크롬 확장 프로그램, 드래그 API 기술 스택 검토

## 결정 사항
- 폴더 + 태그 병행 구조 채택
- 크롬 확장 프로그램 기반 스크랩 방식 확정

## 변경/되돌림
- 초기 북마크 방식에서 드래그 스크랩 방식으로 변경`,
    meta: {
      exists: true,
      outdated: true,
      sourceLastCapturedAt: '2026-01-25T22:10:00+09:00',
      latestScrapCapturedAt: '2026-01-27T09:12:00+09:00',
      updatedAt: '2026-01-25T22:10:03+09:00',
      version: 1,
    },
  },

  DESIGN: {
    project: {
      projectId: 1,
      projectName: 'kakao 현장실습',
    },
    stage: '설계',
    digest: `## 핵심 요약
ERD와 API 설계를 완료했습니다. MVP 기준으로 users, projects, scraps를 핵심 엔티티로 정의하고, cursor 기반 페이지네이션을 적용했습니다.

## 작업 흐름 타임라인
1. **ERD 설계**: MVP 기준 핵심 테이블 구조 정의
2. **API 설계**: 프론트에서 바로 사용 가능한 응답 구조 설계
3. **상태 관리 설계**: 전역/로컬 상태 분리 기준 수립
4. **컴포넌트 구조 설계**: Container/Presentational 분리

## 결정 사항
- project_id + stage + captured_at 복합 인덱스 적용
- 전역 상태: projectId, stage, 사이드바 상태
- 로컬 상태: UI 토글, 입력 값

## 변경/되돌림
- drafts 테이블 TTL 기반 자동 만료로 변경`,
    meta: {
      exists: true,
      outdated: false,
      sourceLastCapturedAt: '2026-01-26T14:05:00+09:00',
      latestScrapCapturedAt: '2026-01-26T14:05:00+09:00',
      updatedAt: '2026-01-26T14:10:00+09:00',
      version: 2,
    },
  },

  IMPLEMENT: {
    project: {
      projectId: 1,
      projectName: 'kakao 현장실습',
    },
    stage: '구현',
    digest: null,
    meta: {
      exists: false,
      outdated: false,
      sourceLastCapturedAt: null,
      latestScrapCapturedAt: '2026-01-27T10:00:00+09:00',
      updatedAt: null,
      version: 1,
    },
  },

  TEST: {
    project: {
      projectId: 1,
      projectName: 'kakao 현장실습',
    },
    stage: '테스트',
    digest: null,
    meta: {
      exists: false,
      outdated: false,
      sourceLastCapturedAt: null,
      latestScrapCapturedAt: null,
      updatedAt: null,
      version: 1,
    },
  },

  ETC: {
    project: {
      projectId: 1,
      projectName: 'kakao 현장실습',
    },
    stage: '기타',
    digest: null,
    meta: {
      exists: false,
      outdated: false,
      sourceLastCapturedAt: null,
      latestScrapCapturedAt: null,
      updatedAt: null,
      version: 1,
    },
  },
};

// 특정 stage의 요약 조회
export function getMockStageDigest(stageKey: string): StageDigestResponseMock | null {
  return mockStageDigests[stageKey] ?? null;
}
