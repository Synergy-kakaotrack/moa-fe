import styles from './home.module.css';

type Props = {
  title: string;
  description: string;
  date: string;
};

export default function ProjectCard({ title, description, date }: Props) {
  return (
    <article className={styles.card} role="button" tabIndex={0}>
      <div className={styles.cardTitleRow}>
        <span className={styles.folderIcon} aria-hidden="true">
          📁
        </span>
        <span className={styles.cardTitle}>{title}</span>
      </div>

      <p className={styles.cardDesc}>{description}</p>
      <div className={styles.cardDate}>{date}</div>
    </article>
  );
}
