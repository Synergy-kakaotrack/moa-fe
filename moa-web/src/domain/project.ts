// src/domain/project.ts

// NOTE: 프론트에서 화면/상태 관리에 사용하는 Project 도메인 타입
// NOTE: 화면에서는 이 타입만 사용하도록 통일(DTO는 api/types에서만 사용)
export interface Project {
  projectId: number;
  name: string;
  description: string | null;

  // NOTE: 폴더 색
  folderColor: string | null;

  // NOTE: 마지막 업데이트 시간(정렬/표시용)
  updatedAt: string | null;
}
