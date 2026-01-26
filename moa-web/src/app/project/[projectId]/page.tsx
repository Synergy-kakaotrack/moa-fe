'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import clsx from 'clsx';

import { useSidebarState } from '@/contexts/SidebarContext';
import { Scrap } from '@/domain/scrap';
import { stages } from '@/constants/stages';

import { mockProjects } from '@/mocks/projects';
import { mockScraps } from '@/mocks/scrapDetail';

import { mapProjectFromMock } from '@/api/mappers/mapProjectFromMock';
import { mapScrapListItemFromMock } from '@/api/mappers/mapScrapListItemFromMock';

import ScrapCard from '@/components/ScrapCard/ScrapCard';
import styles from './ProjectDashboard.module.css';

import Link from 'next/link';
import { StageKey } from '@/domain/stage';

const PAGE_SIZE = 3;

const stageClassMap: Record<StageKey, string> = {
  PLAN: styles.plan,
  RESEARCH: styles.research,
  DESIGN: styles.design,
  IMPLEMENT: styles.implement,
  TEST: styles.test,
  ETC: styles.etc,
};

export default function ProjectDashboardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { collapsed } = useSidebarState();

  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  /* ===== Project ===== */
  const project = useMemo(() => {
    return mockProjects
      .map(mapProjectFromMock)
      .find((p) => p.projectId === Number(projectId));
  }, [projectId]);

  /* ===== Scrap list ===== */
  useEffect(() => {
    const mapped = mockScraps
      .filter((s) => s.projectId === Number(projectId))
      .map(mapScrapListItemFromMock)
      .sort(
        (a, b) =>
          new Date(b.capturedAt).getTime() -
          new Date(a.capturedAt).getTime()
      );

    setScraps(mapped);
  }, [projectId]);

  /* ===== Stage paging ===== */
  const stagePages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < stages.length; i += PAGE_SIZE) {
      pages.push(stages.slice(i, i + PAGE_SIZE));
    }
    return pages;
  }, []);

  const pageCount = stagePages.length;
  const currentStages = stagePages[pageIndex];

  const showPrev = pageIndex > 0;
  const showNext = pageIndex < pageCount - 1;

  return (
    <main className={styles.page}>
      {/* ================= Header ================= */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.projectTitle}>{project?.name}</h1>
          {project?.description && (
            <p className={styles.projectDescription}>
              {project.description}
            </p>
          )}
        </div>

        {/* 헤더 화살표: 항상 렌더링 + CSS로 숨김 */}
        <div
          className={clsx(
            styles.headerNav,
            collapsed && styles.hidden
          )}
        >
          <button
            disabled={!showPrev}
            onClick={() => setPageIndex((p) => p - 1)}
          >
            ←
          </button>

          <span className={styles.headerDivider}>|</span>

          <button
            disabled={!showNext}
            onClick={() => setPageIndex((p) => p + 1)}
          >
            →
          </button>
        </div>
      </header>

      {/* ================= Kanban Board ================= */}
      <section
        className={clsx(
          styles.boardWrapper,
          collapsed && styles.collapsed
        )}
      >
        {/* ⬅ 보드 이전 화살표 (DOM 유지) */}
        <button
          className={clsx(
            styles.arrow,
            styles.prev,
            (!collapsed || !showPrev) && styles.hidden
          )}
          onClick={() => setPageIndex((p) => p - 1)}
        >
          ←
        </button>

        <div className={styles.board}>
          {currentStages.map((stage) => {
            const stageScraps = scraps.filter(
              (scrap) => scrap.stageKey === stage.key
            );

            return (
              <div
                key={stage.key}
                className={clsx(styles.column, stageClassMap[stage.key])}
              >
                <Link
                  href={`/project/${projectId}/${stage.key}`}
                  className={styles.columnHeader}
                >
                  {stage.name}
                </Link>

                <div className={styles.cardList}>
                  {stageScraps.map((scrap) => (
                    <ScrapCard
                      key={scrap.scrapId}
                      scrap={scrap}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ➡ 보드 다음 화살표 (DOM 유지) */}
        <button
          className={clsx(
            styles.arrow,
            styles.next,
            (!collapsed || !showNext) && styles.hidden
          )}
          onClick={() => setPageIndex((p) => p + 1)}
        >
          →
        </button>
      </section>
    </main>
  );
}