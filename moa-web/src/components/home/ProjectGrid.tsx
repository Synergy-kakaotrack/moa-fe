'use client';

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import ProjectCard from './ProjectCard';
import { getRecentContext } from '@/api/scraps';
import { RecentProject } from '@/domain/recentContext';
import { mapRecentProjectToCard } from '@/api/mappers/mapRecentProjectToCard';

const CARD_COUNT = 3;

export default function ProjectGrid() {
  const [projects, setProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentContext()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section className={styles.grid} />;
  }

  // NOTE: 최대 3개까지만 표시
  const displayProjects = projects.slice(0, CARD_COUNT);
  // NOTE: 3개 미만일 때 빈 슬롯 개수
  const emptySlots = CARD_COUNT - displayProjects.length;

  return (
    <section className={styles.grid}>
      {displayProjects.map((p) => {
        const card = mapRecentProjectToCard(p);
        return (
          <ProjectCard
            key={card.id}
            projectId={card.id}
            title={card.title}
            description={card.description}
            date={card.date}
          />
        );
      })}

      {/* 빈 슬롯은 추가 카드로 표시 */}
      {Array.from({ length: emptySlots }).map((_, i) => (
        <article key={`add-${i}`} className={styles.addCard}>
          <div className={styles.addCircle}>+</div>
          <span className={styles.addText}>새 프로젝트</span>
        </article>
      ))}
    </section>
  );
}
