import type { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { Scrap } from '@/domain/scrap';
import { stages } from '@/constants/stages';
import styles from './ScrapCard.module.css';

interface Props {
  scrap: Scrap;
  variant?: 'kanban' | 'sidebar';
  isActive?: boolean;
  /** stage 배지 표시 여부 (프로젝트 전체 보기에서 사용) */
  showStageBadge?: boolean;
}

/** stageKey에서 stage 이름 찾기 */
const getStageName = (stageKey: string): string => {
  const stage = stages.find((s) => s.key === stageKey);
  return stage?.name ?? stageKey;
};

const ScrapCard: FC<Props> = ({
  scrap,
  variant = 'kanban',
  isActive = false,
  showStageBadge = false,
}) => (
    <Link
      href={`/project/${scrap.projectId}/${scrap.stageKey}/${scrap.scrapId}`}
      className={styles.link}
    >
      <article
        className={clsx(
          styles.card,
          styles[variant],
          isActive && styles.active,
          showStageBadge && styles.withBadge
        )}
      >
        {/* Stage 배지 (프로젝트 전체 보기에서 표시) */}
        {showStageBadge && (
          <span className={clsx(styles.stageBadge, styles[`stage${scrap.stageKey}`])}>
            {getStageName(scrap.stageKey)}
          </span>
        )}

        <h3 className={styles.title}>{scrap.subtitle}</h3>

        {/* kanban + sidebar 모두 memo 미리보기 */}
        {scrap.memo && (
          <p
            className={clsx(
              styles.memo,
              styles[`${variant}Memo`]
            )}
          >
            {scrap.memo}
          </p>
        )}

        {/* 프로젝트 전체 보기가 아닐 때만 날짜 표시 */}
        {!showStageBadge && (
          <div className={styles.footer}>
            <time className={styles.date}>
              {new Date(scrap.capturedAt).toLocaleDateString('ko-KR')}
            </time>
          </div>
        )}
      </article>
    </Link>
);

export default ScrapCard;
