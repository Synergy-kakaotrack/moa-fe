import React from 'react';
import clsx from 'clsx';

import { getScraps } from '@/api/scraps';
import { projectsApi } from '@/api/projects';

import { StageKey } from '@/domain/stage';
import type { Scrap } from '@/domain/scrap';
import type { Project } from '@/domain/project';
import { stages } from '@/constants/stages';
import ScrapCardList from '@/components/ScrapCard/ScrapCardList';

import styles from './layout.module.css';

const stageClassMap: Record<StageKey, string> = {
  PLAN: styles.plan,
  RESEARCH: styles.research,
  DESIGN: styles.design,
  IMPLEMENT: styles.implement,
  TEST: styles.test,
  ETC: styles.etc,
};

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
  const { projectId, stage, scrapId } = await params;
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
      <aside className={clsx(styles.sidebar, stageClassMap[stage])}>
        {/* 컨텍스트 헤더 */}
        <h3 className={styles.sidebarTitle}>
          {projectName} / {stageName}
        </h3>

        {/* 스크랩 리스트 */}
        {scraps.length === 0 ? (
          <p className={styles.empty}>스크랩이 없습니다.</p>
        ) : (
          <div className={styles.scrapList}>
            <ScrapCardList scraps={scraps} />
          </div>
        )}
      </aside>
    </div>
  );
}
