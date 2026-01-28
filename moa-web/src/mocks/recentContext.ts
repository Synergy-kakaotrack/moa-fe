// src/mocks/recentContext.ts

import { RecentContextResponseMock } from './types/recentContext.dto';

export const mockRecentContext: RecentContextResponseMock = {
  items: [
    {
      projectId: 1,
      projectName: 'kakao 현장실습',
      description: '카카오 본사에서 진행한 현장실습 프로젝트입니다.',
      lastCapturedAt: '2026-01-09T14:30:00Z',
    },
    {
      projectId: 2,
      projectName: 'AI 태건 해커톤',
      description: '태건 해커톤 프로젝트는 AI 기반 이미지 인식 시스템을 개발하는 것을 목표로 합니다.',
      lastCapturedAt: '2026-01-01T10:00:00Z',
    },
    {
      projectId: 3,
      projectName: '하늘 해커톤',
      description: '하늘해커톤은 하늘을 나는 AI 드론을 개발하는 프로젝트입니다.',
      lastCapturedAt: '2026-01-01T09:00:00Z',
    },
  ],
};
