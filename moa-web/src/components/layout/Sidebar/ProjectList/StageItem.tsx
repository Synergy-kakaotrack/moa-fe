'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import styles from './StageItem.module.css';
import { STAGE_ICON_MAP } from '@/components/icons/stage/iconStageMap';
import { Stage } from '@/constants/stages';
import { getScraps } from '@/api/scraps';
interface Props {
  stage: Stage;
  projectId: number;
  isActive?: boolean;
}

const stageClassMap: Record<string, string> = {
  PLAN: styles.plan,
  RESEARCH: styles.research,
  DESIGN: styles.design,
  IMPLEMENT: styles.implement,
  TEST: styles.test,
  ETC: styles.etc,
};

export default function StageItem({
  stage,
  projectId,
  isActive = false,
}: Props) {
  const router = useRouter();
  const Icon = STAGE_ICON_MAP[stage.key];

  const handleClick = async () => {
    try {
      const res = await getScraps({
        projectId,
        stage: stage.name,
      });

      if (res.items.length > 0) {
        router.push(
          `/project/${projectId}/${stage.key}/${res.items[0].scrapId}`
        );
        return;
      }
    } catch {
      // NOTE: 조회 실패 시에도 단계 페이지로 이동
    }

    router.push(`/project/${projectId}/${stage.key}`);
  };

  return (
    <button
      className={clsx(
        styles.stageButton,
        stageClassMap[stage.key],
        isActive && styles.active
      )}
      onClick={handleClick}
    >
      <Icon className={styles.icon} />
      <span className={styles.label}>{stage.name}</span>
    </button>
  );
}
