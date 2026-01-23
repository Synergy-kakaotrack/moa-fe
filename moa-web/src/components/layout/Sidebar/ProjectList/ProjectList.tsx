'use client';

import { useEffect, useState } from 'react';
import ProjectItem from './ProjectItem';
import styles from './ProjectList.module.css';

import { getProjects } from '@/api/projects';
import { Project } from '@/api/types/project';

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);

  useEffect(() => {
    getProjects().then((res) => {
      setProjects(res.items);
    });
  }, []);

  return (
    <div className={styles.projectList}>
      {projects.map((project) => (
        <ProjectItem
          key={project.projectId}
          project={project}
          isOpen={openProjectId === project.projectId}
          onProjectClick={(id) =>
            setOpenProjectId(id === openProjectId ? null : id)
          }
        />
      ))}
    </div>
  );
}
