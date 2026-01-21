// src/data/scraps.ts
import { StageKey } from './stages';

export type AiSource = 'CHATGPT' | 'CLAUDE' | 'GEMINI';

export interface Scrap {
  id: string;
  projectId: string;
  stage: StageKey;

  title: string;        // 카드 제목 (subtitle)
  preview: string;      // 카드 본문 미리보기

  aiSource: AiSource;   // 출처
  capturedAt: string;   // 저장 날짜
}

export const scraps: Scrap[] = [
  {
    id: 'scp_1',
    projectId: 'prj_kakao',
    stage: 'PLAN',
    title: '프로젝트 폴더 구조',
    preview:
      '사람 기준 프로젝트 정리가 핵심이라는 점 정리. AI 도구 기준 정리와의 차이점...',
    aiSource: 'CLAUDE',
    capturedAt: '2026-01-01',
  },
  {
    id: 'scp_2',
    projectId: 'prj_kakao',
    stage: 'RESEARCH',
    title: '문제: AI 결과물 관리의 어려움',
    preview:
      'ChatGPT, Claude, Gemini 결과가 분산되는 상황 정리...',
    aiSource: 'GEMINI',
    capturedAt: '2026-01-01',
  },
  {
    id: 'scp_3',
    projectId: 'prj_kakao',
    stage: 'DESIGN',
    title: '정리 메모 : MOA의 목표 사용자',
    preview:
      '대학생 프로젝트 사용 시나리오를 다시 정리함...',
    aiSource: 'CLAUDE',
    capturedAt: '2026-01-01',
  },
];
