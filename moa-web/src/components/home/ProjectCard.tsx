import Link from 'next/link';
import styles from './home.module.css';
import { IconFolder } from '../icons';

type Props = {
  projectId: string;
  title: string;
  description: string;
  date: string;
};

export default function ProjectCard({ projectId, title, description, date }: Props) {
  return (
    <Link href={`/project/${projectId}`} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.cardTitleRow}>
          <IconFolder className={styles.folderIcon} />
          <span className={styles.cardTitle}>{title}</span>
        </div>

        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.cardDate}>{date}</div>
      </article>
    </Link>
  );
}
