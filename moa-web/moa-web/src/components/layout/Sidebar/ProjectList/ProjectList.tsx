'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectItem from './ProjectItem';
import styles from './ProjectList.module.css';

export default function ProjectList() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  return (
    <div className={styles.projectList}>
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          isOpen={openProjectId === project.id}
          onProjectClick={(id) =>
            setOpenProjectId(id === openProjectId ? null : id)
          }
        />
      ))}
    </div>
  );
}
