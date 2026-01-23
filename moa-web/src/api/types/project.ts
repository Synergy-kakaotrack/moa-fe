// api/types/project.ts
export interface Project {
  projectId: number;
  name: string;
  description?: string;
}

export interface ProjectListResponse {
  items: Project[];
}
