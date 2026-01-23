import React from 'react';
import clsx from 'clsx';

import { mockScraps } from '@/mocks/scrapDetail';
import { mockProjects } from '@/mocks/projects';

import { mapScrapListItemFromMock } from '@/api/mappers/mapScrapListItemFromMock';
import { mapProjectFromMock } from '@/api/mappers/mapProjectFromMock';

import { StageKey } from '@/domain/stage';
import { stages } from '@/constants/stages';
import ScrapCard from '@/components/ScrapCard/ScrapCard';

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
    scrapId?: string;
  }>;
}

export default async function StageLayout({
  children,
  params,
}: StageLayoutProps) {
  const { projectId, stage, scrapId } = await params;

  /* ================= 스크랩 리스트 ================= */
  const scraps = mockScraps
    .map(mapScrapListItemFromMock)
    .filter(
      (scrap) =>
        scrap.projectId === Number(projectId) &&
        scrap.stageKey === stage
    )
    .sort(
      (a, b) =>
        new Date(b.capturedAt).getTime() -
        new Date(a.capturedAt).getTime()
    );

  /* ================= 표시용 컨텍스트 ================= */
  const project = mockProjects
    .map(mapProjectFromMock)
    .find((p) => p.projectId === Number(projectId));

  const projectName = project?.name ?? '프로젝트';
  const stageName = stages.find((s) => s.key === stage)?.name ?? '단계';

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
            {scraps.map((scrap) => (
              <ScrapCard
                key={scrap.scrapId}
                scrap={scrap}
                variant="sidebar"
                isActive={scrap.scrapId === Number(scrapId)}
              />
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
