import type { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import { Scrap } from '@/domain/scrap';
import styles from './ScrapCard.module.css';

interface Props {
  scrap: Scrap;
  variant?: 'kanban' | 'sidebar';
  isActive?: boolean;
}

const ScrapCard: FC<Props> = ({
  scrap,
  variant = 'kanban',
  isActive = false,
}) => (
    <Link
      href={`/project/${scrap.projectId}/${scrap.stageKey}/${scrap.scrapId}`}
      className={styles.link}
    >
      <article
        className={clsx(
          styles.card,
          styles[variant],
          isActive && styles.active
        )}
      >
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

        <div className={styles.footer}>
          <time className={styles.date}>
            {new Date(scrap.capturedAt).toLocaleDateString('ko-KR')}
          </time>
        </div>
      </article>
    </Link>
);

export default ScrapCard;
