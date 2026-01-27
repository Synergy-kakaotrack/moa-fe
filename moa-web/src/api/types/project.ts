// src/api/types/project.ts

/**
 * GET /api/projects 응답 타입
 * API 명세 기준 - 수정 금지
 */

export interface ProjectItem {
  projectId: number;
  name: string;
  description?: string | null;
}

export interface ProjectListResponse {
  items: ProjectItem[];
}

/**
 * GET /api/projects/count 응답 타입
 */
export interface ProjectCountResponse {
  count: number;
}

/**
 * POST /api/projects 요청 타입
 */
export interface CreateProjectRequest {
  name: string;
  description?: string;
}

/**
 * POST /api/projects 응답 타입
 */
export interface CreateProjectResponse {
  projectId: number;
}

/**
 * PATCH /api/projects/{projectId} 요청 타입
 */
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

/**
 * PATCH /api/projects/{projectId} 응답 타입
 */
export interface UpdateProjectResponse {
  projectId: number;
}

// src/api/types/project.ts

// NOTE: 백엔드 /api/projects 응답 DTO 타입
// NOTE: 실제 응답 필드명이 다르면 여기만 수정하면 됩니다.
export interface ProjectDto {
  projectId: number;
  name: string;
  description?: string | null;

  // NOTE: 프로젝트 목록에서 "마지막 업데이트 시간" 표시를 위해 사용(없으면 optional)
  updatedAt?: string | null;

  // NOTE: 폴더 색 (요구사항: 기본 하늘색)
  folderColor?: string | null;
}
