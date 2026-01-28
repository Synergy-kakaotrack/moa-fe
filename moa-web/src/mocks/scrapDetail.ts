// src/mocks/scrapDetail.ts
import { ScrapDetailMock } from './types/scrap.dto';

export const mockScraps: ScrapDetailMock[] = [
  {
    scrapId: 500,
    projectId: 1,
    stage: '설계',
    subtitle: 'API 설계 초안',
    memo: '메모 예시',

    rawHtmlToMarkdown: `## API 설계 초안
- GET /api/projects
- POST /api/projects`,

    aiSource: 'GPT',
    aiSourceUrl: 'https://chat.openai.com',
    capturedAt: '2026-01-12T12:30:00Z',
  },
  {
    scrapId: 501,
    projectId: 1,
    stage: '설계',
    subtitle: 'ERD 초안',
    memo: null,

    rawHtml: '<p><strong>변환 실패</strong></p>',

    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
  {
    scrapId: 502,
    projectId: 1,
    stage: '설계',
    subtitle: 'ERD 초안',
    memo: null,

    rawHtml: '<p><strong>변환 실패</strong></p>',

    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
  {
    scrapId: 503,
    projectId: 1,
    stage: '설계',
    subtitle: '디자인',
    memo: null,

    rawHtml: '<p><strong>변환 실패</strong></p>',

    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
  {
    scrapId: 504,
    projectId: 1,
    stage: '설계',
    subtitle: 'ERD 구조 및 API 설계 방향 정리',
    memo: '이번 ERD는 MVP 기준으로 최대한 단순하게 가져가는 방향으로 설계했다. 초기에는 users, projects, scraps 정도만 핵심 엔티티로 두고, drafts는 임시 데이터 성격이 강하기 때문에 TTL을 두는 구조로 정리했다. 특히 scraps는 프로젝트 + 단계(stage) 기준으로 자주 조회되기 때문에project_id, stage, captured_at 조합의 인덱스를 염두에 두고 설계했다. 향후 검색 기능이 추가된다면 subtitle, memo에 대한 full-text search도 고려해볼 수 있을 것 같다. API 설계에서는 프론트에서 사용하기 쉬운 형태를 우선했고, cursor 기반 페이지네이션을 사용해 무한 스크롤 확장이 가능하도록 했다. 나중에 인증이 붙더라도 X-User-Id 구조를 쉽게 교체할 수 있도록 컨트롤러 최상단에서 사용자 파싱을 공통 처리하는 방향이 좋아 보인다.',

    rawHtmlToMarkdown: `## ERD 설계 개요

이번 MVP에서는 **기능 확장성보다 구조의 명확성**을 우선으로 ERD를 설계했다.  
핵심은 사용자가 여러 프로젝트를 만들고, 각 프로젝트의 작업 단계별로
AI 결과물을 스크랩 형태로 관리할 수 있도록 하는 것이다.

### 주요 엔티티
- **Users**
  - MVP 단계에서는 인증 없이 \`X-User-Id\` 헤더로 임시 식별
  - 모든 데이터는 user_id 기준으로 필터링

- **Projects**
  - 사용자 단위로 여러 개 생성 가능
  - 대시보드와 최근 컨텍스트 조회의 기준이 됨

- **Scraps**
  - 실제로 가장 많이 조회되는 핵심 테이블
  - project_id + stage 기준 조회가 많아 인덱스 설계 중요
  - rawHtml 또는 markdown 형태의 콘텐츠 저장

- **Drafts**
  - 확장프로그램에서 생성되는 임시 데이터
  - TTL 기반으로 자동 만료
  - commit 시 scraps로 이동

---

## API 설계 방향

API는 프론트에서 **최소한의 가공만으로 바로 사용 가능**하도록 설계했다.

### 프로젝트 관련
- \`GET /api/projects\`
- \`POST /api/projects\`
- \`PATCH /api/projects/{projectId}\`
- \`DELETE /api/projects/{projectId}\`

### 스크랩 관련
- \`GET /api/scraps?projectId=&stage=&cursor=&limit=\`
- \`GET /api/scraps/{scrapId}\`
- \`PATCH /api/scraps/{scrapId}\` (메모 수정)
- \`DELETE /api/scraps/{scrapId}\`

### 드래프트 플로우
1. 확장프로그램에서 텍스트 스크랩
2. 서버에서 프로젝트/단계 추천
3. 사용자가 수정 후 commit
4. scraps 생성 + draft 삭제

---

## 정리

이번 구조는 MVP 기준으로는 충분히 단순하면서도,
추후 인증, 검색, AI 추천 고도화까지 자연스럽게 확장할 수 있는 형태라고 생각한다.
특히 프론트와 백엔드 간 책임을 명확히 나눌 수 있다는 점이 장점이다.`,

    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
    {
    scrapId: 505,
    projectId: 1,
    stage: '설계',
    subtitle: '떙떙떙떙 초안',
    memo: '메모 예시를 이렇게 길게 써보면 어떤일이 벌어질까요? 초안은 이렇게 쓰는 거랍니다. ',

    rawHtml: '<p><strong>변환 실패</strong></p>',

    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
      {
    scrapId: 506,
    projectId: 1,
    stage: '기획',
    subtitle: '떙떙떙떙 초안',
    memo: '메모 예시를 이렇게 길게 써보면 어떤일이 벌어질까요? 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙',

    rawHtml: '<p><strong>변환 실패</strong></p>',

    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
      {
    scrapId: 507,
    projectId: 1,
    stage: '조사&분석',
    subtitle: '떙떙떙떙 초안',
    memo: '메모 예시를 이렇게 길게 써보면 어떤일이 벌어질까요? 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙',

    rawHtmlToMarkdown: `## API 설계 초안
- GET /api/projects
- POST /api/projects`,
    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
  {
    scrapId: 508,
    projectId: 1,
    stage: '설계',
    subtitle: '프론트엔드 상태 관리 및 데이터 흐름 설계',

    memo: `상태는 전역으로 관리할 것과 컴포넌트 내부에서만 관리할 것을 명확히 구분했다. 프로젝트 선택 상태와 사이드바 열림 여부는 전역 상태로 두고, 스크랩 상세 페이지의 UI 상태는 로컬 상태로 처리하는 것이 적절하다고 판단했다.`,
    rawHtmlToMarkdown: `## 상태 관리 설계 기준

상태 관리의 목표는 **예측 가능성과 단순함**이다.

### 전역 상태로 관리할 항목
- 선택된 projectId
- 현재 활성화된 stage
- 사이드바 접힘/펼침 상태

### 로컬 상태로 관리할 항목
- 스크랩 상세 페이지 UI 상태
- 메모 수정 모드
- 임시 입력 값

---

## 설계 이유

모든 상태를 전역으로 관리할 경우 의존성이 복잡해지고 디버깅 비용이 커질 수 있다.
따라서 실제로 여러 화면에서 공유되는 상태만 전역으로 관리하도록 설계했다.`,
    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
},
{
  scrapId: 209,
  projectId: 1,
  stage: '설계',
  subtitle: '전체 아키텍처 구조 초안 설계',
  memo: `프론트엔드와 백엔드의 역할을 명확히 분리하고, API 경계를 기준으로 책임을 나누는 방향으로 아키텍처를 설계했다.`,
  rawHtmlToMarkdown: `## 아키텍처 설계 방향

- 프론트엔드: UI 상태 및 사용자 인터랙션 담당
- 백엔드: 비즈니스 로직 및 데이터 처리 담당

### 핵심 원칙
- 단방향 데이터 흐름
- API 중심 통신
- UI와 로직의 분리`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:20:00Z',
},
{
  scrapId: 210,
  projectId: 1,
  stage: '설계',
  subtitle: '도메인 모델 구조 정의',
  memo: `Scrap, Project, Stage를 핵심 도메인으로 정의하고, UI용 모델과 분리해 관리하기로 했다.`,
  rawHtmlToMarkdown: `## 도메인 모델 설계

### 주요 도메인
- Project
- Scrap
- Stage

### 설계 포인트
- API DTO와 도메인 모델 분리
- mapper 계층을 통한 변환`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:25:00Z',
},
{
  scrapId: 211,
  projectId: 1,
  stage: '설계',
  subtitle: 'API 응답 구조 설계',
  memo: `프론트엔드에서 예측 가능한 렌더링을 위해 API 응답 구조를 일관되게 정의했다.`,
  rawHtmlToMarkdown: `## API 응답 설계

\`\`\`json
{
  "items": [],
  "nextCursor": "string | null"
}
\`\`\`

### 설계 이유
- 무한 스크롤 대응
- 서버/프론트 역할 명확화`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:30:00Z',
},
{
  scrapId: 212,
  projectId: 1,
  stage: '설계',
  subtitle: 'Stage 기반 라우팅 구조 설계',
  memo: `URL 구조만 보고도 현재 프로젝트와 단계, 스크랩을 유추할 수 있도록 라우팅을 설계했다.`,
  rawHtmlToMarkdown: `## 라우팅 설계

\`/project/:projectId/:stage/:scrapId\`

### 장점
- 상태 복원 용이
- 북마크 및 공유 가능`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:35:00Z',
},
{
  scrapId: 213,
  projectId: 1,
  stage: '설계',
  subtitle: '스크랩 리스트와 상세 분리 설계',
  memo: `리스트와 상세를 명확히 분리해 성능과 가독성을 모두 확보하고자 했다.`,
  rawHtmlToMarkdown: `## 스크랩 구조 분리

- 리스트: 요약 정보만 표시
- 상세: 본문, 메모, AI 출처 표시

### 효과
- 초기 로딩 속도 개선
- 컴포넌트 책임 분리`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:40:00Z',
},
{
  scrapId: 214,
  projectId: 1,
  stage: '설계',
  subtitle: '상태 관리 범위 기준 수립',
  memo: `전역 상태 남용을 방지하기 위한 기준을 문서화했다.`,
  rawHtmlToMarkdown: `## 상태 관리 기준

### 전역 상태
- 프로젝트 선택
- Stage 활성 상태

### 로컬 상태
- UI 토글
- 입력 중 값

불필요한 전역 상태는 유지보수 비용을 증가시킨다.`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:45:00Z',
},
{
  scrapId: 215,
  projectId: 1,
  stage: '설계',
  subtitle: '컴포넌트 책임 분리 기준',
  memo: `하나의 컴포넌트는 하나의 책임만 갖도록 설계 원칙을 세웠다.`,
  rawHtmlToMarkdown: `## 컴포넌트 설계 원칙

- Container / Presentational 분리
- 비즈니스 로직은 상위에서 처리

### 기대 효과
- 테스트 용이성 증가
- 재사용성 향상`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:50:00Z',
},
{
  scrapId: 216,
  projectId: 1,
  stage: '설계',
  subtitle: '사이드바 구조 및 상태 흐름 설계',
  memo: `사이드바는 전역 UI 요소이므로 Context 기반 상태 관리가 적합하다고 판단했다.`,
  rawHtmlToMarkdown: `## 사이드바 설계

- 전역 상태로 관리
- 프로젝트/단계 이동의 중심 역할

### 고려 사항
- 모바일 확장 가능성`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T13:55:00Z',
},
{
  scrapId: 217,
  projectId: 1,
  stage: '설계',
  subtitle: '데이터 흐름 단방향 설계',
  memo: `상태 변경 흐름을 추적 가능하게 만들기 위해 단방향 데이터 흐름을 유지했다.`,
  rawHtmlToMarkdown: `## 데이터 흐름

사용자 액션 → 상태 변경 → UI 렌더링

### 장점
- 디버깅 용이
- 예측 가능한 UI`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T14:00:00Z',
},
{
  scrapId: 218,
  projectId: 1,
  stage: '설계',
  subtitle: '확장성을 고려한 설계 정리',
  memo: `당장은 단순하지만, 이후 기능 추가를 고려해 구조를 단순 확장 가능하게 설계했다.`,
  rawHtmlToMarkdown: `## 확장성 고려 설계

- Stage 추가 용이
- Scrap 타입 확장 가능

### 결론
지금은 단순하게, 나중에 확장 가능하게.`,
  aiSource: 'Claude',
  aiSourceUrl: 'https://claude.ai',
  capturedAt: '2026-01-12T14:05:00Z',
},


];