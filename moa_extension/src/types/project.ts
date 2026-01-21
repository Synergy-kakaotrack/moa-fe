
export interface Project {
  projectId: number;
  name: string;
  description?: string;
}

//API Response

export interface ProjectListResponse {
  items: Project[];
}

export interface ProjectCountResponse {
  count: number;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface CreateProjectResponse {
  projectId: number;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
}

export interface UpdateProjectResponse {
  projectId: number;
}
