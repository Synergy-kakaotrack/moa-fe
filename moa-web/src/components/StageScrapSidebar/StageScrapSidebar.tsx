'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import type { Scrap } from '@/domain/scrap';
import type { StageKey } from '@/domain/stage';
import ScrapCard from '@/components/ScrapCard/ScrapCard';

import styles from './StageScrapSidebar.module.css';

interface Props {
  scraps: Scrap[];
  stageKey: StageKey;
  projectId: number;
  projectName: string;
  stageName: string;
  /** 프로젝트 전체 보기 모드 (보라색 테마 적용) */
  isProjectView?: boolean;
  /** 프로젝트 전체 보기일 때 스크랩 카드에 stage 배지 표시 */
  showStageBadge?: boolean;
}

const stageClassMap: Record<StageKey, string> = {
  PLAN: styles.plan,
  RESEARCH: styles.research,
  DESIGN: styles.design,
  IMPLEMENT: styles.implement,
  TEST: styles.test,
  ETC: styles.etc,
};

export default function StageScrapSidebar({
  scraps,
  stageKey,
  projectId,
  projectName,
  stageName,
  isProjectView = false,
  showStageBadge = false,
}: Props) {
  const params = useParams();
  const currentScrapId = params.scrapId ? Number(params.scrapId) : null;

  // 프로젝트 전체 보기일 때는 보라색 테마, 아니면 stage별 테마
  const sidebarClass = isProjectView ? styles.project : stageClassMap[stageKey];

  return (
    <aside className={clsx(styles.sidebar, sidebarClass)}>
      {/* 컨텍스트 헤더 */}
      <h3 className={styles.sidebarTitle}>
        <Link href={`/project/${projectId}`} className={styles.projectLink}>
          {projectName}
        </Link>
        <span className={styles.separator}> / </span>
        <span>{stageName}</span>
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
              isActive={scrap.scrapId === currentScrapId}
              showStageBadge={showStageBadge}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
