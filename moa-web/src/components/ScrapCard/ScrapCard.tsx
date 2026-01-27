import Link from 'next/link';
import clsx from 'clsx';

import { Scrap } from '@/domain/scrap';
import styles from './ScrapCard.module.css';

interface Props {
  scrap: Scrap;
  variant?: 'kanban' | 'sidebar';
  isActive?: boolean;
}

export default function ScrapCard({
  scrap,
  variant = 'kanban',
  isActive = false,
}: Props) {
  return (
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
            {new Date(scrap.capturedAt).toLocaleDateString()}
          </time>
        </div>
      </article>
    </Link>
  );
}
