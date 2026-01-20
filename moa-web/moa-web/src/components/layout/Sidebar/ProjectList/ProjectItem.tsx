'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './ProjectItem.module.css';
import { stages } from '@/data/stages';
import StageItem from './StageItem';

interface Project {
  id: string;
  name: string;
}

interface Props {
  project: Project;
  isOpen: boolean;
  onProjectClick: (id: string) => void;
}

export default function ProjectItem({
  project,
  isOpen,
  onProjectClick,
}: Props) {
  const router = useRouter();

  return (
    <div className={styles.project}>
      {/* 프로젝트 버튼 */}
      <button
        className={clsx(
          styles.projectButton,
          isOpen && styles.active
        )}
        onClick={() => {
          onProjectClick(project.id);
          router.push(`/project/${project.id}`);
        }}
      >
        {project.name}
      </button>

      {/* stage 리스트 */}
      {isOpen && (
        <ul className={styles.stageList}>
          {stages.map((stage) => (
            <StageItem
              key={stage.key}
              stage={stage}
              projectId={project.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
