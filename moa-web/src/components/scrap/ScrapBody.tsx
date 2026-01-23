'use client';

import { normalizeContent } from '@/utils/normalizeContent';
import type { ScrapContentType } from '@/domain/scrap';

import styles from './ScrapBody.module.css';

interface Props {
  content: string;
  contentType: ScrapContentType;
}

export default function ScrapBody({ content, contentType }: Props) {
  const { html } = normalizeContent({ contentType, content });

  return (
    <section
      className={styles.body}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
