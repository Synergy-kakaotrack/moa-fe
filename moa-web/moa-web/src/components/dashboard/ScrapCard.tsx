'use client';

import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { StageKey } from '@/data/stages';

type AiSource = 'CHATGPT' | 'CLAUDE' | 'GEMINI';

interface ScrapCardProps {
  projectId: string;
  stage: StageKey;
  title: string;
  preview: string;
  aiSource: AiSource;
  capturedAt: string;
}

export default function ScrapCard({
  projectId,
  stage,
  title,
  preview,
  aiSource,
  capturedAt,
}: ScrapCardProps) {
  const router = useRouter();

  return (
    <article
      className={styles.card}
      onClick={() => router.push(`/project/${projectId}/${stage}`)}
    >
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.preview}>{preview}</p>

      <footer className={styles.footer}>
        <span className={styles.source}>{aiSource}</span>
        <span className={styles.date}>{capturedAt}</span>
      </footer>
    </article>
  );
}
