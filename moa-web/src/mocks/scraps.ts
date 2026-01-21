// mocks/scraps.ts
import { Scrap } from '@/api/types/scrap';

export const mockScraps: Scrap[] = [
  {
    scrapId: 1,
    projectId: 1,
    stage: '기획',
    subtitle: '서비스 핵심 문제 정의',
    memo:
      '대학생들은 여러 AI를 쓰지만, 결과물이 흩어져 있어 맥락 관리가 어렵다. 이 문제를 어떻게 하나의 흐름으로 묶을 수 있을지 고민.',
    capturedAt: '2026-01-05T10:12:00Z',
    agent: 'chatgpt',
  },
  {
    scrapId: 2,
    projectId: 1,
    stage: '기획',
    subtitle: '타겟 사용자 정리',
    memo:
      '주 사용자는 대학생, 취업 준비생. 무료 AI 툴을 여러 개 쓰는 사용자가 핵심 타겟.',
    capturedAt: '2026-01-06T14:30:00Z',
    agent: 'claude',
  },
  {
    scrapId: 3,
    projectId: 1,
    stage: '조사&분석',
    subtitle: '유사 서비스 리서치',
    memo:
      'ChatGPT 히스토리, Notion AI, Savelore 등 비교. 대부분 AI별 관리만 가능하고 프로젝트 흐름 관리 기능은 부족.',
    capturedAt: '2026-01-07T09:45:00Z',
    agent: 'gemini',
  },
  {
    scrapId: 4,
    projectId: 1,
    stage: '설계',
    subtitle: '정보 구조 초안',
    memo:
      'Project > Stage > Scrap 구조로 정리. Stage는 고정 단계로 관리하고 Scrap은 자유롭게 쌓이도록 설계.',
    capturedAt: '2026-01-09T16:10:00Z',
    agent: 'chatgpt',
  },
  {
    scrapId: 5,
    projectId: 1,
    stage: '설계',
    subtitle: '칸반 대시보드 레이아웃',
    memo:
      '좌측 사이드바 + 중앙 고정 칸반 구조. Stage는 3개씩 페이지 전환.',
    capturedAt: '2026-01-10T11:00:00Z',
    agent: 'claude',
  },
  {
    scrapId: 6,
    projectId: 1,
    stage: '구현',
    subtitle: 'Next.js App Router 적용',
    memo:
      'project/[projectId]/page.tsx 구조로 대시보드 구현 시작.',
    capturedAt: '2026-01-12T13:25:00Z',
    agent: 'chatgpt',
  },
  {
    scrapId: 7,
    projectId: 1,
    stage: '테스트',
    subtitle: 'UI 흐름 점검',
    memo:
      '사이드바 접힘/열림에 따른 화살표 위치 UX 테스트 진행.',
    capturedAt: '2026-01-14T18:40:00Z',
    agent: 'gemini',
  },
  {
    scrapId: 8,
    projectId: 1,
    stage: '기타',
    subtitle: '추가 아이디어 메모',
    memo:
      '스크랩 카드 클릭 시 좌측 상세 뷰로 확장하는 방식 고려.',
    capturedAt: '2026-01-15T21:05:00Z',
    agent: 'claude',
  },
];
