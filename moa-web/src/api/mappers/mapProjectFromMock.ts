// src/api/mappers/mapProjectFromMock.ts

import { ProjectMock } from '@/mocks/types/project.dto';
import { Project } from '@/domain/project';

export function mapProjectFromMock(
  mock: ProjectMock
): Project {
  return {
    projectId: mock.projectId,
    name: mock.name,
    description: mock.description,
  };
}
