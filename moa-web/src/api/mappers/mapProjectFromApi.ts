// src/api/mappers/mapProjectFromApi.ts
import type { ProjectDto } from "@/api/types/project";
import type { Project } from "@/domain/project";

// NOTE: 백엔드 DTO(ProjectDto) -> 프론트 도메인(Project) 변환
export function mapProjectFromApi(dto: ProjectDto): Project {
  return {
    projectId: dto.projectId,
    name: dto.name,
    description: dto.description ?? null,
    folderColor: dto.folderColor ?? null,
    updatedAt: dto.updatedAt ?? null,
  };
}
