// src/api/projects.ts
import { request } from "@/api/http";
import type { Project } from "@/domain/project";

// NOTE: 백엔드 응답이 배열일 수도 있고, { items: [...] } 형태일 수도 있어서 둘 다 수용
type ProjectsApiResponse = ProjectDto[] | { items: ProjectDto[] };

// NOTE: 백엔드 DTO는 스펙이 바뀔 수 있어 필요한 필드만 최소 정의
interface ProjectDto {
  projectId: number;
  name: string;
  description?: string | null;

  // NOTE: 도메인(Project)에 필수인 경우가 있어서 옵션으로 받아 기본값 처리
  folderColor?: string | null;
  updatedAt?: string | null;
  projectUpdatedAt?: string | null; // NOTE: 서버에서 이런 이름으로 올 수도 있어 대비
}

function mapProjectFromApi(dto: ProjectDto): Project {
  return {
    projectId: dto.projectId,
    name: dto.name,
    description: dto.description ?? null,

    // NOTE: Project 도메인에 필수 필드라면 기본값 채움
    // - 만약 현재 도메인(Project)에 folderColor/updatedAt이 없다면 이 두 줄을 제거하세요.
    folderColor: dto.folderColor ?? "#87CEEB",
    updatedAt: dto.updatedAt ?? dto.projectUpdatedAt ?? new Date().toISOString(),
  } as Project;
}

// NOTE: 응답 정규화: 어떤 형태로 와도 { items: Project[] }로 맞춘다
function normalizeProjectsResponse(res: ProjectsApiResponse): { items: Project[] } {
  const dtos = Array.isArray(res) ? res : res.items ?? [];
  return { items: dtos.map(mapProjectFromApi) };
}

/**
 * NOTE: 프로젝트 목록
 * - GET /api/projects
 */
export async function getProjects(): Promise<{ items: Project[] }> {
  const res = await request<ProjectsApiResponse>("/api/projects", "GET");
  return normalizeProjectsResponse(res);
}

/**
 * NOTE: 프로젝트 개수
 * - GET /api/projects/count
 * - 백엔드 응답이 number 또는 { count: number }일 수 있어 둘 다 수용
 */
export async function getProjectsCount(): Promise<number> {
  const res = await request<number | { count: number }>("/api/projects/count", "GET");
  return typeof res === "number" ? res : res.count;
}

/**
 * NOTE: 프로젝트 생성
 * - POST /api/projects
 */
export async function createProject(payload: {
  name: string;
  description?: string | null;
  folderColor?: string | null;
}): Promise<Project> {
  const res = await request<ProjectDto>("/api/projects", "POST", { body: payload });
  return mapProjectFromApi(res);
}

/**
 * NOTE: 프로젝트 수정
 * - PATCH /api/projects/{projectId}
 */
export async function updateProject(
  projectId: number,
  payload: {
    name?: string;
    description?: string | null;
    folderColor?: string | null;
  }
): Promise<Project> {
  const res = await request<ProjectDto>(`/api/projects/${projectId}`, "PATCH", { body: payload });
  return mapProjectFromApi(res);
}

/**
 * NOTE: 프로젝트 삭제
 * - DELETE /api/projects/{projectId}
 */
export async function deleteProject(projectId: number): Promise<void> {
  await request<void>(`/api/projects/${projectId}`, "DELETE");
}

// NOTE: 기존 코드 호환용 객체 export
export const projectsApi = {
  getProjects,
  getProjectsCount,
  createProject,
  updateProject,
  deleteProject,
};
