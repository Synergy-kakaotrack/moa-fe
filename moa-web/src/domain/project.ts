// src/domain/project.ts

export interface Project {
  projectId: number;
  name: string;
  description?: string | null;
}
