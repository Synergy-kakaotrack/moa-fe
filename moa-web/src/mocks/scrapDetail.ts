// src/mocks/scrapDetail.ts
import { ScrapDetailMock } from './types/scrap.dto';

export const mockScraps: ScrapDetailMock[] = [
  {
    scrapId: 500,
    projectId: 1,
    stage: '설계',
    subtitle: 'API 설계 초안',
    memo: '메모 예시',

    rawHtmlToMarkdown: `
## API 설계 초안
- GET /api/projects
- POST /api/projects
    `,

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
    subtitle: '떙떙떙떙 초안',
    memo: '메모 예시를 이렇게 길게 써보면 어떤일이 벌어질까요? 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙',

    rawHtml: '<p><strong>변환 실패</strong></p>',

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
    scrapId: 506,
    projectId: 1,
    stage: '조사&분석',
    subtitle: '떙떙떙떙 초안',
    memo: '메모 예시를 이렇게 길게 써보면 어떤일이 벌어질까요? 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙 떙떙떙떙',

    rawHtml: '<p><strong>변환 실패</strong></p>',

    aiSource: 'Claude',
    aiSourceUrl: 'https://claude.ai',
    capturedAt: '2026-01-12T13:10:00Z',
  },
];