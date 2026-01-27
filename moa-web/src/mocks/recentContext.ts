// src/mocks/recentContext.ts

import { RecentContextResponseMock } from './types/recentContext.dto';

export const mockRecentContext: RecentContextResponseMock = {
  items: [
    {
      projectId: 1,
      projectName: 'kakao 현장실습',
      lastStage: '설계',
      lastCapturedAt: '2026-01-09T14:30:00Z',
    },
    {
      projectId: 2,
      projectName: 'AI 태권 해커톤',
      lastStage: '기획',
      lastCapturedAt: '2026-01-01T10:00:00Z',
    },
    {
      projectId: 3,
      projectName: '하늘 해커톤',
      lastStage: '구현',
      lastCapturedAt: '2026-01-01T09:00:00Z',
    },
  ],
};
