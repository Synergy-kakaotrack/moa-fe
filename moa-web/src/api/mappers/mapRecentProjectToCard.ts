// src/api/mappers/mapRecentProjectToCard.ts

import { RecentProject } from '@/domain/recentContext';
import { formatDate } from '@/utils/formatDate';

export interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
}

/**
 * RecentProject 도메인 모델 → ProjectCard props 변환
 */
export function mapRecentProjectToCard(project: RecentProject): ProjectCardProps {
  return {
    id: String(project.projectId),
    title: project.name,
    description: project.description,
    date: formatDate(project.lastCapturedAt),
  };
}
