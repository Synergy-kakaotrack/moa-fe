import React from 'react';

import { getScraps } from '@/api/scraps';
import { projectsApi } from '@/api/projects';

import { StageKey } from '@/domain/stage';
import type { Scrap } from '@/domain/scrap';
import type { Project } from '@/domain/project';
import { stages } from '@/constants/stages';
import StageScrapSidebar from '@/components/StageScrapSidebar';

import styles from './layout.module.css';

interface StageLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
    stage: StageKey;
  }>;
}

export default async function StageLayout({
  children,
  params,
}: StageLayoutProps) {
  const { projectId, stage } = await params;
  const numericProjectId = Number(projectId);
  const stageName = stages.find((s) => s.key === stage)?.name ?? stage;

  /* ================= 스크랩 리스트 ================= */
  let scraps: Scrap[] = [];
  try {
    const res = await getScraps({
      projectId: numericProjectId,
      stage: stageName,
    });
    scraps = res.items.sort(
      (a, b) =>
        new Date(b.capturedAt).getTime() -
        new Date(a.capturedAt).getTime()
    );
  } catch {
    scraps = [];
  }

  /* ================= 표시용 컨텍스트 ================= */
  let project: Project | null = null;
  try {
    const res = await projectsApi.getProjects();
    project = res.items.find((p) => p.projectId === numericProjectId) ?? null;
  } catch {
    project = null;
  }

  const projectName = project?.name ?? '프로젝트';

  return (
    <div className={styles.container}>
      {/* 메인 영역 */}
      <main className={styles.main}>
        {children}
      </main>

      {/* 우측 사이드바 */}
      <StageScrapSidebar
        scraps={scraps}
        stageKey={stage}
        projectId={numericProjectId}
        projectName={projectName}
        stageName={stageName}
      />
    </div>
  );
}
