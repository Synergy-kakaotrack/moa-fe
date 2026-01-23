// src/domain/recentContext.ts

/**
 * 홈 화면에서 사용하는 최근 프로젝트 컨텍스트 도메인 모델
 * - UI 컴포넌트(ProjectCard)에서 직접 사용할 수 있는 형태
 */

export interface RecentProject {
  projectId: number;
  name: string;
  description: string;
  lastCapturedAt: Date;
}
