import { apiClient } from "./apiClient";
import type {
  ProjectListResponse,
  ProjectCountResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  UpdateProjectRequest,
  UpdateProjectResponse,
} from "../types/project";

//GET /api/projects
export function getProjects() {
  return apiClient<ProjectListResponse>("/projects");
}

//GET /api/projects/count
export function getProjectCount() {
  return apiClient<ProjectCountResponse>("/projects/count");
}

//POST /api/projects
export function createProject(body: CreateProjectRequest) {
  return apiClient<CreateProjectResponse>("/projects", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

//PATCH /api/projects/{projectId}
export function updateProject(
  projectId: number,
  body: UpdateProjectRequest
) {
  return apiClient<UpdateProjectResponse>(`/projects/${projectId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

//DELETE /api/projects/{projectId}
export function deleteProject(projectId: number) {
  return apiClient<void>(`/projects/${projectId}`, {
    method: "DELETE",
  });
}
