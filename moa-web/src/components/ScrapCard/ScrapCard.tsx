import { Scrap } from '@/domain/scrap';
import styles from './ScrapCard.module.css';
import Link from 'next/link';

interface Props {
  scrap: Scrap;
}

export default function ScrapCard({ scrap }: Props) {
  return (
    <Link 
    href={`/project/${scrap.projectId}/${scrap.stageKey}/${scrap.scrapId}`}
    className={styles.cardLink}
    >
      <article className={styles.card}>

        <h3 className={styles.title}>{scrap.subtitle}</h3>

        {scrap.memo && (
          <p className={styles.memo}>{scrap.memo}</p>
        )}

        <div className={styles.footer}>
          <span className={styles.agent}>
            {scrap.agent}
          </span>
          <time>
            {new Date(scrap.capturedAt).toLocaleDateString()}
          </time>
        </div>
      </article>
    </Link>
  );
}
