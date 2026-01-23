'use client';

import { useEffect, useState } from 'react';
import styles from './home.module.css';
import ProjectCard from './ProjectCard';
import { getRecentContext } from '@/api/scraps';
import { RecentProject } from '@/domain/recentContext';
import { mapRecentProjectToCard } from '@/api/mappers/mapRecentProjectToCard';

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

  return (
    <section className={styles.grid}>
      {projects.map((p) => {
        const card = mapRecentProjectToCard(p);
        return (
          <ProjectCard
            key={card.id}
            title={card.title}
            description={card.description}
            date={card.date}
          />
        );
      })}
    </section>
  );
}
