'use client';

import { useState, useMemo } from 'react';
import { stages } from '@/data/stages';
import StageColumn from './StageColumn';
import styles from './dashboard.module.css';

interface ProjectDashboardProps {
  projectId: string;
}

const VISIBLE_COLUMN_COUNT = 3;

export default function ProjectDashboard({
  projectId,
}: ProjectDashboardProps) {
  const [startIndex, setStartIndex] = useState(0);

  const maxIndex = stages.length - VISIBLE_COLUMN_COUNT;

  const visibleStages = useMemo(() => {
    return stages.slice(
      startIndex,
      startIndex + VISIBLE_COLUMN_COUNT
    );
  }, [startIndex]);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 3, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 3, maxIndex));
  };

  const totalPages = Math.ceil(
    stages.length / VISIBLE_COLUMN_COUNT
  );

  const currentPage = Math.floor(
    startIndex / VISIBLE_COLUMN_COUNT
  );

  return (
    <section className={styles.dashboard}>
      <div className={styles.kanbanWrapper}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          ‹
        </button>

        <div className={styles.kanbanGrid}>
          {visibleStages.map((stage) => (
            <StageColumn
              key={stage.key}
              projectId={projectId}
              stage={stage.key}
              stageName={stage.name}
            />
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={handleNext}
          disabled={startIndex >= maxIndex}
        >
          ›
        </button>
      </div>

      <div className={styles.indicator}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentPage ? styles.active : ''
            }`}
          />
        ))}
      </div>
    </section>
  );
}
