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
}: Props) {
  const params = useParams();
  const currentScrapId = params.scrapId ? Number(params.scrapId) : null;

  return (
    <aside className={clsx(styles.sidebar, stageClassMap[stageKey])}>
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
            />
          ))}
        </div>
      )}
    </aside>
  );
}
