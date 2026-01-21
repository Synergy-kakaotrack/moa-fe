'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import clsx from 'clsx';

import { Scrap } from '@/api/types/scrap';
import { stages } from '@/constants/stages';

import { mockProjects } from '@/mocks/projects';
import { mockScraps } from '@/mocks/scraps';

import styles from './ProjectDashboard.module.css';

/**
 * ⚠️ 임시
 * 실제로는 Sidebar Context / Zustand 등에서 연결
 */
const useSidebarState = () => {
  return {
    collapsed: false, // true = 사이드바 접힘
  };
};

const PAGE_SIZE = 3;


export default function ProjectDashboardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { collapsed } = useSidebarState();
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  /* ===== 프로젝트 정보 (목업) ===== */
  const project = useMemo(() => {
    return mockProjects.find(
      (p) => p.projectId === Number(projectId)
    );
  }, [projectId]);

  /* ===== 스크랩 로딩 (목업) ===== */
  useEffect(() => {
    setScraps(
      mockScraps.filter(
        (scrap) => scrap.projectId === Number(projectId)
      )
    );
  }, [projectId]);

  /* ===== stage를 3개씩 묶은 페이지 ===== */
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
      {/* ===== Header ===== */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.projectTitle}>
            {project?.name}
          </h1>
          {project?.description && (
            <p className={styles.projectDescription}>
              {project.description}
            </p>
          )}
        </div>

        {/* 사이드바 열림 상태 → 헤더 우측 화살표 */}
        {!collapsed && (
          <div className={styles.headerNav}>
            {showPrev && (
              <button onClick={() => setPageIndex((p) => p - 1)}>
                ←
              </button>
            )}
            {showNext && (
              <button onClick={() => setPageIndex((p) => p + 1)}>
                →
              </button>
            )}
          </div>
        )}
      </header>

      {/* ===== Kanban Board ===== */}
      <section
        className={clsx(
          styles.boardWrapper,
          collapsed && styles.collapsed
        )}
      >
        {/* 사이드바 접힘 상태 → 보드 기준 화살표 */}
        {collapsed && showPrev && (
          <button
            className={clsx(styles.arrow, styles.prev)}
            onClick={() => setPageIndex((p) => p - 1)}
          >
            ←
          </button>
        )}

        <div className={styles.board}>
          {currentStages.map((stage) => {
            const stageScraps = scraps.filter(
              (scrap) => scrap.stage === stage.name
            );

            return (
              <div key={stage.key} className={styles.column}>
                <div className={styles.columnHeader}>
                  {stage.name}
                </div>

                <div className={styles.cardList}>
                  {stageScraps.map((scrap) => (
                    <article
                      key={scrap.scrapId}
                      className={styles.card}
                    >
                      <h3 className={styles.cardTitle}>
                        {scrap.subtitle}
                      </h3>

                      {scrap.memo && (
                        <p className={styles.cardContent}>
                          {scrap.memo}
                        </p>
                      )}

                      <div className={styles.cardFooter}>
                        <span className={styles.agent}>
                          {scrap.agent ?? 'chatgpt'}
                        </span>
                        <time>
                          {new Date(scrap.capturedAt)
                            .toISOString()
                            .slice(0, 10)
                            .replace(/-/g, '/')}
                        </time>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {collapsed && showNext && (
          <button
            className={clsx(styles.arrow, styles.next)}
            onClick={() => setPageIndex((p) => p + 1)}
          >
            →
          </button>
        )}
      </section>
    </main>
  );
}
