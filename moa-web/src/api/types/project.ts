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
