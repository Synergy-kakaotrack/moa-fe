// src/domain/recentContext.ts

/**
 * 홈 화면에서 사용하는 최근 프로젝트 컨텍스트 도메인 모델
 * - UI 컴포넌트(ProjectCard)에서 직접 사용할 수 있는 형태
 */

export interface RecentProject {
  projectId: number;
  name: string;
  lastStage: string;
  lastCapturedAt: Date;
}

// src/domain/recentContext.ts

// NOTE: 프론트 도메인 RecentContext 타입
export interface RecentContext {
  projectId: number | null;
  stageId: number | null;
  scrapId: number | null;

  projectName: string | null;
  stageName: string | null;
  scrapSubtitle: string | null;

  // NOTE: 확장 필드 저장(필요 시 UI에서 참조 가능)
  extra: Record<string, unknown>;
}
