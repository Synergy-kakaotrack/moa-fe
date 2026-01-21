// mocks/projects.ts
import { Project } from '@/api/types/project';

export const mockProjects: Project[] = [
  { projectId: 1, name: 'MOA', description: 'AI 기록 관리' },
  { projectId: 2, name: '호남해커톤', description: '호남해커톤에 관련된 프로젝트겠지요?' },
  { projectId: 3, name: 'kakao현장실습', description: '특강 관리 문서들 정리할듯' },
  { projectId: 4, name: '소현프로젝트', description: '소현이의 프로젝트' },
  { projectId: 5, name: '캡스톤디자인(1)', description: '캡스톤디자인 1조 프로젝트' },
  { projectId: 6, name: '캡스톤디자인(2)', description: '캡스톤디자인 2조 프로젝트' },
];
