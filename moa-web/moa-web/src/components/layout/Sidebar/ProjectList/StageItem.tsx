'use client';

import { useRouter, usePathname } from 'next/navigation';
import clsx from 'clsx';
import styles from './StageItem.module.css';

interface Stage {
  key: string;
  name: string;
}

interface Props {
  stage: Stage;
  projectId: string;
}

export default function StageItem({ stage, projectId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname.endsWith(stage.key);

  return (
    <li>
      <button
        className={clsx(
          styles.stageButton,
          isActive && styles.active
        )}
        onClick={() =>
          router.push(`/project/${projectId}/${stage.key}`)
        }
      >
        {stage.name}
      </button>
    </li>
  );
}
