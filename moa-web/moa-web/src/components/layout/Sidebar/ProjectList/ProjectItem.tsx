'use client';

import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './ProjectItem.module.css';
import { stages } from '@/data/stages';
import StageItem from './StageItem';
import { IconFolder, IconCaret } from '@/components/icons';

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
  const pathname = usePathname();

  const handleClick = () => {
    onProjectClick(project.id);
    router.push(`/project/${project.id}`);
  };

  return (
    <div className={styles.project}>
      <button
        className={clsx(
          styles.projectHeader,
          isOpen && styles.active
        )}
        onClick={handleClick}
      >
        <IconCaret
          className={clsx(
            styles.caret,
            isOpen && styles.caretOpen
          )}
        />
        <IconFolder className={styles.folder} />
        <span className={styles.projectTitle}>
          {project.name}
        </span>
      </button>

      {isOpen && (
        <ul className={styles.stageList}>
          {stages.map((stage) => {
            const isActive =
              pathname === `/project/${project.id}/${stage.key}`;

            return (
              <StageItem
                key={stage.key}
                stage={stage}
                projectId={project.id}
                isActive={isActive}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
