'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './StageItem.module.css';
import { STAGE_ICON_MAP } from '@/components/icons/stage/iconStageMap';
import { Stage } from '@/constants/stages';
interface Props {
  stage: Stage;
  projectId: number;
  isActive?: boolean;
}

export default function StageItem({
  stage,
  projectId,
  isActive = false,
}: Props) {
  const router = useRouter();
  const Icon = STAGE_ICON_MAP[stage.key];

  const handleClick = () => {
    router.push(
      `/project/${projectId}/${stage.key}`
    );
  };

  return (
<button
  className={clsx(styles.stageButton, isActive && styles.active)}
  onClick={handleClick}
>
  <Icon className={styles.icon} />
  <span className={styles.label}>{stage.name}</span>
</button>
  );
}
