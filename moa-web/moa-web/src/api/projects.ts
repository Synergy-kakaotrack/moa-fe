import { ProjectListResponse } from './types/project';
import { mockProjects } from '@/mocks/projects';

export async function getProjects(): Promise<ProjectListResponse> {
  return { items: mockProjects };
}