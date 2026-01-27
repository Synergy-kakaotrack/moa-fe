// src/api/mappers/mapProjectFromMock.ts

import type { ProjectMock } from "@/mocks/types/project.dto";
import type { Project } from "@/domain/project";
import { DEFAULT_FOLDER_COLOR } from "@/constants/projects";

// NOTE: Mock(ProjectMock) -> Domain(Project) 변환
// NOTE: 현재 Project 도메인에 folderColor, updatedAt 필드가 필수라서 기본값을 채워줍니다.
export function mapProjectFromMock(mock: ProjectMock): Project {
  return {
    projectId: mock.projectId,
    name: mock.name,
    description: mock.description ?? null,

    // NOTE: 요구사항 기본색(하늘색) - 실제 UI 색상 정책에 맞게 변경 가능
    folderColor: DEFAULT_FOLDER_COLOR,

    // NOTE: Mock에는 업데이트 시간이 없으므로 임시로 현재 시간 사용
    updatedAt: new Date().toISOString(),
  };
}
